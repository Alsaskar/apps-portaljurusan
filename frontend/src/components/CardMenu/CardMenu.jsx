import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaUsers, FaList } from "react-icons/fa"; // Import ikon yang diinginkan
import "./style.scss";

const iconMap = {
  Profile: <FaUser />,
  Absensi: <FaCalendarAlt />,
  HME: <FaUsers />,
  Jadwal: <FaList />,
};

const CardMenu = ({ title, link }) => {
  return (
    <Link to={link} className="card-menu">
      <div className="icon">
        {iconMap[title]}
      </div>
      <p className="title-card-menu">{title}</p>
    </Link>
  );
};

CardMenu.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default CardMenu;
