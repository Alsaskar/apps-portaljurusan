import { DataTypes } from "sequelize";
import db from "../config/database";

const Jadwal = db.define(
  "jadwal",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    prodiAdmin: { type: DataTypes.INTEGER },
    idMatkul: { type: DataTypes.INTEGER },
    idKelas: { type: DataTypes.INTEGER },
    hari: { type: DataTypes.STRING },
    ruangan: { type: DataTypes.STRING },
    jamMulai: { type: DataTypes.STRING },
    jamSelesai: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Jadwal;
