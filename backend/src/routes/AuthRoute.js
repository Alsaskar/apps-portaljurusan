import express from 'express';
import CekToken from '../middleware/CekToken';
import { 
    loggedIn, 
    loggedInDosen, 
    loggedInMahasiswa, 
    login ,
    sendOtpUbahPassword,
    verifyOtp,
    changePassword,
    getOtpExpiry,
    getResetOtpExpiry,
    requestResetOtp,
    verifyResetOtp,
    resetPassword,
    getIpBlocked,
    unblockIp,
    getAttemptCountInMonth,
    getBlockedIps,
} from '../controllers/AuthController';

const router = express.Router();

router.post('/login', login);
router.post('/send-otp', CekToken, sendOtpUbahPassword);
router.post('/verify-otp', CekToken, verifyOtp);
router.post('/change-password', CekToken, changePassword);
router.post('/get-otp-expiry', CekToken, getOtpExpiry);
router.post('/get-reset-otp-expiry', getResetOtpExpiry);
router.post('/request-reset-otp', requestResetOtp);
router.post('/verify-reset-otp', verifyResetOtp);
router.post('/reset-password', resetPassword);
router.get('/', CekToken, loggedIn);
router.get('/get-mahasiswa/:idUser', CekToken, loggedInMahasiswa)
router.get('/get-dosen/:idUser', CekToken, loggedInDosen)

router.get('/get-attempt-count', CekToken, getAttemptCountInMonth);
router.get('/get-blocked-ip', CekToken, getIpBlocked);
router.post('/unblock-ip', CekToken, unblockIp);
router.get('/blocked-ips', CekToken, getBlockedIps);


export default router;