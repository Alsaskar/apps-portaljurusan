import express from 'express';
import CekToken from '../middleware/CekToken';
import { 
    add,
    edit,
    getById,
    list,
    remove,
    updatePassword,
    uploadFoto,
    deleteFoto,
} from '../controllers/DosenController';

const router = express.Router();

router.post('/', CekToken, add);
router.post('/upload-foto', CekToken, uploadFoto);

router.get('/', CekToken, list);
router.get('/:id', CekToken, getById);

router.put('/:userId', CekToken, edit);
router.put('/update-pass/:id', CekToken, updatePassword);

router.delete('/:id', CekToken, remove);
router.delete('/:id/foto', CekToken, deleteFoto);

export default router;