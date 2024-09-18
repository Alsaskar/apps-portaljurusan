import Jadwal from "../models/JadwalModel";
import Kelas from "../models/KelasModel";
import Matkul from "../models/MatkulModels";
import moment from 'moment';
import { Op } from "sequelize";

export const add = async (req, res) => {
    const prodiAdmin = req.body.prodiAdmin;
    const idMatkul = req.body.idMatkul;
    const idKelas = req.body.idKelas;
    const hari = req.body.hari;
    const ruangan = req.body.ruangan;
    const jamMulai = req.body.jamMulai;
    const dosenPengajar = req.body.dosenPengajar;

    const start = moment(jamMulai, 'HH:mm')
    const end = start.clone().add(60, 'minutes')

    if(idMatkul === ''){
        return res.status(500).json({ message: 'Mata kuliah tidak boleh kosong', success: false })
    }else if(idKelas === ''){
        return res.status(500).json({ message: 'Kelas tidak boleh kosong', success: false })
    }else if(hari === ''){
        return res.status(500).json({ message: 'Kelas tidak boleh kosong', success: false })
    }else if(ruangan === ''){
        return res.status(500).json({ message: 'Ruangan tidak boleh kosong', success: false })
    }else if(jamMulai === ''){
        return res.status(500).json({ message: 'Jam Mulai tidak boleh kosong', success: false })
    }else{

        // cek data matkul, kelas, hari, ruangan
        // jika sama tidak bisa di input
        const cekMatkul = await Jadwal.count({ where: { idMatkul: idMatkul } })
        const cekKelas = await Jadwal.count({ where: { idKelas: idKelas } })
        const cekHari = await Jadwal.count({ where: { hari: hari } })
        const cekRuangan = await Jadwal.count({ where: { ruangan: ruangan } })
        const cekDosenPengajar = await Jadwal.count({ where: { dosenPengajar: dosenPengajar } })
        const cekJamMulai = await Jadwal.count({ where: { jamMulai: jamMulai } })

        if(cekMatkul > 0 && cekKelas > 0 && cekHari > 0 && cekRuangan > 0 && cekDosenPengajar > 0){
            return res.status(500).json({ message: 'Jadwal sudah ada', success: false })
        }else{

            if(cekDosenPengajar > 0 && cekKelas > 0 && cekHari > 0 && cekRuangan > 0){
                return res.status(500).json({ message: 'Jadwal tidak bisa dibuat, karena dosen telah mengajar di ruangan lain', success: false })
            }else{
                try{
                    await Jadwal.create({
                        prodiAdmin: prodiAdmin,
                        idMatkul: idMatkul,
                        idKelas: idKelas,
                        hari: hari,
                        ruangan: ruangan,
                        jamMulai: start.format('HH:mm'),
                        jamSelesai: end.format('HH:mm'),
                        dosenPengajar: dosenPengajar
                    })
            
                    return res.status(200).json({ message: 'Berhasil menambahkan jadwal', success: true })
                }catch(err){
                    return res.status(500).json({ message: err.message })
                }
            }
        }
    }
}

export const list = async (req, res) => {
    const prodi = req.query.prodi;

    try{
        const result = await Jadwal.findAll({
            where: { prodiAdmin: prodi },
            include: [
                {
                  model: Matkul,
                },
                {
                    model: Kelas
                }
            ],
        })

        return res.status(200).json({ result: result })
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}

export const remove = async (req, res) => {
    const id = req.params.id;

    try {
        await Jadwal.destroy({ where: { id: id } });

        return res.status(200).json({ message: "Data berhasil dihapus", success: true });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const getByDay = async (req, res) => {
    const hari = req.params.hari;
    const kelas = req.query.kelas;

    try{
        const result = await Jadwal.findAll({
            where: { hari: hari, idKelas: kelas },
            include: [
                {
                  model: Matkul,
                },
                {
                    model: Kelas
                }
            ],
        })

        return res.status(200).json({ result: result })
    }catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// list jadwal berdasarkan dosen
export const listDosen = async (req, res) => {
    const dosenPengajar = req.query.dosenPengajar;
    const hari = req.query.hari;

    try{
        const result = await Jadwal.findAll({
            where: { dosenPengajar: dosenPengajar, hari: hari },
            include: [
                {
                  model: Matkul,
                },
                {
                    model: Kelas
                }
            ],
        })

        return res.status(200).json({ result: result })
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}

// tampilkan jadwal pada dosen berdasarkan lab
export const listDosenByLab = async (req, res) => {
    const hari = req.query.hari;
    const lab = req.query.lab;

    try{
        const result = await Jadwal.findAll({
            where: { hari: hari, ruangan: lab },
            include: [
                {
                  model: Matkul,
                },
                {
                    model: Kelas
                }
            ],
        })

        return res.status(200).json({ result: result })
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}