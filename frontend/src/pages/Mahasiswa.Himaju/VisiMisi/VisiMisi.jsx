import HimajuNavbar from "../../../components/HimajuNavbar/HimajuNavbar";
import Hero from "../Hero/Hero";
import Footer from "../Footer/Footer";
import "./style.scss";

const VisiMisi = () => {
  return (
    <main className="himaju-page-wrapper">
      <HimajuNavbar />
      <div className="container-himaju">
        <Hero title="Visi & Misi" />
        <div className="content-himaju">
          <div className="bg-content">
            <div className="body-content">
              <div className="visi-misi">
                <div className="container">
                  <div className="visi">
                    <p className="title">Visi</p>
                    <p>Appaaaaaa</p>
                  </div>
                  <div className="misi">
                    <p className="title">Misi</p>
                    <p>Appaaaaaa</p>
                  </div>
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

export default VisiMisi;
