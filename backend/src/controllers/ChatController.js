import ChatMessage from '../models/MessageModel';
import { Op } from 'sequelize';
import moment from 'moment';

// Menyimpan pesan chat ke database
export const saveMessage = async (senderId, recipientId, senderRole, recipientRole, message) => {
  try {
    const newMessage = await ChatMessage.create({
      senderId,
      recipientId,
      senderRole,
      recipientRole,
      message,
      timestamp: new Date() // Simpan timestamp standar
    });
    return newMessage;
  } catch (error) {
    console.error('Error saving message:', error);
    throw error;
  }
};

// Mendapatkan pesan chat berdasarkan penerima dan pengirim untuk dosen
export const getMessagesDosen = async (senderId, recipientId) => {
  try {
    const messages = await ChatMessage.findAll({
      where: {
        [Op.or]: [
          { senderId, recipientId, senderRole: 'mahasiswa', recipientRole: 'dosen' },
          { senderId: recipientId, recipientId: senderId, senderRole: 'dosen', recipientRole: 'mahasiswa' }
        ]
      },
      order: [['timestamp', 'ASC']],
    });

    // Format timestamp untuk setiap pesan
    return messages.map(msg => ({
      ...msg.toJSON(),
      timestamp: moment(msg.timestamp).format('YYYY-MM-DDTHH:mm:ss') // Format waktu dengan tanggal
    }));
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    throw error;
  }
};

// Mendapatkan pesan chat berdasarkan penerima dan pengirim untuk mahasiswa
export const getMessagesMahasiswa = async (senderId, recipientId) => {
  try {
    const messages = await ChatMessage.findAll({
      where: {
        [Op.or]: [
          { senderId, recipientId, senderRole: 'dosen', recipientRole: 'mahasiswa' },
          { senderId: recipientId, recipientId: senderId, senderRole: 'mahasiswa', recipientRole: 'dosen' }
        ]
      },
      order: [['timestamp', 'ASC']],
    });

    // Format timestamp untuk setiap pesan
    return messages.map(msg => ({
      ...msg.toJSON(),
      timestamp: moment(msg.timestamp).format('YYYY-MM-DDTHH:mm:ss') // Format waktu dengan tanggal
    }));
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    throw error;
  }
};

// Menghapus pesan chat berdasarkan ID
export const deleteMessage = async (messageId) => {
  try {
    const result = await ChatMessage.destroy({
      where: { id: messageId }
    });
    
    if (result === 0) {
      // Jika hasil penghapusan adalah 0, berarti tidak ada baris yang terhapus
      throw new Error('Message not found');
    }
    
    return { success: true, message: 'Message successfully deleted', affectedRows: result };
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
};

// Menghapus pesan yang lebih dari 20 hari
export const deleteOldMessages = async () => {
  try {
    const now = new Date();
    const twentyDaysAgo = new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000); // Mengatur waktu menjadi 20 hari yang lalu

    console.log(`Current time: ${now.toISOString()}`);
    console.log(`Deleting messages older than: ${twentyDaysAgo.toISOString()}`);

    // Debug: Periksa data yang akan dihapus
    const messagesToDelete = await ChatMessage.findAll({
      where: {
        timestamp: {
          [Op.lt]: twentyDaysAgo
        }
      }
    });
    console.log('Messages to delete:', messagesToDelete);

    const result = await ChatMessage.destroy({
      where: {
        timestamp: {
          [Op.lt]: twentyDaysAgo
        }
      }
    });

    console.log(`Deleted ${result} old messages.`);
    return result; // Mengembalikan jumlah pesan yang dihapus
  } catch (error) {
    console.error('Error deleting old messages:', error);
    throw error;
  }
};
