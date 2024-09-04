import "./style.scss";
import { useEffect, useState } from "react";
import { urlApi } from "../../config";
import { HiTrash } from "react-icons/hi2";
import axios from "axios";
import Swal from "sweetalert2";

const Layout = () => {
  const [jadwal, setJadwal] = useState([]);

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

      setJadwal(dataMatkul.data.result);
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
                <th>Waktu</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jadwal.length > 0 ? (
                jadwal.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{val.matkul.matkul}</td>
                      <td>{val.matkul.kodeMatkul}</td>
                      <td>{val.kela.namaKelas}</td>
                      <td>{val.matkul.dosenPengajar}</td>
                      <td>{val.hari}</td>
                      <td>
                        {val.jamMulai} - {val.jamSelesai}
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
