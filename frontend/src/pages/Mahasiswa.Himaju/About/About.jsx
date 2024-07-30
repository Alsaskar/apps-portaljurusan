import "./style.scss";
import logo from "../../../assets/images/logo_hme.png";
import { Link } from "react-router-dom";
import { RiHome4Fill } from "react-icons/ri";
import Foto_Himaju from "../../../assets/images/banner_hme.jpg";

const About = () => {
  return (
    <section className="about">
      <div className="container">
        <div className="quick-link">
          <Link to="/mahasiswa" className="text-home-portal">
            <RiHome4Fill size={16} /> Portal Jurusan
          </Link>
          <p className="garing">/</p>
          <p className="text-profile-himaju">HME</p>
        </div>
        <div className="content">
          <div className="logo">
            <img src={logo} className="logo-img" />
          </div>
          <div className="body">
            <div className="text-profile">
              <p className="title-about">ABOUT US</p>
              <p className="title">Kenali HME lebih dalam, Yuk!</p>
              <p className="desc">
                Himpunan Mahasiswa Elektro (HME), adalah salah satu organisasi
                yang ada di kampus Politeknik Negeri Manado. Dimana menghimpun
                mahasiswa yang ada di Jurusan Teknik Elektro. Setiap anggota
                baru direkrut dalam satu kegiatan tahunan yang memang telah
                menjadi salah satu Program Kerja dari HME Elektro itu sendiri.
                Yang pada saat ini diketuai oleh Asnia Biringang.
              </p>
            </div>
            <img src={Foto_Himaju} alt="hme" className="foto_himaju" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
