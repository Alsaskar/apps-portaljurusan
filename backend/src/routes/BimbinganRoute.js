import express from 'express';
import CekToken from '../middleware/CekToken';
import { 
    add,
    list,
    listChooseDosen,
    listChooseStudent,
    remove,
    getMahasiswaWithDosen,
    getMahasiswaByDosen,
    getMahasiswaWithDosenDetails,
    getTTDForMahasiswa,
    getMahasiswaBimbingan,
} from '../controllers/BimbinganController';

const router = express.Router();

router.get('/', CekToken, list);
router.get('/list-choose-student', CekToken, listChooseStudent);
router.get('/list-choose-dosen', CekToken, listChooseDosen);
router.get('/dosen-mahasiswa/:id/dosen', CekToken, getMahasiswaWithDosen);
router.get('/mahasiswa/:id/dosen', CekToken, getMahasiswaWithDosenDetails);
router.get('/mahasiswa-dosen/:id/mahasiswa', CekToken, getMahasiswaByDosen);
router.get('/mahasiswa/:idMahasiswa/ttd-dosen', CekToken, getTTDForMahasiswa);
router.get('/mahasiswa-bimbingan/:idDosen', CekToken, getMahasiswaBimbingan);

router.post('/', CekToken, add)

router.delete('/:id', CekToken, remove)

export default router;