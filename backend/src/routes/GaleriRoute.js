import express from 'express';
import CekToken from '../middleware/CekToken';
import upload from "../config/multer";
import {
  createGaleri,
  listGaleri,
  deleteGaleri,
} from '../controllers/GaleriController';

const router = express.Router();

router.post('/', upload.single("foto"), CekToken, createGaleri);
router.get('/', CekToken, listGaleri);
router.delete('/:id', CekToken, deleteGaleri);

export default router;