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
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const modalRef = useRef(null);
  const dataMahasiswa = useContext(MahasiswaContext);

  const checkStatus = async () => {
    if (!dataMahasiswa?.result?.id) {
      console.error("Mahasiswa data is not available");
      return;
    }

    try {
      const mahasiswaId = dataMahasiswa.result.id;
      const res = await axios.get(`${urlApi}/himaju/cekStatus/${mahasiswaId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      setStatus(res.data.status);

      if (res.data.status === "ditolak") {
        Swal.fire({
          title: "Status Pendaftaran",
          text: "Anda ditolak menjadi anggota HME.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else if (res.data.status === "pending") {
        Swal.fire({
          title: "Status Pendaftaran",
          text: "Pendaftaran Anda sedang dalam proses. Silahkan menunggu konfirmasi.",
          icon: "info",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      console.error(
        "Error checking status:",
        err.response ? err.response.data.message : err.message
      );
    } finally {
      setLoading(false); // Set loading to false once the status check is done
    }
  };

  const handleDaftar = async (status) => {
    if (!dataMahasiswa?.result?.id || !dataMahasiswa?.result?.fullname) {
      console.error("Mahasiswa data is not available");
      return;
    }

    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah Anda Yakin Ingin Daftar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const mahasiswa = dataMahasiswa.result;

          const res = await axios.post(
            `${urlApi}/himaju`,
            {
              idMahasiswa: mahasiswa.id,
              fullname: mahasiswa.fullname,
              status: status,
            },
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          );

          if (res.data.success) {
            setTimeout(() => {
              window.location.reload();
            }, 1500);

            Swal.fire(
              "Berhasil!",
              `Anda berhasil mendaftar HME. Cek untuk melihat status pendaftaran.`,
              "success"
            );
          } else {
            Swal.fire("Oppsss...!", `${res.data.message}`, "error");
          }
        } catch (err) {
          Swal.fire("Error!", err.response.data.message, "error");
        }
      }
    });
  };

  const handelIfAnggota = () => {
    Swal.fire({
      title: "Anggota!",
      text: "Anda adalah anggota HME.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  useEffect(() => {
    const checkInitialStatus = async () => {
      if (!dataMahasiswa?.result?.id) {
        console.error("Mahasiswa data is not available");
        return;
      }

      try {
        const mahasiswaId = dataMahasiswa.result.id;
        const res = await axios.get(
          `${urlApi}/himaju/cekStatus/${mahasiswaId}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        setStatus(res.data.status); // Update status based on response
      } catch (err) {
        console.error(
          "Error fetching initial status:",
          err.response ? err.response.data.message : err.message
        );
      } finally {
        setLoading(false); // Set loading to false once the status check is done
      }
    };

    checkInitialStatus();
  }, [dataMahasiswa]);

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
          {loading ? null : (
            <>
              {status === null && (
                <button
                  className="daftar"
                  onClick={() => {
                    handleDaftar("pending");
                  }}
                >
                  Daftar HME
                </button>
              )}
              {(status === "ditolak" || status === "pending") && (
                <button className="check-status" onClick={checkStatus}>
                  Cek Status
                </button>
              )}
              {status === "terima" && (
                <button className="anggota" onClick={handelIfAnggota}>
                  Anggota
                </button>
              )}
              {status === "dikeluarkan" && (
                <button
                  className="daftar"
                  onClick={() => {
                    handleDaftar("dikeluarkan");
                  }}
                >
                  Daftar HME
                </button>
              )}
            </>
          )}
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

export default NavbarHimaju;
