import PropTypes from "prop-types";
import "./Header.scss";

const Header = ({ text, bg, count }) => {
  return (
    <div className="header-section" style={{ backgroundColor: bg }}>
      {text}
      <div className="header-count">{count}</div>
    </div>
  );
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
  bg: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default Header;
