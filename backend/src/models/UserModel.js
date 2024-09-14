import { DataTypes } from "sequelize";
import db from "../config/database";

const User = db.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullname: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    noHp: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING },
    prodiAdmin: { type: DataTypes.STRING },
    prodiDosen: { type: DataTypes.STRING },
    otp: { type: DataTypes.STRING, allowNull: true },
    otpExpires: { type: DataTypes.DATE, allowNull: true },
    attempts: { type: DataTypes.INTEGER, defaultValue: 0 },
    lockout: { type: DataTypes.BOOLEAN, defaultValue: false },
    lockoutTime: { type: DataTypes.DATE, allowNull: true },
    resetOtp: { type: DataTypes.STRING, allowNull: true },
    resetOtpExpires: { type: DataTypes.DATE, allowNull: true },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default User;