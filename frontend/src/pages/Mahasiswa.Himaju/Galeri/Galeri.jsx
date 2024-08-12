import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.scss";
import { FaLongArrowAltRight } from "react-icons/fa";
import { urlApi, urlStatic } from "../../../config"; // Import urlStatic
import placeholderImage from "../../../assets/images/foto.jpg"; // Import gambar placeholder

const Galeri = () => {
  const [galeri, setGaleri] = useState([]);

  useEffect(() => {
    const fetchGaleri = async () => {
      try {
        const response = await axios.get(`${urlApi}/galeri?limit=2`, {
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
    <div className="galeri">
      <div className="container">
        <p className="title">Galeri</p>
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
        <Link to="/hme/all/galeri" className="btn-all-galeri">
          <p>Lihat Semua</p> <FaLongArrowAltRight size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Galeri;
