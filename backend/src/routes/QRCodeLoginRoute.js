import express from "express";
import CekToken from "../middleware/CekToken";
import {
  loginWithQRCode,
  generateQRCode,
} from "../controllers/QrCodeLoginController";

const router = express.Router();

router.get('/generate-qr-code', CekToken, generateQRCode);

router.post('/login-with-qr-code', loginWithQRCode);

export default router;
