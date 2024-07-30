import { useEffect, useState, useRef } from "react";
import { RiMenu4Fill } from "react-icons/ri";
import "./style.scss";
import ModalDaftar from "../../pages/Mahasiswa.Himaju/ModalDaftar/ModalDaftar";

const NavbarHimaju = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const modalRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  }

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
    // Menambahkan event listener untuk menutup modal ketika klik di luar modal
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
          <a href="/mahasiswa/hme" className="logo">
            <p className={scrolling ? "text-logo scrolled-text" : "text-logo"}>
              HME<span className="logo-two">Elektro</span>
            </p>
          </a>
        </div>

        <div className="nav-links">
          <ul className="menu-list">
            <li className="">
              <a href="#hero" className={scrolling ? "menu-links-items scrolled-text" : "menu-links-items"}>
                Beranda
              </a>
            </li>
            <li>
              <a href="#profile" className={scrolling ? "menu-links-items scrolled-text" : "menu-links-items"}>
                Profil
              </a>
            </li>
            <li>
              <a href="#visi&misi" className={scrolling ? "menu-links-items scrolled-text" : "menu-links-items"}>
                Visi & Misi
              </a>
            </li>
          </ul>
          <button className="daftar" onClick={handleModal}>Daftar HME</button>
        </div>

        <ModalDaftar isOpen={showModal} onClose={() => setShowModal(false)} />

        <div className={scrolling ? "menu scrolled-bg" : "menu"} onClick={toggleModal}>
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
                    <a href="#visi&misi" className="submmenu-link">
                      Visi & Misi
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

export default NavbarHimaju;
