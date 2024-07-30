import express from 'express';
import CekToken from '../middleware/CekToken';
import { 
    add,
    addProfil,
    list,
    updateStatus,
} from '../controllers/HimajuController';

const router = express.Router();

router.get('/', CekToken, list);
router.post('/', CekToken, add);
router.post('/addProfil', CekToken, addProfil);
router.put('/:idMahasiswa', CekToken, updateStatus);

export default router;