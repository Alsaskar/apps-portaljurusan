import express from "express";
import CekToken from "../middleware/CekToken";
import {
  add,
  list,
  remove,
  getByDay,
  listDosen,
  listDosenByLab
} from "../controllers/JadwalController";

const router = express.Router();

router.post("/", CekToken, add);

router.get("/", CekToken, list);
router.get("/list-dosen", CekToken, listDosen);
router.get("/list-dosen-lab", CekToken, listDosenByLab);
router.get('/:hari', CekToken, getByDay)

router.delete("/:id", CekToken, remove);

export default router;
