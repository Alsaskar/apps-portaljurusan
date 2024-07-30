import HimajuNavbar from "../../../components/HimajuNavbar/HimajuNavbar";
import Hero from "../Hero/Hero";
import Footer from "../Footer/Footer";
import "./style.scss";

const ProgramKerja = () => {
  return (
    <main className="himaju-page-wrapper">
      <HimajuNavbar />
      <div className="container-himaju">
        <Hero title="Program Kerja" />
        <div className="content-himaju">
          <div className="bg-content">
            <div className="body-content">
              <div className="program-kerja">
                <div className="container">
                  <p>Program Kerja</p>
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

export default ProgramKerja;
