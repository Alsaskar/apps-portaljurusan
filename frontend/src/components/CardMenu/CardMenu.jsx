import PropTypes from "prop-types";
import "./style.scss";

const CardMenu = ({ title }) => {
  return (
    <div className="card-menu">
      <p className="title-card-menu">{title}</p>
    </div>
  );
};

CardMenu.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CardMenu;
