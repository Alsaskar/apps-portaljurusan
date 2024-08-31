import { DataTypes } from "sequelize";
import db from "../config/database";

const Matkul = db.define(
  "matkul",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    matkul: { type: DataTypes.STRING },
    dosenPengajar: { type: DataTypes.STRING },
    prodi: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Matkul;
