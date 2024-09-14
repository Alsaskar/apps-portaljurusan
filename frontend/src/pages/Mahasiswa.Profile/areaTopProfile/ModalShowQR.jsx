import PropTypes from "prop-types";
import { IoIosClose } from "react-icons/io";
// import { BsDatabaseAdd } from "react-icons/bs";
import "./modalShowQR.scss";
// import { useState } from "react";
import GenerateQRCode from "../../../components/Qrcode/GenerateQr";

const ModalShowQR = ({ isOpen, handleClose }) => {
  // const [loading, setLoading] = useState(false);

  return (
    <>
      {isOpen && (
        <div className="qr-modal fade-in">
          <div className="modal-content-qr fade-in">
            <button onClick={handleClose} className="button-close-modal">
              <IoIosClose size={20} />
            </button>

            <div className="qr-foto">
              <div className="qr-foto-container">
                <h3 className="title-edit-dosen">QR Code Anda</h3>

                <GenerateQRCode />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ModalShowQR.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ModalShowQR;
