import { Link } from "react-router-dom";
import Slider from "react-slick";
import "./style.scss";

import poli_1 from "../../assets/images/poli_1.jpg";
import poli_2 from "../../assets/images/poli_2.jpg";
import poli_3 from "../../assets/images/poli_3.jpeg";

const images = [poli_1, poli_2, poli_3];

const Layout = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="tv-home-lab">
      <div className="tv-home-container">
        <div className="img-section">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="slick-slide">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="img-slider"
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="btn-link">
          <Link to="/tv/home/menu/lab" className="text-section">
            <p className="text">Mulai</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Layout;
