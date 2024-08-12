import { useEffect, useState } from "react";
import "./DataProgramKerjaHME.scss";
import axios from "axios";
import { urlApi } from "../../config";
import Swal from "sweetalert2";
import useFormatDate from "../../hooks/useFormatDateHooks";
import { HiTrash } from "react-icons/hi2";

const DataProgramKerjaHME = () => {
  const [proker, setProker] = useState([]);
  const { formatDate } = useFormatDate();

  const _listProker = async () => {
    try {
      const res = await axios.get(
        `${urlApi}/himaju/list-proker`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      setProker(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _listProker();
  }, []);

  const _handleDelete = async (id) => {
    Swal.fire({
      title: "Konfirmasi",
      text: `Yakin ingin menghapus kegiatan ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${urlApi}/himaju/delete-proker/${id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          });

          Swal.fire("Terhapus!", `Kegiatan telah terhapus`, "success");

          // Reload Table
          _listProker();
        } catch (err) {
          Swal.fire("Error!", err.response.data.message, "error");
        }
      }
    });
  };

  return (
    <div className="data-program-keerja-hme">
    <p className="title-data-proker">Data Program Kerja HME</p>
      <section className="content-area-table">
        <div className="data-table-diagram-data-program-kerja-hme">
          <table>
            <thead>
              <tr>
                <th>Nama Kegiatan</th>
                <th>Deskripsi Kegiatan</th>
                <th>Tanggal</th>
                <th>Jam Mulai</th>
                <th>Jam Selesai</th>
                <th>Lokasi</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {proker.length > 0 ? (
                proker.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{val.namaKegiatan}</td>
                      <td className="desc-kegiatan">{val.description}</td>
                      <td>{formatDate(val.tglPelaksanaan)}</td>
                      <td>{val.jamMulai}</td>
                      <td>{val.jamSelesai}</td>
                      <td className="lokasi-kegiatan">{val.lokasi}</td>
                      <td className="dt-cell-action-data-program-kerja-hme">
                        <button
                          onClick={() => {
                            _handleDelete(val.id);
                          }}
                          className="hapus-data-program-kerja-hme"
                          title="Hapus"
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
    </div>
  );
};

export default DataProgramKerjaHME;
