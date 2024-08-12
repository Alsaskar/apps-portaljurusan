import Logo from "../../assets/images/logo_white.png";
import Right from "../../assets/images/right.png";
import ProfileMahasiswa from "../../assets/images/foto.jpg";
import { FaUserCircle } from "react-icons/fa";
import { RiMenu4Fill } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import { useUser } from "../../hooks/userHooks";
import { MahasiswaContext } from "../../context/MahasiswaContext";
import "./style.scss";

const Layout = () => {
  const { openSidebar } = useContext(SidebarContext);
  const { user } = useUser();
  const { result } = useContext(MahasiswaContext) || {};
  const [detailMahasiswa, setDetailMahasiswa] = useState(null);

  useEffect(() => {
    if (result && result.detailmahasiswas) {
      setDetailMahasiswa(result.detailmahasiswas[0]);
    }
  }, [result]);

  if (!detailMahasiswa) {
    return null;
  }

  return (
    <section className="app-bar-mahasiswa">
      <img src={Right} alt="right" className="right" />
      <div className="app-bar-mahasiswa-container">
        {/* head */}
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

        {/* details mahasiswa */}
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
                  {detailMahasiswa.statusMahasiswa ?? "Loading..."}
                </span>
              </div>
            </div>
            <div className="app-bar-border-left"></div>
            <div className="app-bar-info-kanan">
              <div className="app-bar-info-kanan-card">
                {["Mata Kuliah", "Dosen", "Mahasiswa"].map((title, index) => (
                  <div key={index} className="app-bar-card">
                    <p className="app-bar-card-title">{title}</p>
                    <p className="app-bar-card-value">
                      {[10, 46, 1100][index]}
                    </p>
                  </div>
                ))}
              </div>
              <p className="app-bar-dosenwali">
                Dosen Wali
                <span className="app-bar-dosenwali-name"> Masukan Nama Dosen Wali</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout;
