import express from 'express';
import CekToken from '../middleware/CekToken';
import { loggedIn, login } from '../controllers/AuthController';

const router = express.Router();

router.post('/login', login);
router.get('/', CekToken, loggedIn);

export default router;