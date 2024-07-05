import express from 'express';
import CekToken from '../middleware/CekToken';
import { 
    add,
    listChooseDosen,
    listChooseStudent,
} from '../controllers/BimbinganController';

const router = express.Router();

router.get('/list-choose-student', CekToken, listChooseStudent);
router.get('/list-choose-dosen', CekToken, listChooseDosen);

router.post('/', CekToken, add)

export default router;