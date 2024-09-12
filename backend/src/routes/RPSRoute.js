import express from "express";
import CekToken from "../middleware/CekToken";
import {
  add
} from "../controllers/RPSController";

const router = express.Router();

router.post("/", CekToken, add);

export default router;
