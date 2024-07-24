import "./style.scss";
import "./Choose.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { urlApi } from "../../config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import Select2 from "react-select2-wrapper";

const AdminAddBimbingan = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [dosen, setDosen] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermDosen, setSearchTermDosen] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [messageMahasiswa, setMessageMahasiswa] = useState("");
  const [messageDosen, setMessageDosen] = useState("");
  const [Loading, setLoading] = useState(false);

  const [idMahasiswa, setIdMahasiswa] = useState("");
  const [idDosen, setIdDosen] = useState("");
  const [next, setNext] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDosen();
    fetchMahasiswa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, currentPage, pageSize]);

  const fetchMahasiswa = async () => {
    try {
      const res = await axios.get(
        `${urlApi}/bimbingan/list-choose-student?page=${currentPage}&pageSize=${pageSize}&search=${searchTerm}&adminProdi=${sessionStorage.getItem(
          "prodiAdmin"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.result.rows.length === 0) {
        setMessageMahasiswa("Tidak ditemukan");
      } else {
        setMessageMahasiswa("");
      }

      setMahasiswa(res.data.result.rows);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchDosen = async () => {
    try {
      const resDosen = await axios.get(
        `${urlApi}/bimbingan/list-choose-dosen?page=${currentPage}&pageSize=${pageSize}&search=${searchTermDosen}&adminProdi=${sessionStorage.getItem(
          "prodiAdmin"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (resDosen.data.result.rows.length === 0) {
        setMessageDosen("Tidak ditemukan");
      } else {
        setMessageDosen("");
      }

      setDosen(resDosen.data.result.rows);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearchMahasiswa = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchDosen = (e) => {
    setSearchTermDosen(e.target.value);
  };

  const handleNextStudent = (e) => {
    e.preventDefault();

    setTimeout(async () => {
      if (mahasiswa.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "Data Tidak Ditemukan",
          text: "Silakan coba kembali dengan kata kunci pencarian lain",
        });

        setLoading(false);
      } else {
        const setNamaMahasiswa = await axios.get(
          `${urlApi}/mahasiswa/${idMahasiswa}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        setNext(true);
        sessionStorage.setItem("nextDosen", true);
        sessionStorage.setItem("idMahasiswa", idMahasiswa);
        sessionStorage.setItem(
          "namaMahasiswa",
          setNamaMahasiswa.data.result.fullname
        );

        setLoading(false);
      }
    }, 1500);

    setLoading(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Konfirmasi",
      text: `Pastikan data Anda sudah benar dengan nama ${sessionStorage.getItem(
        "namaMahasiswa"
      )}. Yakin sudah benar ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
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
              `${res.data.message} pada ${sessionStorage.getItem(
                "namaMahasiswa"
              )}`,
              "success"
            );

            setTimeout(() => {
              navigate("/admin/data/bimbingan");
            }, 1500);

            sessionStorage.removeItem("namaMahasiswa");
            sessionStorage.removeItem("idMahasiswa");
            sessionStorage.removeItem("nextDosen");
          }
        } catch (err) {
          Swal.fire("Error!", err.response.data.message, "error");
        }
      }
    });
  };

  const handleChangeMahasiswa = (e) => {
    setIdMahasiswa(e.target.value);
  };

  const handleChangeDosen = (e) => {
    setIdDosen(e.target.value);
  };

  const handleBack = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Konfirmasi",
      text: `Yakin ingin kembali ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          sessionStorage.removeItem("nextDosen");
          sessionStorage.removeItem("idMahasiswa");
          sessionStorage.removeItem("namaMahasiswa");
          setNext(false);

          // kosongkan value input mahasiswa
          setSearchTerm("");
        } catch (err) {
          Swal.fire("Error!", err.response.data.message, "error");
        }
      }
    });
  };

  return (
    <div className="bimbingan">
      {sessionStorage.getItem("nextDosen") !== null || next ? (
        <div className="choose-dosen">
          <div className="container">
            <form action="" method="post" onSubmit={handleSubmit}>
              <div className="card">
                <p className="text-pilih">Pilih Dosen</p>
                <p className="text-desc">
                  Silahkan memilih dosen pebimbing dari Mahasiswa{" "}
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
                  {Loading ? "Loading..." : "Next"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="choose-mahasiswa">
          <div className="container">
            <form action="" method="post" onSubmit={handleNextStudent}>
              <div className="card">
                <p className="text-pilih">Pilih Mahasiswa</p>
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
                {Loading ? "Loading..." : "Next"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAddBimbingan;
