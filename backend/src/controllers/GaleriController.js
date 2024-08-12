import Galeri from "../models/GaleriModel";
import { Op } from "sequelize";
import fs from 'fs';
import path from 'path';

// Tambah galeri
export const createGaleri = async (req, res) => {
  try {
    const { title, deskripsi } = req.body;
    const foto = req.file.filename;

    const newGaleri = await Galeri.create({
      title,
      deskripsi,
      foto,
    });

    res.status(201).json({
      message: 'Galeri berhasil dibuat',
      data: newGaleri,
    });
  } catch (error) {
    console.error("Error creating galeri:", error);
    res.status(500).json({ message: error.message });
  }
};

// Dapatkan daftar galeri
export const listGaleri = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || "";
  const offset = limit * page;

  try {
    const totalGaleri = await Galeri.count({
      where: {
        [Op.or]: [
          { title: { [Op.substring]: search } },
          { deskripsi: { [Op.substring]: search } },
        ],
      },
    });

    const totalRows = totalGaleri;
    const totalPage = Math.ceil(totalRows / limit);

    const galeriList = await Galeri.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.substring]: search } },
          { deskripsi: { [Op.substring]: search } },
        ],
      },
      order: [["id", "desc"]],
      offset: offset,
      limit: limit,
    });

    return res.status(200).json({
      result: galeriList,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Hapus item galeri
export const deleteGaleri = async (req, res) => {
  const { id } = req.params;

  try {
    const galleryItem = await Galeri.findByPk(id);

    if (!galleryItem) {
      return res.status(404).json({ message: "Galeri tidak ditemukan" });
    }

    // Hapus file foto dari folder uploads
    if (galleryItem.foto) {
      const filePath = path.join(__dirname, '../uploads', galleryItem.foto);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        }
      });
    }

    // Hapus data galeri dari database
    await galleryItem.destroy();

    return res.status(200).json({ message: "Galeri berhasil dihapus" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
