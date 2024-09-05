import "./style.scss";
import { useEffect, useState } from "react";
import { urlApi } from "../../config";
import { HiTrash } from "react-icons/hi2";
import axios from "axios";
import Swal from "sweetalert2";
import { AiFillSchedule } from "react-icons/ai";
import ModalLihatJadwal from "./ModalLihatJadwal";

const Layout = () => {
  const [jadwal, setJadwal] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

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

  const _listData = async () => {
    try {
      const dataMatkul = await axios.get(
        `${urlApi}/jadwal?prodi=${sessionStorage.getItem("prodiAdmin")}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      // Mengurutkan jadwal berdasarkan nama kelas
      const sortedJadwal = dataMatkul.data.result.sort((a, b) => {
        return compareKelas(a.kela.namaKelas, b.kela.namaKelas);
      });

      setJadwal(sortedJadwal);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _listData();
  }, []);

  const _handleDelete = async (id) => {
    Swal.fire({
      title: "Konfirmasi",
      text: `Yakin ingin menghapus Mata Kuliah?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${urlApi}/jadwal/${id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          });

          Swal.fire("Terhapus!", `Mata Kuliah telah terhapus`, "success");

          // Reload Table
          _listData();
        } catch (err) {
          Swal.fire("Error!", err.response.data.message, "error");
        }
      }
    });
  };

  return (
    <>
      <ModalLihatJadwal isOpen={showModal} handleClose={handleCloseModal} />
      <button className="lihat-jadwal" onClick={handleOpenModal}>
        <AiFillSchedule size={20} /> Jadwal Kelas
      </button>
      <section className="content-area-table">
        <div className="data-table-diagram-data-matkul">
          <table>
            <thead>
              <tr>
                <th>Mata Kuliah</th>
                <th>Kode Matakuliah</th>
                <th>Kelas</th>
                <th>Dosen Pengajar</th>
                <th>Hari</th>
                <th>Jam</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jadwal.length > 0 ? (
                jadwal.map((val, key) => {
                  const matkul = val.matkul || {};
                  const kela = val.kela || {};

                  return (
                    <tr key={key}>
                      <td>{matkul.matkul || "Data tidak tersedia"}</td>
                      <td>{matkul.kodeMatkul || "Data tidak tersedia"}</td>
                      <td>{kela.namaKelas || "Data tidak tersedia"}</td>
                      <td>{matkul.dosenPengajar || "Data tidak tersedia"}</td>
                      <td>{val.hari || "Data tidak tersedia"}</td>
                      <td>
                        {(val.jamMulai?.slice(0, 5) || "Data tidak tersedia") +
                          " - " +
                          (val.jamSelesai?.slice(0, 5) ||
                            "Data tidak tersedia")}
                      </td>

                      <td className="dt-cell-action">
                        <button
                          className="btn-hapus-data-matkul"
                          title="hapus"
                          onClick={() => _handleDelete(val.id)}
                        >
                          <HiTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} align="center">
                    Belum ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Layout;
