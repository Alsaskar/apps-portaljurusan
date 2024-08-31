import Jadwal from "../models/JadwalModel";

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