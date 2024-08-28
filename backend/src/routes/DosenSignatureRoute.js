import express from "express";
import CekToken from "../middleware/CekToken";
import {
  createSignature,
  getSignatureByDosen,
  deleteSignature,
} from "../controllers/DosenSignatureController";

const router = express.Router();

router.post("/", CekToken, createSignature);
router.get("/:idDosen/:idMahasiswa", CekToken, getSignatureByDosen);
router.delete('/:idDosen/:idMahasiswa', CekToken, deleteSignature);


export default router;
