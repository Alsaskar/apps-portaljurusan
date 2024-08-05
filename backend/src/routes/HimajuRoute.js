import express from 'express';
import CekToken from '../middleware/CekToken';
import { 
    add,
    addProfil,
    getProfil,
    list,
    updateStatus,
    cekStatus,
    deleteProfil,
    addProker,
    listProker,
    deleteProker
} from '../controllers/HimajuController';

const router = express.Router();

router.get('/', CekToken, list);
router.get('/profil', CekToken, getProfil);
router.get('/list-proker', CekToken, listProker);
router.get('/cekStatus/:idMahasiswa', CekToken, cekStatus);

router.post('/', CekToken, add);
router.post('/addProfil', CekToken, addProfil);
router.post('/add-proker', CekToken, addProker);

router.put('/:idMahasiswa', CekToken, updateStatus);

router.delete('/delete-profil/:id', CekToken, deleteProfil)
router.delete('/delete-proker/:id', CekToken, deleteProker)

export default router;

