import multer from 'multer';
import path from 'path';

// Konfigurasi penyimpanan file khusus untuk upload foto mahasiswa
const mahasiswaStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../assets/img/mahasiswa')); // Folder tempat penyimpanan file
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file unik
  }
});

// Inisialisasi multer dengan konfigurasi khusus
const mahasiswaUpload = multer({
  storage: mahasiswaStorage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Maksimal ukuran file 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('File format not supported'));
    }
  }
});

export default mahasiswaUpload;
