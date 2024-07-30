import { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import "./style.scss";
import axios from "axios";
import { urlApi } from "../../config";
import ReactPaginate from "react-paginate";
import { HiTrash } from "react-icons/hi2";
import { MdEditSquare } from "react-icons/md";

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
        `${urlApi}/mahasiswa?search=${keyword}&page=${page}&limit=${limit}&adminProdi=${sessionStorage.getItem(
          "prodiAdmin"
        )}`,
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

  return (
    <div className="daftar-ip-gagal">
      <div className="container">
        <div className="daftar-ip">
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
            <div className="data-table-diagram-daftar-ip">
              <table>
                <thead>
                  <tr>
                    <th>IP Address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mahasiswa.length > 0 ? (
                    mahasiswa.map((val, key) => {
                      return (
                        <tr key={key}>
                          <td>{val.fullname}</td>
                          <td className="dt-cell-action-ip">
                            <button className="btn edit" title="edit">
                              <MdEditSquare size={18} />
                            </button>
                            <button className="btn hapus" title="hapus">
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
        </div>
      </div>
    </div>
  );
};

export default Layout;
