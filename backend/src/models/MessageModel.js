// src/models/ChatMessage.js
import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const ChatMessage = db.define('chat_message', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  senderRole: {
    type: DataTypes.ENUM('mahasiswa', 'dosen'),
    allowNull: false
  },
  recipientId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  recipientRole: {
    type: DataTypes.ENUM('mahasiswa', 'dosen'),
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
    onUpdate: DataTypes.NOW
  }
});

export default ChatMessage;
