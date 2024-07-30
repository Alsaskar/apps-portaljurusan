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
    updatePassword 
} from '../controllers/MahasiswaController';

const router = express.Router();

router.post('/', CekToken, add);
router.post('/add-detail', CekToken, addDetail);
router.get('/', CekToken, list);
router.get('/:id', CekToken, getById);
router.put('/:id', CekToken, edit);
router.put('/create-ketuahimaju/:id', CekToken, createKetuaHimaju);
router.put('/remove-ketuahimaju/:id', CekToken, removeKetuaHimaju);
router.put('/update-pass/:id', CekToken, updatePassword);
router.delete('/:id', CekToken, remove);

export default router;