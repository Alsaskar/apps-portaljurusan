import { useEffect, useState, useContext } from "react";
import "./LihatData.scss";
import axios from "axios";
import { urlApi } from "../../config";
import { HiTrash } from "react-icons/hi2";
import { RiUploadCloud2Fill } from "react-icons/ri";
import useFormatDate from "../../hooks/useFormatDateHooks";
import Swal from "sweetalert2";
import { MahasiswaContext } from "../../context/MahasiswaContext";
import { useUser } from "../../hooks/userHooks";
import PdfButton from "./PdfButton";
import ModalUpload from "./ModalUpload";

const LihatData = () => {
  const [evaluasiMahasiswa, setEvaluasiMahasiswa] = useState([]);
  const { result } = useContext(MahasiswaContext) || {};
  const [fileExists, setFileExists] = useState(false);
  const { user } = useUser();
  const { formatDate } = useFormatDate();
  const [showModal, setShowModal] = useState(false);
  const [dosen, setDosen] = useState(null);
  const [ttdUrl, setTtdUrl] = useState("");

  const _getDosenData = async () => {
    if (!result || !result.id) return;

    try {
      const res = await axios.get(
        `${urlApi}/bimbingan/mahasiswa/${result.id}/dosen`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setDosen(res.data.mahasiswa.dosenWali || {});
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Error!",
        "Terjadi kesalahan saat mengambil data dosen.",
        "error"
      );
    }
  };

  const _getTTD = async () => {
    if (!result || !result.id) return;

    try {
      const res = await axios.get(
        `${urlApi}/bimbingan/mahasiswa/${result.id}/ttd-dosen`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (res.status === 200) {
        setTtdUrl(res.data.signatureUrl || "");
      } else {
        setTtdUrl("");
      }
    } catch (err) {
      console.error("Error saat mendapatkan TTD:", err);
      setTtdUrl("");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const _listEvaluasiMahasiswa = async () => {
    if (!result || !result.id) return; // Periksa jika ID mahasiswa ada
    try {
      const res = await axios.get(`${urlApi}/evaluasimahasiswa/${result.id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      setEvaluasiMahasiswa(res.data.evaluations || []); // Tangani kasus jika data tidak ada
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Terjadi kesalahan saat mengambil data.", "error");
    }
  };

  useEffect(() => {
    _listEvaluasiMahasiswa();
    checkFileExistence();
    _getDosenData();
    _getTTD();
  }, [result]);

  const _handleDelete = async (id) => {
    Swal.fire({
      title: "Konfirmasi",
      text: `Yakin ingin hapus data evaluasi ini?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${urlApi}/evaluasimahasiswa/${id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          });

          Swal.fire("Terhapus!", "Data telah terhapus", "success");
          _listEvaluasiMahasiswa(); // Reload data
        } catch (err) {
          Swal.fire(
            "Error!",
            err.response?.data?.message || "Terjadi kesalahan",
            "error"
          );
        }
      }
    });
  };

  const handleUploadPdf = () => {
    if (fileExists) {
      Swal.fire({
        title: "File Sudah Ada",
        text: "File sudah ada, Anda tidak dapat mengupload file lagi. Hapus jika ingin upload lagi.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    } else {
      setShowModal(true);
    }
  };

  const handleDeletePdf = async () => {
    if (!result || !result.id) {
      Swal.fire("Error!", "ID mahasiswa tidak tersedia.", "error");
      return;
    }

    // Tampilkan dialog konfirmasi
    const resultConfirm = await Swal.fire({
      title: "Konfirmasi Hapus",
      text: "Apakah Anda yakin ingin menghapus file ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    // Jika pengguna mengonfirmasi
    if (resultConfirm.isConfirmed) {
      try {
        const response = await axios.delete(
          `${urlApi}/evaluasimahasiswa/files/${result.id}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        Swal.fire({
          title: "Success",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "OK",
        });

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.response?.data?.message || "Terjadi kesalahan",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const checkFileExistence = async () => {
    if (!result || !result.id) return;

    try {
      const res = await axios.get(
        `${urlApi}/evaluasimahasiswa/files/${result.id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setFileExists(res.data.hasFile);
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Terjadi kesalahan saat memeriksa file.", "error");
      setFileExists(false);
    }
  };

  return (
    <>
      {/* Modal */}
      <ModalUpload isOpen={showModal} handleClose={handleCloseModal} />

      <p className="title-data-evaluasi">Data Evaluasi Mahasiswa</p>
      <div className="btn-section-evaluasi">
        <PdfButton
          className="btn-pdf-evaluasi"
          title="pdf"
          result={result}
          user={user}
          evaluasiMahasiswa={evaluasiMahasiswa}
          dosen={dosen}
          ttdUrl={ttdUrl}
        />
        <button
          type="button"
          title="upload pdf"
          className="btn-data-evaluasi btn-upload-pdf"
          onClick={handleUploadPdf}
        >
          <RiUploadCloud2Fill size={18} />
          Upload File
        </button>
        {fileExists && (
          <button
            type="button"
            title="hapus pdf"
            className="btn-data-evaluasi btn-hapus-pdf"
            onClick={handleDeletePdf}
          >
            <HiTrash size={18} />
            Hapus File
          </button>
        )}
      </div>
      <section className="content-area-table">
        <div className="data-table-diagram-evaluasi-mahasiswa">
          <table>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Kegiatan</th>
                <th>Permasalahan</th>
                <th>Solusi</th>
                <th>TTD</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {evaluasiMahasiswa.length > 0 ? (
                evaluasiMahasiswa.map((val) => (
                  <tr key={val.id}>
                    <td>{formatDate(val.tgl)}</td>
                    <td className="width-kegiatan-evaluasi-mahasiswa">
                      {val.kegiatan}
                    </td>
                    <td className="width-permasalahan">{val.permasalahan}</td>
                    <td className="width-solusi">
                      {val.solusi ? (
                        val.solusi
                      ) : (
                        <p className="no-solusi">Belum ada solusi dari dosen</p>
                      )}
                    </td>
                    <td>
                      {val.ttd ? (
                        <img
                          src={val.ttd} // Pastikan field ini sesuai dengan nama field di API
                          alt="ttd"
                          className="ttd-image"
                        />
                      ) : (
                        <p className="no-ttd">Belum ada TTD</p>
                      )}
                    </td>
                    <td className="dt-cell-action-hapus-evaluasi-mahasiswa">
                      <button
                        className="btn-evaluasi-mahasiswa red"
                        title="hapus"
                        onClick={() => _handleDelete(val.id)}
                      >
                        <HiTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} align="center">
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

export default LihatData;
