import bcrypt from "bcrypt";
import { validateEmail, validateNumberPhone } from "../config/hooks";
import { Mahasiswa, DetailMahasiswa } from "../models/MahasiswaModel";
import User from "../models/UserModel";
import { Op } from "sequelize";

export const add = async (req, res) => {
  // User - data login
  const email = req.body.email;
  const noHp = req.body.noHp;
  const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

  // Mahasiswa
  const fullname = req.body.fullname;
  const nim = req.body.nim;
  const jenisKelamin = req.body.jenisKelamin;
  const kotaLahir = req.body.kotaLahir;
  const tglLahir = req.body.tglLahir;
  const agama = req.body.agama;
  const alamatTerakhir = req.body.alamatTerakhir;
  const kota = req.body.kota;
  const kodePos = req.body.kodePos;
  const angkatan = req.body.angkatan;
  const noTestMasuk = req.body.noTestMasuk;
  const tglTerdaftar = req.body.tglTerdaftar;
  const statusMasukPt = req.body.statusMasukPt;
  const jurusan = req.body.jurusan;
  const prodi = req.body.prodi;

  if (fullname === "") {
    return res
      .status(500)
      .json({ message: "Nama Lengkap tidak boleh kosong", success: false });
  } else if (nim === "") {
    return res
      .status(500)
      .json({ message: "NIM tidak boleh kosong", success: false });
  } else if (jenisKelamin === "") {
    return res
      .status(500)
      .json({ message: "Jenis Kelamin tidak boleh kosong", success: false });
  } else if (kotaLahir === "") {
    return res
      .status(500)
      .json({ message: "Kota Lahir tidak boleh kosong", success: false });
  } else if (tglLahir === "") {
    return res
      .status(500)
      .json({ message: "Tanggal Lahir tidak boleh kosong", success: false });
  } else if (agama === "") {
    return res
      .status(500)
      .json({ message: "Agama tidak boleh kosong", success: false });
  } else if (kota === "") {
    return res
      .status(500)
      .json({ message: "Kota tidak boleh kosong", success: false });
  } else if (angkatan === "") {
    return res
      .status(500)
      .json({ message: "Angkatan tidak boleh kosong", success: false });
  } else if (tglTerdaftar === "") {
    return res
      .status(500)
      .json({
        message: "Tanggal Terdaftar tidak boleh kosong",
        success: false,
      });
  } else if (jurusan === "") {
    return res
      .status(500)
      .json({ message: "Jurusan tidak boleh kosong", success: false });
  } else if (prodi === "") {
    return res
      .status(500)
      .json({ message: "Prodi tidak boleh kosong", success: false });
  } else {
    if (validateEmail(email)) {
      // jika email valid
      if (validateNumberPhone(noHp)) {
        // jika nomor telefon valid

        const cekNoHp = await User.count({ where: { noHp: noHp } });
        const cekNim = await Mahasiswa.count({ where: { nim: nim } });
        const cekEmail = await User.count({ where: { email: email } });

        if (cekNoHp > 0) {
          return res.status(500).json({ message: "No HP telah terdaftar" });
        } else {
          if (cekNim > 0) {
            return res.status(500).json({ message: "NIM telah terdaftar" });
          } else {
            if (cekEmail > 0) {
              return res.status(500).json({ message: "Email telah terdaftar" });
            } else {
              const user = await User.create({
                fullname: fullname,
                username: nim,
                email: email,
                noHp: noHp,
                password: password,
                role: "mahasiswa",
                prodiAdmin: "Not Prodi", // karena data mahasiswa
              });

              await Mahasiswa.create({
                fullname: fullname,
                userId: user.dataValues.id,
                nim: nim,
                jenisKelamin: jenisKelamin,
                kotaLahir: kotaLahir,
                tglLahir: tglLahir,
                agama: agama,
                alamatTerakhir: alamatTerakhir,
                kota: kota,
                kodePos: kodePos,
                angkatan: angkatan,
                noTesMasuk: noTestMasuk,
                tglTerdaftar: tglTerdaftar,
                statusMasukPt: statusMasukPt,
                jurusan: jurusan,
                prodi: prodi,
              });

              return res
                .status(200)
                .json({ message: "Berhasil menambahkan data", success: true });
            }
          }
        }
      } else {
        return res
          .status(500)
          .json({ message: "No HP tidak valid", success: false });
      }
    } else {
      return res
        .status(500)
        .json({ message: "Email tidak valid", success: false });
    }
  }
};

