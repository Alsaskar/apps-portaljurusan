import "./AppBar.scss";
import { Images } from "../../assets/images";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import { useContext } from "react";
import PropTypes from "prop-types";
import { urlStaticAssetsDosen } from "../../config";

const AppBarProfile = ({ fullname, email, foto }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="appbar-profile profile-dropdown">
      <div className="drop-info">
        <div className="drop-info-img">
          <img
            className="profile-logo"
            src={
              foto
                ? `${urlStaticAssetsDosen}/${foto}`
                : theme === LIGHT_THEME
                ? Images.ProfileImageBlack
                : Images.ProfileImageWhite
            }
          />
        </div>
        <div className="drop-info-text">
          <div className="info-text-group">
            <span>{fullname}</span>
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
  foto: PropTypes.string,
};

export default AppBarProfile;
