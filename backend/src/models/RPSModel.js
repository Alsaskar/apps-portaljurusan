import { DataTypes } from "sequelize";
import db from "../config/database";

export const RPS = db.define("rps", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idDosen: { type: DataTypes.INTEGER },
    namaMatkul: { type: DataTypes.STRING },
    kodeMatkul: { type: DataTypes.STRING },
    rumpunMatkul: { type: DataTypes.STRING },
    bobot: { type: DataTypes.STRING },
    semester: { type: DataTypes.STRING },
    tanggalPenyusunan: { type: DataTypes.STRING },
    otorisasi: { type: DataTypes.STRING },
    pembuatRp: { type: DataTypes.STRING },
    pengampuMatkul: { type: DataTypes.STRING },
    kordinatorMatkul: { type: DataTypes.STRING },
    kordinatorProdi: { type: DataTypes.STRING },
    capaianPembelajaran: { type: DataTypes.STRING },
    cpl: { type: DataTypes.STRING },
    cpmk: { type: DataTypes.STRING },
    subCpmk: { type: DataTypes.STRING },
    deskripsiMk: { type: DataTypes.STRING },
    bahanKajian: { type: DataTypes.STRING },
    daftarPustaka: { type: DataTypes.STRING },
    dosenPengampu: { type: DataTypes.STRING },
    matkulPrasyarat: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING },
    ketTolak: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export const DetailRPS = db.define("rpsdetail", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idRps: { type: DataTypes.STRING },
    mingguKe: { type: DataTypes.STRING },
    subCpmk: { type: DataTypes.STRING },
    bahanKajian: { type: DataTypes.STRING },
    bentukMetode: { type: DataTypes.STRING },
    estimasiWaktu: { type: DataTypes.STRING },
    pengalamanBelajar: { type: DataTypes.STRING },
    kriteriaBentuk: { type: DataTypes.STRING },
    indikator: { type: DataTypes.STRING },
    bobot: { type: DataTypes.STRING }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Join table - mahasiswa to user
RPS.hasMany(DetailRPS, { foreignKey: "id" });
DetailRPS.belongsTo(RPS, { foreignKey: "idRps" });