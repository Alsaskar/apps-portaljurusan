import express from "express";
import CekToken from "../middleware/CekToken";
import {
  add,
  list,
  remove
} from "../controllers/MatkulController";

const router = express.Router();

router.post("/", CekToken, add);
router.get("/", CekToken, list);

router.delete("/:id", CekToken, remove);

export default router;
