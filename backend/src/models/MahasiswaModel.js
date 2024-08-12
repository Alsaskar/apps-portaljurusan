import { DataTypes } from "sequelize";
import db from '../config/database';
import User from "./UserModel";

const Mahasiswa = db.define('mahasiswa', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fullname: { type: DataTypes.STRING },
    userId: { type: DataTypes.STRING },
    nim: { type: DataTypes.STRING },
    jenisKelamin: { type: DataTypes.STRING },
    kotaLahir: { type: DataTypes.STRING },
    tglLahir: { type: DataTypes.STRING },
    agama: { type: DataTypes.STRING },
    alamatTerakhir: { type: DataTypes.STRING },
    kota: { type: DataTypes.STRING },
    kodePos: { type: DataTypes.STRING },
    angkatan: { type: DataTypes.STRING },
    noTesMasuk: { type: DataTypes.STRING },
    tglTerdaftar: { type: DataTypes.STRING },
    statusMasukPt: { type: DataTypes.STRING },
    jurusan: { type: DataTypes.STRING },
    prodi: { type: DataTypes.STRING },
    foto: { type: DataTypes.STRING },
    statusHimaju: { type: DataTypes.STRING },
}, {
    freezeTableName: true,
    timestamps: false,
})


const DetailMahasiswa = db.define('detailmahasiswa', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    mahasiswaId: { type: DataTypes.INTEGER },
    statusMahasiswa: { type: DataTypes.STRING },
    tahunTamatSmta: { type: DataTypes.STRING },
    jurusanDiSmta: { type: DataTypes.STRING },
    tglIjazahSmta: { type: DataTypes.STRING },
    nilaiUjianAkhirSmta: { type: DataTypes.STRING },
    namaOrtuWali: { type: DataTypes.STRING },
    pendapatanOrtuWali: { type: DataTypes.STRING },
    alamatWali: { type: DataTypes.STRING },
    kotaWali: { type: DataTypes.STRING },
    kodePosWali: { type: DataTypes.STRING },
    noHpWali: { type: DataTypes.STRING },
    emailWali: { type: DataTypes.STRING }
}, {
    freezeTableName: true,
    timestamps: false,
})



// Join table - mahasiswa to user
User.hasMany(Mahasiswa);
Mahasiswa.belongsTo(User)

// Join table - mahasiswa to detail mahasiswa
Mahasiswa.hasMany(DetailMahasiswa);
DetailMahasiswa.belongsTo(Mahasiswa)

export {
    Mahasiswa,
    DetailMahasiswa,
};