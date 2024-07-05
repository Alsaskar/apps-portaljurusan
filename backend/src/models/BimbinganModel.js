import { DataTypes } from "sequelize";
import db from '../config/database';

const Bimbingan = db.define('bimbinganMahasiswa', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idMahasiswa: { type: DataTypes.INTEGER },
    idDosen: { type: DataTypes.INTEGER },
}, {
    freezeTableName: true,
    timestamps: false,
})

export default Bimbingan;