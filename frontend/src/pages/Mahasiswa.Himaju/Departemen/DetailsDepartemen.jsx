import { useParams } from "react-router-dom";
import HimajuNavbar from "../../../components/HimajuNavbar/HimajuNavbar";
import Hero from "../Hero/Hero";
import Footer from "../Footer/Footer";
import './detailDepartemen.scss';

const departmentDetails = {
  HUMAS: "Informasi mengenai HUMAS.",
  Koderisasi: "Informasi mengenai Koderisasi.",
  Kesekretariatan: "Informasi mengenai Kesekretariatan.",
  Kerohanian: "Informasi mengenai Kerohanian.",
  MinatBakat: "Informasi mengenai Minat Bakat.",
  Kewirausahaan: "Informasi mengenai Kewirausahaan.",
  Delegasi: "Informasi mengenai Delegasi.",
};

const DepartmentDetail = () => {
  const { title } = useParams();
  const details = departmentDetails[title] || "Detail tidak ditemukan";

  return (
    <main className="himaju-page-wrapper">
      <HimajuNavbar />
      <div className="container-himaju">
        <Hero title={title} />
        <div className="content-himaju">
          <div className="bg-content">
            <div className="body-content">
              <div className="detail-departemen">
                <div className="container">
                <p className="title">{title}</p>
                <p>{details}</p>
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

export default DepartmentDetail;
