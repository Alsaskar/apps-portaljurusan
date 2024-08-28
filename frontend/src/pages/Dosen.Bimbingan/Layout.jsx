import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { urlApi } from "../../config";
import { DosenContext } from "../../context/DosenContext";
import { useParams } from "react-router-dom";
import "./style.scss";
import useFormatDate from "../../hooks/useFormatDateHooks";
import ModalSolusi from "./ModalSolusi";
import ModalTTD from "./ModalTTD";
import File from "./File";
import { AiFillSignature } from "react-icons/ai";
import { HiTrash } from "react-icons/hi2";
import Swal from "sweetalert2";
import { tr } from "date-fns/locale";

const Layout = () => {
  const dosenContext = useContext(DosenContext);
  const idDosen = dosenContext?.result?.id;
  const { idMahasiswa } = useParams(); // Dapatkan idMahasiswa dari URL

  const [evaluasi, setEvaluasi] = useState([]);
  const [ttdDosen, setTtdDosen] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalTTD, setShowModalTTD] = useState(false);
  const [selectedEvaluasi, setSelectedEvaluasi] = useState(null);

  const { formatDate } = useFormatDate();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseModalTTD = () => {
    setShowModalTTD(false);
  };

  useEffect(() => {
    console.log("idMahasiswa:", idMahasiswa);
    console.log("idDosen:", idDosen);

    if (!idDosen || !idMahasiswa) return;

    const fetchEvaluasi = async () => {
      try {
        const res = await axios.get(
          `${urlApi}/evaluasimahasiswa/mahasiswa/${idMahasiswa}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        setEvaluasi(res.data.evaluasi);
      } catch (error) {
        console.error("Error fetching evaluasi:", error);
      }
    };

    const fetchTtdDosen = async () => {
      try {
        const res = await axios.get(
          `${urlApi}/dosensignature/${idDosen}/${idMahasiswa}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.signatures.length > 0) {
          setTtdDosen(res.data.signatures[0]?.signatureUrl);
        } else {
          setTtdDosen(null); // Set TTD menjadi null jika tidak ada data
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Jika TTD tidak ditemukan, set TTD menjadi null
          setTtdDosen(null);
        } else {
          console.error("Error fetching TTD dosen:", error);
        }
      }
    };

    fetchEvaluasi();
    fetchTtdDosen();
  }, [idDosen, idMahasiswa]);

  const handleOpenModal = (evaluasi) => {
    if (evaluasi && evaluasi.id) {
      setSelectedEvaluasi(evaluasi);
      setShowModal(true);
    } else {
      console.error("Evaluasi ID is missing in handleOpenModal", evaluasi);
    }
  };

  const handleUploadTTD = () => {
    setShowModalTTD(true);
  };

  const handleDeleteTTD = async () => {
    try {
      const result = await Swal.fire({
        title: "Konfirmasi",
        text: "Anda yakin ingin menghapus TTD ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        await axios.delete(
          `${urlApi}/dosensignature/${idDosen}/${idMahasiswa}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        setTtdDosen(null);
        Swal.fire("Dihapus!", "TTD berhasil dihapus.", "success");
      }
    } catch (error) {
      console.error("Error saat menghapus TTD:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus TTD.", "error");
    }
  };

  return (
    <>
      <ModalSolusi
        isOpen={showModal}
        handleClose={handleCloseModal}
        evaluasi={selectedEvaluasi}
        setEvaluasi={setEvaluasi}
      />
      <ModalTTD
        isOpen={showModalTTD}
        handleClose={handleCloseModalTTD}
        idMahasiswa={idMahasiswa}
      />
      <div className="btn-section">
        <File />
        <button className="btn-ttd" onClick={handleUploadTTD}>
          <AiFillSignature size={18} /> Beri Tanda Tangan
        </button>
      </div>
      <section className="content-area-table">
        <div className="data-table-diagram-evaluasi-dosen">
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
              {evaluasi.length > 0 ? (
                evaluasi.map((e) => (
                  <tr key={e.id}>
                    <td>{formatDate(e.tgl)}</td>
                    <td>{e.kegiatan}</td>
                    <td>{e.permasalahan}</td>
                    <td>{e.solusi}</td>
                    <td>
                      <img src={e.ttd} alt="ttd" className="ttd-image" />
                    </td>
                    <td className="dt-cell-action-btn-evaluasi-dosen">
                      <button
                        className="btn-evaluasi-dosen green"
                        title="Berikan solusi"
                        onClick={() => handleOpenModal(e)}
                      >
                        Beri solusi
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

      <div className="ttd-dosen">
        <p className="title">Tanda Tangan Dosen</p>
        {ttdDosen ? (
          <>
            <img src={ttdDosen} alt="TTD Dosen" className="ttd-dosen-image" />
            <button className="btn-hapus-ttd" onClick={handleDeleteTTD}>
              <HiTrash size={18} /> Hapus TTD
            </button>
          </>
        ) : (
          <p className="no-ttd">Belum ada TTD</p>
        )}
      </div>
    </>
  );
};

export default Layout;
