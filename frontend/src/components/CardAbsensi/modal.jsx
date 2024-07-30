import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import qr from "../../assets/images/qr.png";
import "./modal.scss";

const Modal = ({ onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <p className="title-modal">Agama</p>
        <div className="modal-details">
          <div className="details">
            <p className="time-modal">09.00 - 11.00</p>
            <p className="lab-modal">
              Lab. <span className="lab-name">Pemograman</span>
            </p>
          </div>
          <div className="bg-date-month">
            <p className="month-modal">Des</p>
            <p className="date-modal">28</p>
          </div>
        </div>
        <img src={qr} alt="qr" className="qr-code" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Modal;
