import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaUsers } from "react-icons/fa";
import "./style.scss";

const iconMap = {
  Profile: <FaUser />,
  Akademik: <FaCalendarAlt />,
  HME: <FaUsers />,
  Jadwal: <FaCalendarAlt />,
  DataDosen: <FaUsers />,
};

const CardMenu = ({ title, link, backgroundImage }) => {
  return (
    <Link to={link} className="card-menu" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="card-overlay"></div>
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
  backgroundImage: PropTypes.string.isRequired,
};

export default CardMenu;