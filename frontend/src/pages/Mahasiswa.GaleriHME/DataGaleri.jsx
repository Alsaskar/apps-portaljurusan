import { useEffect, useState } from "react";
import "./DataGaleri.scss";
import axios from "axios";
import { urlApi, urlStatic } from "../../config";
import ReactPaginate from "react-paginate";
import { MdSearch } from "react-icons/md";
import { HiTrash } from "react-icons/hi2";
import Swal from "sweetalert2";
import placeholderImage from "../../assets/images/foto.jpg";

const DataGaleri = () => {
  const [galeri, setGaleri] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");

  // Mengganti halaman
  const changePage = ({ selected }) => {
    setPage(selected);
  };

  // Pencarian data
  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };

  // Mengambil data galeri
  const _listGaleri = async () => {
    try {
      const res = await axios.get(
        `${urlApi}/galeri?search=${keyword}&page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      const updatedGaleri = res.data.result.map((item) => ({
        ...item,
        foto: item.foto
          ? `${urlStatic}/${item.foto}` // Menggunakan urlStatic
          : placeholderImage, // Menggunakan gambar placeholder
      }));

      setGaleri(updatedGaleri);
      setPages(res.data.totalPage);
      setRows(res.data.totalRows);
      setPage(res.data.page);
    } catch (err) {
      console.log(err);
      Swal.fire("Error!", "Terjadi kesalahan saat mengambil data.", "error");
    }
  };

  useEffect(() => {
    _listGaleri();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, keyword, limit]);

  // Menghapus galeri
  const _handleDelete = async (id) => {
    Swal.fire({
      title: "Konfirmasi",
      text: `Yakin ingin hapus data galeri ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${urlApi}/galeri/${id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          });

          Swal.fire("Terhapus!", "Data telah terhapus", "success");
          _listGaleri(); // Reload data
        } catch (err) {
          Swal.fire("Error!", err.response.data.message, "error");
        }
      }
    });
  };

  return (
    <>
      <p className="title-data">Data Galeri</p>
      <div className="filter">
        {/* Search filter */}
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

        {/* Limit filter */}
        <form>
          <div className="limit-form">
            <select
              id="limit"
              name="limit"
              className="filter-input"
              onChange={(e) => setLimit(e.target.value)}
              value={limit}
            >
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </form>
      </div>

      <section className="content-area-table">
        <div className="data-table-diagram-galeri">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Deskripsi</th>
                <th>Foto</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {galeri.length > 0 ? (
                galeri.map((val) => (
                  <tr key={val.id}>
                    <td>{val.title}</td>
                    <td className="width-deskripsi-galeri">{val.deskripsi}</td>
                    <td>
                      <img
                        src={val.foto}
                        alt={val.title}
                        className="galeri-image"
                      />
                    </td>
                    <td className="dt-cell-action-hapus-galeri">
                      <button
                        className="btn-hapus-galeri"
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
                  <td colSpan={4} align="center">
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
      {galeri.length > 0 && (
        <nav>
          <ReactPaginate
            previousLabel={"< Previous"}
            nextLabel={"Next >"}
            pageCount={pages}
            onPageChange={changePage}
            containerClassName={"pagination"}
            pageLinkClassName={"page-link"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            activeLinkClassName={"page-item active"}
            disabledLinkClassName={"page-item disabled"}
          />
        </nav>
      )}
    </>
  );
};

export default DataGaleri;
