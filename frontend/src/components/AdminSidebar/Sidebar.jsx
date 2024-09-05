import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME, DARK_THEME } from "../../constants/themeConstants";
import { MdOutlineClose, MdKeyboardArrowRight, MdWbSunny, MdFormatListBulletedAdd } from "react-icons/md";
import { IoDocumentAttachSharp, IoDocumentText, IoLogOut } from "react-icons/io5";
import { HiDocumentPlus, HiChatBubbleLeftRight, HiMiniClipboardDocumentCheck, HiDocumentText, HiMiniHome } from "react-icons/hi2";
import { HiUserAdd } from "react-icons/hi";
import { PiStudentFill, PiUsersThreeFill, PiMonitorFill  } from "react-icons/pi";
import { AiFillSchedule, AiFillMessage } from "react-icons/ai";
import { MdAssignmentAdd, MdDocumentScanner, MdLock  } from "react-icons/md";
import { BiSolidMessageRoundedAdd } from "react-icons/bi";
import { FaUserFriends, FaChalkboardTeacher } from "react-icons/fa";
import { RiCalendarScheduleFill, RiMoonClearFill, RiDashboardHorizontalFill, RiMailSendFill } from "react-icons/ri";
import LogoBlue from "../../assets/images/logo_blue.png";
import LogoWhite from "../../assets/images/logo_white.png";
import { SidebarContext } from "../../context/SidebarContext";
import Swal from "sweetalert2";
import "./Sidebar.scss";

