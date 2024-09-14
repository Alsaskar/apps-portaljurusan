import express from "express";
import CekToken from "../middleware/CekToken";
import {
  add,
  detail,
  edit,
  list,
  remove
} from "../controllers/RPSController";

const router = express.Router();

router.post("/", CekToken, add);

router.get("/", CekToken, list);
router.get("/:id", CekToken, detail);

router.put("/:id", CekToken, edit);

router.delete("/:id", CekToken, remove);

export default router;
