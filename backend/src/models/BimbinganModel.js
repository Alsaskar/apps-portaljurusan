import { DataTypes } from 'sequelize';
import db from '../config/database';
import { Mahasiswa } from "./MahasiswaModel";
import { Dosen } from "./DosenModel";

const Bimbingan = db.define(
  "bimbinganMahasiswa",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idMahasiswa: { type: DataTypes.INTEGER },
    idDosen: { type: DataTypes.INTEGER },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Mahasiswa.hasMany(Bimbingan, { foreignKey: "id" });
Bimbingan.belongsTo(Mahasiswa, { foreignKey: "idMahasiswa" });

Dosen.hasMany(Bimbingan, { foreignKey: "id" });
Bimbingan.belongsTo(Dosen, { foreignKey: "idDosen" });

export default Bimbingan;
