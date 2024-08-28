import express from "express";
import {
  getMessagesDosen,
  getMessagesMahasiswa,
  deleteMessage,
} from "../controllers/ChatController";
import CekToken from "../middleware/CekToken"; // Pastikan path ke middleware benar

const router = express.Router();

// Endpoint untuk mendapatkan pesan chat
router.get("/messages/:senderId/:recipientId", CekToken, async (req, res) => {
  const { senderId, recipientId } = req.params;
  try {
    const messages = await getMessagesDosen(senderId, recipientId);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
  }
});
router.get(
  "/messages/dosen/:senderId/:recipientId",
  CekToken,
  async (req, res) => {
    const { senderId, recipientId } = req.params;
    try {
      const messages = await getMessagesMahasiswa(senderId, recipientId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Error fetching messages" });
    }
  }
);

router.delete('/messages/:id', CekToken, async (req, res) => {
  try {
    const { id } = req.params;
    await deleteMessage(id);
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting message' });
  }
});

export default router;
