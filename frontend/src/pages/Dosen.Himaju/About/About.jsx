import "./style.scss";
import { useState, useEffect } from "react";
import logo from "../../../assets/images/logo_hme.png";
import { Link } from "react-router-dom";
import { RiHome4Fill } from "react-icons/ri";
import axios from "axios";
import { urlApi } from "../../../config";
import DOMPurify from "dompurify";

const About = () => {
  const [profil, setProfil] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProfil = async () => {
      try {
        const res = await axios.get(`${urlApi}/himaju/profil`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        setProfil(res.data.profil);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile");
      } finally {
        setIsLoading(false);
      }
    };

    getProfil();
  }, []);

  if (isLoading) return <p></p>; // Menampilkan teks loading
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="about">
      <div className="container">
        <div className="quick-link">
          <Link to="/dosen" className="text-home-portal">
            <RiHome4Fill size={16} /> Portal Jurusan
          </Link>
          <p className="garing">/</p>
          <p className="text-profile-himaju">HME</p>
        </div>
        <div className="content">
          <div className="logo">
            <img src={logo} className="logo-img" alt="HME Logo" />
          </div>
          <div className="body">
            <div className="text-profile">
              <p className="title">Tentang HME</p>
              {profil && profil.deskripsi && profil.deskripsi.length > 0 ? (
                <div className="text-desc">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(profil.deskripsi),
                    }}
                    className="desc"
                  />
                </div>
              ) : (
                <p className="no-data-center">Belum ada profile.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
