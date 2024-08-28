import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel";
import { DetailMahasiswa, Mahasiswa } from "../models/MahasiswaModel";
import { DetailDosen, Dosen } from "../models/DosenModel";
import crypto from "crypto";
import FailedLoginAttempt from "../models/FailedLoginAttemptModel";
import transporter from "../config/email";
import { Op, fn, col, literal } from "sequelize";

// Middleware untuk mendapatkan IP client
const getClientIp = (req) => {
  return (
    (req.headers["x-forwarded-for"] &&
      req.headers["x-forwarded-for"].split(",")[0]) ||
    req.connection.remoteAddress ||
    "Unknown"
  );
};

// Fungsi untuk mencatat percobaan login gagal
const logFailedAttempt = async (ip) => {
  try {
    const existingAttempt = await FailedLoginAttempt.findOne({
      where: { ipAddress: ip },
    });
    let isBlocked = false;
    let attemptCount = 1;

    if (existingAttempt) {
      attemptCount = existingAttempt.attemptCount + 1;
      isBlocked = attemptCount >= 10; // Blokir setelah 10 percobaan
      // Update hanya jika IP belum diblokir
      if (!existingAttempt.isBlocked) {
        await existingAttempt.update({ attemptCount, isBlocked });
      }
    } else {
      isBlocked = attemptCount >= 10;
      await FailedLoginAttempt.create({
        ipAddress: ip,
        attemptCount,
        isBlocked,
      });
    }

    return { isBlocked };
  } catch (error) {
    console.error("Error logging failed login attempt:", error.message);
    return { isBlocked: false };
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const ip = getClientIp(req); // Ambil IP dari request

  try {
    // Periksa apakah IP terblokir
    const { isBlocked } = await logFailedAttempt(ip);
    if (isBlocked) {
      // Hanya untuk username tidak terdaftar
      const { count } = await User.findAndCountAll({ where: { username } });
      if (count === 0) {
        return res
          .status(403)
          .json({
            success: false,
            message:
              "IP telah diblokir karena terlalu banyak percobaan login gagal.",
          });
      }
    }

    // Cari user berdasarkan username
    const { count, rows } = await User.findAndCountAll({ where: { username } });
    if (count === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Username salah" });
    }

    const user = rows[0];

    // Periksa status lockout dan reset jika periode terkunci telah habis
    if (user.lockout && new Date() < new Date(user.lockoutTime)) {
      return res.status(403).json({
        success: false,
        message:
          "Akun terkunci sementara, harap tunggu dalam 5 menit dan coba kembali",
      });
    } else if (user.lockout && new Date() >= new Date(user.lockoutTime)) {
      // Reset lockout status jika periode terkunci telah habis
      await user.update({ attempts: 0, lockout: false, lockoutTime: null });
    }

    // Validasi password
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      // Reset attempts dan lockout
      await user.update({ attempts: 0, lockout: false, lockoutTime: null });

      // Daftarkan token
      const payload = { username: user.username };
      const token = jwt.sign(payload, process.env.TOKEN_JWT, {
        expiresIn: "1d",
      });

      return res.status(200).json({
        username: user.username,
        role: user.role,
        id: user.id,
        prodiAdmin: user.prodiAdmin,
        success: true,
        token: token,
      });
    } else {
      // Tambah attempts jika username benar tapi password salah
      const attempts = user.attempts + 1;
      let lockout = user.lockout;
      let lockoutTime = user.lockoutTime;

      if (attempts >= 3) {
        lockout = true;
        lockoutTime = new Date(new Date().getTime() + 5 * 60 * 1000); // 5 menit
      }

      await user.update({ attempts, lockout, lockoutTime });

      // Catat percobaan login gagal
      await logFailedAttempt(ip);

      return res.status(401).json({
        success: false,
        message: lockout
          ? "Akun terkunci, harap tunggu dalam 5 menit."
          : "Password salah",
      });
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan saat login", error: error.message });
  }
};

// const formatIp = (ip) => {
//   return ip.replace(/^::ffff:/, ""); // Menghapus awalan ::ffff:
// };

// Mendapatkan daftar IP yang diblokir
export const getBlockedIps = async (req, res) => {
  try {
    const blockedIps = await FailedLoginAttempt.findAll({
      where: { isBlocked: true },
      attributes: ["ipAddress", "attemptCount"],
    });

    // Format IP sebelum mengirim ke frontend
    const formattedIps = blockedIps.map((ipEntry) => ({
      ipAddress: (ipEntry.ipAddress),
      attemptCount: ipEntry.attemptCount,
    }));

    res.json(formattedIps);
  } catch (error) {
    console.error("Error fetching blocked IPs:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan saat mengambil data" });
  }
};

