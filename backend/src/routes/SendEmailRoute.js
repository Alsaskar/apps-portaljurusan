import express from "express";
import CekToken from "../middleware/CekToken";
import { sendEmail } from "../controllers/SendEmailController";

const router = express.Router();

router.post("/send-email", CekToken, sendEmail);

export default router;
