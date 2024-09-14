import { useState } from 'react';
import axios from 'axios';
import { urlApi } from '../../config';
import ModalShowQR from './ModalShowQR';
import { FaQrcode } from "react-icons/fa6";
import "./style.scss";

const GenerateQRCode = () => {
  const [qrCode, setQRCode] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleGenerateQRCode = async () => {
    try {
      const response = await axios.get(`${urlApi}/qrcode/generate-qr-code`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Pastikan token ada dan valid
        },
      });

      const data = response.data;

      if (data.success) {
        setQRCode(data.qrCode);
        setShowModal(true);
      } else {
        console.error('Gagal membuat QR code:', data.message);
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error.message);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={handleGenerateQRCode} className="btn-show-qr"><FaQrcode size={20} /></button>
      <ModalShowQR isOpen={showModal} handleClose={handleCloseModal} qrCode={qrCode} />
    </div>
  );
};

export default GenerateQRCode;