const AdminSidebar = () => {
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
  const [mahasiswaSubmenuOpen, setMahasiswaSubmenuOpen] = useState(false);
  const [dosenSubmenuOpen, setDosenSubmenuOpen] = useState(false);
  const [evaluasiSubmenuOpen, setEvaluasiSubmenuOpen] = useState(false);
  const [bimbinganSubmenuOpen, setBimbinganSubmenuOpen] = useState(false);
  const [rpsSubmenuOpen, setRPSSubmenuOpen] = useState(false);
  const [jadwalSubmenuOpen, setJadwalSubmenuOpen] = useState(false);
  const [absensiSubmenuOpen, setAbsensiSubmenuOpen] = useState(false);
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

  //mahasiswa
  const toggleMahasiswaSubmenu = () => {
    setMahasiswaSubmenuOpen(!mahasiswaSubmenuOpen);
    if (!mahasiswaSubmenuOpen) {
      setActiveMenu("mahasiswa");
      sessionStorage.setItem("activeMenu", "mahasiswa");
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

  //evaluasi akademik
  const toggleEvaluasiSubmenu = () => {
    setEvaluasiSubmenuOpen(!evaluasiSubmenuOpen);
    if (!evaluasiSubmenuOpen) {
      setActiveMenu("evaluasi");
      sessionStorage.setItem("activeMenu", "evaluasi");
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

            {/*Manage Mahasiswa*/}
            <li className={`menu-item`}>
              <div className={`menu-link ${activeMenu === "mahasiswa" ? "active" : ""}`} onClick={toggleMahasiswaSubmenu}>
                <span className="menu-link-icon">
                  <PiStudentFill size={20} />
                </span>
                <div className="menu">
                  <span className="menu-link-text">Manage Mahasiswa</span>
                </div>
                <span className={`submenu-arrow ${mahasiswaSubmenuOpen ? "open" : ""}`}>
                  <MdKeyboardArrowRight size={18} style={{ transform: mahasiswaSubmenuOpen ? "rotate(90deg)" : "none", transition: "transform 0.3s ease" }} />
                </span>
              </div>
              {/* Submenu */}
              {mahasiswaSubmenuOpen && (
                <ul className={`submenu ${mahasiswaSubmenuOpen ? "open" : ""}`}>
                  <li className="submenu-item">
                    <Link to="/admin/add/mahasiswa" className="submenu-link" onClick={() => handleSubmenuClick("Add Mahasiswa")}>
                      <span className="menu-link-icon">
                        <HiUserAdd size={20} />
                      </span>
                      <div className={`submenu-link-text`}>Add Mahasiswa</div>
                    </Link>
                  </li>
                  <li className="submenu-item">
                    <Link to="/admin/data/mahasiswa" className="submenu-link" onClick={() => handleSubmenuClick("Data Mahasiswa")}>
                      <span className="menu-link-icon">
                        <PiUsersThreeFill size={20} />
                      </span>
                      <div className={`submenu-link-text`}>Data Mahasiswa</div>
                    </Link>
                  </li>
                  <li className="submenu-item">
                    <Link to="/admin/data/kelas" className="submenu-link" onClick={() => handleSubmenuClick("Data Kelas")}>
                      <span className="menu-link-icon">
                        <HiMiniHome size={20} />
                      </span>
                      <div className={`submenu-link-text`}>Data Kelas</div>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/*Manage Dosen*/}
            <li className={`menu-item`}>
              <div className={`menu-link ${activeMenu === "dosen" ? "active" : ""}`} onClick={toggleDosenSubmenu}>
                <span className="menu-link-icon">
                  <FaChalkboardTeacher size={20} />
                </span>
                <div className="menu">
                  <span className="menu-link-text">Manage Dosen</span>
                </div>
                <span className={`submenu-arrow ${dosenSubmenuOpen ? "open" : ""}`}>
                  <MdKeyboardArrowRight size={18} style={{ transform: dosenSubmenuOpen ? "rotate(90deg)" : "none", transition: "transform 0.3s ease" }} />
                </span>
              </div>
              {/* Submenu */}
              {dosenSubmenuOpen && (
                <ul className={`submenu ${dosenSubmenuOpen ? "open" : ""}`}>
                  <li className="submenu-item">
                    <Link to="/admin/add/dosen" className="submenu-link" onClick={() => handleSubmenuClick("Add Dosen")}>
                      <span className="menu-link-icon">
                        <HiUserAdd size={20} />
                      </span>
                      <div className={`submenu-link-text`}>Add Dosen</div>
                    </Link>
                  </li>
                  <li className="submenu-item">
                    <Link to="/admin/data/dosen" className="submenu-link" onClick={() => handleSubmenuClick("Data Dosen")}>
                      <span className="menu-link-icon">
                        <FaUserFriends size={20} />
                      </span>
                      <div className={`submenu-link-text`}>Data Dosen</div>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/*Evaluasi Akademik*/}
            <li className={`menu-item`}>
              <div className={`menu-link ${activeMenu === "evaluasi" ? "active" : ""}`} onClick={toggleEvaluasiSubmenu}>
                <span className="menu-link-icon">
                  <RiMailSendFill size={20} />
                </span>
                <div className="menu">
                  <span className="menu-link-text">Evaluasi Akademik</span>
                </div>
                <span className={`submenu-arrow ${evaluasiSubmenuOpen ? "open" : ""}`}>
                  <MdKeyboardArrowRight size={18} style={{ transform: evaluasiSubmenuOpen ? "rotate(90deg)" : "none", transition: "transform 0.3s ease" }} />
                </span>
              </div>
              {/* Submenu */}
              {evaluasiSubmenuOpen && (
                <ul className={`submenu ${evaluasiSubmenuOpen ? "open" : ""}`}>
                  <li className="submenu-item">
                    <Link to="/admin/evaluasi" className="submenu-link" onClick={() => handleSubmenuClick("Evaluasi")}>
                      <span className="menu-link-icon">
                        <MdFormatListBulletedAdd size={20} />
                      </span>
                      <div className={`submenu-link-text`}>Evaluasi</div>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/*bimbingan*/}
            <li className={`menu-item`}>
              <div className={`menu-link ${activeMenu === "bimbingan" ? "active" : ""}`} onClick={toggleBimbinganSubmenu}>
                <span className="menu-link-icon">
                  <HiChatBubbleLeftRight size={20} />
                </span>
                <div className="menu">
                  <span className="menu-link-text">Manage Bimbingan</span>
                </div>
                <span className={`submenu-arrow ${bimbinganSubmenuOpen ? "open" : ""}`}>
                  <MdKeyboardArrowRight size={18} style={{ transform: bimbinganSubmenuOpen ? "rotate(90deg)" : "none", transition: "transform 0.3s ease" }} />
                </span>
              </div>
              {/* Submenu */}
              {bimbinganSubmenuOpen && (
                <ul className={`submenu ${bimbinganSubmenuOpen ? "open" : ""}`}>
                  <li className="submenu-item">
                    <Link to="/admin/add/bimbingan" className="submenu-link"  onClick={() => handleSubmenuClick("Add Bimbingan")}>
                      <span className="menu-link-icon">
                        <BiSolidMessageRoundedAdd size={20} />
                      </span>
                      <div className={`submenu-link-text`}>
                        Add Bimbingan
                      </div>
                    </Link>
                  </li>
                  <li className="submenu-item">
                    <Link to="/admin/data/bimbingan" className="submenu-link" onClick={() => handleSubmenuClick("Data Bimbingan")}>
                      <span className="menu-link-icon">
                        <AiFillMessage size={20} />
                      </span>
                      <div className={`submenu-link-text`}>
                        Data Bimbingan
                      </div>
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
                  <span className="menu-link-text">Manage RPS</span>
                </div>
                <span className={`submenu-arrow ${rpsSubmenuOpen ? "open" : ""}`}>
                  <MdKeyboardArrowRight size={18} style={{ transform: rpsSubmenuOpen ? "rotate(90deg)" : "none", transition: "transform 0.3s ease" }} />
                </span>
              </div>
              {/* Submenu */}
              {rpsSubmenuOpen && (
                <ul className={`submenu ${rpsSubmenuOpen ? "open" : ""}`}>
                  <li className="submenu-item">
                    <Link to="/admin/add/rps" className="submenu-link" onClick={() => handleSubmenuClick("Tambah RPS")}>
                      <span className="menu-link-icon">
                        <HiDocumentPlus size={20} />
                      </span>
                      <div className={`submenu-link-text`}>Tambah RPS</div>
                    </Link>
                  </li>
                  <li className="submenu-item">
                    <Link to="/admin/daftar/rps" className="submenu-link" onClick={() => handleSubmenuClick("Daftar RPS")}>
                      <span className="menu-link-icon">
                        <IoDocumentText size={20} />
                      </span>
                      <div className={`submenu-link-text`}>Daftar RPS</div>
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
                  <span className="menu-link-text">Manage Jadwal</span>
                </div>
                <span className={`submenu-arrow ${jadwalSubmenuOpen ? "open" : ""}`}>
                  <MdKeyboardArrowRight size={18} style={{ transform: jadwalSubmenuOpen ? "rotate(90deg)" : "none", transition: "transform 0.3s ease" }} />
                </span>
              </div>
              {/* Submenu */}
              {jadwalSubmenuOpen && (
                <ul className={`submenu ${jadwalSubmenuOpen ? "open" : ""}`}>
                  <li className="submenu-item">
                    <Link to="/admin/add/jadwal" className="submenu-link" onClick={() => handleSubmenuClick("Add Jadwal")}>
                      <span className="menu-link-icon">
                        <MdAssignmentAdd size={20} />
                      </span>
                      <div className={`submenu-link-text`}>Add Jadwal</div>
                    </Link>
                  </li>
                  <li className="submenu-item">
                    <Link to="/admin/jadwal" className="submenu-link" onClick={() => handleSubmenuClick("Jadwal")}>
                      <span className="menu-link-icon">
                        <RiCalendarScheduleFill size={20} />
                      </span>
                      <div className={`submenu-link-text`}>Jadwal</div>
                    </Link>
                  </li>
                  <li className="submenu-item">
                    <Link to="/admin/data/matkul" className="submenu-link" onClick={() => handleSubmenuClick("Mata Kuliah")}>
                      <span className="menu-link-icon">
                        <RiCalendarScheduleFill size={20} />
                      </span>
                      <div className={`submenu-link-text`}>Data Matkul</div>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/*absensi*/}
            <li className={`menu-item`}>
              <div className={`menu-link ${activeMenu === "absensi" ? "active" : ""}`} onClick={toggleAbsensiSubmenu}>
                <span className="menu-link-icon">
                  <HiMiniClipboardDocumentCheck size={20} />
                </span>
                <div className="menu">
                  <span className="menu-link-text">Manage Absensi</span>
                </div>
                <span className={`submenu-arrow ${absensiSubmenuOpen ? "open" : ""}`}>
                  <MdKeyboardArrowRight size={18} style={{ transform: absensiSubmenuOpen ? "rotate(90deg)" : "none", transition: "transform 0.3s ease" }} />
                </span>
              </div>
              {/* Submenu */}
              {absensiSubmenuOpen && (
                <ul className={`submenu ${absensiSubmenuOpen ? "open" : ""}`}>
                  <li className="submenu-item">
                    <Link to="/admin-bukti-pembayaran-ukt" className="submenu-link" onClick={() => handleSubmenuClick("Data Absensi")}>
                      <span className="menu-link-icon">
                        <HiDocumentText size={20} />
                      </span>
                      <div className={`submenu-link-text`}>
                        Data Absensi
                      </div>
                    </Link>
                  </li>
                  <li className="submenu-item">
                    <Link to="/admin/jadwal" className="submenu-link" onClick={() => handleSubmenuClick("Absensi")}>
                      <span className="menu-link-icon">
                        <MdDocumentScanner size={20} />
                      </span>
                      <div className={`submenu-link-text`}>
                        Absensi
                      </div>
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
                    <Link to="/admin/monitoring/login" className="submenu-link" onClick={() => handleSubmenuClick("Gagal Login")}>
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

export default AdminSidebar;
