import { Link } from "react-router-dom";
import "./style.scss";
import { FaLongArrowAltRight } from "react-icons/fa";
import GaleriFoto from '../../../assets/images/banner_hme.jpg';

const Galeri = () => {
  return (
    <div className="galeri">
      <div className="container">
        <p className="title">Galeri</p>
        <div className="galeri-section">
            <img src={GaleriFoto} alt="img" className="galeri-foto" />
        </div>
          <Link to="/hme/all/galeri" className="btn-all-galeri">
            <p>Lihat Semua</p> <FaLongArrowAltRight size={20} />
          </Link>
      </div>
    </div>
  );
};

export default Galeri;
