import { Op } from "sequelize";
import { Mahasiswa } from "../models/MahasiswaModel";
import Bimbingan from "../models/BimbinganModel";
import { Dosen } from "../models/DosenModel";

// data untuk memilih mahasiswa
export const listChooseStudent = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const search = req.query.search || '';
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    const adminProdi = req.query.adminProdi;

    try{
        const students = await Mahasiswa.findAndCountAll({
            where: {
                prodi: adminProdi,
                [Op.or]: [
                    { fullname: { [Op.like]: `%${search}%` } },
                    { nim: { [Op.like]: `%${search}%` } }
                ]
            },
            offset,
            limit,
            order: [['fullname', 'ASC']]
        })

        res.status(200).json({
            result: students
        })
    }catch(err){
        res.status(500).json({ message: err.message })
    }
}

// data untuk memilih mahasiswa
export const listChooseDosen = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const search = req.query.search || '';
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    const adminProdi = req.query.adminProdi;

    try{
        const dosen = await Dosen.findAndCountAll({
            where: {
                prodi: adminProdi,
                [Op.or]: [
                    { fullname: { [Op.like]: `%${search}%` } },
                    { nip: { [Op.like]: `%${search}%` } }
                ]
            },
            offset,
            limit,
            order: [['fullname', 'ASC']]
        })

        res.status(200).json({
            result: dosen
        })
    }catch(err){
        res.status(500).json({ message: err.message })
    }
}

// langkah pertama untuk bimbingan
// jika admin telah memilih mahasiswa, maka akan di input mahasiswa
// export const nextStudent = async (req, res) => {
//     const idMahasiswa = req.body.idMahasiswa;

//     try{
//         await Bimbingan.create({
//             idMahasiswa: idMahasiswa
//         })

//         return res.status(200).json({ success: true })
//     }catch(err){
//         return res.status(500).json({ message: err.message })
//     }
// }

export const add = async (req, res) => {
    const idMahasiswa = req.body.idMahasiswa;
    const idDosen = req.body.idDosen;

    try{
        await Bimbingan.create({
            idMahasiswa: idMahasiswa,
            idDosen: idDosen
        })

        return res.status(200).json({ message: 'Berhasil menambahkan Dospem', success: true })
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}

export const list = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search;
    const offset = limit * page;
    const adminProdi = req.query.adminProdi;

    const totalBimbingan = await Bimbingan.count({
        include: [
            {
                model: Mahasiswa,
                where: {
                    prodi: adminProdi,
                    [Op.or]: [
                        { fullname: { [Op.substring]: `${search}` } },
                    ]
                },
            }
        ]
    })
    const totalRows = totalBimbingan;
    const totalPage = Math.ceil(totalRows/limit);

    try{
        const bimbingan = await Bimbingan.findAll({
            include: [
                {
                    model: Mahasiswa,
                    where: {
                        prodi: adminProdi,
                        [Op.or]: [
                            { fullname: { [Op.substring]: `${search}` } },
                        ]
                    },
                },
                {
                    model: Dosen
                }
            ],
            order: [ ['id', 'desc'] ],
            offset: offset,
            limit: limit,
        })

        return res.status(200).json({
            result: bimbingan,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage
        })
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}

export const remove = async (req, res) => {
    const id = req.params.id;

    try{
        await Bimbingan.destroy({ where: { id: id } })

        return res.status(200).json({ message: 'Data berhasil dihapus', success: true })
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}