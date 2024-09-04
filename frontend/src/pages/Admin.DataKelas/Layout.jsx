import "./style.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { urlApi } from "../../config";
import Swal from "sweetalert2";
import { HiTrash } from "react-icons/hi2";
import { MdAddCircle } from "react-icons/md";
import ModalAddKelas from "./ModalAddKelas";
import useFormatDate from "../../hooks/useFormatDateHooks";

const Layout = () => {
  const [kelas, setKelas] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const { formatDate } = useFormatDate();

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

      setKelas(res.data.result);
    } catch (err) {
      console.log(err);
    }
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
                <th>Tanggal Create</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {kelas.length > 0 ? (
                kelas.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{val.namaKelas}</td>
                      <td>{formatDate(val.tglCreate)}</td>

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
