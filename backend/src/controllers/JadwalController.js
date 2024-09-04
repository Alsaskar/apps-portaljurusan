import Jadwal from "../models/JadwalModel";
import Kelas from "../models/KelasModel";
import Matkul from "../models/MatkulModels";

export const add = async (req, res) => {
    const prodiAdmin = req.body.prodiAdmin;
    const idMatkul = req.body.idMatkul;
    const idKelas = req.body.idKelas;
    const hari = req.body.hari;
    const ruangan = req.body.ruangan;
    const jamMulai = req.body.jamMulai;
    const jamSelesai = req.body.jamSelesai;

    try{
        await Jadwal.create({
            prodiAdmin: prodiAdmin,
            idMatkul: idMatkul,
            idKelas: idKelas,
            hari: hari,
            ruangan: ruangan,
            jamMulai: jamMulai,
            jamSelesai: jamSelesai
        })

        return res.status(200).json({ message: 'Berhasil menambahkan jadwal', success: true })
    }catch(err){
        return res.status(500).json({ message: err.message })
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