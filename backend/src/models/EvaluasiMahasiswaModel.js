import { DataTypes } from "sequelize";
import db from "../config/database";

const EvaluasiMahasiswa = db.define(
  "evaluasimahasiswa",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idMahasiswa: { type: DataTypes.INTEGER },
    tgl: { type: DataTypes.STRING },
    kegiatan: { type: DataTypes.STRING },
    permasalahan: { type: DataTypes.STRING },
    solusi: { type: DataTypes.STRING, allowNull: true },
    ttd: { type: DataTypes.TEXT },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const UploadedFile = db.define(
  "uploadfileevaluasi",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idMahasiswa: { type: DataTypes.INTEGER },
    fileName: { type: DataTypes.STRING },
    fileUrl: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

export { EvaluasiMahasiswa, UploadedFile };
