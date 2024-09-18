import { useState, useEffect } from "react";
import "./style.scss";
import { urlApi } from "../../config";
import axios from "axios";
import { Link } from "react-router-dom";

const Layout = () => {
  const [kelas, setKelas] = useState([]);

  // Fungsi untuk mengurutkan nama kelas
  const compareKelas = (kelasA, kelasB) => {
    // Mengurai nama kelas
    const parseKelas = (kelas) => {
      const parts = kelas.split(" ");
      return {
        angka1: parseInt(parts[0], 10),
        jurusan: parts[1],
        angka2: parseInt(parts[2], 10),
      };
    };

    const parsedA = parseKelas(kelasA);
    const parsedB = parseKelas(kelasB);

    // Bandingkan berdasarkan angka1, jurusan, dan angka2
    if (parsedA.angka1 !== parsedB.angka1) {
      return parsedA.angka1 - parsedB.angka1;
    }
    if (parsedA.jurusan !== parsedB.jurusan) {
      return parsedA.jurusan.localeCompare(parsedB.jurusan);
    }
    return parsedA.angka2 - parsedB.angka2;
  };

  const _listDataKelas = async () => {
    try {
      const res = await axios.get(`${urlApi}/kelas?prodi=${sessionStorage.getItem("prodiDosen")}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      const sortedKelas = res.data.result.sort((a, b) => {
        return compareKelas(a.namaKelas, b.namaKelas);
      });

      setKelas(sortedKelas);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _listDataKelas();
  }, []);

  return (
    <div className="content-lihat-jadwal">
      <div className="content-lihat-jadwal-container">
        <div className="text-section">
          <p className="title-jadwal">Lihat Jadwal</p>
          <p className="desc-jadwal">Pilih kelas untuk melihat jadwal.</p>
        </div>

        {/* List Kelas */}
        {kelas.length > 0 ? (
          <div className="list-kelas">
            {kelas.map((val, key) => (
              <Link
                to={`/dosen/lihat/jadwal/kelas/${val.namaKelas}`}
                key={key}
                className="list-kelas-item"
              >
                <p>{val.namaKelas}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="no-data">Belum ada data</p>
        )}
      </div>
    </div>
  );
};

export default Layout;
