import { Mahasiswa } from "../models/MahasiswaModel";
import { Himaju, ProfilHimaju, ProkerHimaju } from "../models/HimajuModel";
import { Op } from "sequelize";
import transporter from "../config/email";

// jadikan mahasiswa sebagai himaju
export const add = async (req, res) => {
  const idMahasiswa = req.body.idMahasiswa;
  const fullname = req.body.fullname;
  const status = req.body.status;

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

// Notifikasi Email Satu Jam Sebelumnya
export const notifyUpcomingEvents = async () => {
  const now = new Date();
  const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

  try {
    // Langkah 1: Ambil semua Himaju dengan status 'terima'
    const acceptedHimaju = await Himaju.findAll({
      where: { status: "terima" },
      attributes: ["idMahasiswa"],
    });

    // Ambil idMahasiswa dari hasil query
    const acceptedMahasiswaIds = acceptedHimaju.map((h) => h.idMahasiswa);

    if (acceptedMahasiswaIds.length === 0) {
      console.log('Tidak ada pengguna dengan status "terima".');
      return;
    }

    // Langkah 2: Ambil acara yang dimulai dalam satu jam ke depan
    const events = await ProkerHimaju.findAll({
      where: {
        tglPelaksanaan: {
          [Op.eq]: now.toISOString().split("T")[0], // Hari ini
        },
        jamMulai: {
          [Op.between]: [
            now.toTimeString().split(" ")[0].substring(0, 5),
            oneHourLater.toTimeString().split(" ")[0].substring(0, 5),
          ],
        },
      },
    });

    if (events.length === 0) {
      console.log("Tidak ada acara yang akan datang.");
      return;
    }

    // Langkah 3: Kirim notifikasi
    events.forEach((event) => {
      const mailOptions = {
        from: "oswaldtanlee44@gmail.com",
        to: "oswaldtanlee444@gmail.com",
        subject: `Pengingat: ${event.namaKegiatan} akan dimulai dalam 1 jam`,
        text: `Halo,
                \n\nIni adalah pengingat bahwa acara "${event.namaKegiatan}" akan dimulai dalam 1 jam.
                \n\nDetail:
                \nDeskripsi: ${event.description}
                \nTanggal: ${event.tglPelaksanaan}
                \nJam Mulai: ${event.jamMulai}
                \nJam Selesai: ${event.jamSelesai}
                \nLokasi: ${event.lokasi}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error saat mengirim email:", error);
        } else {
          console.log("Email terkirim:", info.response);
        }
      });
    });
  } catch (err) {
    console.error("Error saat mengambil data acara:", err);
  }
};
