import express from "express";
import CekToken from "../middleware/CekToken";
import {
  add,
  addDetail,
  approve,
  detail,
  detailMingguan,
  edit,
  editDetail,
  list,
  reject,
  remove,
  removeDetail
} from "../controllers/RPSController";

const router = express.Router();

router.post("/", CekToken, add);
router.post("/mingguan", CekToken, addDetail);

router.get("/", CekToken, list);
router.get("/:id", CekToken, detail);
router.get("/mingguan/:idRps", CekToken, detailMingguan);

router.put("/:id", CekToken, edit);
router.put("/mingguan/:id", CekToken, editDetail);

router.put("/approve/:id", CekToken, approve);
router.put("/reject/:id", CekToken, reject);

router.delete("/:id", CekToken, remove);
router.delete("/mingguan/:id", CekToken, removeDetail);

export default router;
