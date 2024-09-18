import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME, DARK_THEME } from "../../constants/themeConstants";
import {
  MdOutlineClose,
  MdKeyboardArrowRight,
  MdWbSunny,
} from "react-icons/md";
import {
  IoDocumentAttachSharp,
  IoDocumentText,
  IoLogOut,
} from "react-icons/io5";
import {
  HiDocumentPlus,
  HiChatBubbleLeftRight,
  HiMiniClipboardDocumentCheck,
  HiDocumentText,
} from "react-icons/hi2";
import { AiFillSchedule, AiFillMessage } from "react-icons/ai";
import {
  MdWorkspaces,
  MdDocumentScanner,
} from "react-icons/md";
import { FaPeopleRoof } from "react-icons/fa6";
import { FaUserFriends, FaChalkboardTeacher } from "react-icons/fa";
import {
  RiCalendarScheduleFill,
  RiMoonClearFill,
  RiDashboardHorizontalFill,
} from "react-icons/ri";
import { TbPasswordMobilePhone } from "react-icons/tb";
import LogoPoli from "../../assets/images/logo_poli.png";
import { SidebarContext } from "../../context/SidebarContext";
import Swal from "sweetalert2";
import "./Sidebar.scss";
import ModalUbahPasswordDosen from "../../pages/Dosen.UbahPassword/ModalUbahPasswordDosen";

