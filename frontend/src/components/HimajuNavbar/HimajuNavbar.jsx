import { useEffect, useState, useRef, useContext } from "react";
import { RiMenu4Fill } from "react-icons/ri";
import "./style.scss";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi } from "../../config";
import { MahasiswaContext } from "../../context/MahasiswaContext";

const NavbarHimaju = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const modalRef = useRef(null);
  const dataMahasiswa = useContext(MahasiswaContext);

  const handelDaftar = async() => {
    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah Anda Yakin Ingin Daftar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then(async (result) => {
      if(result.isConfirmed){
        try {
          const mahasiswa = dataMahasiswa.result;
    
          const res = await axios.post(
            `${urlApi}/himaju`,
            {
              idMahasiswa: mahasiswa.id,
              fullname: mahasiswa.fullname,
              status: 'pending'
            },
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          );
    
          if (res.data.success) {
            Swal.fire(
              "Berhasil!",
              `Anda berhasil mendaftar himaju`,
              "success"
            );
    
            setTimeout(() => {
              window.location.reload()
            }, 1000)
          } else {
            Swal.fire("Oppsss...!", `${res.data.message}`, "error");
          }
        } catch (err) {
          Swal.fire("Error!", err.response.data.message, "error");
        }
      }
      
    });
  };

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
            <li>
              <Link
                to="/mahasiswa/hme"
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
                    Program Kerja
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/hme/all/galeri"
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
          <button className="daftar" onClick={handelDaftar}>
            Daftar HME
          </button>
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

export default NavbarHimaju;
