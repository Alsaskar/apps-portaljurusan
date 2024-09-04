import "./style.scss";
import { FaFacebookSquare } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-hme">
      <div className="overlay-footer"></div>
      <div className="container">
        <div className="copy-right-hme">
          <p className="title">Himpunan Mahasiswa Elektro</p>
          <div className="links-social">
            <a href="https://www.instagram.com/hme_polimdo/" target="_blank" rel="noopener noreferrer" className="links">
              <RiInstagramFill size={23} />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer" className="links">
              <FaFacebookSquare  size={20} />
            </a>
          </div>
          <div className="divider-hme"></div>
          <p className="copy-text-hme">Copyright © {currentYear} - Portal Jurusan</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
