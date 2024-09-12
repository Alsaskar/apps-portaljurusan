import { RPS } from "../models/RPSModel";

export const add = async (req, res) => {
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

    try{

        await RPS.create({
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
        })

        return res.status(200).json({ message: 'Berhasil menambahkan RPS', success: true })
    }catch(err){
        return res.status(500).json({ message: err })
    }
}