import { useState } from "react";
import { RiHomeOfficeFill } from "react-icons/ri";
import PropTypes from "prop-types";
import Modal from "./modal"; 
import Card from "../../assets/images/card.svg";
import Right from "../../assets/images/right.png";
import "./styles.scss";

const CardAbsensi = ({ title, month, date, time, lab, nameLab }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="area-card-absensi-info" onClick={handleCardClick}>
      <img src={Card} alt="card" className="card-bg" />
      <div className="card-top">
        <div className="area-card-absensi-content">
          <h5 className="info-title-absensi">{title}</h5>
          <div className="info-time-absensi">{time}</div>
        </div>
        <div className="info-date">
          <p className="info-month-absensi">{month}</p>
          <p className="info-date-absensi">{date}</p>
        </div>
      </div>

      <div className="card-bottom">
      <img src={Right} alt="effect" className="effect" />
        <div className="card-lab">
          <p className="card-title-lab">{lab}</p>
          <p className="card-lab-title">{nameLab}</p>
        </div>
        <div className="card-bg-loc">
          <RiHomeOfficeFill size={20} />
        </div>
      </div>
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
};

CardAbsensi.propTypes = {
  title: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  lab: PropTypes.string.isRequired,
  nameLab: PropTypes.string.isRequired
};

export default CardAbsensi;
