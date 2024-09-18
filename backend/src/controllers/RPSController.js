import Matkul from "../models/MatkulModels";
import { DetailRPS, RPS } from "../models/RPSModel";

// export const add = async (req, res) => {
//     const idDosen = req.body.idDosen;
//     const kodeMatkul = req.body.kodeMatkul;
//     const rumpunMatkul = req.body.rumpunMatkul;
//     const bobot = req.body.bobot;
//     const semester = req.body.semester;
//     const tanggalPenyusunan = req.body.tanggalPenyusunan;
//     const otorisasi = req.body.otorisasi;
//     const pembuatRp = req.body.pembuatRp;
//     const pengampuMatkul = req.body.pengampuMatkul;
//     const kordinatorMatkul = req.body.kordinatorMatkul;
//     const kordinatorProdi = req.body.kordinatorProdi;
//     const capaianPembelajaran = req.body.capaianPembelajaran;
//     const cpl = req.body.cpl;
//     const cpmk = req.body.cpmk;
//     const subCpmk = req.body.subCpmk;
//     const deskripsiMk = req.body.deskripsiMk;
//     const bahanKajian = req.body.bahanKajian;
//     const daftarPustaka = req.body.daftarPustaka;
//     const dosenPengampu = req.body.dosenPengampu;
//     const matkulPrasyarat = req.body.matkulPrasyarat;

//     // get nama matkul berdasarkan kode matkul
//     const matkul = await Matkul.findOne({ where: { kodeMatkul: kodeMatkul }, attributes: ['matkul', 'kodeMatkul'] })
//     const namaMatkul = matkul.dataValues.matkul;

//     if(kodeMatkul === matkul.dataValues.kodeMatkul){ // jika matkul sudah ada rps, maka tidak bisa
//         return res.status(500).json({ message: 'RPS pada Matkul yang Anda pilih sudah ada sebelumnya', success: false })
//     }else{
//         try{

//             await RPS.create({
//                 idDosen: idDosen,
//                 namaMatkul: namaMatkul,
//                 kodeMatkul: kodeMatkul,
//                 rumpunMatkul: rumpunMatkul,
//                 bobot: bobot,
//                 semester: semester,
//                 tanggalPenyusunan: tanggalPenyusunan,
//                 otorisasi: otorisasi,
//                 pembuatRp: pembuatRp,
//                 pengampuMatkul: pengampuMatkul,
//                 kordinatorMatkul: kordinatorMatkul,
//                 kordinatorProdi: kordinatorProdi,
//                 capaianPembelajaran: capaianPembelajaran,
//                 cpl: cpl,
//                 cpmk: cpmk,
//                 subCpmk: subCpmk,
//                 deskripsiMk: deskripsiMk,
//                 bahanKajian: bahanKajian,
//                 daftarPustaka: daftarPustaka,
//                 dosenPengampu: dosenPengampu,
//                 matkulPrasyarat: matkulPrasyarat,
//             })
    
//             return res.status(200).json({ message: 'Berhasil menambahkan RPS', success: true })
//         }catch(err){
//             return res.status(500).json({ message: err })
//         }
//     }
// }



