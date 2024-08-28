import { DataTypes } from 'sequelize';
import db from '../config/database';

const FailedLoginAttempt = db.define('failedloginattempt', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: false
  },
  attemptCount: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  isBlocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

export default FailedLoginAttempt;
