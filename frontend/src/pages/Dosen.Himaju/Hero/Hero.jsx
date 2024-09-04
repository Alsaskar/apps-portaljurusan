import PropTypes from 'prop-types';
import "./style.scss";

const Hero = ({ title }) => {
  return (
    <section className="hero">
      <div className="container-himaju">
        <div className="overlay-himaju"></div>
        <div className="title-section">
          <p className="title">{title || "Himpunan Mahasiswa Elektro (HME)"}</p>
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  title: PropTypes.string,
};

export default Hero;
