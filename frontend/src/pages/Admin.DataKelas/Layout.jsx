import "./style.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { urlApi } from "../../config";
import Swal from "sweetalert2";
import { HiTrash } from "react-icons/hi2";
import { MdAddCircle } from "react-icons/md";
import ModalAddKelas from "./ModalAddKelas";

const Layout = () => {
  const [kelas, setKelas] = useState([]);
  const [showModal, setShowModal] = useState(false);


  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
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

    if (parsedA.angka1 !== parsedB.angka1) {
      return parsedA.angka1 - parsedB.angka1;
    }
    if (parsedA.jurusan !== parsedB.jurusan) {
      return parsedA.jurusan.localeCompare(parsedB.jurusan);
    }
    return parsedA.angka2 - parsedB.angka2;
  };

  useEffect(() => {
    _listDataKelas();
  }, []);

  const _handleDelete = async (id) => {
    Swal.fire({
      title: "Konfirmasi",
      text: `Yakin ingin menghapus Data Kelas?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${urlApi}/kelas/${id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          });

          Swal.fire("Terhapus!", `Kelas telah terhapus`, "success");

          // Reload Table
          _listDataKelas();
        } catch (err) {
          Swal.fire("Error!", err.response.data.message, "error");
        }
      }
    });
  };

  return (
    <>
      <ModalAddKelas isOpen={showModal} handleClose={handleCloseModal} />
      <button className="btn-add-kelas" onClick={handleOpenModal}>
        <MdAddCircle size={18} /> Add Kelas
      </button>
      <section className="content-area-table">
        <div className="data-table-diagram-data-kelas">
          <table>
            <thead>
              <tr>
                <th>Kelas</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {kelas.length > 0 ? (
                kelas.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{val.namaKelas}</td>
                      <td className="dt-cell-action">
                        <button
                          className="btn-hapus-data-kelas"
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
                  <td colSpan={3} align="center">
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