const DosenSidebar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar, handleSubmenuClick } =
    useContext(SidebarContext);
  const navbarRef = useRef(null);
  const [activeMenu, setActiveMenu] = useState(
    sessionStorage.getItem("activeMenu") || null
  );
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleModal = () => {
    setShowModal(true);
  };

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
  const [dosenSubmenuOpen, setDosenSubmenuOpen] = useState(false);
  const [bimbinganSubmenuOpen, setBimbinganSubmenuOpen] = useState(false);
  const [rpsSubmenuOpen, setRPSSubmenuOpen] = useState(false);
  const [himajuSubmenuOpen, setHimajuSubmenuOpen] = useState(false);
  const [jadwalSubmenuOpen, setJadwalSubmenuOpen] = useState(false);
  const [absensiSubmenuOpen, setAbsensiSubmenuOpen] = useState(false);

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-oepn-btn"
    ) {
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
  const toggleDosenSubmenu = () => {
    setDosenSubmenuOpen(!dosenSubmenuOpen);
    if (!dosenSubmenuOpen) {
      setActiveMenu("dosen");
      sessionStorage.setItem("activeMenu", "dosen");
    }
  };

  //bimbingan
  const toggleBimbinganSubmenu = () => {
    setBimbinganSubmenuOpen(!bimbinganSubmenuOpen);
    if (!bimbinganSubmenuOpen) {
      setActiveMenu("bimbingan");
      sessionStorage.setItem("activeMenu", "bimbingan");
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

  //himaju
  const toggleHimajuSubmenu = () => {
    setHimajuSubmenuOpen(!himajuSubmenuOpen);
    if (!himajuSubmenuOpen) {
      setActiveMenu("himaju");
      sessionStorage.setItem("activeMenu", "himaju");
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

  //absensi
  const toggleAbsensiSubmenu = () => {
    setAbsensiSubmenuOpen(!absensiSubmenuOpen);
    if (!absensiSubmenuOpen) {
      setActiveMenu("absensi");
      sessionStorage.setItem("activeMenu", "absensi");
    }
  };

  return (
    <>
      {/* Modal */}
      <ModalUbahPasswordDosen
        isOpen={showModal}
        handleClose={handleCloseModal}
      />
      <nav
        className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
        ref={navbarRef}
      >
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
                  to="/dosen"
                  className={`menu-link ${
                    activeMenu === "dashboard" ? "active" : ""
                  }`}
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

              {/*Manage Dosen*/}
              <li className={`menu-item`}>
                <div
                  className={`menu-link ${
                    activeMenu === "dosen" ? "active" : ""
                  }`}
                  onClick={toggleDosenSubmenu}
                >
                  <span className="menu-link-icon">
                    <FaChalkboardTeacher size={20} />
                  </span>
                  <div className="menu">
                    <span className="menu-link-text">Profile Dosen</span>
                  </div>
                  <span
                    className={`submenu-arrow ${
                      dosenSubmenuOpen ? "open" : ""
                    }`}
                  >
                    <MdKeyboardArrowRight
                      size={18}
                      style={{
                        transform: dosenSubmenuOpen ? "rotate(90deg)" : "none",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </span>
                </div>
                {/* Submenu */}
                {dosenSubmenuOpen && (
                  <ul className={`submenu ${dosenSubmenuOpen ? "open" : ""}`}>
                    <li className="submenu-item">
                      <Link
                        to="/dosen/data/dosen"
                        className="submenu-link"
                        onClick={() => handleSubmenuClick("Data Dosen")}
                      >
                        <span className="menu-link-icon">
                          <FaUserFriends size={20} />
                        </span>
                        <div className={`submenu-link-text`}>Data Dosen</div>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/*bimbingan*/}
              <li className={`menu-item`}>
                <div
                  className={`menu-link ${
                    activeMenu === "bimbingan" ? "active" : ""
                  }`}
                  onClick={toggleBimbinganSubmenu}
                >
                  <span className="menu-link-icon">
                    <HiChatBubbleLeftRight size={20} />
                  </span>
                  <div className="menu">
                    <span className="menu-link-text">Bimbingan</span>
                  </div>
                  <span
                    className={`submenu-arrow ${
                      bimbinganSubmenuOpen ? "open" : ""
                    }`}
                  >
                    <MdKeyboardArrowRight
                      size={18}
                      style={{
                        transform: bimbinganSubmenuOpen
                          ? "rotate(90deg)"
                          : "none",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </span>
                </div>
                {/* Submenu */}
                {bimbinganSubmenuOpen && (
                  <ul
                    className={`submenu ${bimbinganSubmenuOpen ? "open" : ""}`}
                  >
                    <li className="submenu-item">
                      <Link
                        to="/dosen/select/mahasiswa"
                        className="submenu-link"
                        onClick={() => handleSubmenuClick("Chat Mahasiswa")}
                      >
                        <span className="menu-link-icon">
                          <AiFillMessage size={20} />
                        </span>
                        <div className={`submenu-link-text`}>
                          Chat Mahasiswa
                        </div>
                      </Link>
                    </li>
                    <li className="submenu-item">
                      <Link
                        to="/dosen/select/mahasiswa/evaluasi"
                        className="submenu-link"
                        onClick={() => handleSubmenuClick("Bimbingan")}
                      >
                        <span className="menu-link-icon">
                          <AiFillMessage size={20} />
                        </span>
                        <div className={`submenu-link-text`}>Bimbingan</div>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/*rps*/}
              <li className={`menu-item`}>
                <div
                  className={`menu-link ${
                    activeMenu === "rps" ? "active" : ""
                  }`}
                  onClick={toggleRPSSubmenu}
                >
                  <span className="menu-link-icon">
                    <IoDocumentAttachSharp size={20} />
                  </span>
                  <div className="menu">
                    <span className="menu-link-text">Manage RPS</span>
                  </div>
                  <span
                    className={`submenu-arrow ${rpsSubmenuOpen ? "open" : ""}`}
                  >
                    <MdKeyboardArrowRight
                      size={18}
                      style={{
                        transform: rpsSubmenuOpen ? "rotate(90deg)" : "none",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </span>
                </div>
                {/* Submenu */}
                {rpsSubmenuOpen && (
                  <ul className={`submenu ${rpsSubmenuOpen ? "open" : ""}`}>
                    <li className="submenu-item">
                      <Link
                        to="/dosen/add/rps"
                        className="submenu-link"
                        onClick={() => handleSubmenuClick("Data RPS")}
                      >
                        <span className="menu-link-icon">
                          <HiDocumentPlus size={20} />
                        </span>
                        <div className={`submenu-link-text`}>Tambah RPS</div>
                      </Link>
                    </li>
                    <li className="submenu-item">
                      <Link
                        to="/dosen/data/rps"
                        className="submenu-link"
                        onClick={() => handleSubmenuClick("RPS")}
                      >
                        <span className="menu-link-icon">
                          <IoDocumentText size={20} />
                        </span>
                        <div className={`submenu-link-text`}>
                          Data RPS
                        </div>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/*himaju*/}
              <li className={`menu-item`}>
                <div
                  className={`menu-link ${
                    activeMenu === "himaju" ? "active" : ""
                  }`}
                  onClick={toggleHimajuSubmenu}
                >
                  <span className="menu-link-icon">
                    <FaPeopleRoof size={20} />
                  </span>
                  <div className="menu">
                    <span className="menu-link-text">Kegiatan Himaju</span>
                  </div>
                  <span
                    className={`submenu-arrow ${
                      himajuSubmenuOpen ? "open" : ""
                    }`}
                  >
                    <MdKeyboardArrowRight
                      size={18}
                      style={{
                        transform: himajuSubmenuOpen ? "rotate(90deg)" : "none",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </span>
                </div>
                {/* Submenu */}
                {himajuSubmenuOpen && (
                  <ul className={`submenu ${himajuSubmenuOpen ? "open" : ""}`}>
                    <li className="submenu-item">
                      <Link to="/dosen/hme" className="submenu-link">
                        <span className="menu-link-icon">
                          <MdWorkspaces size={20} />
                        </span>
                        <div className={`submenu-link-text`}>HME</div>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/*jadwal*/}
              <li className={`menu-item`}>
                <div
                  className={`menu-link ${
                    activeMenu === "jadwal" ? "active" : ""
                  }`}
                  onClick={toggleJadwalSubmenu}
                >
                  <span className="menu-link-icon">
                    <AiFillSchedule size={20} />
                  </span>
                  <div className="menu">
                    <span className="menu-link-text">Jadwal</span>
                  </div>
                  <span
                    className={`submenu-arrow ${
                      jadwalSubmenuOpen ? "open" : ""
                    }`}
                  >
                    <MdKeyboardArrowRight
                      size={18}
                      style={{
                        transform: jadwalSubmenuOpen ? "rotate(90deg)" : "none",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </span>
                </div>
                {/* Submenu */}
                {jadwalSubmenuOpen && (
                  <ul className={`submenu ${jadwalSubmenuOpen ? "open" : ""}`}>
                    <li className="submenu-item">
                      <Link
                        to="/dosen/jadwal"
                        className="submenu-link"
                        onClick={() => handleSubmenuClick("Jadwal")}
                      >
                        <span className="menu-link-icon">
                          <RiCalendarScheduleFill size={20} />
                        </span>
                        <div className={`submenu-link-text`}>Jadwal</div>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/*absensi*/}
              <li className={`menu-item`}>
                <div
                  className={`menu-link ${
                    activeMenu === "absensi" ? "active" : ""
                  }`}
                  onClick={toggleAbsensiSubmenu}
                >
                  <span className="menu-link-icon">
                    <HiMiniClipboardDocumentCheck size={20} />
                  </span>
                  <div className="menu">
                    <span className="menu-link-text">Absensi</span>
                  </div>
                  <span
                    className={`submenu-arrow ${
                      absensiSubmenuOpen ? "open" : ""
                    }`}
                  >
                    <MdKeyboardArrowRight
                      size={18}
                      style={{
                        transform: absensiSubmenuOpen
                          ? "rotate(90deg)"
                          : "none",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </span>
                </div>
                {/* Submenu */}
                {absensiSubmenuOpen && (
                  <ul className={`submenu ${absensiSubmenuOpen ? "open" : ""}`}>
                    <li className="submenu-item">
                      <Link to="/dosen/add/absensi" className="submenu-link">
                        <span className="menu-link-icon">
                          <HiDocumentText size={20} />
                        </span>
                        <div
                          className={`submenu-link-text`}
                          onClick={() => handleSubmenuClick("Buat Absensi")}
                        >
                          Buat Absensi
                        </div>
                      </Link>
                    </li>
                    <li className="submenu-item">
                      <Link to="/dosen/data/absensi" className="submenu-link">
                        <span className="menu-link-icon">
                          <MdDocumentScanner size={20} />
                        </span>
                        <div
                          className={`submenu-link-text`}
                          onClick={() => handleSubmenuClick("Absensi")}
                        >
                          Absensi
                        </div>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/*Ubah Password*/}
              <li className={`menu-item`}>
                <div className={`menu-link`} onClick={handleModal}>
                  <span className="menu-link-icon">
                    <TbPasswordMobilePhone size={20} />
                  </span>
                  <span className="menu-link-text">Ubah Password</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="sidebar-menu sidebar-menu2">
            <ul className="menu-list">
              <li className="menu-item dark-light" onClick={toggleTheme}>
                <div className="menu-link">
                  <button type="button" className="theme-toggle-btn">
                    <span className="theme-icon">
                      {theme === LIGHT_THEME ? (
                        <MdWbSunny size={20} />
                      ) : (
                        <RiMoonClearFill size={20} />
                      )}
                    </span>
                  </button>
                  <span className="menu-link-text">
                    {theme == LIGHT_THEME ? "Light Mode" : "Dark Mode"}
                  </span>
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
    </>
  );
};

export default DosenSidebar;
