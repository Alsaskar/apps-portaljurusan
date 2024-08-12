import HimajuNavbar from "../../../components/HimajuNavbar/HimajuNavbar";
import { useState, useEffect } from "react";
import Hero from "../Hero/Hero";
import Footer from "../Footer/Footer";
import "./style.scss";
import axios from "axios";
import { urlApi } from "../../../config";

const VisiMisi = () => {
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

  if (isLoading) return <div className="loading-spinner"></div>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="himaju-page-wrapper">
      <HimajuNavbar />
      <div className="container-himaju">
        <Hero title="Visi & Misi" />
        <div className="content-himaju">
          <div className="bg-content">
            <div className="body-content">
              <div className="visi-misi">
                {profil && profil.visi && profil.misi ? (
                  <div className="container">
                    <div className="visi">
                      <p className="title-visi-misi">Visi</p>
                      <p className="desc-visi-misi">{profil.visi}</p>
                    </div>
                    <div className="divider"></div>
                    <div className="misi">
                      <p className="title-visi-misi">Misi</p>
                      <ul className="desc-visi-misi">
                        {profil.misi.split("| ").map((misi, index) => (
                          <li key={index} className="list-misi">{misi}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="no-data-visi-misi">Visi dan Misi belum ada.</p>
                )}
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
