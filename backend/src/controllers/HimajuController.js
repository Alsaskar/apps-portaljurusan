import { Mahasiswa } from "../models/MahasiswaModel";
import { Himaju, ProfilHimaju, ProkerHimaju } from "../models/HimajuModel";
import { Op } from "sequelize";
import transporter from "../config/email";
import User from "../models/UserModel";
import cron from 'node-cron';

export const add = async (req, res) => {
  const idMahasiswa = req.body.idMahasiswa;
  const fullname = req.body.fullname;
  const status = req.body.status;
  const alasanDitolak = req.body.alasanDitolak || "";

  try {
    if (status === "dikeluarkan") {
      // jika mahasiswa yang telah dikeluarkan dan daftar kembali
      // maka statusnya jadi pending
      await Himaju.update(
        {
          status: "pending",
        },
        {
          where: {
            idMahasiswa: idMahasiswa,
          },
        }
      );

      return res.status(200).json({
        message: "Berhasil mendaftar himaju. Menunggu proses persetujuan.",
        success: true,
      });
    } else {
      const cekData = await Himaju.count({
        where: {
          idMahasiswa: idMahasiswa,
          [Op.or]: [{ status: "terima" }, { status: "pending" }],
        },
      });

      if (cekData > 0) {
        // tidak bisa daftar himaju jika telah daftar
        return res.status(500).json({
          message: "Anda telah mendaftar himaju sebelumnya",
          success: false,
        });
      } else {
        await Himaju.create({
          idMahasiswa: idMahasiswa,
          fullname: fullname,
          status: status,
          alasanDitolak: alasanDitolak,
        });

        return res.status(200).json({
          message: "Berhasil mendaftar himaju. Menunggu proses persetujuan.",
          success: true,
        });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const list = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search;
  const offset = limit * page;

  const totalHimaju = await Himaju.count({
    where: {
      [Op.or]: [
        { fullname: { [Op.substring]: `${search}` } },
        { status: { [Op.substring]: `${search}` } },
      ],
    },
    include: {
      model: Mahasiswa,
      where: {
        [Op.or]: [
          { statusHimaju: "anggota_pasif" },
          { statusHimaju: "anggota_aktif" },
        ],
      },
    },
  });
  const totalRows = totalHimaju;
  const totalPage = Math.ceil(totalRows / limit);

  try {
    const dataHimaju = await Himaju.findAll({
      where: {
        [Op.or]: [
          { fullname: { [Op.substring]: `${search}` } },
          { status: { [Op.substring]: `${search}` } },
        ],
      },
      include: {
        model: Mahasiswa,
        where: {
          [Op.or]: [
            { statusHimaju: "anggota_pasif" },
            { statusHimaju: "anggota_aktif" },
          ],
        },
      },
      order: [["id", "desc"]],
      offset: offset,
      limit: limit,
    });

    return res.status(200).json({
      result: dataHimaju,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateStatus = async (req, res) => {
  const idMahasiswa = req.params.idMahasiswa;
  const status = req.body.status;

  try {
    await Himaju.update(
      {
        status: status,
      },
      {
        where: { idMahasiswa: idMahasiswa },
      }
    );

    if (status === "terima") {
      await Mahasiswa.update(
        {
          statusHimaju: "anggota_aktif",
        },
        {
          where: { id: idMahasiswa },
        }
      );

      return res
        .status(200)
        .json({ message: "Diterima sebagai Anggota Himaju", success: true });
    } else if (status === "ditolak") {
      return res
        .status(200)
        .json({ message: "Ditolak sebagai Anggota Himaju", success: true });
    } else if (status === "dikeluarkan") {
      await Mahasiswa.update(
        {
          statusHimaju: "anggota_pasif",
        },
        {
          where: { id: idMahasiswa },
        }
      );

      return res
        .status(200)
        .json({ message: "Dikeluarkan sebagai Anggota Himaju", success: true });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const addProfil = async (req, res) => {
  const { visi, misi, deskripsi } = req.body;

  try {
    // Periksa tabel sudah ada data
    const existingProfile = await ProfilHimaju.findOne();

    if (existingProfile) {
      // Jika sudah ada data, kirim pesan bahwa data sudah ada
      return res
        .status(400)
        .json({ message: "Data sudah ada", success: false });
    } else {
      // Jika belum ada data, tambahkan profil baru
      await ProfilHimaju.create({
        visi: visi,
        misi: misi,
        deskripsi: deskripsi,
      });

      return res
        .status(200)
        .json({ message: "Berhasil menambahkan Profil HME", success: true });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getProfil = async (req, res) => {
  try {
    const profil = await ProfilHimaju.findOne();
    if (!profil) {
      return res.status(200).json({ message: "Data not found" });
    }
    return res.status(200).json({ profil });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const cekStatus = async (req, res) => {
  const idMahasiswa = req.params.idMahasiswa;

  try {
    // Cari data himaju berdasarkan idMahasiswa
    const himaju = await Himaju.findOne({
      where: { idMahasiswa: idMahasiswa },
    });

    if (!himaju) {
      return res
        .status(404)
        .json({ message: "Data himaju tidak ditemukan", success: false });
    }

    return res.status(200).json({
      message: "Status ditemukan",
      status: himaju.status,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// hapus visi, misi, deskripsi
export const deleteProfil = async (req, res) => {
  const id = req.params.id;

  try {
    await ProfilHimaju.destroy({ where: { id: id } });

    return res
      .status(200)
      .json({ message: "Data berhasil dihapus", success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// tambahkan proker atau kegiatan
export const addProker = async (req, res) => {
  const {
    namaKegiatan,
    description,
    tglPelaksanaan,
    jamMulai,
    jamSelesai,
    lokasi,
  } = req.body;

  try {
    await ProkerHimaju.create({
      namaKegiatan,
      description,
      tglPelaksanaan,
      jamMulai,
      jamSelesai,
      lokasi,
    });

    res
      .status(200)
      .json({ message: "Program Kerja berhasil ditambahkan", success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Daftar Proker
export const listProker = async (req, res) => {
  try {
    const result = await ProkerHimaju.findAll();
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Hapus Proker
export const deleteProker = async (req, res) => {
  const id = req.params.id;

  try {
    await ProkerHimaju.destroy({
      where: { id },
    });
    res
      .status(200)
      .json({ message: "Program Kerja berhasil dihapus", success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const sendNotificationEmail = async (event, emails) => {
  console.log(`Mengirim email untuk acara: ${event.namaKegiatan}`);

  for (const email of emails) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Pengingat: ${event.namaKegiatan} akan dimulai`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h2 {
              color: #007BFF;
              text-align: center;
            }
            p {
              font-size: 16px;
              text-align: left;
            }
            ul {
              font-size: 16px;
              line-height: 1.6;
            }
            li {
              margin-bottom: 10px;
            }
            .footer {
              font-size: 14px;
              text-align: center;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Pengingat: ${event.namaKegiatan}</h2>
            <p>Halo,</p>
            <p>Ini adalah pengingat bahwa acara <strong>"${event.namaKegiatan}"</strong> akan dimulai.</p>
            <h3>Detail Acara:</h3>
            <ul>
              <li><strong>Deskripsi:</strong> ${event.description}</li>
              <li><strong>Tanggal:</strong> ${event.tglPelaksanaan}</li>
              <li><strong>Jam Mulai:</strong> ${event.jamMulai}</li>
              <li><strong>Jam Selesai:</strong> ${event.jamSelesai}</li>
              <li><strong>Lokasi:</strong> ${event.lokasi}</li>
            </ul>
            <p>Terima kasih,</p>
            <p>Tim Kami</p>
            <div class="footer">
              <p>Jika Anda tidak meminta pengingat ini, harap abaikan email ini.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email berhasil dikirim ke ${email} untuk acara ${event.namaKegiatan}`);

      // Update field notifikasiDikirim setelah email terkirim
      await ProkerHimaju.update(
        { notifikasiDikirim: true },
        { where: { id: event.id } }
      );
      console.log(`Status notifikasi untuk acara ${event.namaKegiatan} diperbarui.`);
    } catch (error) {
      console.error(`Error saat mengirim email ke ${email}:`, error);
    }
  }
};


export const notifyUpcomingEvents = async () => {
  const now = new Date();
  const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // Tanggal 3 hari ke depan

  try {
    const acceptedHimaju = await Himaju.findAll({
      where: { status: "terima" },
      attributes: ["idMahasiswa"],
    });

    const acceptedMahasiswaIds = acceptedHimaju.map((h) => h.idMahasiswa);

    if (acceptedMahasiswaIds.length === 0) {
      console.log('Tidak ada pengguna dengan status "terima".');
      return;
    }

    const events = await ProkerHimaju.findAll({
      where: {
        tglPelaksanaan: {
          [Op.eq]: threeDaysLater.toISOString().split("T")[0],
        },
        notifikasiDikirim: false,
      },
    });

    if (events.length === 0) {
      console.log("Tidak ada acara yang akan datang dalam 3 hari.");
      return;
    }

    const mahasiswaWithEmails = await Mahasiswa.findAll({
      where: {
        id: {
          [Op.in]: acceptedMahasiswaIds,
        },
      },
      include: [
        {
          model: User,
          attributes: ["email"],
        },
      ],
    });

    const emails = mahasiswaWithEmails
      .map((mahasiswa) => mahasiswa.user && mahasiswa.user.email)
      .filter(Boolean);

    if (emails.length === 0) {
      console.log("Tidak ada email yang ditemukan.");
      return;
    }

    for (const event of events) {
      const eventDateTime = new Date(`${event.tglPelaksanaan}T${event.jamMulai}`);
      const notificationDateTime = new Date(eventDateTime.getTime() - 3 * 24 * 60 * 60 * 1000); // 3 hari sebelum acara pada jamMulai

      console.log(`Jadwal pengiriman email untuk acara ${event.namaKegiatan} pada ${notificationDateTime.toISOString()}`);

      const cronMinute = eventDateTime.getMinutes();
      const cronHour = eventDateTime.getHours();
      const cronDay = notificationDateTime.getDate();
      const cronMonth = notificationDateTime.getMonth() + 1; // Cron bulan mulai dari 1

      const cronExpression = `0 ${cronMinute} ${cronHour} ${cronDay} ${cronMonth} *`;
      console.log(`Menjadwalkan cron dengan ekspresi: ${cronExpression}`);

      cron.schedule(cronExpression, () => {
        console.log(`Menjalankan pengiriman email untuk acara ${event.namaKegiatan}`);
        sendNotificationEmail(event, emails).catch(console.error);
      });
    }
  } catch (err) {
    console.error("Error saat mengambil data acara:", err);
  }
};