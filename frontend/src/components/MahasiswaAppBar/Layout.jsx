import Logo from "../../assets/images/logo_white.png";
import Right from "../../assets/images/right.png";
import ProfileNoImage from "../../assets/images/profile_no_image.png";
import { FaUserCircle } from "react-icons/fa";
import { RiMenu4Fill } from "react-icons/ri";
import { useContext, useEffect, useState, useCallback } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import { useUser } from "../../hooks/userHooks";
import { MahasiswaContext } from "../../context/MahasiswaContext";
import axios from "axios";
import { urlApi, urlStaticAssets } from "../../config";
import "./style.scss";
import { useLoading } from "../../context/LoadingContext";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

// Fungsi delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Layout = () => {
  const { openSidebar } = useContext(SidebarContext);
  const { user } = useUser();
  const { result } = useContext(MahasiswaContext) || {};
  const [detailMahasiswa, setDetailMahasiswa] = useState(null);
  const [hasFoto, setHasFoto] = useState(false);
  const { setLoading, loading } = useLoading();

  const fetchMahasiswaWithDosen = useCallback(async (id) => {
    try {
      const res = await axios.get(
        `${urlApi}/bimbingan/dosen-mahasiswa/${id}/dosen`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setDetailMahasiswa((prevState) => ({
        ...prevState,
        dosenWali: res.data.mahasiswa.dosenWali,
      }));
      setHasFoto(result?.foto); // Menggunakan optional chaining
    } catch (error) {
      console.error("Error fetching mahasiswa with dosen:", error);
    }
  }, [result?.foto]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Menandakan bahwa data sedang dimuat
      if (result) {
        if (result.detailmahasiswas) {
          setDetailMahasiswa(result.detailmahasiswas[0]);
        }
        if (result.id) {
          await fetchMahasiswaWithDosen(result.id);
        }
      }
      await delay(1500); // Tambahkan delay sebelum menyetel loading menjadi false
      setLoading(false);
    };

    fetchData();
  }, [result, fetchMahasiswaWithDosen, setLoading]);

  if (loading) {
    return <LoadingAnimation />;
  }

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
              src={
                hasFoto ? `${urlStaticAssets}/${result?.foto}` : ProfileNoImage
              }
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
                  {detailMahasiswa?.statusMahasiswa ?? "Loading..."}
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
                Dosen Pembimbing
                <span className="app-bar-dosenwali-name">
                  {detailMahasiswa?.dosenWali ?? "Belum ada dosen wali"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout;
