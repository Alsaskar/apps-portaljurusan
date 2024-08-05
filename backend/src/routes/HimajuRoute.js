import express from 'express';
import CekToken from '../middleware/CekToken';
import { 
    add,
    addProfil,
    getProfil,
    list,
    updateStatus,
    cekStatus
} from '../controllers/HimajuController';

const router = express.Router();

router.get('/', CekToken, list);
router.post('/', CekToken, add);
router.post('/addProfil', CekToken, addProfil);
router.put('/:idMahasiswa', CekToken, updateStatus);
router.get('/profil', CekToken, getProfil);
router.get('/cekStatus/:idMahasiswa', CekToken, cekStatus);


export default router;