// Membuka IP yang diblokir
export const unblockIp = async (req, res) => {
  const { ipAddress } = req.body;
  try {
    const result = await FailedLoginAttempt.destroy({
      where: { ipAddress },
    });

    if (result > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ message: "IP tidak ditemukan" });
    }
  } catch (error) {
    console.error("Error unblocking IP:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan saat membebaskan IP" });
  }
};

export const requestResetOtp = async (req, res) => {
  const { email } = req.body;

  try {
    // Cari user berdasarkan email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Generate OTP
    const resetOtp = crypto.randomInt(100000, 999999).toString();
    console.log(`Generated OTP: ${resetOtp}`); // Logging OTP untuk debugging

    // Simpan OTP dan waktu kadaluarsa ke database
    user.resetOtp = resetOtp;
    user.resetOtpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
    await user.save();

    // Kirim OTP ke email
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Your OTP Code for Password Reset",
      text: `Your OTP code is ${resetOtp}. It expires in 10 minutes.`,
    };

    // Logging data OTP dan waktu kadaluarsa untuk debugging
    console.log(
      `OTP Data to be Saved: resetOtp=${
        user.resetOtp
      }, resetOtpExpires=${new Date(user.resetOtpExpires).toISOString()}`
    );

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP telah dikirim ke email Anda." });
  } catch (error) {
    console.error("Error in requestResetOtp:", error.message);
    res
      .status(500)
      .json({
        message: "Terjadi kesalahan saat mengirim OTP",
        error: error.message,
      });
  }
};

export const verifyResetOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || user.resetOtp !== otp || user.resetOtpExpires < Date.now()) {
      return res
        .status(400)
        .json({ message: "OTP tidak valid atau telah kedaluwarsa" });
    }

    // OTP valid
    user.resetOtp = null;
    user.resetOtpExpires = null;
    await user.save();

    res.status(200).json({ message: "OTP berhasil diverifikasi" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Terjadi kesalahan saat memverifikasi OTP",
        error: error.message,
      });
  }
};

