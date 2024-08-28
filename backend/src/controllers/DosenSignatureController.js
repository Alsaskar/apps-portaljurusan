import DosenSignature from '../models/DosenSignatureModel';

//create ttd
export const createSignature = async (req, res) => {
  const { idDosen, idMahasiswa, ttd } = req.body;

  if (!ttd || !idDosen || !idMahasiswa) {
    return res.status(400).json({ message: "idDosen, idMahasiswa, dan ttd harus diisi" });
  }

  try {
    // Cek apakah TTD sudah ada untuk dosen ini dan mahasiswa ini
    const existingSignature = await DosenSignature.findOne({
      where: { idDosen, idMahasiswa }
    });

    if (existingSignature) {
      return res.status(400).json({ message: "TTD sudah ada untuk dosen dan mahasiswa ini" });
    }

    const newSignature = await DosenSignature.create({
      idDosen,
      idMahasiswa,
      signatureUrl: ttd,
    });

    return res.status(201).json({ newSignature });
  } catch (error) {
    console.error('Error saat menyimpan tanda tangan:', error);
    return res.status(500).json({ message: error.message });
  }
};

//ambil ttd dosen
export const getSignatureByDosen = async (req, res) => {
  const { idDosen, idMahasiswa } = req.params; // Ambil idMahasiswa dari params

  try {
    const signatures = await DosenSignature.findAll({
      where: { 
        idDosen,
        idMahasiswa
      },
    });

    if (signatures.length === 0) {
      return res.status(404).json({ message: "Data tanda tangan tidak ditemukan" });
    }

    return res.status(200).json({ signatures });
  } catch (error) {
    console.error('Error saat mengambil data tanda tangan:', error);
    return res.status(500).json({ message: error.message });
  }
};



//hapus ttd dosen
export const deleteSignature = async (req, res) => {
  const { idDosen, idMahasiswa } = req.params;

  try {
    const signature = await DosenSignature.findOne({ where: { idDosen, idMahasiswa } });

    if (!signature) {
      return res.status(404).json({ message: "TTD tidak ditemukan" });
    }

    await signature.destroy();

    return res.status(200).json({ message: "TTD berhasil dihapus" });
  } catch (error) {
    console.error('Error saat menghapus TTD:', error);
    return res.status(500).json({ message: error.message });
  }
};
