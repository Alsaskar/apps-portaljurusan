import "./style.scss";
import "./Choose.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { urlApi } from "../../config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [dosen, setDosen] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermDosen, setSearchTermDosen] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [messageMahasiswa, setMessageMahasiswa] = useState("");
  const [messageDosen, setMessageDosen] = useState("");
  const [loading, setLoading] = useState(false);
  const [idMahasiswa, setIdMahasiswa] = useState("");
  const [idDosen, setIdDosen] = useState("");
  const [next, setNext] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (next) {
      fetchDosen();
    } else {
      fetchMahasiswa();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, searchTermDosen, currentPage, pageSize, next]);

  const fetchMahasiswa = async () => {
    try {
      const res = await axios.get(
        `${urlApi}/bimbingan/list-choose-student?page=${currentPage}&pageSize=${pageSize}&search=${searchTerm}&adminProdi=${sessionStorage.getItem("prodiAdmin")}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      setMahasiswa(res.data.result.rows);
      setMessageMahasiswa(res.data.result.rows.length === 0 ? "Tidak ditemukan" : "");
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchDosen = async () => {
    try {
      const resDosen = await axios.get(
        `${urlApi}/bimbingan/list-choose-dosen?page=${currentPage}&pageSize=${pageSize}&search=${searchTermDosen}&adminProdi=${sessionStorage.getItem("prodiAdmin")}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      setDosen(resDosen.data.result.rows);
      setMessageDosen(resDosen.data.result.rows.length === 0 ? "Tidak ditemukan" : "");
    } catch (error) {
      console.error("Error fetching lecturers:", error);
    }
  };

  const handleSearchMahasiswa = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchDosen = (e) => {
    setSearchTermDosen(e.target.value);
  };

  const handleNextStudent = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (mahasiswa.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Data Tidak Ditemukan",
        text: "Silakan coba kembali dengan kata kunci pencarian lain",
      });
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(`${urlApi}/mahasiswa/${idMahasiswa}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      sessionStorage.setItem("nextDosen", true);
      sessionStorage.setItem("idMahasiswa", idMahasiswa);
      sessionStorage.setItem("namaMahasiswa", data.result.fullname);

      setNext(true);
    } catch (error) {
      console.error("Error fetching student details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await Swal.fire({
        title: "Konfirmasi",
        text: `Pastikan data Anda sudah benar dengan nama ${sessionStorage.getItem("namaMahasiswa")}. Yakin sudah benar?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      });

      if (result.isConfirmed) {
        const res = await axios.post(
          `${urlApi}/bimbingan/`,
          {
            idMahasiswa: sessionStorage.getItem("idMahasiswa"),
            idDosen: idDosen,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        if (res.data.success) {
          Swal.fire(
            "Berhasil!",
            `${res.data.message} pada ${sessionStorage.getItem("namaMahasiswa")}`,
            "success"
          );

          setTimeout(() => {
            navigate("/admin/data/bimbingan");
          }, 1500);

          sessionStorage.removeItem("namaMahasiswa");
          sessionStorage.removeItem("idMahasiswa");
          sessionStorage.removeItem("nextDosen");
        } else {
          Swal.fire("Gagal!", res.data.message, "error");
        }
      }
    } catch (err) {
      Swal.fire("Error!", err.response?.data?.message || "Terjadi kesalahan", "error");
    }
  };

  const handleChangeMahasiswa = (e) => {
    setIdMahasiswa(e.target.value);
  };

  const handleChangeDosen = (e) => {
    setIdDosen(e.target.value);
  };

  const handleBack = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Konfirmasi",
      text: "Yakin ingin kembali?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      sessionStorage.removeItem("nextDosen");
      sessionStorage.removeItem("idMahasiswa");
      sessionStorage.removeItem("namaMahasiswa");
      setNext(false);
      setSearchTerm(""); 
      navigate("/admin/add/bimbingan"); 
    }
  };

  return (
    <div className="bimbingan">
      {!next ? (
        <div className="choose-mahasiswa">
          <div className="container">
            <form onSubmit={handleNextStudent}>
              <div className="card">
                <p className="text-pilih">Pilih Mahasiswa</p>
                <p className="desc-pilih">Masukan nama atau nim untuk memilih Dosen Pembimbingnya.</p>
                <input
                  type="text"
                  className="input-data"
                  placeholder="Cari nama atau nim mahasiswa..."
                  value={searchTerm}
                  onChange={handleSearchMahasiswa}
                />
                <select
                  className="select-data"
                  onChange={handleChangeMahasiswa}
                  required
                >
                  {messageMahasiswa === "" ? (
                    <option value="">Pilih Mahasiswa</option>
                  ) : (
                    <option value={0}>{messageMahasiswa}</option>
                  )}

                  {mahasiswa.map((data) => (
                    <option key={data.id} value={data.id}>
                      {data.fullname} - {data.nim}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn-choose-mahasiswa">
                {loading ? "Loading..." : "Next"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="choose-dosen">
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="card">
                <p className="text-pilih">Pilih Dosen</p>
                <p className="text-desc">
                  Silahkan memilih dosen pembimbing dari Mahasiswa{" "}
                  <b>{sessionStorage.getItem("namaMahasiswa")}</b>
                </p>
                <input
                  type="text"
                  className="input-data"
                  placeholder="Cari nama atau nip dosen..."
                  value={searchTermDosen}
                  onChange={handleSearchDosen}
                />
                <select
                  className="select-data"
                  onChange={handleChangeDosen}
                  required
                >
                  {messageDosen === "" ? (
                    <option value="">Pilih Dosen</option>
                  ) : (
                    <option value={0}>{messageDosen}</option>
                  )}

                  {dosen.map((data) => (
                    <option key={data.id} value={data.id}>
                      {data.fullname} - {data.nip}
                    </option>
                  ))}
                </select>
              </div>
              <div className="btn-choose">
                <button className="btn-back" onClick={handleBack}>
                  Back
                </button>
                <button type="submit" className="btn-dosen">
                  {loading ? "Loading..." : "Next"}
                </button>
              </div>
            </form>
          </div>
        </div>

      )}
    </div>
  );
};

export default Layout;
