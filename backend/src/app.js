import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

// Router
import Auth from './routes/AuthRoute';
import Mahasiswa from './routes/MahasiswaRoute';
import Dosen from './routes/DosenRoute';
import Bimbingan from './routes/BimbinganRoute';
import Himaju from './routes/HimajuRoute';

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

// app.use('/img-pendonor', express.static('images/pendonor'));
app.use('/img-mahasiswa', express.static('assets/img/mahasiswa'));

// Configure Route
app.use('/api/v1/auth', Auth);
app.use('/api/v1/mahasiswa', Mahasiswa);
app.use('/api/v1/dosen', Dosen);
app.use('/api/v1/bimbingan', Bimbingan);
app.use('/api/v1/himaju', Himaju);

server.listen(process.env.PORT_APP);