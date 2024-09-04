import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import requestIp from "request-ip";
import { notifyUpcomingEvents } from "./controllers/HimajuController";
import { deleteOldMessages } from "./controllers/ChatController.js";
import setupSocket from "./config/socket";
import cron from "node-cron";

dotenv.config();

// Routers
import Auth from "./routes/AuthRoute";
import Mahasiswa from "./routes/MahasiswaRoute";
import Dosen from "./routes/DosenRoute";
import Bimbingan from "./routes/BimbinganRoute";
import Himaju from "./routes/HimajuRoute";
import SendEmail from "./routes/SendEmailRoute";
import Task from "./routes/TaskRoute";
import Galeri from "./routes/GaleriRoute";
import EvaluasiMahasiswa from "./routes/EvaluasiMahasiswaRoute";
import Chat from "./routes/ChatRoute";
import DosenSignature from "./routes/DosenSignatureRoute";
import Kelas from "./routes/KelasRoute";
import Matkul from "./routes/MatkulRoute";
import Jadwal from "./routes/JadwalRoute";

const app = express();
const server = http.createServer(app);
const io = setupSocket(server);

app.use(requestIp.mw());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

// socket route
app.get("/", (req, res) => {
  res.send("Socket.io chat server is running!");
});

app.use(
  "/img-mahasiswa",
  express.static(path.join(__dirname, "assets/img/mahasiswa"))
);
app.use("/img-dosen", express.static(path.join(__dirname, "assets/img/dosen")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configure Routes
app.use("/api/v1/auth", Auth);
app.use("/api/v1/mahasiswa", Mahasiswa);
app.use("/api/v1/dosen", Dosen);
app.use("/api/v1/bimbingan", Bimbingan);
app.use("/api/v1/evaluasimahasiswa", EvaluasiMahasiswa);
app.use("/api/v1/himaju", Himaju);
app.use("/api/v1/email", SendEmail);
app.use("/api/v1/tasks", Task);
app.use("/api/v1/galeri", Galeri);
app.use("/api/v1/chat", Chat);
app.use("/api/v1/kelas", Kelas);
app.use("/api/v1/dosensignature", DosenSignature);
app.use('/api/v1/matkul', Matkul);
app.use('/api/v1/jadwal', Jadwal);

// Jadwalkan notifikasi setiap 1 jam
setInterval(notifyUpcomingEvents, 60 * 60 * 1000);

// Jadwalkan job untuk setiap tengah malam
cron.schedule("0 0 * * *", async () => {
  console.log("Cron job running: Deleting messages older than 20 days.");
  try {
    const result = await deleteOldMessages();
    console.log(`Cron job completed: Deleted ${result} old messages.`);
  } catch (error) {
    console.error("Error during cron job:", error);
  }
});

server.listen(process.env.PORT_APP);