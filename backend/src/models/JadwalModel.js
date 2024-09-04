import { DataTypes } from "sequelize";
import db from "../config/database";
import Matkul from "./MatkulModels";
import Kelas from "./KelasModel";

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

// Join table
Matkul.hasMany(Jadwal, { foreignKey: "id" });
Jadwal.belongsTo(Matkul, {foreignKey: "idMatkul" });

// Join table
Kelas.hasMany(Jadwal, { foreignKey: "id" });
Jadwal.belongsTo(Kelas, {foreignKey: "idKelas" });

export default Jadwal;
