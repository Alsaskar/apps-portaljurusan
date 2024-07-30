import { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import "./style.scss";
import axios from "axios";
import { urlApi, urlStatic } from "../../config";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import { HiTrash } from "react-icons/hi2";
import ProfilNoImage from "../../assets/images/profile_no_image.png";

const Layout = () => {
  const [bimbingan, setBimbingan] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  const changePage = ({ selected }) => {
    setPage(selected);

    if (selected === 9) {
      setMessage("Data tidak ditemukan");
    } else {
      setMessage("");
    }
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setMessage("");
    setKeyword(query);
  };

  const _listBimbingan = async () => {
    try {
      const res = await axios.get(`${urlApi}/bimbingan?search=${keyword}&page=${page}&limit=${limit}&adminProdi=${sessionStorage.getItem("prodiAdmin")}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });


      setBimbingan(res.data.result);
      setPages(res.data.totalPage);
      setRows(res.data.totalRows);
      setPage(res.data.page);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _listBimbingan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, keyword, limit]);

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
          const res = await axios.delete(`${urlApi}/bimbingan/${id}`, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
          });

          if(res.data.success){
            Swal.fire("Berhasil!", `${res.data.message}`, "success");
          }

          // Reload Table
          _listBimbingan();

        } catch (err) {
          Swal.fire("Error!", err.response.data.message, "error");
        }
      }
    });
  };

  return (
    <>
      <div className="filter">
        {/*search filter*/}
        <form onSubmit={searchData}>
          <div className="search-form">
            <input type="text" className="filter-input" placeholder="Cari Nama Mahasiswa" value={query} onChange={(e) => setQuery(e.target.value)} />
            <MdSearch size={20} className="search-icon" />
          </div>
        </form>

        {/*limit filter*/}
        <form>
          <div className="limit-form">
            <select
              id="limit"
              name="limit"
              className="filter-input"
              onChange={(e) => {
                setLimit(e.target.value);
              }}
            >
              <option value="">...</option>
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </form>
      </div>

      <section className="content-area-table">
        <div className="data-table-diagram-data-bimbingan">
          <table>
            <thead>
              <tr>
                <th>Nama Mahasiswa</th>
                <th>NIM</th>
                <th>Foto Mahasiswa</th>
                <th>Nama Dosen</th>
                <th>NIP Dosen</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bimbingan.length > 0 ? (
                bimbingan.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{val.mahasiswa.fullname}</td>
                      <td>{val.mahasiswa.nim}</td>
                      <td>
                      {val.mahasiswa.foto === undefined ? "Loading..." : <img src={val.mahasiswa.foto === "" ? ProfilNoImage : `${urlStatic}/img-mahasiswa/${val.mahasiswa.foto}`} alt="profile-mahasiswa" className="img-mahasiswa" />}
                      </td>
                      <td>{val.dosen.fullname}</td>
                      <td>{val.dosen.nip}</td>
                      <td className="dt-cell-action trash">
                        <button className="action-button red" onClick={() => {
                          _handleDelete(val.id, val.mahasiswa.fullname)
                        }}>
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

      <p className="paginate-title">
        Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
      </p>
      <div>
        <font color="red">{message}</font>
      </div>

      {bimbingan.length > 0 ? (
        <nav key={rows}>
          <ReactPaginate
            previousLabel={"< Previous"}
            nextLabel={"Next >"}
            pageCount={Math.min(10, pages)}
            onPageChange={changePage}
            containerClassName={"pagination"}
            pageLinkClassName={"page-link"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            x
            activeLinkClassName={"page-item active"}
            disabledLinkClassName={"page-item disabled"}
          />
        </nav>
      ) : null}
    </>
  );
};

export default Layout;
