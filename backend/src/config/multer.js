import multer from 'multer';
import path from 'path';

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file unik
  }
});

// Inisialisasi multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 } // Maksimal ukuran file 5MB
});

export default upload;
