import express from "express";
import CekToken from "../middleware/CekToken";
import {
  add,
  getByName,
  list,
  remove
} from "../controllers/KelasController";

const router = express.Router();

router.post("/", CekToken, add);

router.get("/", CekToken, list);
router.get("/:namaKelas", CekToken, getByName);

router.delete("/:id", CekToken, remove);

export default router;
