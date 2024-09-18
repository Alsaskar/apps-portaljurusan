import { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import { urlApi } from "../../config";
import { HiTrash } from "react-icons/hi2";
import { MdRemoveRedEye, MdEditSquare } from "react-icons/md";
import { FaCalendarWeek } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Layout = () => {
  const [rps, setRps] = useState([]);

  const _listRPS = async () => {
    try {
      const res = await axios.get(`${urlApi}/rps`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      setRps(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _listRPS();
  }, []);

  const handleRemove = async (id) => {
    Swal.fire({
      title: "Konfirmasi",
      text: `Yakin ingin menghapus data ini`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${urlApi}/rps/${id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          });

          Swal.fire("Terhapus!", `Data telah terhapus`, "success");

          // Reload Table
          _listRPS();
        } catch (err) {
          Swal.fire("Error!", err.response.data.message, "error");
        }
      }
    });
  };

  return (
    <>
      <section className="content-area-table-rps">
        <div className="data-table-diagram-data-rps">
          <table>
            <thead>
              <tr>
                <th>Matkul</th>
                <th>Bobot</th>
                <th>Semester</th>
                <th>Tanggal Penyusunan</th>
                <th>Pembuat RP</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rps.length > 0 ? (
                rps.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{val.namaMatkul}</td>
                      <td>{val.bobot}</td>
                      <td>{val.semester}</td>
                      <td>{val.tanggalPenyusunan}</td>
                      <td>{val.pembuatRp}</td>
                      <td className="status-badge">
                        {val.status === "reject" && (
                          <span className="badge badge-reject">
                            Ditolak. Lihat Alasan
                          </span>
                        )}
                        {val.status === "approve" && (
                          <span className="badge badge-approve">
                            Disetujui
                          </span>
                        )}
                        {val.status !== "reject" &&
                          val.status !== "approve" && (
                            <span className="badge badge-proses">Proses</span>
                          )}
                      </td>
                      <td className="dt-cell-action-rps">
                        <Link
                          to={`/rps/${val.id}`}
                          type="button"
                          className="btn-section-rps view-rps"
                        >
                          <MdRemoveRedEye size={18} />
                        </Link>
                        <Link
                          to={`/dosen/edit/rps/${val.id}`}
                          type="button"
                          className="btn-section-rps edit-rps"
                        >
                          <MdEditSquare size={18} />
                        </Link>
                        <Link
                          to={`/dosen/tambah/rps/minggu/${val.id}`}
                          type="button"
                          className="btn-section-rps mingguan-rps"
                          title="rps minggu"
                        >
                          <FaCalendarWeek size={18} />
                        </Link>
                        <button
                          type="button"
                          className="btn-section-rps hapus-rps"
                          onClick={() => handleRemove(val.id)}
                        >
                          <HiTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={19} align="center">
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
