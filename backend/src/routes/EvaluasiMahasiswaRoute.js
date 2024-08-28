import express from 'express';
import CekToken from "../middleware/CekToken";
import {
  createEvaluasi,
  getAllEvaluasi,
  deleteEvaluasi,
  uploadFile,
  deleteFileByStudentId,
  checkFileExistence,
  getFileById,
  getEvaluasiForDosen,
  getEvaluasiForMahasiswa,
  updateSolusi,
  getFilesByDosen,
} from '../controllers/EvaluasiMahasiswaController';
import upload from '../config/multer';

const router = express.Router();

router.post('/', CekToken, createEvaluasi);
router.post('/upload-pdf', CekToken, upload.single('fileUrl'), uploadFile);
router.get('/:idMahasiswa', CekToken, getAllEvaluasi);
router.get('/files/:idMahasiswa', CekToken, checkFileExistence);
router.get('/file/:idMahasiswa', CekToken, getFileById);
router.get('/dosen/:idDosen/files', CekToken, getFilesByDosen);
router.get('/dosen/:idDosen', CekToken, getEvaluasiForDosen);
router.get('/mahasiswa/:idMahasiswa', CekToken, getEvaluasiForMahasiswa);
router.delete('/:id', CekToken, deleteEvaluasi);
router.delete('/files/:idMahasiswa', CekToken, deleteFileByStudentId);


// Route baru untuk update solusi
router.patch('/solusi/:id', CekToken, updateSolusi);

export default router;
