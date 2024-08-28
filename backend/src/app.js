import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

import { notifyUpcomingEvents } from './controllers/HimajuController';

// Router
import Auth from './routes/AuthRoute';
import Mahasiswa from './routes/MahasiswaRoute';
import Dosen from './routes/DosenRoute';
import Bimbingan from './routes/BimbinganRoute';
import Himaju from './routes/HimajuRoute';
import SendEmail from './routes/SendEmailRoute';
import Task from './routes/TaskRoute';
import Galeri from './routes/GaleriRoute';
import Kelas from './routes/KelasRoute';

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
}))

app.use('/img-mahasiswa', express.static('assets/img/mahasiswa'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure Route
app.use('/api/v1/auth', Auth);
app.use('/api/v1/mahasiswa', Mahasiswa);
app.use('/api/v1/dosen', Dosen);
app.use('/api/v1/bimbingan', Bimbingan);
app.use('/api/v1/himaju', Himaju);
app.use('/api/v1/email', SendEmail);
app.use('/api/v1/tasks', Task);
app.use('/api/v1/galeri', Galeri);
app.use('/api/v1/kelas', Kelas);

// Jadwalkan notifikasi setiap 1 jam
setInterval(notifyUpcomingEvents, 60 * 60 * 1000);

server.listen(process.env.PORT_APP);