import { Op } from "sequelize";
import { Mahasiswa } from "../models/MahasiswaModel";
import Bimbingan from "../models/BimbinganModel";
import { Dosen } from "../models/DosenModel";
import DosenSignature from "../models/DosenSignatureModel";

// data untuk memilih mahasiswa
export const listChooseStudent = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 10;
  const search = req.query.search || "";
  const offset = (page - 1) * pageSize;
  const limit = pageSize;
  const adminProdi = req.query.adminProdi;

  if (!adminProdi) {
    return res
      .status(400)
      .json({ success: false, message: "Admin Prodi is required" });
  }

  try {
    const students = await Mahasiswa.findAndCountAll({
      where: {
        prodi: adminProdi,
        [Op.or]: [
          { fullname: { [Op.like]: `%${search}%` } },
          { nim: { [Op.like]: `%${search}%` } },
        ],
      },
      offset,
      limit,
      order: [["fullname", "ASC"]],
    });

    res.status(200).json({ result: students });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// data untuk memilih mahasiswa
export const listChooseDosen = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const search = req.query.search || "";
  const offset = (page - 1) * pageSize;
  const limit = pageSize;
  const adminProdi = req.query.adminProdi;

  try {
    const dosen = await Dosen.findAndCountAll({
      where: {
        prodi: adminProdi,
        [Op.or]: [
          { fullname: { [Op.like]: `%${search}%` } },
          { nip: { [Op.like]: `%${search}%` } },
        ],
      },
      offset,
      limit,
      order: [["fullname", "ASC"]],
    });

    res.status(200).json({
      result: dosen,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const add = async (req, res) => {
  const idMahasiswa = req.body.idMahasiswa;
  const idDosen = req.body.idDosen;

  try {
    // Cek apakah mahasiswa sudah memiliki dosen
    const existingBimbingan = await Bimbingan.findOne({
      where: {
        idMahasiswa: idMahasiswa,
      },
    });

    if (existingBimbingan) {
      return res.status(400).json({
        message: "Mahasiswa dengan nama ini sudah memiliki dosen pembimbing",
        success: false,
      });
    }

    // Tambahkan data baru
    await Bimbingan.create({
      idMahasiswa: idMahasiswa,
      idDosen: idDosen,
    });

    return res
      .status(200)
      .json({ message: "Berhasil menambahkan Dospem", success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

export const list = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search;
  const offset = limit * page;
  const adminProdi = req.query.adminProdi;

  const totalBimbingan = await Bimbingan.count({
    include: [
      {
        model: Mahasiswa,
        where: {
          prodi: adminProdi,
          [Op.or]: [{ fullname: { [Op.substring]: `${search}` } }],
        },
      },
    ],
  });
  const totalRows = totalBimbingan;
  const totalPage = Math.ceil(totalRows / limit);

  try {
    const bimbingan = await Bimbingan.findAll({
      include: [
        {
          model: Mahasiswa,
          where: {
            prodi: adminProdi,
            [Op.or]: [{ fullname: { [Op.substring]: `${search}` } }],
          },
        },
        {
          model: Dosen,
        },
      ],
      order: [["id", "desc"]],
      offset: offset,
      limit: limit,
    });

    return res.status(200).json({
      result: bimbingan,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const remove = async (req, res) => {
  const id = req.params.id;

  try {
    await Bimbingan.destroy({ where: { id: id } });

    return res
      .status(200)
      .json({ message: "Data berhasil dihapus", success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//Dapatkan dosen pembimbing di mahasiswa
export const getMahasiswaWithDosen = async (req, res) => {
  const mahasiswaId = parseInt(req.params.id, 10);

  try {
    // Ambil bimbingan yang terkait dengan mahasiswa
    const bimbingan = await Bimbingan.findOne({
      where: { idMahasiswa: mahasiswaId },
      include: [
        {
          model: Mahasiswa,
          where: { id: mahasiswaId },
          attributes: ["id", "fullname", "nim"], // Tambahkan "id" di sini
        },
        {
          model: Dosen,
          attributes: ["id", "fullname", "foto"], // Tambahkan "id" di sini
        },
      ],
    });

    if (!bimbingan) {
      return res.status(404).json({
        message: "Data bimbingan tidak ditemukan untuk mahasiswa ini",
      });
    }

    // Ambil data mahasiswa dan dosen pembimbing dari bimbingan
    const mahasiswa = {
      id: bimbingan.mahasiswa.id,
      fullname: bimbingan.mahasiswa.fullname,
      nim: bimbingan.mahasiswa.nim,
      dosenId: bimbingan.dosen ? bimbingan.dosen.id : null, // Tambahkan ID dosen
      dosenWali: bimbingan.dosen
        ? bimbingan.dosen.fullname
        : "Belum ada dosen wali",
        dosenFoto: bimbingan.dosen ? bimbingan.dosen.foto : null,
    };

    res.status(200).json({ mahasiswa });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//dapatkan nama mahasiswa yang dibimbing oleh dosen
export const getMahasiswaByDosen = async (req, res) => {
  const dosenId = parseInt(req.params.id, 10);

  try {
    // Ambil bimbingan yang terkait dengan dosen
    const bimbingan = await Bimbingan.findOne({
      where: { idDosen: dosenId },

      include: [
        {
          model: Dosen,
          where: { id: dosenId },
          attributes: ["id", "fullname", "nip"], // Tambahkan "id" di sini
        },
        {
          model: Mahasiswa,
          attributes: ["id", "fullname"],
        },
      ],
    });

    if (!bimbingan) {
      return res.status(404).json({
        message: "Data bimbingan tidak ditemukan untuk mahasiswa ini",
      });
    }

    // Ambil data mahasiswa dari bimbingan

    const dosen = {
      id: bimbingan.dosen.id,
      fullname: bimbingan.dosen.fullname,
      nim: bimbingan.dosen.nim,
      mahasiswaId: bimbingan.mahasiswa ? bimbingan.mahasiswa.id : null, // Tambahkan ID dosen
      mahasiswa: bimbingan.mahasiswa
        ? bimbingan.mahasiswa.fullname
        : "Belum ada mahasiswa",
    };

    res.status(200).json({ dosen });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// controllers/bimbinganController.js

export const getMahasiswaWithDosenDetails = async (req, res) => {
  const mahasiswaId = parseInt(req.params.id, 10);

  try {
    // Ambil bimbingan yang terkait dengan mahasiswa
    const bimbingan = await Bimbingan.findOne({
      where: { idMahasiswa: mahasiswaId },
      include: [
        {
          model: Mahasiswa,
          where: { id: mahasiswaId },
          attributes: ["fullname", "nim"],
        },
        {
          model: Dosen,
          attributes: ["fullname", "nip"],
        },
      ],
    });

    if (!bimbingan) {
      return res.status(404).json({
        message: "Data bimbingan tidak ditemukan untuk mahasiswa ini",
      });
    }

    // Ambil data mahasiswa dan dosen pembimbing dari bimbingan
    const mahasiswa = {
      ...bimbingan.mahasiswa.toJSON(), // Convert mahasiswa to plain object
      dosenWali: bimbingan.dosen
        ? { fullname: bimbingan.dosen.fullname, nip: bimbingan.dosen.nip }
        : null,
    };

    res.status(200).json({ mahasiswa });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//dapatkan ttd dosen ke mahasiswa
export const getTTDForMahasiswa = async (req, res) => {
  const { idMahasiswa } = req.params;

  try {
    const bimbingan = await Bimbingan.findOne({ where: { idMahasiswa } });

    if (!bimbingan) {
      return res.status(404).json({ message: "Bimbingan tidak ditemukan" });
    }

    const { idDosen } = bimbingan;

    const signature = await DosenSignature.findOne({ where: { idDosen } });

    if (!signature) {
      return res.status(404).json({ message: "TTD dosen tidak ditemukan" });
    }

    return res.status(200).json({ signatureUrl: signature.signatureUrl });
  } catch (error) {
    console.error("Error saat mendapatkan TTD dosen:", error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

// Controller untuk mendapatkan mahasiswa bimbingan berdasarkan id dosen
export const getMahasiswaBimbingan = async (req, res) => {
  const idDosen = parseInt(req.params.idDosen, 10);

  if (isNaN(idDosen)) {
    return res.status(400).json({ error: "Invalid Dosen ID" });
  }

  try {
    const bimbinganData = await Bimbingan.findAll({
      where: { idDosen },
      include: [
        {
          model: Mahasiswa,
          attributes: ["id", "fullname", "nim", "foto"],
        },
      ],
    });

    // Map bimbingan data to mahasiswa list
    const mahasiswaList = bimbinganData
      .map((b) => b.mahasiswa)
      .filter((m) => m);

    res.json({ mahasiswa: mahasiswaList });
  } catch (error) {
    console.error("Error fetching mahasiswa data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
