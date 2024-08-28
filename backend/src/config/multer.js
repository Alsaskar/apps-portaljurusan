import multer from 'multer';
import path from 'path';

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/')); // Folder tempat penyimpanan file
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file unik
  }
});

// Inisialisasi multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Maksimal ukuran file 5MB
  fileFilter: (req, file, cb) => {
    // Filter file berdasarkan tipe MIME jika diperlukan
    const allowedTypes = /pdf|jpeg|jpg|png/; 
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('File format not supported'));
    }
  }
});

export default upload;
