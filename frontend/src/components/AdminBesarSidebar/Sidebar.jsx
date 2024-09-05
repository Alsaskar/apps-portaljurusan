import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME, DARK_THEME } from "../../constants/themeConstants";
import { MdOutlineClose, MdKeyboardArrowRight, MdWbSunny } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { HiUserAdd } from "react-icons/hi";
import { PiMonitorFill } from "react-icons/pi";
import { MdLock  } from "react-icons/md";
import { FaUserFriends, FaChalkboardTeacher } from "react-icons/fa";
import { RiMoonClearFill, RiDashboardHorizontalFill } from "react-icons/ri";
import LogoBlue from "../../assets/images/logo_blue.png";
import LogoWhite from "../../assets/images/logo_white.png";
import { SidebarContext } from "../../context/SidebarContext";
import Swal from "sweetalert2";
import "./Sidebar.scss";

const AdminBesarSidebar = () => {
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
  const [dashboardSubmenuOpen, setDashboardSubmenuOpen] = useState(false);
  const [adminSubmenuOpen, setAdminSubmenuOpen] = useState(false);
  const [monitoringSubmenuOpen, setMonitoringSubmenuOpen] = useState(false);

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target) && event.target.className !== "sidebar-open-btn") {
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

  //dashboard
  const toggleDashboardSubmenu = () => {
    setDashboardSubmenuOpen(!dashboardSubmenuOpen);
    if (!dashboardSubmenuOpen) {
      setActiveMenu("dashboard");
      sessionStorage.setItem("activeMenu", "dashboard");
    }
  };


  //dosen
  const toggleAdminSubmenu = () => {
    setAdminSubmenuOpen(!adminSubmenuOpen);
    if (!adminSubmenuOpen) {
      setActiveMenu("dosen");
      sessionStorage.setItem("activeMenu", "dosen");
    }
  };



  //monitoring
  const toggleMonitoringSubmenu = () => {
    setMonitoringSubmenuOpen(!monitoringSubmenuOpen);
    if (!monitoringSubmenuOpen) {
      setActiveMenu("monitoring");
      sessionStorage.setItem("activeMenu", "monitoring");
    }
  };

  return (
    <nav className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`} ref={navbarRef}>
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img src={theme === LIGHT_THEME ? LogoBlue : LogoWhite} alt="" />
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
                to="/admin"
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

            {/*Manage Admin Prodi*/}
            <li className={`menu-item`}>
              <div className={`menu-link ${activeMenu === "dosen" ? "active" : ""}`} onClick={toggleAdminSubmenu}>
                <span className="menu-link-icon">
                  <FaChalkboardTeacher size={20} />
                </span>
                <div className="menu">
                  <span className="menu-link-text">Manage Admin Prodi</span>
                </div>
                <span className={`submenu-arrow ${adminSubmenuOpen ? "open" : ""}`}>
                  <MdKeyboardArrowRight size={18} style={{ transform: adminSubmenuOpen ? "rotate(90deg)" : "none", transition: "transform 0.3s ease" }} />
                </span>
              </div>
              {/* Submenu */}
              {adminSubmenuOpen && (
                <ul className={`submenu ${adminSubmenuOpen ? "open" : ""}`}>
                  <li className="submenu-item">
                    <Link to="/add/admin/prodi" className="submenu-link" onClick={() => handleSubmenuClick("Add Admin Prodi")}>
                      <span className="menu-link-icon">
                        <HiUserAdd size={20} />
                      </span>
                      <div className={`submenu-link-text`}>Add Admin Prodi</div>
                    </Link>
                  </li>
                  <li className="submenu-item">
                    <Link to="/data/admin/prodi" className="submenu-link" onClick={() => handleSubmenuClick("Data Admin Prodi")}>
                      <span className="menu-link-icon">
                        <FaUserFriends size={20} />
                      </span>
                      <div className={`submenu-link-text`}>Data Admin Prodi</div>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/*monitoring*/}
            <li className={`menu-item`}>
              <div className={`menu-link ${activeMenu === "monitoring" ? "active" : ""}`} onClick={toggleMonitoringSubmenu}>
                <span className="menu-link-icon">
                  <PiMonitorFill size={20} />
                </span>
                <div className="menu">
                  <span className="menu-link-text">Monitoring Login</span>
                </div>
                <span className={`submenu-arrow ${monitoringSubmenuOpen ? "open" : ""}`}>
                  <MdKeyboardArrowRight size={18} style={{ transform: monitoringSubmenuOpen ? "rotate(90deg)" : "none", transition: "transform 0.3s ease" }} />
                </span>
              </div>
              {/* Submenu */}
              {monitoringSubmenuOpen && (
                <ul className={`submenu ${monitoringSubmenuOpen ? "open" : ""}`}>
                  <li className="submenu-item">
                    <Link to="/admin/jurusan/monitoring/login" className="submenu-link" onClick={() => handleSubmenuClick("Gagal Login")}>
                      <span className="menu-link-icon">
                        <MdLock  size={20} />
                      </span>
                      <div className={`submenu-link-text`}>
                        Gagal Login
                      </div>
                    </Link>
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

export default AdminBesarSidebar;
