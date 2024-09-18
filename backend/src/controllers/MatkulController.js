import Matkul from "../models/MatkulModels";

export const add = async (req, res) => {
  const matkul = req.body.matkul;
  const dosenPengajar = req.body.dosenPengajar;
  const prodi = req.body.prodi;
  const kodeMatkul = req.body.kodeMatkul;
  const rentanWaktu = req.body.rentanWaktu;

  if (matkul === "") {
    return res
      .status(500)
      .json({ message: "Mata kuliah tidak boleh kosong", success: false });
  } else if (dosenPengajar === "") {
    return res
      .status(500)
      .json({ message: "Dosen Pengajar tidak boleh kosong", success: false });
  } else if (kodeMatkul === "") {
    return res
      .status(500)
      .json({ message: "Kode Matkul tidak boleh kosong", success: false });
  } else {
    const cekKodeMatkul = await Matkul.count({
      where: { kodeMatkul: kodeMatkul },
    });

    if (cekKodeMatkul > 0) {
      return res
        .status(500)
        .json({ message: "Kode Matkul sudah ada", success: false });
    } else {
      try {
        await Matkul.create({
          matkul: matkul,
          dosenPengajar: dosenPengajar,
          prodi: prodi,
          kodeMatkul: kodeMatkul,
          rentanWaktu: rentanWaktu
        });

        return res
          .status(200)
          .json({ message: "Matkul berhasil ditambahkan", success: true });
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    }
  }
};

export const list = async (req, res) => {
  const prodi = req.query.prodi;

  console.log(prodi);

  try {
    const result = await Matkul.findAll({
      where: { prodi: prodi },
    });

    return res.status(200).json({ result: result });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const remove = async (req, res) => {
  const id = req.params.id;

  try {
    await Matkul.destroy({ where: { id: id } });

    return res
      .status(200)
      .json({ message: "Data berhasil dihapus", success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getTotal = async (req, res) => {
  const prodi = req.params.prodi;

  try{
    const result = await Matkul.count({ where: { prodi: prodi } })

    return res.status(200).json({ totalMatkul: result })
  }catch(err){
    return res.status(500).json({ message: err.message })
  }
}