import { Outlet } from "react-router-dom";
import MahasiswaAppBar from "../components/MahasiswaAppBar";
import MahasiswaSidebar from "../components/MahasiswaSidebar/Sidebar";
// import Ornament2 from "../assets/images/ornament2.svg";
// import Ornament3 from "../assets/images/ornament3.svg";
const currentYear = new Date().getFullYear();

const MahasiswaLayout = () => {
  return (
    <main className="mahasiswa-page-wrapper">
      {/*<img src={Ornament2} alt="ornamen2" className="ornament_dua" />*/}
      {/*<img src={Ornament3} alt="ornamen3" className="ornament_tiga" />*/}
      <div className="mahasiswa-content-wrapper">
        <MahasiswaAppBar />
        {/*<MahasiswaAppBar />*/}
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
