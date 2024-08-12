import { DataTypes } from "sequelize";
import db from "../config/database";
import User from "./UserModel";

const Dosen = db.define(
  "dosen",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullname: { type: DataTypes.STRING },
    nip: { type: DataTypes.STRING },
    nidn: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER },
    jenisKelamin: { type: DataTypes.STRING },
    tempatLahir: { type: DataTypes.STRING },
    tglLahir: { type: DataTypes.STRING },
    karpeg: { type: DataTypes.STRING },
    cpsn: { type: DataTypes.STRING },
    pns: { type: DataTypes.STRING },
    jurusan: { type: DataTypes.STRING },
    prodi: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const DetailDosen = db.define(
  "detaildosen",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dosenId: { type: DataTypes.INTEGER },
    pendidikanTerakhir: { type: DataTypes.STRING },
    tahun: { type: DataTypes.STRING },
    gol: { type: DataTypes.STRING },
    tmtGolongan: { type: DataTypes.STRING },
    tmtJabatan: { type: DataTypes.STRING },
    jabatan: { type: DataTypes.STRING },
    agama: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Join table - dosen to user
User.hasMany(Dosen);
Dosen.belongsTo(User);

// Join table - dosen to detail dosen
Dosen.hasMany(DetailDosen);
DetailDosen.belongsTo(Dosen);

export { Dosen, DetailDosen };
