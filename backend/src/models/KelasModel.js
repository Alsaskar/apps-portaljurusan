import { DataTypes } from "sequelize";
import db from "../config/database";

const Kelas = db.define(
  "kelas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    namaKelas: {
      type: DataTypes.STRING,
    },
    tglCreate: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

export default Kelas;
