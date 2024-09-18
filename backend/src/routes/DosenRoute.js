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
    listAll,
    createKaprodi,
    removeKaprodi,
    searchData,
} from '../controllers/DosenController';

const router = express.Router();

router.post('/', CekToken, add);
router.post('/upload-foto', CekToken, uploadFoto);

router.get('/', CekToken, list);
router.get('/search-data', CekToken, searchData);
router.get('/:id', CekToken, getById);
router.get('/list-all/:prodi', CekToken, listAll);

router.put('/:userId', CekToken, edit);
router.put('/create-kaprodi/:id', CekToken, createKaprodi);
router.put('/remove-kaprodi/:id', CekToken, removeKaprodi);
router.put('/update-pass/:id', CekToken, updatePassword);

router.delete('/:id', CekToken, remove);
router.delete('/:id/foto', CekToken, deleteFoto);

export default router;