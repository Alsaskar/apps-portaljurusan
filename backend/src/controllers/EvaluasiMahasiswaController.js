import {
  EvaluasiMahasiswa,
  UploadedFile,
} from "../models/EvaluasiMahasiswaModel";
import Bimbingan from "../models/BimbinganModel";
import path from "path";
import fs from "fs";
import { Mahasiswa } from "../models/MahasiswaModel";

// Creat Evaluasi
export const createEvaluasi = async (req, res) => {
  const tgl = req.body.tgl;
  const kegiatan = req.body.kegiatan;
  const permasalahan = req.body.permasalahan;
  const solusi = req.body.solusi;
  const ttd = req.body.ttd;
  const idMahasiswa = req.body.idMahasiswa;

  if (!tgl || !kegiatan || !permasalahan || !ttd) {
    return res.status(400).json({ message: "Semua field harus diisi" });
  }

  try {
    const evaluasi = await EvaluasiMahasiswa.create({
      tgl,
      kegiatan,
      permasalahan,
      solusi: solusi || "",
      ttd,
      idMahasiswa,
    });

    return res.status(201).json({ evaluasi });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all Evaluasi
export const getAllEvaluasi = async (req, res) => {
  const idMahasiswa = req.params.idMahasiswa;

  try {
    const evaluations = await EvaluasiMahasiswa.findAll({
      where: {
        idMahasiswa: idMahasiswa,
      },
    });

    return res.status(200).json({ evaluations });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Delete Evaluasi
export const deleteEvaluasi = async (req, res) => {
  const id = req.params.id;

  try {
    // Temukan evaluasi berdasarkan ID
    const evaluasi = await EvaluasiMahasiswa.findByPk(id);

    if (!evaluasi) {
      return res.status(404).json({ message: "Evaluasi tidak ditemukan" });
    }

    // Hapus evaluasi
    await EvaluasiMahasiswa.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({ message: "Evaluasi berhasil dihapus" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//upload file
export const uploadFile = async (req, res) => {
  const file = req.file;
  const fileName = req.body.fileName;
  const idMahasiswa = req.body.idMahasiswa;

  if (!file || !fileName || !idMahasiswa) {
    return res
      .status(400)
      .json({ message: "File, file name, atau ID mahasiswa tidak disediakan" });
  }

  // Tentukan ekstensi file dari file yang diupload
  const fileExtension = path.extname(file.originalname);

  // Gabungkan nama file dari pengguna dengan ekstensi file
  const uploadFileName = `${fileName}${fileExtension}`;

  // Menentukan path upload menggunakan nama file yang diinputkan
  const uploadPath = path.join(__dirname, "../uploads/", uploadFileName);

  // Memindahkan  file ke path upload yang baru
  fs.renameSync(file.path, uploadPath);

  // URL file yang dapat diakses
  const fileUrl = `/${uploadFileName}`;

  try {
    const newFile = await UploadedFile.create({
      fileName: uploadFileName,
      fileUrl: fileUrl,
      idMahasiswa: idMahasiswa,
    });

    res.status(201).json({
      message: "File berhasil diupload",
      file: newFile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//hapus file dan unlink dari folder uploads
export const deleteFileByStudentId = async (req, res) => {
  const { idMahasiswa } = req.params;

  try {
    // Cari file yang terkait dengan ID mahasiswa
    const files = await UploadedFile.findAll({
      where: {
        idMahasiswa: idMahasiswa,
      },
    });

    if (!files.length) {
      return res
        .status(404)
        .json({
          message: "Tidak ada file yang ditemukan untuk ID mahasiswa ini",
        });
    }

    // Hapus setiap file dari direktori uploads
    files.forEach(async (file) => {
      const filePath = path.join(
        __dirname,
        "../uploads",
        path.basename(file.fileUrl)
      );

      // Hapus file dari sistem berkas
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Gagal menghapus file ${filePath}: ${err.message}`);
        }
      });

      // Hapus informasi file dari database
      await UploadedFile.destroy({
        where: {
          fileUrl: file.fileUrl,
        },
      });
    });

    res.status(200).json({ message: "Semua file berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//cek file jika ada
export const checkFileExistence = async (req, res) => {
  const { idMahasiswa } = req.params;

  try {
    const files = await UploadedFile.findAll({
      where: { idMahasiswa },
    });

    if (files.length > 0) {
      res.status(200).json({ hasFile: true });
    } else {
      res.status(200).json({ hasFile: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFileById = async (req, res) => {
  const { idMahasiswa } = req.params;

  try {
    // Temukan informasi file berdasarkan ID mahasiswa
    const file = await UploadedFile.findOne({
      where: { idMahasiswa: idMahasiswa },
    });

    if (!file) {
      return res.status(404).json({ message: "File tidak ditemukan" });
    }

    const filePath = path.join(
      __dirname,
      "../uploads",
      path.basename(file.fileUrl)
    );

    // Periksa apakah file ada di direktori uploads
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File tidak tersedia" });
    }

    // Kirim file sebagai response
    res.sendFile(filePath);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEvaluasiForDosen = async (req, res) => {
  const { idDosen } = req.params;

  console.log("ID Dosen:", idDosen); // Cek nilai ID Dosen

  if (!idDosen) {
    return res.status(400).json({ message: "ID Dosen tidak disediakan" });
  }

  try {
    const bimbingan = await Bimbingan.findAll({
      where: { idDosen },
      attributes: ["idMahasiswa"],
    });

    if (!bimbingan.length) {
      return res
        .status(404)
        .json({ message: "Tidak ada mahasiswa yang dibimbing oleh dosen ini" });
    }

    const mahasiswaIds = bimbingan.map((b) => b.idMahasiswa);

    console.log("Mahasiswa IDs:", mahasiswaIds); // Debugging mahasiswaIds

    const evaluasi = await EvaluasiMahasiswa.findAll({
      where: { idMahasiswa: mahasiswaIds },
      attributes: ["id", "tgl", "kegiatan", "permasalahan", "solusi", "ttd"], // Include 'id'
      include: [
        {
          model: Mahasiswa,
          attributes: ["fullname", "nim"],
        },
      ],
    });

    if (!evaluasi.length) {
      return res
        .status(404)
        .json({
          message: "Evaluasi tidak ditemukan untuk mahasiswa yang dibimbing",
        });
    }

    res.status(200).json({ evaluasi });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller baru untuk mendapatkan evaluasi berdasarkan idMahasiswa
export const getEvaluasiForMahasiswa = async (req, res) => {
  const { idMahasiswa } = req.params;

  try {
    // Fetch evaluasi berdasarkan idMahasiswa
    const evaluasi = await EvaluasiMahasiswa.findAll({
      where: { idMahasiswa: idMahasiswa },
    });

    if (evaluasi.length === 0) {
      return res.status(404).json({ message: 'Evaluasi tidak ditemukan untuk mahasiswa ini.' });
    }

    res.json({ evaluasi });
  } catch (error) {
    console.error('Error fetching evaluasi:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil evaluasi.' });
  }
};

export const updateSolusi = async (req, res) => {
  try {
    const { id } = req.params;
    const { solusi } = req.body;

    console.log("Update ID:", id); // Debugging ID
    console.log("New Solusi:", solusi); // Debugging new solusi

    const evaluasi = await EvaluasiMahasiswa.findByPk(id);

    if (!evaluasi) {
      return res.status(404).json({ message: "Evaluasi tidak ditemukan" });
    }

    evaluasi.solusi = solusi;
    await evaluasi.save();

    res.json({ message: "Solusi berhasil diperbarui", evaluasi });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: error.message });
  }
};

export const getFilesByDosen = async (req, res) => {
  const { idDosen } = req.params;

  if (!idDosen) {
    return res.status(400).json({ message: "ID Dosen tidak disediakan" });
  }

  try {
    // Temukan mahasiswa bimbingan berdasarkan ID dosen
    const bimbingan = await Bimbingan.findAll({
      where: { idDosen },
      attributes: ["idMahasiswa"], // Ambil ID mahasiswa
    });

    if (!bimbingan.length) {
      return res.status(200).json({ files: [] }); // Return empty array if no students are found
    }

    const mahasiswaIds = bimbingan.map((b) => b.idMahasiswa);

    // Temukan file berdasarkan ID mahasiswa
    const files = await UploadedFile.findAll({
      where: { idMahasiswa: mahasiswaIds },
    });

    res.status(200).json({ files }); // Return the files, even if it's an empty array
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};
