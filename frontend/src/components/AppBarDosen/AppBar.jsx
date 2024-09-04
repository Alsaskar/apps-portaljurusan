import { MdOutlineMenu } from "react-icons/md";
import { useContext, useEffect } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import AppBarProfile from "./AppBarProfile";
import { ThemeContext } from "../../context/ThemeContext";
import { DARK_THEME } from "../../constants/themeConstants";
import PropTypes from 'prop-types';

import "./AppBar.scss";

const  AppBar = ({fullname, email, foto}) => {
  const { openSidebar } = useContext(SidebarContext);
  const { theme } = useContext(ThemeContext);
  const { submenuTitle } = useContext(SidebarContext);
  
  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);
  return (
    <div className="app-bar">
      <div className="area-top-l">
        <div className="area-top-f">
          <button className="sidebar-open-btn" type="button" onClick={openSidebar}>
            <MdOutlineMenu size={24} />
          </button>
          <h3 className="area-top-title">{submenuTitle}</h3>
        </div>
        <AppBarProfile fullname={fullname} email={email} foto={foto}/>
      </div>
    </div>
  );
};

AppBar.propTypes = {
  fullname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  foto: PropTypes.string.isRequired,
};

export default AppBar;
