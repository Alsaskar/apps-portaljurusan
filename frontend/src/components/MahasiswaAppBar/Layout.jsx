import Logo from "../../assets/images/logo_white.png";
import Right from "../../assets/images/right.png";
import ProfileMahasiswa from "../../assets/images/foto.jpg";
import { FaUserCircle } from "react-icons/fa";
import { RiMenu4Fill } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import { useUser } from "../../hooks/userHooks";
import "./style.scss";
import { MahasiswaContext } from "../../context/MahasiswaContext";

const Layout = () => {
  const { openSidebar } = useContext(SidebarContext);
  const { user } = useUser();
  const dataMahasiswa = useContext(MahasiswaContext);
  const [detailMahasiswa, setDetailMahasiswa] = useState(null);

  useEffect(() => {
    if (dataMahasiswa !== null) {
      setDetailMahasiswa(dataMahasiswa.result.detailmahasiswas[0]);
    }
  }, [dataMahasiswa]);

  if (dataMahasiswa !== null && detailMahasiswa !== null) {
    return (
      <section className="app-bar-mahasiswa">
        <img src={Right} alt="right" className="right" />
        <div className="app-bar-mahasiswa-container">
          {/*head*/}
          <div className="app-bar-head-mahasiswa">
            <div className="app-bar-mahasiswa-logo">
              <img src={Logo} alt="logo" className="logo-portal-mahasiswa" />
              <p className="logo-title-mahasiswa">Eduvate</p>
            </div>
            <div className="app-bar-user">
              <div className="app-bar-name">
                <p className="app-bar-welcome-user">
                  Hi, <span className="text-name-bold">{user.fullname}</span>
                </p>
                <FaUserCircle size={19} className="user-icon-mahasiswa" />
                <button
                  type="button"
                  onClick={openSidebar}
                  className="user-icon-bg-mahasiswa"
                >
                  <RiMenu4Fill
                    size={14}
                    className="user-icon-menu-mahasiswa sidebar-mahasiswa-open-btn"
                  />
                </button>
              </div>
            </div>
          </div>

          {/*details mahasiswa*/}
          <div className="app-bar-details-mahasiswa">
            <div className="app-bar-details-info-mahasiswa">
              <img
                src={ProfileMahasiswa}
                alt="profile mahasiswa"
                className="profile-mahasiswa"
              />
              <div className="app-bar-info-mahasiswa">
                <div className="app-bar-details">
                  <p className="app-bar-title-name">{user.fullname}</p>
                  <p className="app-bar-nim">{user.username}</p>
                  <p className="app-bar-email">{user.email}</p>
                </div>
                <div className="app-bar-status">
                  <span className="app-bar-border-status">
                    {detailMahasiswa.statusMahasiswa === null
                      ? "Loading..."
                      : detailMahasiswa.statusMahasiswa}
                  </span>
                </div>
              </div>
              <div className="app-bar-border-left"></div>
              <div className="app-bar-info-kanan">
                <div className="app-bar-info-kanan-card">
                  <div className="app-bar-card">
                    <p className="app-bar-card-title">Mata Kuliah</p>
                    <p className="app-bar-card-value">10</p>
                  </div>
                  <div className="app-bar-card">
                    <p className="app-bar-card-title">Dosen</p>
                    <p className="app-bar-card-value">46</p>
                  </div>
                  <div className="app-bar-card">
                    <p className="app-bar-card-title">Mahasiswa</p>
                    <p className="app-bar-card-value">1100</p>
                  </div>
                </div>
                <p className="app-bar-dosenwali">
                  Dosen Wali{" "}
                  <span className="app-bar-dosenwali-name">
                    Asep Napi Rudon
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return null;
  }
};

export default Layout;
