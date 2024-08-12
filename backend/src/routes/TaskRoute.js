import express from "express";
import CekToken from "../middleware/CekToken";
import {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} from "../controllers/TaskController";

const router = express.Router();

router.get("/:idMahasiswa", CekToken, getTasks);
router.post("/create-task", CekToken, createTask);
router.put("/update-task/:id", CekToken, updateTaskStatus);
router.delete("/delete-task/:id", CekToken, deleteTask);

export default router;
