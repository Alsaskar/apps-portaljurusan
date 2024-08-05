import { Mahasiswa } from "../models/MahasiswaModel";
import { Himaju, ProfilHimaju, ProkerHimaju } from "../models/HimajuModel";
import { Op } from "sequelize";

// jadikan mahasiswa sebagai himaju
export const add = async (req, res) => {
    const idMahasiswa = req.body.idMahasiswa;
    const fullname = req.body.fullname;
    const status = req.body.status;

    try{
        if(status === 'dikeluarkan'){
            // jika mahasiswa yang telah dikeluarkan dan daftar kembali
            // maka statusnya jadi pending
            await Himaju.update({
                status: 'pending',
            }, {
                where: {
                    idMahasiswa: idMahasiswa
                }
            })
    
            return res.status(200).json({message: 'Berhasil mendaftar himaju. Menunggu proses persetujuan.', success: true})
        }else{
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
        },
        include: {
            model: Mahasiswa,
            where: {
                [Op.or]: [
                    { statusHimaju: 'anggota_pasif' },
                    { statusHimaju: 'anggota_aktif' },
                ]
            }
        },
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
            include: {
                model: Mahasiswa,
                where: {
                    [Op.or]: [
                        { statusHimaju: 'anggota_pasif' },
                        { statusHimaju: 'anggota_aktif' },
                    ]
                }
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
        }else if(status === 'dikeluarkan'){
            await Mahasiswa.update({
                statusHimaju: 'anggota_pasif'
            }, {
                where: { id: idMahasiswa }
            })

            return res.status(200).json({message: 'Dikeluarkan sebagai Anggota Himaju', success: true})
        }
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}

export const addProfil = async (req, res) => {
    const { visi, misi, deskripsi } = req.body;

    try {
        // Periksa tabel sudah ada data
        const existingProfile = await ProfilHimaju.findOne();

        if (existingProfile) {
            // Jika sudah ada data, kirim pesan bahwa data sudah ada
            return res.status(400).json({ message: 'Data sudah ada', success: false });
        } else {
            // Jika belum ada data, tambahkan profil baru
            await ProfilHimaju.create({ 
                visi: visi,
                misi: misi,
                deskripsi: deskripsi
            });

            return res.status(200).json({ message: 'Berhasil menambahkan Profil HME', success: true });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const getProfil = async (req, res) => {
    try {
        const profil = await ProfilHimaju.findOne();
        if (!profil) {
            return res.status(200).json({ message: "Data not found" });
        }
        return res.status(200).json({ profil });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
 
export const cekStatus = async (req, res) => {
    const idMahasiswa = req.params.idMahasiswa;

    try {
        // Cari data himaju berdasarkan idMahasiswa
        const himaju = await Himaju.findOne({
            where: { idMahasiswa: idMahasiswa }
        });

        if (!himaju) {
            return res.status(404).json({ message: 'Data himaju tidak ditemukan', success: false });
        }

        return res.status(200).json({
            message: 'Status ditemukan',
            status: himaju.status,
            success: true
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// hapus visi, misi, deskripsi
export const deleteProfil = async (req, res) => {
    const id = req.params.id;

    try{
        await ProfilHimaju.destroy({ where: { id: id } })

        return res.status(200).json({ message: 'Data berhasil dihapus', success: true })
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

// tambahkan proker atau kegiatan
export const addProker = async (req, res) => {
    const namaKegiatan = req.body.namaKegiatan;
    const description = req.body.description;
    const tglPelaksanaan = req.body.tglPelaksanaan;
    const jamMulai = req.body.jamMulai;
    const jamSelesai = req.body.jamSelesai;
    const lokasi = req.body.lokasi;

    try{
        await ProkerHimaju.create({
            namaKegiatan: namaKegiatan,
            description: description,
            tglPelaksanaan: tglPelaksanaan,
            jamMulai: jamMulai,
            jamSelesai: jamSelesai,
            lokasi: lokasi
        })

        if(namaKegiatan === ''){
            return res.status(500).json({ message: 'Nama Kegiatan masih kosong', success: false })
        }else if(description === ''){
            return res.status(500).json({ message: 'Deskripsi masih kosong', success: false })
        }else if(tglPelaksanaan === ''){
            return res.status(500).json({ message: 'Tanggal Pelaksanaan masih kosong', success: false })
        }else if(jamMulai === ''){
            return res.status(500).json({ message: 'Jam Mulai masih kosong', success: false })
        }else if(jamSelesai === ''){
            return res.status(500).json({ message: 'Jam Selesai masih kosong', success: false })
        }else if(lokasi === ''){
            return res.status(500).json({ message: 'Deskripsi masih kosong', success: false })
        }else{
            return res.status(200).json({ message: 'Berhasil tambahkan Program Kerja', success: true })
        }
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

export const listProker = async (req, res) => {
    try{
        const result = await ProkerHimaju.findAll()

        return res.status(200).json({ result: result })
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

export const deleteProker = async (req, res) => {
    const id = req.params.id;

    try{
        await ProkerHimaju.destroy({
            where: { id: id }
        })
        
        return res.status(200).json({ message: 'Program Kerja berhasil dihapus', success: true })
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}