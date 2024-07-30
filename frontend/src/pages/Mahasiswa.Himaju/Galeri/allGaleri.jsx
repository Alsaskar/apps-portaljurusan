import HimajuNavbar from "../../../components/HimajuNavbar/HimajuNavbar";
import Hero from "../Hero/Hero";
import Footer from "../Footer/Footer";
import "./allGaleri.scss";

const AllGaleri = () => {
  return (
    <main className="himaju-page-wrapper">
      <HimajuNavbar />
      <div className="container-himaju">
        <Hero title="Galeri" />
        <div className="content-himaju">
          <div className="bg-content">
            <div className="body-content">
              <div className="all-galeri">
                <div className="container">
                  <p>Galeri</p>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AllGaleri;
