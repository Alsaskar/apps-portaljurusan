import { DataTypes } from 'sequelize';
import db from '../config/database';

const DosenSignature = db.define('DosenSignature', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  idDosen: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idMahasiswa: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  signatureUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'dosensignature', // Specify the exact table name here
});

export default DosenSignature;
