import "./style.scss";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME, DARK_THEME } from "../../constants/themeConstants";
import { useEffect, useContext } from "react";
import { MdWbSunny } from "react-icons/md";
import { RiMoonClearFill } from "react-icons/ri";
const TVToggleTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);
  return (
    <div className="dark-light" onClick={toggleTheme}>
      <div className="theme-toggle-btn">
        {theme === LIGHT_THEME ? (
          <MdWbSunny size={20} />
        ) : (
          <RiMoonClearFill size={20} />
        )}
      </div>
    </div>
  );
};

export default TVToggleTheme;
