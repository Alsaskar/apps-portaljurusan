import QRCode from "qrcode";
import jwt from "jsonwebtoken";
import User from "../models/UserModel";

export const generateQRCode = async (req, res) => {
  try {
    // Ambil username dari decoded token
    const { username } = res.locals.jwt;

    // Temukan user berdasarkan username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User tidak ditemukan" });
    }

    // Buat payload untuk token QR Code
    const qrPayload = { userId: user.id };
    const qrToken = jwt.sign(qrPayload, process.env.QR_CODE_SECRET, {
      expiresIn: "1h",
    });

    QRCode.toDataURL(qrToken, (err, url) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Gagal membuat QR code",
          error: err.message,
        });
      }
      
      res.status(200).json({ success: true, qrCode: url });
    });
  } catch (error) {
    console.error("Error during QR code generation:", error.message);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat membuat QR code",
    });
  }
};

//Login dengan QR Code
export const loginWithQRCode = async (req, res) => {
  try {
    const { qrCodeToken } = req.body;


    // Verifikasi QR code token
    const decoded = jwt.verify(qrCodeToken, process.env.QR_CODE_SECRET);

    if (!decoded || !decoded.userId) {
      return res.status(400).json({
        success: false,
        message: "Token tidak valid atau ID tidak ditemukan",
      });
    }

    // Temukan user berdasarkan decoded token
    const user = await User.findOne({ where: { id: decoded.userId } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User tidak ditemukan" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.TOKEN_JWT,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        role: user.role,
        prodiAdmin: user.prodiAdmin,
        prodiDosen: user.prodiDosen
      },
    });
  } catch (error) {
    console.error("Error during QR code login:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat login dengan QR code",
      error: error.message,
    });
  }
};
