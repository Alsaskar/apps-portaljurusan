import express from 'express';
import CekToken from '../middleware/CekToken';
import { 
    loggedIn, 
    loggedInDosen, 
    loggedInMahasiswa, 
    login 
} from '../controllers/AuthController';

const router = express.Router();

router.post('/login', login);
router.get('/', CekToken, loggedIn);
router.get('/get-mahasiswa/:idUser', CekToken, loggedInMahasiswa)
router.get('/get-dosen/:idUser', CekToken, loggedInDosen)

export default router;