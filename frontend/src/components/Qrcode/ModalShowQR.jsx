import PropTypes from "prop-types";
import { IoIosClose } from "react-icons/io";
import "./modalShowQR.scss";

const ModalShowQR = ({ isOpen, handleClose, qrCode  }) => {

  return (
    <>
      {isOpen && (
        <div className="qr-modal fade-in">
          <div className="modal-content-qr fade-in">
            <button onClick={handleClose} className="button-close-modal">
              <IoIosClose size={20} />
            </button>

            <div className="qr-code-show">
              <div className="qr-code-container">
                <h3 className="title-qr">QR Code Anda</h3>
                <p className="desc-qr">Hanya digunakan untuk login ke TV</p>
                <img src={qrCode} alt="QR Code" className="qr-code-img" />
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
  qrCode: PropTypes.string.isRequired,
};

export default ModalShowQR;
