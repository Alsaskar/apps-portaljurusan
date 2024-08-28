import { DataTypes } from "sequelize";
import db from "../config/database";
import { Mahasiswa } from "./MahasiswaModel";

const Himaju = db.define(
  "himaju",
  {
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
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const ProfilHimaju = db.define(
  "profil_hme",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    visi: { type: DataTypes.STRING },
    misi: { type: DataTypes.STRING },
    deskripsi: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const ProkerHimaju = db.define(
  "proker_hme",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    namaKegiatan: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    tglPelaksanaan: { type: DataTypes.STRING },
    jamMulai: { type: DataTypes.STRING },
    jamSelesai: { type: DataTypes.STRING },
    lokasi: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Join table - mahasiswa to user
Mahasiswa.hasMany(Himaju, { foreignKey: "id" });
Himaju.belongsTo(Mahasiswa, { foreignKey: "idMahasiswa" });

export { Himaju, ProfilHimaju, ProkerHimaju };
