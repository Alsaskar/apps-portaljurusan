import { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import "./style.scss";
import axios from "axios";
import { urlApi } from "../../config";
import ReactPaginate from "react-paginate";
import { TbSquareRoundedCheckFilled } from "react-icons/tb";
import { MdCancel } from "react-icons/md";
import Swal from "sweetalert2";

const Layout = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
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

  const _listMahasiswa = async () => {
    try {
      const res = await axios.get(
        `${urlApi}/himaju?search=${keyword}&page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      setMahasiswa(res.data.result);
      setPages(res.data.totalPage);
      setRows(res.data.totalRows);
      setPage(res.data.page);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _listMahasiswa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, keyword, limit]);

  const handleAccept = (idMahasiswa, fullname) => {
    Swal.fire({
      title: "Terima Mahasiswa",
      text: `Yakin ingin terima ${fullname} ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(
            `${urlApi}/himaju/${idMahasiswa}`,
            {
              status: "terima",
            },
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          );

          _listMahasiswa();

          Swal.fire("Berhasil!", `Telah diterima`, "success");
        } catch (err) {
          Swal.fire("Error!", err.response.data.message, "error");
        }
      }
    });
  };

  const handleReject = (idMahasiswa, fullname) => {
    Swal.fire({
      title: "Tolak Mahasiswa",
      text: `Yakin ingin tolak ${fullname} ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(
            `${urlApi}/himaju/${idMahasiswa}`,
            {
              status: "ditolak",
            },
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          );

          _listMahasiswa();

          Swal.fire("Berhasil!", `Ditolak!`, "success");
        } catch (err) {
          Swal.fire("Error!", err.response.data.message, "error");
        }
      }
    });
  };

  return (
    <>
      <p className="title">Data Pendaftaran</p>
      <div className="filter">
        {/*search filter*/}
        <form onSubmit={searchData}>
          <div className="search-form">
            <input
              type="text"
              className="filter-input"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
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
        <div className="data-table-diagram-pendaftaran-hme-mahasiswa">
          <table>
            <thead>
              <tr>
                <th>Nama</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {mahasiswa.length > 0 ? (
                mahasiswa.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{val.fullname}</td>
                      <td>{val.status}</td>
                      {val.status === 'pending' ?
                      <td className="dt-cell-action pendaftarann">
                        <button
                          className="btnn accept"
                          title="terima"
                          onClick={() => {
                            handleAccept(val.idMahasiswa, val.fullname);
                          }}
                        >
                          <TbSquareRoundedCheckFilled size={18} />
                        </button>
                        <button
                          className="btnn reject"
                          title="tolak"
                          onClick={() => {
                            handleReject(val.idMahasiswa, val.fullname);
                          }}
                        >
                          <MdCancel size={18} />
                        </button>
                      </td> : <td align="center">-</td> }
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

      {mahasiswa.length > 0 ? (
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
