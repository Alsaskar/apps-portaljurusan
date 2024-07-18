import express from 'express';
import CekToken from '../middleware/CekToken';
import { 
    add,
    list,
    listChooseDosen,
    listChooseStudent,
    remove,
} from '../controllers/BimbinganController';

const router = express.Router();

router.get('/', CekToken, list);
router.get('/list-choose-student', CekToken, listChooseStudent);
router.get('/list-choose-dosen', CekToken, listChooseDosen);

router.post('/', CekToken, add)

router.delete('/:id', CekToken, remove)

export default router;