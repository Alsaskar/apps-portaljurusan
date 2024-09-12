import PropTypes from "prop-types";
import { IoIosClose } from "react-icons/io";
import "./ModalLihatJadwal.scss";
import "./LihatJadwal.scss";
import { useEffect, useState } from "react";
import { urlApi } from "../../config";
import axios from "axios";
import { Link } from "react-router-dom";

const ModalLihatJadwal = ({ isOpen, handleClose }) => {
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
      const res = await axios.get(`${urlApi}/kelas`, {
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
    <>
      {isOpen && (
        <div className="lihat-jadwal-modal fade-in">
          <div className="modal-content-lihat-jadwal fade-in">
            <button onClick={handleClose} className="button-close-modal">
              <IoIosClose size={20} />
            </button>

            <div className="content-admin-lihat-jadwal">
              <div className="content-admin-lihat-jadwal-container">
                <div className="text-admin-section">
                  <p className="title-admin-lihat-jadwal">Lihat Jadwal</p>
                  <p className="desc-admin-lihat-jadwal">
                    Pilih kelas untuk melihat jadwal.
                  </p>
                </div>

                {/* List Kelas */}
                {kelas.length > 0 ? (
                  <div className="list-kelas">
                    {kelas.map((val, key) => (
                      <Link
                        to={`/admin/lihat/jadwal/kelas/${val.namaKelas}`} 
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
          </div>
        </div>
      )}
    </>
  );
};

ModalLihatJadwal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ModalLihatJadwal;
