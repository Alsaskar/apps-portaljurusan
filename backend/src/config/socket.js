import { Server } from "socket.io";
import moment from 'moment'; // Pastikan moment sudah terpasang
import { saveMessage, deleteMessage } from "../controllers/ChatController.js";

const userSocketMap = {}; // Map user ID to socket ID

function setupSocket(server) {
  const io = new Server(server, {
    transports: ["websocket"],
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Register the user's socket ID
    socket.on("register", (userId) => {
      userSocketMap[userId] = socket.id;
    });

    // Handle sending messages
    socket.on("sendMessage", async (data, callback) => {
      console.log("Send message event received:", data);
    
      try {
        const { senderId, recipientId, senderRole, recipientRole, message } = data;
        const newMessage = await saveMessage(senderId, recipientId, senderRole, recipientRole, message);
    
        // Log for debugging
        console.log("Message saved, emitting to clients:", newMessage);
    
        const timestamp = moment(newMessage.timestamp).format('YYYY-MM-DDTHH:mm:ss');
    
        // Emit the new message to the sender and recipient
        const recipientSocketId = userSocketMap[recipientId];
        const senderSocketId = userSocketMap[senderId];
        
        if (recipientSocketId) {
          io.to(recipientSocketId).emit("receiveMessage", {
            id: newMessage.id,
            senderId,
            recipientId,
            message,
            timestamp,
            senderRole
          });
        }
    
        if (senderSocketId) {
          io.to(senderSocketId).emit("receiveMessage", {
            id: newMessage.id,
            senderId,
            recipientId,
            message,
            timestamp,
            senderRole
          });
        }
    
        callback({ success: true, id: newMessage.id });
      } catch (error) {
        console.error("Error handling sendMessage event:", error);
        callback({ success: false, message: error.message });
      }
    });
    

    // Handle deleting messages
    socket.on("deleteMessage", async (messageId, callback) => {
      try {
        const result = await deleteMessage(messageId);
        if (result.success) {
          io.emit("deleteMessage", messageId); // Notify all clients
          callback({ success: true });
        } else {
          callback({ success: false, message: "Message not found" });
        }
      } catch (error) {
        console.error("Error handling deleteMessage event:", error);
        callback({ success: false });
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      for (const [userId, socketId] of Object.entries(userSocketMap)) {
        if (socketId === socket.id) {
          delete userSocketMap[userId];
          break;
        }
      }
    });
  });

  return io;
}

export default setupSocket;
