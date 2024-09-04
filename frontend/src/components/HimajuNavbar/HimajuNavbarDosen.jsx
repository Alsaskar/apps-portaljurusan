import { useEffect, useState, useRef } from "react";
import { RiMenu4Fill } from "react-icons/ri";
import "./style.scss";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";

const NavbarHimajuDosen = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const modalRef = useRef(null);

  

 

  

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideModal);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  return (
    <nav className={scrolling ? "navbar scrolled" : "navbar"}>
      <div className="content">
        <div className="logo-link">
          <a href="/dosen/hme" className="logo">
            <p className={scrolling ? "text-logo scrolled-text" : "text-logo"}>
              HME<span className="logo-two">Elektro</span>
            </p>
          </a>
        </div>

        <div className="nav-links">
          <ul className="menu-list">
            <li>
              <Link
                to="/dosen/hme"
                className={
                  scrolling
                    ? "menu-links-items scrolled-text"
                    : "menu-links-items"
                }
              >
                Beranda
              </Link>
            </li>
            <li className="profile-menu">
              <div
                className={
                  scrolling
                    ? "menu-links-items scrolled-text"
                    : "menu-links-items"
                }
              >
                <span>Profil </span>
                <MdKeyboardArrowDown size={20} />
              </div>
              <ul className="submenu">
                <li className="submenu-item">
                  <Link to="/hme/visi/misi" className="submenu-link">
                    Visi & Misi
                  </Link>
                </li>

                <li className="submenu-item">
                  <Link to="/program/kerja/hme" className="submenu-link">
                    Link apa?
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to="/program/kerja/hme"
                className={
                  scrolling
                    ? "menu-links-items scrolled-text"
                    : "menu-links-items"
                }
              >
                Program Kerja
              </Link>
            </li>
            <li>
              <Link
                to="/hme/all/galeri"
                className={
                  scrolling
                    ? "menu-links-items scrolled-text"
                    : "menu-links-items"
                }
              >
                Galeri
              </Link>
            </li>
          </ul>
        </div>

        <div
          className={scrolling ? "menu scrolled-bg" : "menu"}
          onClick={toggleModal}
        >
          <RiMenu4Fill />

          {/* Modal */}
          {modalOpen && (
            <div className="modal-daftar fade-in" ref={modalRef}>
              <div className="modal-content-daftar fade-in">
                <ul className="submenu">
                  <li className="submenu-list">
                    <a href="#hero" className="submmenu-link">
                      Beranda
                    </a>
                  </li>
                  <li className="submenu-list">
                    <a href="#profile" className="submmenu-link">
                      Profile
                    </a>
                  </li>
                  <li className="submenu-list">
                    {status === "terima" && (
                      <a href="#program-kerja" className="submmenu-link">
                        Program Kerja
                      </a>
                    )}
                  </li>
                  <li className="submenu-list">
                    <a href="#galeri" className="submmenu-link">
                      Galeri
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarHimajuDosen;
