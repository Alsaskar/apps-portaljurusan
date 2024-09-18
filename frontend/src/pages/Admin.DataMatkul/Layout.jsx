import "./style.scss";
import { useEffect, useState } from "react";
import { urlApi } from "../../config";
import { HiTrash } from "react-icons/hi2";
import { MdAddCircle } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import ModalAddMatkul from "./ModalAddMatkul";

const Layout = () => {
  const [matkul, setMatkul] = useState([]);
  const [dosen, setDosen] = useState([]);

  const [showModal, setShowModal] = useState(false);


  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const _listData = async () => {
    try {
      const dataMatkul = await axios.get(`${urlApi}/matkul?prodi=${sessionStorage.getItem("prodiAdmin")}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      const dataDosen = await axios.get(
        `${urlApi}/dosen/list-all/${sessionStorage.getItem("prodiAdmin")}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      setMatkul(dataMatkul.data.result);
      setDosen(dataDosen.data.result);

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
          await axios.delete(`${urlApi}/matkul/${id}`, {
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
      <ModalAddMatkul
        isOpen={showModal}
        handleClose={handleCloseModal}
        dosenPengajar={dosen}
      />
      <button className="btn-add-matkul" onClick={handleOpenModal}>
        <MdAddCircle size={18} /> Add Mata Kuliah
      </button>
      <section className="content-area-table">
        <div className="data-table-diagram-data-matkul">
          <table>
            <thead>
              <tr>
                <th>Mata Kuliah</th>
                <th>Rentan Waktu</th>
                <th>Kode Matakuliah</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {matkul.length > 0 ? (
                matkul.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{val.matkul}</td>
                      <td>{val.rentanWaktu} menit</td>
                      <td>{val.kodeMatkul}</td>

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
