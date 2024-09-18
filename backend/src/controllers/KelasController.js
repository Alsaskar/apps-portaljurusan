import Kelas from "../models/KelasModel";

export const add = async (req, res) => {
    const namaKelas = req.body.namaKelas;
    const prodi = req.body.prodi;

    if(namaKelas === ''){
        return res.status(500).json({ message: 'Kelas tidak boleh kosong', success: false })
    }else{
        await Kelas.create({
            namaKelas: namaKelas,
            prodi: prodi
        })

        return res.status(200).json({ message: 'Berhasil menambahkan kelas baru', success: true })
    }
}

export const list = async (req, res) => {
    const prodi = req.query.prodi;

    console.log(prodi)
    
    try{
        const dataKelas = await Kelas.findAll({
            where: { prodi: prodi }
        });

        return res.status(200).json({ result: dataKelas })
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}

export const getByName = async (req, res) => {
    const namaKelas = req.params.namaKelas;

    try{
        const dataKelas = await Kelas.findAll({
            where: { namaKelas: namaKelas }
        });

        return res.status(200).json({ result: dataKelas })
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}

export const remove = async (req, res) => {
    const id = req.params.id;

    try{
        await Kelas.destroy({
            where: {
                id: id
            }
        });

        return res.status(200).json({ message: 'Kelas berhasil dihapus', success: false })
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}