import "./DataProfile.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { urlApi } from "../../config";
import DOMPurify from "dompurify";
import { HiTrash } from "react-icons/hi2";
import Swal from "sweetalert2";

const MahasiswaDataProfileHME = () => {
  const [profil, setProfil] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const _getProfil = async () => {
    try {
      const res = await axios.get(`${urlApi}/himaju/profil`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      setProfil(res.data.profil);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    _getProfil();
  }, []);

  const _handleDelete = async (id) => {
    Swal.fire({
      title: "Konfirmasi",
      text: `Yakin ingin menghapus data profile HME ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${urlApi}/himaju/delete-profil/${id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          });

          Swal.fire("Terhapus!", `data telah terhapus`, "success");

          // Reload Table
          _getProfil();
        } catch (err) {
          Swal.fire("Error!", err.response.data.message, "error");
        }
      }
    });
  };

  if (isLoading) return null;

  return (
    <>
    <div className="data-profile-hme">
      <p className="title-data">Data Himaju</p>

      <section className="content-area-table">
        <div className="data-table-diagram-data-profile-hme">
          <table>
            <thead>
              <tr>
                <th>Deskripsi</th>
                <th>Visi</th>
                <th>Misi</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {profil && profil.deskripsi ? (
                <tr>
                  <td className="width-desc-profile">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(profil.deskripsi),
                      }}
                    />
                  </td>
                  <td className="width-visi-profile">{profil.visi}</td>
                  <td className="width-misi-profile">
                    <ul className="list-section">
                      {profil.misi.split("| ").map((misi, index) => (
                        <li key={index} className="list-misi">{misi}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="dt-cell-action-profile">
                    <button
                      className="hapus-profile"
                      title="Hapus"
                      onClick={() => {
                        _handleDelete(profil.id)
                      }}
                    >
                      <HiTrash size={18} />
                    </button>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="4" className="belum-ada-data">Belum ada data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </>
  );
};

export default MahasiswaDataProfileHME;
