import HimajuNavbar from "../components/HimajuNavbar/HimajuNavbar";
import About from "../pages/Mahasiswa.Himaju/About/About";
import Footer from "../pages/Mahasiswa.Himaju/Footer/Footer";
import Hero from "../pages/Mahasiswa.Himaju/Hero/Hero";
import Departemen from "../pages/Mahasiswa.Himaju/Departemen/Departemen";
import Galeri from "../pages/Mahasiswa.Himaju/Galeri/Galeri";
import Helmet from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HimajuLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "mahasiswa") {
      navigate(`/${sessionStorage.getItem("role")}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>Mahasiswa | HME</title>
      </Helmet>
      <main className="himaju-page-wrapper">
        <HimajuNavbar />
        <div className="container-himaju">
          <Hero />
          <div className="content-himaju">
            <div className="bg-content">
              <div className="body-content">
                <About />
                <Departemen />
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

export default HimajuLayout;
