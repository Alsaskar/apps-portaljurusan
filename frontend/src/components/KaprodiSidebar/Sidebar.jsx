import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME, DARK_THEME } from "../../constants/themeConstants";
import { MdOutlineClose, MdKeyboardArrowRight, MdWbSunny } from "react-icons/md";
import { IoDocumentAttachSharp, IoDocumentText, IoLogOut } from "react-icons/io5";
import { AiFillSchedule } from "react-icons/ai";
import { MdAssignmentAdd } from "react-icons/md";
import { FaUserFriends, FaChalkboardTeacher } from "react-icons/fa";
import { RiCalendarScheduleFill, RiMoonClearFill, RiDashboardHorizontalFill } from "react-icons/ri";
import LogoPoli from "../../assets/images/logo_poli.png";
import { SidebarContext } from "../../context/SidebarContext";
import Swal from "sweetalert2";
import "./Sidebar.scss";

const KaprodiSidebar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar, handleSubmenuClick } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const [activeMenu, setActiveMenu] = useState(sessionStorage.getItem("activeMenu") || null);
  const navigate = useNavigate();

  const _logout = () => {
    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah Anda Yakin Ingin Keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("isLoggedIn");

        navigate("/");
      }
    });
  };

  // State untuk mengontrol penampilan submenu
  const [kaprodiSubmenuOpen, setKaprodiSubmenuOpen] = useState(false);
  const [dashboardSubmenuOpen, setDashboardSubmenuOpen] = useState(false);
  const [rpsSubmenuOpen, setRPSSubmenuOpen] = useState(false);
  const [jadwalSubmenuOpen, setJadwalSubmenuOpen] = useState(false);

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target) && event.target.className !== "sidebar-oepn-btn") {
      closeSidebar();
    }
  };

  // const handleMenuClick = (menu) => {
  //   setActiveMenu(menu);
  //   sessionStorage.setItem("activeMenu", menu);
  // };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  useEffect(() => {
    const activeMenuFromStorage = sessionStorage.getItem("activeMenu");
    if (activeMenuFromStorage) {
      setActiveMenu(activeMenuFromStorage);
    }
  }, []);

  useEffect(() => {
    const activeMenuFromStorage = sessionStorage.getItem("activeMenu");
    if (activeMenuFromStorage) {
      setActiveMenu(activeMenuFromStorage);
    }
  }, []);
  

  //dashboard
  const toggleDashboardSubmenu = () => {
    setDashboardSubmenuOpen(!dashboardSubmenuOpen);
    if (!dashboardSubmenuOpen) {
      setActiveMenu("dashboard");
      sessionStorage.setItem("activeMenu", "dashboard");
    }
  };

  //kaprodi
  const toggleKaprodiSubmenu = () => {
    setKaprodiSubmenuOpen(!kaprodiSubmenuOpen);
    if (!kaprodiSubmenuOpen) {
      setActiveMenu("kaprodi");
      sessionStorage.setItem("activeMenu", "kaprodi");
    }
  };

  //rps
  const toggleRPSSubmenu = () => {
    setRPSSubmenuOpen(!rpsSubmenuOpen);
    if (!rpsSubmenuOpen) {
      setActiveMenu("rps");
      sessionStorage.setItem("activeMenu", "rps");
    }
  };

  //jadwal
  const toggleJadwalSubmenu = () => {
    setJadwalSubmenuOpen(!jadwalSubmenuOpen);
    if (!jadwalSubmenuOpen) {
      setActiveMenu("jadwal");
      sessionStorage.setItem("activeMenu", "jadwal");
    }
  };

  return (
    <nav className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`} ref={navbarRef}>
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img src={LogoPoli} alt="" />
          <span className="sidebar-brand-text">Portal Jurusan</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={20} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            {/*dashboard*/}
            <li className={`menu-item`}>
              <Link
                to="/kaprodi"
                className={`menu-link ${activeMenu === "dashboard" ? "active" : ""}`}
                onClick={() => {
                  toggleDashboardSubmenu();
                  handleSubmenuClick("Dashboard");
                  setActiveMenu("dashboard");
                }}
              >
                <span className="menu-link-icon">
                  <RiDashboardHorizontalFill size={18} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </Link>
            </li>

            {/*Profile Kaprodi*/}
            <li className={`menu-item`}>
              <div className={`menu-link ${activeMenu === "kaprodi" ? "active" : ""}`} onClick={toggleKaprodiSubmenu}>
                <span className="menu-link-icon">
                  <FaChalkboardTeacher size={20} />
                </span>
                <div className="menu">
                  <span className="menu-link-text">Profile Kaprodi</span>
                </div>
                <span className={`submenu-arrow ${kaprodiSubmenuOpen ? "open" : ""}`}>
                  <MdKeyboardArrowRight size={18} style={{ transform: kaprodiSubmenuOpen ? "rotate(90deg)" : "none", transition: "transform 0.3s ease" }} />
                </span>
              </div>
              {/* Submenu */}
              {kaprodiSubmenuOpen && (
                <ul className={`submenu ${kaprodiSubmenuOpen ? "open" : ""}`}>
                  <li className="subm enu-item">
                    <Link to="/admin/add/dosen" className="submenu-link" onClick={() => handleSubmenuClick("Profile Kaprodi")}>
                      <span className="menu-link-icon">
                        <FaUserFriends size={20} />
                      </span>
                      <div className={`submenu-link-text`}>Profile</div>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/*rps*/}
            <li className={`menu-item`}>
              <div className={`menu-link ${activeMenu === "rps" ? "active" : ""}`} onClick={toggleRPSSubmenu}>
                <span className="menu-link-icon">
                  <IoDocumentAttachSharp size={20} />
                </span>
                <div className="menu">
                  <span className="menu-link-text">RPS</span>
                </div>
                <span className={`submenu-arrow ${rpsSubmenuOpen ? "open" : ""}`}>
                  <MdKeyboardArrowRight size={18} style={{ transform: rpsSubmenuOpen ? "rotate(90deg)" : "none", transition: "transform 0.3s ease" }} />
                </span>
              </div>
              {/* Submenu */}
              {rpsSubmenuOpen && (
                <ul className={`submenu ${rpsSubmenuOpen ? "open" : ""}`}>
                  <li className="submenu-item">
                    <Link to="/kaprodi/rps" className="submenu-link" onClick={() => handleSubmenuClick("RPS")}>
                      <span className="menu-link-icon">
                        <IoDocumentText size={20} />
                      </span>
                      <div className={`submenu-link-text`}>RPS</div>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/*jadwal*/}
            <li className={`menu-item`}>
              <div className={`menu-link ${activeMenu === "jadwal" ? "active" : ""}`} onClick={toggleJadwalSubmenu}>
                <span className="menu-link-icon">
                  <AiFillSchedule size={20} />
                </span>
                <div className="menu">
                  <span className="menu-link-text">Jadwal</span>
                </div>
                <span className={`submenu-arrow ${jadwalSubmenuOpen ? "open" : ""}`}>
                  <MdKeyboardArrowRight size={18} style={{ transform: jadwalSubmenuOpen ? "rotate(90deg)" : "none", transition: "transform 0.3s ease" }} />
                </span>
              </div>
              {/* Submenu */}
              {jadwalSubmenuOpen && (
                <ul className={`submenu ${jadwalSubmenuOpen ? "open" : ""}`}>
                  <li className="submenu-item">
                    <div className="submenu-link">
                      <span className="menu-link-icon">
                        <MdAssignmentAdd size={20} />
                      </span>
                      <Link to="/admin-bukti-pembayaran-ukt" className={`submenu-link-text`} onClick={() => handleSubmenuClick("Data Jadwal")}>
                        Data Jadwal
                      </Link>
                    </div>
                  </li>
                  <li className="submenu-item">
                    <div className="submenu-link">
                      <span className="menu-link-icon">
                        <RiCalendarScheduleFill size={20} />
                      </span>
                      <Link to="/admin/jadwal" className={`submenu-link-text`} onClick={() => handleSubmenuClick("Jadwal")}>
                        Jadwal
                      </Link>
                    </div>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item dark-light" onClick={toggleTheme}>
              <div className="menu-link">
                <button type="button" className="theme-toggle-btn">
                  <span className="theme-icon">{theme === LIGHT_THEME ? <MdWbSunny size={20} /> : <RiMoonClearFill size={20} />}</span>
                </button>
                <span className="menu-link-text">{theme == LIGHT_THEME ? "Light Mode" : "Dark Mode"}</span>
              </div>
            </li>
            <li className="menu-item logout" onClick={() => _logout()}>
              <div className="menu-link">
                <span className="menu-link-icon">
                  <IoLogOut size={20} />
                </span>
                <span className="submenu-link-text">Logout</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default KaprodiSidebar;