export const add = async (req, res) => {
    const idDosen = req.body.idDosen;
    const kodeMatkul = req.body.kodeMatkul;
    const rumpunMatkul = req.body.rumpunMatkul;
    const bobot = req.body.bobot;
    const semester = req.body.semester;
    const tanggalPenyusunan = req.body.tanggalPenyusunan;
    const otorisasi = req.body.otorisasi;
    const pembuatRp = req.body.pembuatRp;
    const pengampuMatkul = req.body.pengampuMatkul;
    const kordinatorMatkul = req.body.kordinatorMatkul;
    const kordinatorProdi = req.body.kordinatorProdi;
    const capaianPembelajaran = req.body.capaianPembelajaran;
    const cpl = req.body.cpl;
    const cpmk = req.body.cpmk;
    const subCpmk = req.body.subCpmk;
    const deskripsiMk = req.body.deskripsiMk;
    const bahanKajian = req.body.bahanKajian;
    const daftarPustaka = req.body.daftarPustaka;
    const dosenPengampu = req.body.dosenPengampu;
    const matkulPrasyarat = req.body.matkulPrasyarat;

    try {
        // Cek apakah sudah ada RPS untuk kodeMatkul yang sama
        const existingRps = await RPS.findOne({ where: { kodeMatkul } });
        if (existingRps) {
            return res.status(400).json({ message: 'RPS pada Matkul yang Anda pilih sudah ada sebelumnya', success: false });
        }

        // Get nama matkul berdasarkan kode matkul
        const matkul = await Matkul.findOne({ where: { kodeMatkul }, attributes: ['matkul', 'kodeMatkul'] });
        if (!matkul) {
            return res.status(404).json({ message: 'Mata Kuliah tidak ditemukan', success: false });
        }

        const namaMatkul = matkul.dataValues.matkul;

        // Create RPS baru
        await RPS.create({
            idDosen: idDosen,
            namaMatkul: namaMatkul,
            kodeMatkul: kodeMatkul,
            rumpunMatkul: rumpunMatkul,
            bobot: bobot,
            semester: semester,
            tanggalPenyusunan: tanggalPenyusunan,
            otorisasi: otorisasi,
            pembuatRp: pembuatRp,
            pengampuMatkul: pengampuMatkul,
            kordinatorMatkul: kordinatorMatkul,
            kordinatorProdi: kordinatorProdi,
            capaianPembelajaran: capaianPembelajaran,
            cpl: cpl,
            cpmk: cpmk,
            subCpmk: subCpmk,
            deskripsiMk: deskripsiMk,
            bahanKajian: bahanKajian,
            daftarPustaka: daftarPustaka,
            dosenPengampu: dosenPengampu,
            matkulPrasyarat: matkulPrasyarat,
        });

        return res.status(200).json({ message: 'Berhasil menambahkan RPS', success: true });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


export const list = async (req, res) => {
    try{
        const rps = await RPS.findAll();

        return res.status(200).json({ result: rps })
    }catch(err){
        return res.status(500).json({ message: err })
    }
}

export const edit = async (req, res) => {
    const id = req.params.id;

    const kodeMatkul = req.body.kodeMatkul;
    const rumpunMatkul = req.body.rumpunMatkul;
    const bobot = req.body.bobot;
    const semester = req.body.semester;
    const tanggalPenyusunan = req.body.tanggalPenyusunan;
    const otorisasi = req.body.otorisasi;
    const pembuatRp = req.body.pembuatRp;
    const pengampuMatkul = req.body.pengampuMatkul;
    const kordinatorMatkul = req.body.kordinatorMatkul;
    const kordinatorProdi = req.body.kordinatorProdi;
    const capaianPembelajaran = req.body.capaianPembelajaran;
    const cpl = req.body.cpl;
    const cpmk = req.body.cpmk;
    const subCpmk = req.body.subCpmk;
    const deskripsiMk = req.body.deskripsiMk;
    const bahanKajian = req.body.bahanKajian;
    const daftarPustaka = req.body.daftarPustaka;
    const dosenPengampu = req.body.dosenPengampu;
    const matkulPrasyarat = req.body.matkulPrasyarat;

    // get nama matkul berdasarkan kode matkul
    const matkul = await Matkul.findOne({ where: { kodeMatkul: kodeMatkul }, attributes: ['matkul'] })
    const namaMatkul = matkul.dataValues.matkul;

    try{
        await RPS.update({
            namaMatkul: namaMatkul,
            kodeMatkul: kodeMatkul,
            rumpunMatkul: rumpunMatkul,
            bobot: bobot,
            semester: semester,
            tanggalPenyusunan: tanggalPenyusunan,
            otorisasi: otorisasi,
            pembuatRp: pembuatRp,
            pengampuMatkul: pengampuMatkul,
            kordinatorMatkul: kordinatorMatkul,
            kordinatorProdi: kordinatorProdi,
            capaianPembelajaran: capaianPembelajaran,
            cpl: cpl,
            cpmk: cpmk,
            subCpmk: subCpmk,
            deskripsiMk: deskripsiMk,
            bahanKajian: bahanKajian,
            daftarPustaka: daftarPustaka,
            dosenPengampu: dosenPengampu,
            matkulPrasyarat: matkulPrasyarat,
        }, {
            where: { id: id }
        })

        return res.status(200).json({ message: 'RPS berhasil di edit', success: true })
    }catch(err){
        return res.status(500).json({ message: err })
    }
}

export const remove = async (req, res) => {
    const id = req.params.id;

    try{
        await RPS.destroy({ where: { id: id } })

        return res.status(200).json({ message: 'RPS berhasil dihapus', success: true })
    }catch(err){
        return res.status(500).json({ message: err })
    }
}

export const detail = async (req, res) => {
    const id = req.params.id;

    try{
        const rps = await RPS.findOne({
            where: { id: id } 
        })

        return res.status(200).json({ result: rps })
    }catch(err){
        return res.status(500).json({ message: err })
    }
}

/* Detail RPS */

export const addDetail = async (req, res) => {
    const idRps = req.body.idRps;
    const mingguKe = req.body.mingguKe;
    const subCpmk = req.body.subCpmk;
    const bahanKajian = req.body.bahanKajian;
    const bentukMetode = req.body.bentukMetode;
    const estimasiWaktu = req.body.estimasiWaktu;
    const pengalamanBelajar = req.body.pengalamanBelajar;
    const kriteriaBentuk = req.body.kriteriaBentuk;
    const indikator = req.body.indikator;
    const bobot = req.body.bobot;

    try{
        await DetailRPS.create({
            idRps: idRps,
            mingguKe: mingguKe,
            subCpmk: subCpmk,
            bahanKajian: bahanKajian,
            bentukMetode: bentukMetode,
            estimasiWaktu: estimasiWaktu,
            pengalamanBelajar: pengalamanBelajar,
            kriteriaBentuk: kriteriaBentuk,
            indikator: indikator,
            bobot: bobot,
        })

        return res.status(200).json({ message: 'RPS Mingguan berhasil ditambahkan', success: true })
    }catch(err){
        return res.status(500).json({ message: err })
    }
}

export const editDetail = async (req, res) => {
    const id = req.params.id;

    const mingguKe = req.body.mingguKe;
    const subCpmk = req.body.subCpmk;
    const bahanKajian = req.body.bahanKajian;
    const bentukMetode = req.body.bentukMetode;
    const estimasiWaktu = req.body.estimasiWaktu;
    const pengalamanBelajar = req.body.pengalamanBelajar;
    const kriteriaBentuk = req.body.kriteriaBentuk;
    const indikator = req.body.indikator;
    const bobot = req.body.bobot;

    try{
        await DetailRPS.update({
            mingguKe: mingguKe,
            subCpmk: subCpmk,
            bahanKajian: bahanKajian,
            bentukMetode: bentukMetode,
            estimasiWaktu: estimasiWaktu,
            pengalamanBelajar: pengalamanBelajar,
            kriteriaBentuk: kriteriaBentuk,
            indikator: indikator,
            bobot: bobot,
        }, { where: { id: id } })

        return res.status(200).json({ message: 'RPS Mingguan berhasil di edit', success: true })
    }catch(err){
        return res.status(500).json({ message: err })
    }
}

export const removeDetail = async (req, res) => {
    const id = req.params.id;

    try{
        await DetailRPS.destroy({
            where: { id: id }
        })

        return res.status(200).json({ message: 'RPS Mingguan berhasil di hapus', success: true })
    }catch(err){
        return res.status(500).json({ message: err })
    }
}

export const detailMingguan = async (req, res) => {
    const idRps = req.params.idRps;

    try{
        const rps = await DetailRPS.findAll({
            where: { idRps: idRps } 
        })

        return res.status(200).json({ result: rps })
    }catch(err){
        return res.status(500).json({ message: err })
    }
}

/* Approve & Reject */
export const approve = async (req, res) => {
    const id = req.params.id; // id rps
    const status = req.body.status;
    
    try{
        await RPS.update({
            status: status
        }, {
            where: { id: id }
        })

        return res.status(200).json({ message: 'RPS berhasil di setujui', success: true })
    }catch(err){
        return res.status(500).json({ message: err })
    }
}

export const reject = async (req, res) => {
    const id = req.params.id; // id rps
    const ketTolak = req.body.ketTolak;
    const status = req.body.status;
    
    try{
        await RPS.update({
            status: status,
            ketTolak: ketTolak
        }, {
            where: { id: id }
        })

        return res.status(200).json({ message: 'RPS di tolak', success: true })
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}