export const list = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search;
  const offset = limit * page;
  const adminProdi = req.query.adminProdi;

  const totalMahasiswa = await Mahasiswa.count({
    where: {
      prodi: adminProdi,
      [Op.or]: [
        { fullname: { [Op.substring]: `${search}` } },
        { nim: { [Op.substring]: `${search}` } },
      ],
    },
  });
  const totalRows = totalMahasiswa;
  const totalPage = Math.ceil(totalRows / limit);

  try {
    const dataMahasiswa = await Mahasiswa.findAll({
      where: {
        prodi: adminProdi,
        [Op.or]: [
          { fullname: { [Op.substring]: `${search}` } },
          { nim: { [Op.substring]: `${search}` } },
        ],
      },
      include: {
        model: User,
        attributes: ["fullname", "username", "email", "noHp"],
      },

      order: [["id", "desc"]],
      offset: offset,
      limit: limit,
    });

    return res.status(200).json({
      result: dataMahasiswa,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getById = async (req, res) => {
  const id = req.params.id;

  try {
    const dataMahasiswa = await Mahasiswa.findOne({
      where: { id: id },
      include: [
        {
          model: User,
          attributes: ["fullname", "username", "email", "noHp"],
        },
        {
          model: DetailMahasiswa,
        },
      ],
    });

    return res.status(200).json({
      result: dataMahasiswa,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getMahasiswaWithDetails = async (req, res) => {
  const id = req.params.id;

  try {
    const mahasiswa = await Mahasiswa.findOne({
      where: { id: id },
      include: [
        {
          model: DetailMahasiswa,
          attributes: ["emailWali"],
        },
      ],
    });

    if (!mahasiswa) {
      return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    }

    return res.status(200).json({ result: mahasiswa });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const edit = async (req, res) => {
  // User - data login
  const email = req.body.email;
  const noHp = req.body.noHp;
  const userId = req.params.id;

  // Mahasiswa
  const fullname = req.body.fullname;
  const nim = req.body.nim;
  const jenisKelamin = req.body.jenisKelamin;
  const kotaLahir = req.body.kotaLahir;
  const tglLahir = req.body.tglLahir;
  const agama = req.body.agama;
  const alamatTerakhir = req.body.alamatTerakhir;
  const kota = req.body.kota;
  const kodePos = req.body.kodePos;
  const angkatan = req.body.angkatan;
  const noTesMasuk = req.body.noTesMasuk;
  const tglTerdaftar = req.body.tglTerdaftar;
  const statusMasukPt = req.body.statusMasukPt;
  const jurusan = req.body.jurusan;
  const prodi = req.body.prodi;
  const kelas = req.body.kelas;

  if (fullname === "") {
    return res
      .status(500)
      .json({ message: "Nama Lengkap tidak boleh kosong", success: false });
  } else if (nim === "") {
    return res
      .status(500)
      .json({ message: "NIM tidak boleh kosong", success: false });
  } else if (jenisKelamin === "") {
    return res
      .status(500)
      .json({ message: "Jenis Kelamin tidak boleh kosong", success: false });
  } else if (kotaLahir === "") {
    return res
      .status(500)
      .json({ message: "Kota Lahir tidak boleh kosong", success: false });
  } else if (tglLahir === "") {
    return res
      .status(500)
      .json({ message: "Tanggal Lahir tidak boleh kosong", success: false });
  } else if (agama === "") {
    return res
      .status(500)
      .json({ message: "Agama tidak boleh kosong", success: false });
  } else if (kota === "") {
    return res
      .status(500)
      .json({ message: "Kota tidak boleh kosong", success: false });
  } else if (angkatan === "") {
    return res
      .status(500)
      .json({ message: "Angkatan tidak boleh kosong", success: false });
  } else if (tglTerdaftar === "") {
    return res
      .status(500)
      .json({
        message: "Tanggal Terdaftar tidak boleh kosong",
        success: false,
      });
  } else if (jurusan === "") {
    return res
      .status(500)
      .json({ message: "Jurusan tidak boleh kosong", success: false });
  } else if (prodi === "") {
    return res
      .status(500)
      .json({ message: "Prodi tidak boleh kosong", success: false });
  }else if (kelas === "") {
    return res
      .status(500)
      .json({ message: "Kelas tidak boleh kosong", success: false });
  } else {
    if (validateEmail(email)) {
      // jika email valid
      if (validateNumberPhone(noHp)) {
        // jika nomor telefon valid
        await User.update(
          {
            fullname: fullname,
            username: nim,
            email: email,
            noHp: noHp,
          },
          {
            where: { id: userId },
          }
        );

        await Mahasiswa.update(
          {
            fullname: fullname,
            nim: nim,
            jenisKelamin: jenisKelamin,
            kotaLahir: kotaLahir,
            tglLahir: tglLahir,
            agama: agama,
            alamatTerakhir: alamatTerakhir,
            kota: kota,
            kodePos: kodePos,
            angkatan: angkatan,
            noTesMasuk: noTesMasuk,
            tglTerdaftar: tglTerdaftar,
            statusMasukPt: statusMasukPt,
            jurusan: jurusan,
            prodi: prodi,
            kelas: kelas,
          },
          {
            where: { userId: userId },
          }
        );

        return res
          .status(200)
          .json({ message: "Data berhasil di edit", success: true });
      } else {
        return res
          .status(500)
          .json({ message: "No HP tidak valid", success: false });
      }
    } else {
      return res
        .status(500)
        .json({ message: "Email tidak valid", success: false });
    }
  }
};

export const remove = async (req, res) => {
  const id = req.params.id;

  try {
    await User.destroy({ where: { id: id } });

    return res
      .status(200)
      .json({ message: "Data berhasil dihapus", success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updatePassword = async (req, res) => {
  const id = req.params.id;
  const tglLahir = req.body.tglLahir; // mengambil tgl lahir pada mahasiswa
  const tglLahirReplace = tglLahir.replace(/-/g, "");
  const password = bcrypt.hashSync(tglLahirReplace, bcrypt.genSaltSync(10));

  try {
    await User.update(
      {
        password: password,
      },
      {
        where: { id: id },
      }
    );

    return res
      .status(200)
      .json({
        message:
          "Password berhasil diubah. Password sesuai tanggal lahir Mahasiswa ",
        success: true,
      });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// menambahkan data detail mahasiswa
export const addDetail = async (req, res) => {
  const idMahasiswa = req.query.idMahasiswa;

  const statusMahasiswa = req.body.statusMahasiswa;
  const tahunTamatSmta = req.body.tahunTamatSmta;
  const jurusanDiSmta = req.body.jurusanDiSmta;
  const tglIjazahSmta = req.body.tglIjazahSmta;
  const nilaiUjianAkhirSmta = req.body.nilaiUjianAkhirSmta;
  const namaOrtuWali = req.body.namaOrtuWali;
  const pendapatanOrtuWali = req.body.pendapatanOrtuWali;
  const alamatWali = req.body.alamatWali;
  const kotaWali = req.body.kotaWali;
  const kodePosWali = req.body.kodePosWali;
  const noHpWali = req.body.noHpWali;
  const emailWali = req.body.emailWali;

  try {
    const cekDetailMahasiswa = await DetailMahasiswa.count({
      where: { mahasiswaId: idMahasiswa },
    });

    if (cekDetailMahasiswa > 0) {
      // jika data sudah ada, maka update data
      await DetailMahasiswa.update(
        {
          statusMahasiswa: statusMahasiswa,
          tahunTamatSmta: tahunTamatSmta,
          jurusanDiSmta: jurusanDiSmta,
          tglIjazahSmta: tglIjazahSmta,
          nilaiUjianAkhirSmta: nilaiUjianAkhirSmta,
          namaOrtuWali: namaOrtuWali,
          pendapatanOrtuWali: pendapatanOrtuWali,
          alamatWali: alamatWali,
          kotaWali: kotaWali,
          kodePosWali: kodePosWali,
          noHpWali: noHpWali,
          emailWali: emailWali,
        },
        {
          where: { mahasiswaId: idMahasiswa },
        }
      );

      return res
        .status(200)
        .json({ message: "Detail berhasil di ubah", success: true });
    } else {
      // jika data belum ada, maka tambah data
      await DetailMahasiswa.create({
        mahasiswaId: idMahasiswa,
        statusMahasiswa: statusMahasiswa,
        tahunTamatSmta: tahunTamatSmta,
        jurusanDiSmta: jurusanDiSmta,
        tglIjazahSmta: tglIjazahSmta,
        nilaiUjianAkhirSmta: nilaiUjianAkhirSmta,
        namaOrtuWali: namaOrtuWali,
        pendapatanOrtuWali: pendapatanOrtuWali,
        alamatWali: alamatWali,
        kotaWali: kotaWali,
        kodePosWali: kodePosWali,
        noHpWali: noHpWali,
        emailWali: emailWali,
      });

      return res
        .status(200)
        .json({ message: "Detail berhasil ditambahkan", success: true });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const createKetuaHimaju = async (req, res) => {
  const idMahasiswa = req.params.id;
  const statusHimaju = req.body.statusHimaju;

  try {
    const cekKetua = await Mahasiswa.count({
      where: { statusHimaju: "ketua" },
    });

    if (cekKetua > 0) {
      // jika ketua himaju telah ada
      return res
        .status(500)
        .json({ message: "Ketua himaju telah ada", success: false });
    } else {
      // jika ketua himaju belum ada
      await Mahasiswa.update(
        {
          statusHimaju: statusHimaju,
        },
        {
          where: { id: idMahasiswa },
        }
      );

      return res
        .status(200)
        .json({ message: "Berhasil jadikan ketua himaju", success: true });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// ubah status ketua himaju jadi anggota pasif
export const removeKetuaHimaju = async (req, res) => {
  const idMahasiswa = req.params.id;
  const statusHimaju = req.body.statusHimaju;

  try {
    await Mahasiswa.update(
      {
        statusHimaju: statusHimaju,
      },
      {
        where: { id: idMahasiswa },
      }
    );

    return res
      .status(200)
      .json({
        message: "Status sebagai ketua himaju telah digantikan",
        success: true,
      });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
