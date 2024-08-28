import { Outlet } from "react-router-dom";
import MahasiswaAppBar from "../components/MahasiswaAppBar";
import MahasiswaSidebar from "../components/MahasiswaSidebar/Sidebar";
import { useLoading } from '../context/LoadingContext';
import LoadingAnimation from "../components/LoadingAnimation/LoadingAnimation";

const currentYear = new Date().getFullYear();

const MahasiswaLayout = () => {
  const { loading } = useLoading();
  return (
    <main className="mahasiswa-page-wrapper">
      {loading && <LoadingAnimation />}
      <div className="mahasiswa-content-wrapper">
        <MahasiswaAppBar />
        <div className="mahasiswa-container-wrapper">
          <MahasiswaSidebar />
          <div className="layout-mahasiswa">
            <Outlet />
          </div>
        </div>
      </div>

      <footer className="footer-mahasiswa">
        <p className="text-footer-mahasiswa">© {currentYear} - Teknik Elektro.</p>
      </footer>
    </main>
  );
};

export default MahasiswaLayout;
