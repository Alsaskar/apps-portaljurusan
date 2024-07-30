import { Mahasiswa } from "../models/MahasiswaModel";
import { Himaju, ProfilHimaju } from "../models/HimajuModel";
import { Op } from "sequelize";

// jadikan mahasiswa sebagai himaju
export const add = async (req, res) => {
    const idMahasiswa = req.body.idMahasiswa;
    const fullname = req.body.fullname;
    const status = req.body.status;

    try{
        const cekData = await Himaju.count({where: {
            idMahasiswa: idMahasiswa,
            [Op.or]: [
                { status: 'terima' },
                { status: 'pending' },
            ]
        }})

        if(cekData > 0){ // tidak bisa daftar himaju jika telah daftar
            return res.status(500).json({message: 'Anda telah mendaftar himaju sebelumnya', success: false})
        }else{
            await Himaju.create({
                idMahasiswa: idMahasiswa,
                fullname: fullname,
                status: status,
            })
    
            return res.status(200).json({message: 'Berhasil mendaftar himaju. Menunggu proses persetujuan.', success: true})
        }
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
    
}

export const list = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search;
    const offset = limit * page;

    const totalHimaju = await Himaju.count({
        where: {
            [Op.or]: [
                { fullname: { [Op.substring]: `${search}` } },
                { status: { [Op.substring]: `${search}` } },
            ]
        }
    })
    const totalRows = totalHimaju;
    const totalPage = Math.ceil(totalRows/limit);

    try{
        const dataHimaju = await Himaju.findAll({
            where: {
                [Op.or]: [
                    { fullname: { [Op.substring]: `${search}` } },
                    { status: { [Op.substring]: `${search}` } },
                ]
            },
            order: [ ['id', 'desc'] ],
            offset: offset,
            limit: limit,
        })

        return res.status(200).json({
            result: dataHimaju,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage
        })
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}

export const updateStatus = async (req, res) => {
    const idMahasiswa = req.params.idMahasiswa;
    const status = req.body.status;

    try{
        await Himaju.update({
            status: status
        }, {
            where: { idMahasiswa: idMahasiswa }
        })

        if(status === 'terima'){
            await Mahasiswa.update({
                statusHimaju: 'anggota_aktif'
            }, {
                where: { id: idMahasiswa }
            })

            return res.status(200).json({message: 'Diterima sebagai Anggota Himaju', success: true})
        }else if(status === 'ditolak'){
            return res.status(200).json({message: 'Ditolak sebagai Anggota Himaju', success: true})
        }
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}

export const addProfil = async (req, res) => {
    const visi = req.body.visi;
    const misi = req.body.misi;
    const deskripsi = req.body.deskripsi;

    try{
        await ProfilHimaju.create({
            visi: visi,
            misi: misi,
            deskripsi: deskripsi
        })

        return res.status(200).json({message: 'Berhasil menambahkan Profil HME', success: true})
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}