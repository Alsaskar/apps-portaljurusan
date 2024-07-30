import { DataTypes } from "sequelize";
import db from '../config/database';

const Himaju = db.define('himaju', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idMahasiswa: { type: DataTypes.INTEGER },
    fullname: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING },
    alasanDitolak: { type: DataTypes.STRING },
    tglDaftar: { type: DataTypes.STRING },
}, {
    freezeTableName: true,
    timestamps: false,
})

const ProfilHimaju = db.define('profil_hme', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    visi: { type: DataTypes.STRING },
    misi: { type: DataTypes.STRING },
    deskripsi: { type: DataTypes.STRING },
}, {
    freezeTableName: true,
    timestamps: false,
})

export {
    Himaju,
    ProfilHimaju
}