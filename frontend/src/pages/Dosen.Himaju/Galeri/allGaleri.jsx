import { useEffect, useState } from "react";
import HimajuNavbar from "../../../components/HimajuNavbar/HimajuNavbar";
import Hero from "../Hero/Hero";
import Footer from "../Footer/Footer";
import axios from "axios";
import { urlApi, urlStatic } from "../../../config"; // Import urlStatic
import placeholderImage from "../../../assets/images/foto.jpg"; // Import gambar placeholder
import "./allGaleri.scss";

const AllGaleri = () => {
  const [galeri, setGaleri] = useState([]);

  useEffect(() => {
    const fetchGaleri = async () => {
      try {
        const response = await axios.get(`${urlApi}/galeri`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });

        // Menambahkan URL gambar yang benar atau placeholder jika tidak ada
        const updatedGaleri = response.data.result.map((item) => ({
          ...item,
          foto: item.foto
            ? `${urlStatic}/${item.foto}` // Menggunakan urlStatic
            : placeholderImage, // Gambar placeholder
        }));

        setGaleri(updatedGaleri);
      } catch (error) {
        console.error("Error fetching galeri:", error);
      }
    };

    fetchGaleri();
  }, []);

  return (
    <main className="himaju-page-wrapper">
      <HimajuNavbar />
      <div className="container-himaju">
        <Hero title="Galeri" />
        <div className="content-himaju">
          <div className="bg-content">
            <div className="body-content">
              <div className="all-galeri">
                <div className="container">
                  <p className="title">Galeri HME</p>
                  <p className="desc">Beberapa foto kegiatan yang dilakukan HME</p>
                  <div className="galeri-section">
                    {galeri.length > 0 ? (
                      galeri.map((item) => (
                        <div key={item.id} className="galeri-foto-container">
                          <img
                            src={item.foto} 
                            alt={item.title}
                            className="galeri-foto"
                          />
                          <div className="overlay-galeri">
                            <p className="overlay-text">{item.title}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No images available</p>
                    )}
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

export default AllGaleri;