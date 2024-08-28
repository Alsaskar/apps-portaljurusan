import "./chooseMahasiswa.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { urlApi } from "../../config";
import Swal from "sweetalert2";

const ChooseMahasiswa = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [message, setMessage] = useState("");
  const [Loading, setLoading] = useState(false);

  const [idMahasiswa, setIdMahasiswa] = useState("");

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, currentPage, pageSize]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${urlApi}/bimbingan/list-choose-student?page=${currentPage}&pageSize=${pageSize}&search=${searchTerm}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });

      if (res.data.result.rows.length === 0) {
        setMessage("Tidak ditemukan");
      } else {
        setMessage("");
      }

      setMahasiswa(res.data.result.rows);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
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

        setLoading(false)
      } else {
        try{
            const res = await axios.post(`${urlApi}/bimbingan/next-student`, {
                idMahasiswa: idMahasiswa
            }, {
                headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
            })

            if(res.data.success){
                sessionStorage.setItem('nextDosen', res.data.success)

                setLoading(false)
            }
        }catch(err){
            console.log(err)
        }
      }
    }, 1500);

    setLoading(true);
  };

  const handleChange = (e) => {
    setIdMahasiswa(e.target.value);
  };

  return (
    <div className="choose-mahasiswa">
      <div className="container">
        <form action="" method="post" onSubmit={handleNextStudent}>
          <div className="card">
            <p className="text-pilih">Pilih Mahasiswa</p>
            <input type="text" className="input-data" placeholder="Cari nama atau nim mahasiswa..." value={searchTerm} onChange={handleSearch} />
            <select className="select-data" onChange={handleChange} required>
              {message === "" ? <option value="">Pilih Mahasiswa</option> : <option value={0}>{message}</option>}

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
  );
};

export default ChooseMahasiswa;
