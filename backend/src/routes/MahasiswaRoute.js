import express from 'express';
import CekToken from '../middleware/CekToken';
import { 
    add, 
    addDetail, 
    createKetuaHimaju, 
    edit, 
    getById, 
    list, 
    remove, 
    removeKetuaHimaju, 
    updatePassword,
    getMahasiswaWithDetails,
    getMahasiswaWithFiles,
    uploadFoto,
    deleteFoto,
    getMahasiswaCount,
} from '../controllers/MahasiswaController';

const router = express.Router();

router.post('/', CekToken, add);
router.post('/add-detail', CekToken, addDetail);
router.post('/upload-foto', CekToken, uploadFoto);
router.get('/', CekToken, list);
router.get('/get-mahasiswa-count', CekToken, getMahasiswaCount);
router.get('/:id', CekToken, getById);
router.get('/detail/:id/details', CekToken, getMahasiswaWithDetails);
router.get('/file/:id/files', CekToken, getMahasiswaWithFiles);
router.put('/:id', CekToken, edit);
router.put('/create-ketuahimaju/:id', CekToken, createKetuaHimaju);
router.put('/remove-ketuahimaju/:id', CekToken, removeKetuaHimaju);
router.put('/update-pass/:id', CekToken, updatePassword);
router.delete('/:id', CekToken, remove);
router.delete('/:id/foto', CekToken, deleteFoto);

export default router;