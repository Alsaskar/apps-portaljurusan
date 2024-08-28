import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { urlApi } from "../../config";
import { MahasiswaContext } from "../../context/MahasiswaContext";
import "./style.scss";

const Cek = () => {
  const { result } = useContext(MahasiswaContext) || {};
  const [ttdDosen, setTtdDosen] = useState(null);

  useEffect(() => {
    // Pastikan result dan result.id ada
    if (!result || !result.id) return;

    // Fetch TTD dosen berdasarkan idMahasiswa
    const fetchTtdDosen = async () => {
      try {
        const res = await axios.get(
          `${urlApi}/bimbingan/mahasiswa/${result.id}/ttd-dosen`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        // Pastikan signatureUrl ada dalam response
        if (res.data && res.data.signatureUrl) {
          setTtdDosen(res.data.signatureUrl);
        } else {
          console.error("TTD dosen tidak ditemukan dalam response");
        }
      } catch (error) {
        console.error("Error fetching TTD dosen:", error);
      }
    };

    fetchTtdDosen();
  }, [result]); // Pastikan untuk memeriksa result dan id di dalam useEffect

  return (
    <div className="mahasiswa-page">
      <h1>Halaman Mahasiswa</h1>

      {ttdDosen ? (
        <div className="ttd-dosen">
          <h2>TTD Dosen Pembimbing</h2>
          <img src={ttdDosen} alt="TTD Dosen" className="ttd-dosen-image" />
        </div>
      ) : (
        <p>TTD dosen pembimbing belum tersedia.</p>
      )}
    </div>
  );
};

export default Cek;