// Reset password after OTP verification
export const resetPassword = async (req, res) => {
  const { newPassword, confirmPassword, email } = req.body;

  try {
    // Validasi konfirmasi password
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password baru dan konfirmasi password tidak cocok" });
    }

    // Validasi password baru
    if (!validatePassword(newPassword)) {
      return res.status(400).json({
        message:
          "Password baru harus memiliki minimal 8 karakter, mengandung huruf, angka, dan karakter khusus",
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Enkripsi password baru
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password di database, reset attempts, and clear lockout
    await User.update(
      {
        password: hashedNewPassword,
        attempts: 0,
        lockout: false,
        lockoutTime: null,
        resetOtp: null,
        resetOtpExpires: null,
      },
      { where: { email } }
    );

    res.status(200).json({ message: "Password berhasil diubah" });
  } catch (err) {
    console.error("Error resetting password:", err.message);
    return res
      .status(500)
      .json({
        message: "Terjadi kesalahan saat mengubah password",
        error: err.message,
      });
  }
};

export const loggedIn = async (req, res) => {
  const username = res.locals.jwt.username;

  try {
    const result = await User.findOne({ where: { username: username } });

    return res.status(200).json({
      id: result.id,
      fullname: result.fullname,
      username: result.username,
      email: result.email,
      noHp: result.noHp,
      prodiAdmin: result.prodiAdmin,
      role: result.role,
      loggedIn: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Menampilkan data mahasiswa yang sedang login
export const loggedInMahasiswa = async (req, res) => {
  const idUser = req.params.idUser;

  try {
    const result = await Mahasiswa.findOne({
      where: { userId: idUser },
      include: [{ model: DetailMahasiswa }],
    });

    return res.status(200).json({ result: result });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Menampilkan data dosen yang sedang login
export const loggedInDosen = async (req, res) => {
  const idUser = req.params.idUser;

  try {
    const result = await Dosen.findOne({
      where: { userId: idUser },
      include: [{ model: DetailDosen }],
    });

    return res.status(200).json({ result: result });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Mengirim OTP ke email
export const sendOtpUbahPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    console.log(`Generated OTP: ${otp}`);

    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
    console.log(
      `OTP Data to be Saved: otp=${user.otp}, otpExpires=${user.otpExpires}`
    );

    await user.save();
    console.log("OTP successfully saved to the database");

    // Kirim OTP ke email
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It expires in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP telah dikirim ke email Anda." });
  } catch (error) {
    console.error("Error in sendOtp:", error.message);
    res
      .status(500)
      .json({
        message: "Terjadi kesalahan saat mengirim OTP",
        error: error.message,
      });
  }
};

// Memverifikasi OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return res
        .status(400)
        .json({ message: "OTP tidak valid atau telah kedaluwarsa" });
    }

    // OTP valid
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "OTP berhasil diverifikasi" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Terjadi kesalahan saat memverifikasi OTP",
        error: error.message,
      });
  }
};

// Untuk validasi password
const validatePassword = (password) => {
  const minLength = 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return (
    password.length >= minLength && hasLetter && hasNumber && hasSpecialChar
  );
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const { username } = res.locals.jwt; // Mengambil username dari token

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Validasi password saat ini
    const match = await bcrypt.compare(currentPassword, user.password);

    if (!match) {
      return res.status(401).json({ message: "Password saat ini salah" });
    }

    // Validasi password baru
    if (!validatePassword(newPassword)) {
      return res.status(400).json({
        message:
          "Password baru harus memiliki minimal 8 karakter, mengandung huruf, angka, dan karakter khusus",
      });
    }

    // Validasi konfirmasi password
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password baru dan konfirmasi password tidak cocok" });
    }

    // Enkripsi password baru
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password di database
    await User.update({ password: hashedNewPassword }, { where: { username } });

    return res.status(200).json({ message: "Password berhasil diubah" });
  } catch (err) {
    console.error("Error changing password:", err.message);
    return res
      .status(500)
      .json({
        message: "Terjadi kesalahan saat mengubah password",
        error: err.message,
      });
  }
};

// Get OTP expiry time
export const getResetOtpExpiry = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    if (!user.resetOtpExpires) {
      return res.status(400).json({ message: "OTP belum dibuat" });
    }

    res.status(200).json({ expiryTime: user.resetOtpExpires });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: error.message });
  }
};

// Controller untuk mengambil waktu kadaluarsa OTP
export const getOtpExpiry = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    if (!user.otpExpires) {
      return res.status(400).json({ message: "OTP belum dibuat" });
    }

    res.status(200).json({ expiryTime: user.otpExpires });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: error.message });
  }
};

export const getIpBlocked = async (req, res) => {
  try {
    const count = await FailedLoginAttempt.count({
      where: { isBlocked: true },
    });
    res.json({ blockedIpCount: count });
  } catch (error) {
    console.error("Error fetching blocked IP Count:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAttemptCountInMonth = async (req, res) => {
  try {
    // Ambil tahun dari query parameter, default ke tahun saat ini jika tidak ada
    const year = parseInt(req.query.year, 10) || new Date().getFullYear();
    
    // Rentang tanggal untuk tahun yang diminta
    const startDate = `${year}-01-01 00:00:00`;
    const endDate = `${year + 1}-01-01 00:00:00`;

    const data = await FailedLoginAttempt.findAll({
      attributes: [
        [fn("DATE_FORMAT", col("createdAt"), "%Y-%m"), "month"],
        [fn("SUM", col("attemptCount")), "totalAttempts"],
      ],
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate]
        }
      },
      group: ["month"],
      order: [[literal("month"), "ASC"]],
    });

    console.log('Backend Data:', data.map(record => ({
      month: record.get("month"),
      totalAttempts: record.get("totalAttempts"),
    })));
    
    // Kirim response ke frontend
    res.json(
      data.map((record) => ({
        month: record.get("month"),
        totalAttempts: record.get("totalAttempts"),
      }))
    );
  } catch (error) {
    console.error("Error fetching attempt count per month:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};