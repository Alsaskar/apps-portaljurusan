import { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import { urlApi } from "../../config";
import ModalEdit from "./ModalEdit";
import Swal from "sweetalert2";
import { MdEditSquare  } from "react-icons/md";
import { HiTrash } from "react-icons/hi2";
const Layout = () => {
  const [adminProdi, setAdminProdi] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedDataUser, setSelectedDataUser] = useState([]);


 

  const handleEditClick = (data, dataUser) => {
    setSelectedData(data);
    setSelectedDataUser(dataUser);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  const _listAdminProdi = async () => {
    try {
      const res = await axios.get(
        `${urlApi}/admin`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      setAdminProdi(res.data.result);
      console.log(res.data.result)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _listAdminProdi();
  }, []);

 

  const _handleDelete = async (id, fullname) => {
    Swal.fire({
      title: "Konfirmasi",
      text: `Yakin ingin menghapus ${fullname} ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${urlApi}/dosen/${id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          });

          Swal.fire("Terhapus!", `${fullname} telah terhapus`, "success");

          // Reload Table
          _listAdminProdi();
        } catch (err) {
          Swal.fire("Error!", err.response.data.message, "error");
        }
      }
    });
  };

  return (
    <>
      {/* Modal */}
      <ModalEdit
        isOpen={showModal}
        handleClose={handleCloseModal}
        data={selectedData}
        dataUser={selectedDataUser}
      />

     

      <section className="content-area-table">
        <div className="data-table-diagram-data-dosen">
          <table>
            <thead>
              <tr>
                <th>Nama</th>
                <th>Username</th>
                <th>Email</th>
                <th>Prodi</th>
                <th>No Hp</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {adminProdi.length > 0 ? (
                adminProdi.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{val.fullname}</td>
                      <td>{val.username}</td>
                      <td>{val.email}</td>
                      <td>{val.prodi}</td>
                      <td>{val.noHp}</td>
                      <td className="dt-cell-action-data-admin">
                        <button
                          onClick={() => {
                            handleEditClick(val, val.user);
                          }}
                          className="btn-admin orange"
                        >
                          <MdEditSquare size={18} />
                        </button>
                        <button
                          onClick={() => {
                            _handleDelete(val.userId, val.fullname);
                          }}
                          className="btn-admin red"
                        >
                          <HiTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={18} align="center">
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
