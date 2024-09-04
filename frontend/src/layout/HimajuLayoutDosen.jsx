import HimajuNavbarDosen from "../components/HimajuNavbar/HimajuNavbarDosen";
import About from "../pages/Dosen.Himaju/About/About";
import Footer from "../pages/Dosen.Himaju/Footer/Footer";
import Hero from "../pages/Dosen.Himaju/Hero/Hero";
import Departemen from "../pages/Dosen.Himaju/Departemen/Departemen";
import Galeri from "../pages/Dosen.Himaju/Galeri/Galeri";
import Helmet from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Organisasi from "../pages/Dosen.Himaju/Organisasi/Organisasi";

const HimajuLayoutDosen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "dosen") {
      navigate(`/${sessionStorage.getItem("role")}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>Dosen | HME</title>
      </Helmet>
      <main className="himaju-page-wrapper">
        <HimajuNavbarDosen />
        <div className="container-himaju">
          <Hero />
          <div className="content-himaju">
            <div className="bg-content">
              <div className="body-content">
                <About />
                <Departemen />
                <Organisasi />
                <Galeri />
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HimajuLayoutDosen;
