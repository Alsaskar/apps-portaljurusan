import "./AppBar.scss";
import { Images } from "../../assets/images";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const AppBarProfile = ({ fullname, email }) => {
  const { theme } = useContext(ThemeContext);
  const [truncatedAdmin, setTruncatedAdmin] = useState(fullname);

  useEffect(() => {
    const handleReize = () => {
      if (window.innerWidth <= 768) {
        setTruncatedAdmin(truncateText(fullname, 20));
      } else {
        setTruncatedAdmin(fullname);
      }
    };

    handleReize();
    window.addEventListener("resize", handleReize);

    return () => {
      window.removeEventListener("resize", handleReize);
    };
  }, [fullname]);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="appbar-profile profile-dropdown">
      <div className="drop-info">
        <div className="drop-info-img">
          <img
            className="profile-logo"
            src={
              theme === LIGHT_THEME
                ? Images.ProfileImageBlack
                : Images.ProfileImageWhite
            }
          />
        </div>
        <div className="drop-info-text">
          <div className="info-text-group">
            <span>{truncatedAdmin}</span>
            <span>{email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

AppBarProfile.propTypes = {
  fullname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default AppBarProfile;
