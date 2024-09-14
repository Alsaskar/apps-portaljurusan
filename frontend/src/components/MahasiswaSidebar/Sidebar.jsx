import { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import {
  HiChatBubbleLeftRight,
  HiMiniClipboardDocumentCheck,
} from "react-icons/hi2";
import {
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { TbPasswordMobilePhone } from "react-icons/tb";
import { FaPeopleRoof } from "react-icons/fa6";
import { FaDotCircle } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { IoLogOut } from "react-icons/io5";
import { AiFillSchedule } from "react-icons/ai";
import { RiFunctionAddFill } from "react-icons/ri";
import Swal from "sweetalert2";
import { SidebarContext } from "../../context/SidebarContext";
import { MdOutlineClose } from "react-icons/md";
import "./Sidebar.scss";
import { MahasiswaContext } from "../../context/MahasiswaContext";
import ModalUbahPassword from "../../pages/Mahasiswa.UbahPassword/ModalUbahPassword";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();
  const [jadwalSubMenuOpen, setJadwalSubMenuOpen] = useState(false);
  const [bimbinganSubMenuOpen, setBimbinganSubMenuOpen] = useState(false);
  const [dataHiamjuSubMenuOpen, setDataHimajuSubMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [statusHimaju, setStatusHimaju] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleModal = () => {
    setShowModal(true);
  };

  const { isSidebarOpen, closeSidebar, handleSubmenuClick } =
    useContext(SidebarContext);
  const navbarRef = useRef(null);

  const dataMahasiswa = useContext(MahasiswaContext);

  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-mahasiswa-open-btn"
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    if (dataMahasiswa !== null) {
      console.log(dataMahasiswa.result.statusHimaju)
      setStatusHimaju(dataMahasiswa.result.statusHimaju);
    }

    const storedActiveMenu = sessionStorage.getItem("activeMenu");
    if (storedActiveMenu) {
      setActiveMenu(storedActiveMenu);
    } else {
      // Jika tidak ada nilai 'activeMenu' di sessionStorage, maka setel 'dashboard' sebagai nilai default.
      setActiveMenu("dashboard");
      sessionStorage.setItem("activeMenu", "dashboard");
    }

    if (storedActiveMenu === "jadwal") {
      setIsExpanded(false);
    }

    if (storedActiveMenu === "bimbingan") {
      setIsExpanded(false);
    }

    if (storedActiveMenu === "data-himaju") {
      setIsExpanded(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataMahasiswa]);

  const handleLogout = () => {
    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah Anda Yakin Ingin Keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        navigate("/");
      }
    });
  };

  // Set nilai activeMenu ke sessionStorage saat menu diubah
  const handleSetActiveMenu = (menu) => {
    setActiveMenu(menu);
    sessionStorage.setItem("activeMenu", menu); // Simpan nilai ke sessionStorage

    if (menu === "jadwal") {
      setIsExpanded(false);
    }
    if (menu === "bimbingan") {
      setIsExpanded(false);
    }
    if (menu === "data-himaju") {
      setIsExpanded(false);
    }
    setJadwalSubMenuOpen(false);
    setBimbinganSubMenuOpen(false);
    setDataHimajuSubMenuOpen(false);
  };

  const toggleJadwalSubMenu = () => {
    setJadwalSubMenuOpen(!jadwalSubMenuOpen);
  };

  const toggleBimbingaSubMenu = () => {
    setBimbinganSubMenuOpen(!bimbinganSubMenuOpen);
  };

  const toggleDataHimajuSubMenu = () => {
    setDataHimajuSubMenuOpen(!dataHiamjuSubMenuOpen);
  };

  const handleExpandToggle = () => {
    setIsExpanded((prevExpanded) => !prevExpanded);

    if (jadwalSubMenuOpen) {
      setJadwalSubMenuOpen(false);
    }

    if (dataHiamjuSubMenuOpen) {
      setDataHimajuSubMenuOpen(false);
    }

    if (bimbinganSubMenuOpen) {
      setBimbinganSubMenuOpen(false);
    }
  };

  if (statusHimaju !== null) {
    return (
      <>
        {/* Modal */}
        <ModalUbahPassword isOpen={showModal} handleClose={handleCloseModal} />
        <div className={`sidebar-mahasiswa ${isSidebarOpen ? "open" : ""}`}>
          {isSidebarOpen && (
            <div className="sidebar-overlay" onClick={closeSidebar}></div>
          )}
          <div
            className={`sidebar-content-mahasiswa ${
              isSidebarOpen ? "sidebar-mahasiswa-show" : ""
            } ${isExpanded ? "expanded" : ""}`}
            ref={navbarRef}
          >
            <div
              className={`sidebar-head-menu ${
                isExpanded ? "head-expanded" : ""
              }`}
            >
              <p
                className={`sidebar-title-menu ${
                  isExpanded ? "menu-expanded" : ""
                }`}
              >
                Menu
              </p>
              <button className="btn-expanded" onClick={handleExpandToggle}>
                {isExpanded ? (
                  <MdKeyboardDoubleArrowRight
                    className="menu-icon-bar"
                    size={18}
                  />
                ) : (
                  <MdKeyboardDoubleArrowLeft
                    className="menu-icon-bar"
                    size={18}
                  />
                )}
              </button>
              <button className="sidebar-close-btn" onClick={closeSidebar}>
                <MdOutlineClose size={14} />
              </button>
            </div>

            {/* Sidebar menu */}
            <div className="sidebar-body-mahasiswa">
              <div className="sidebar-menu-mahasiswa">
                <ul className="menu-list-mahasiswa">
                  {/* Dashboard */}
                  <li className="menu-item-mahasiswa">
                    <Link
                      to="/mahasiswa"
                      className={`menu-link-mahasiswa ${
                        activeMenu === "dashboard" ? "active" : ""
                      }`}
                      onClick={() => {
                        handleSetActiveMenu("dashboard");
                        handleSubmenuClick("Dashboard");
                      }}
                    >
                      <span className="menu-link-icon-mahasiswa">
                        <RiDashboardHorizontalFill size={18} />
                      </span>
                      <span
                        className={`menu-link-text-mahasiswa ${
                          isExpanded ? "menu-list-expanded" : ""
                        }`}
                      >
                        Beranda
                      </span>
                    </Link>
                  </li>

                  {/* Profile Mahasiswa */}
                  <li className="menu-item-mahasiswa">
                    <Link
                      to="/mahasiswa/profile"
                      className={`menu-link-mahasiswa ${
                        activeMenu === "mahasiswa" ? "active" : ""
                      }`}
                      onClick={() => {
                        handleSetActiveMenu("mahasiswa");
                        handleSubmenuClick("Mahasiswa");
                      }}
                    >
                      <span className="menu-link-icon-mahasiswa">
                        <PiStudentFill size={20} />
                      </span>
                      <span
                        className={`menu-link-text-mahasiswa ${
                          isExpanded ? "menu-list-expanded" : ""
                        }`}
                      >
                        Profile Mahasiswa
                      </span>
                    </Link>
                  </li>

                  {/* Bimbingan */}
                  <li className="menu-item-mahasiswa">
                    <div
                      className={`menu-link-mahasiswa ${
                        activeMenu === "bimbingan" ? "active" : ""
                      }`}
                      onClick={() => {
                        handleSetActiveMenu("bimbingan");
                        toggleBimbingaSubMenu();
                      }}
                    >
                      <span className="menu-link-icon-mahasiswa">
                        <HiChatBubbleLeftRight size={20} />
                      </span>
                      <span
                        className={`menu-link-text-mahasiswa ${
                          isExpanded ? "menu-list-expanded" : ""
                        }`}
                      >
                        Bimbingan Akademik
                      </span>
                      <span
                        className={`submenu-arrow-mahasiswa ${
                          bimbinganSubMenuOpen ? "open" : ""
                        } ${isExpanded ? "menu-list-expanded" : ""}`}
                      >
                        <MdKeyboardArrowRight
                          size={18}
                          style={{
                            transform: bimbinganSubMenuOpen
                              ? "rotate(90deg)"
                              : "none",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      </span>
                    </div>
                    {/* Tampilkan submenu jika himajuSubMenuOpen true */}
                    <ul
                      className={`submenu-list-mahasiswa ${
                        bimbinganSubMenuOpen ? "open" : ""
                      }`}
                    >
                      <div className="divider-list-mahasiswa"></div>
                      <li className="submenu-item-mahasiswa">
                        <Link
                          to="/mahasiswa/bimbingan/dosenwali"
                          className="submenu-link-mahasiswa"
                        >
                          <span className="submenu-link-icon-mahasiswa">
                            <FaDotCircle size={12} />
                          </span>
                          Chat Dosen
                        </Link>
                      </li>
                      <li className="submenu-item-mahasiswa">
                        <Link
                          to="/mahasiswa/buat/evaluasi"
                          className="submenu-link-mahasiswa"
                        >
                          <span className="submenu-link-icon-mahasiswa">
                            <FaDotCircle size={12} />
                          </span>
                          Buat Evaluasi
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* Himaju */}
                  <li className="menu-item-mahasiswa">
                    <Link
                      to="/mahasiswa/hme"
                      className={`menu-link-mahasiswa ${
                        activeMenu === "himaju" ? "active" : ""
                      }`}
                      onClick={() => {
                        handleSetActiveMenu("himaju");
                        handleSubmenuClick("Himaju");
                      }}
                    >
                      <span className="menu-link-icon-mahasiswa">
                        <FaPeopleRoof size={20} />
                      </span>
                      <span
                        className={`menu-link-text-mahasiswa ${
                          isExpanded ? "menu-list-expanded" : ""
                        }`}
                      >
                        HME
                      </span>
                    </Link>
                  </li>

                  {/* Data Himaju */}
                  {statusHimaju === "ketua" && (
                    <li className="menu-item-mahasiswa">
                      <div
                        className={`menu-link-mahasiswa ${
                          activeMenu === "data-himaju" ? "active" : ""
                        }`}
                        onClick={() => {
                          handleSetActiveMenu("data-himaju");
                          toggleDataHimajuSubMenu();
                        }}
                      >
                        <span className="menu-link-icon-mahasiswa">
                          <RiFunctionAddFill size={20} />
                        </span>
                        <span
                          className={`menu-link-text-mahasiswa ${
                            isExpanded ? "menu-list-expanded" : ""
                          }`}
                        >
                          Data HME
                        </span>
                        <span
                          className={`submenu-arrow-mahasiswa ${
                            dataHiamjuSubMenuOpen ? "open" : ""
                          } ${isExpanded ? "menu-list-expanded" : ""}`}
                        >
                          <MdKeyboardArrowRight
                            size={18}
                            style={{
                              transform: dataHiamjuSubMenuOpen
                                ? "rotate(90deg)"
                                : "none",
                              transition: "transform 0.3s ease",
                            }}
                          />
                        </span>
                      </div>
                      {/* Tampilkan submenu jika himajuSubMenuOpen true */}
                      <ul
                        className={`submenu-list-mahasiswa ${
                          dataHiamjuSubMenuOpen ? "open" : ""
                        }`}
                      >
                        <div className="divider-list-mahasiswa"></div>
                        <li className="submenu-item-mahasiswa">
                          <Link
                            to="/mahasiswa/profile/hme"
                            className="submenu-link-mahasiswa"
                          >
                            <span className="submenu-link-icon-mahasiswa">
                              <FaDotCircle size={12} />
                            </span>
                            Profile HME
                          </Link>
                        </li>
                        <li className="submenu-item-mahasiswa">
                          <Link
                            to="/mahasiswa/data/hme"
                            className="submenu-link-mahasiswa"
                          >
                            <span className="submenu-link-icon-mahasiswa">
                              <FaDotCircle size={12} />
                            </span>
                            Data Mahasiswa HME
                          </Link>
                        </li>
                        <li className="submenu-item-mahasiswa">
                          <Link
                            to="/mahasiswa/buat/program/kerja/hme"
                            className="submenu-link-mahasiswa"
                          >
                            <span className="submenu-link-icon-mahasiswa">
                              <FaDotCircle size={12} />
                            </span>
                            Program Kerja HME
                          </Link>
                        </li>
                        <li className="submenu-item-mahasiswa">
                          <Link
                            to="/mahasiswa/galeri/hme"
                            className="submenu-link-mahasiswa"
                          >
                            <span className="submenu-link-icon-mahasiswa">
                              <FaDotCircle size={12} />
                            </span>
                            Galeri
                          </Link>
                        </li>
                      </ul>
                    </li>
                  )}

                  {/* Jadwal */}
                  <li className="menu-item-mahasiswa">
                    <div
                      className={`menu-link-mahasiswa ${
                        activeMenu === "jadwal" ? "active" : ""
                      }`}
                      onClick={() => {
                        handleSetActiveMenu("jadwal");
                        toggleJadwalSubMenu();
                      }}
                    >
                      <span className="menu-link-icon-mahasiswa">
                        <AiFillSchedule size={20} />
                      </span>
                      <span
                        className={`menu-link-text-mahasiswa ${
                          isExpanded ? "menu-list-expanded" : ""
                        }`}
                      >
                        Jadwal Kuliah
                      </span>
                      <span
                        className={`submenu-arrow-mahasiswa ${
                          jadwalSubMenuOpen ? "open" : ""
                        } ${isExpanded ? "menu-list-expanded" : ""}`}
                      >
                        <MdKeyboardArrowRight
                          size={18}
                          style={{
                            transform: jadwalSubMenuOpen
                              ? "rotate(90deg)"
                              : "none",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      </span>
                    </div>
                    {/* Tampilkan submenu jika himajuSubMenuOpen true */}
                    <ul
                      className={`submenu-list-mahasiswa ${
                        jadwalSubMenuOpen ? "open" : ""
                      }`}
                    >
                      <div className="divider-list-mahasiswa"></div>
                      <li className="submenu-item-mahasiswa">
                        <Link
                          to="/mahasiswa/jadwal"
                          className="submenu-link-mahasiswa"
                        >
                          <span className="submenu-link-icon-mahasiswa">
                            <FaDotCircle size={12} />
                          </span>
                          Jadwal
                        </Link>
                      </li>
                      <li className="submenu-item-mahasiswa">
                        <Link
                          to="/mahasiswa/jadwalku"
                          className="submenu-link-mahasiswa"
                        >
                          <span className="submenu-link-icon-mahasiswa">
                            <FaDotCircle size={12} />
                          </span>
                          Jadwal Ku
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* Absensi */}
                  <li className="menu-item-mahasiswa">
                    <Link
                      to="/mahasiswa/absensi"
                      className={`menu-link-mahasiswa ${
                        activeMenu === "absensi" ? "active" : ""
                      }`}
                      onClick={() => {
                        handleSetActiveMenu("absensi");
                        handleSubmenuClick("Absensi");
                      }}
                    >
                      <span className="menu-link-icon-mahasiswa">
                        <HiMiniClipboardDocumentCheck size={20} />
                      </span>
                      <span
                        className={`menu-link-text-mahasiswa ${
                          isExpanded ? "menu-list-expanded" : ""
                        }`}
                      >
                        Absensi
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="sidebar-menu-mahasiswa2">
                <ul className="menu-list-mahasiswa">
                  {/* Ubah Password */}
                  <li className="menu-item-mahasiswa ubah-password-mahasiswa">
                    <div
                      className={`menu-link-mahasiswa`}
                      onClick={() => {
                        handleModal(true);
                      }}
                    >
                      <span className="menu-link-icon-mahasiswa">
                        <TbPasswordMobilePhone size={20} />
                      </span>
                      <span
                        className={`menu-link-text-mahasiswa ${
                          isExpanded ? "menu-list-expanded" : ""
                        }`}
                      >
                        Ubah Password
                      </span>
                    </div>
                  </li>

                  {/* Logout */}
                  <li
                    className="menu-item-mahasiswa logout-mahasiswa"
                    onClick={handleLogout}
                  >
                    <div className={`menu-link-mahasiswa`}>
                      <span className="menu-link-icon-mahasiswa">
                        <IoLogOut size={20} />
                      </span>
                      <span
                        className={`menu-link-text-mahasiswa logout-text ${
                          isExpanded ? "logout-expanded" : ""
                        }`}
                      >
                        Logout
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default Sidebar;
