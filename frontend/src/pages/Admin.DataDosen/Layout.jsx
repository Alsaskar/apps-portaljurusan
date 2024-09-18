import { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import "./style.scss";
import axios from "axios";
import { urlApi } from "../../config";
import ReactPaginate from "react-paginate";
import TableAction from "../../components/TableAction/TableAction";
import ModalEdit from "./ModalEdit";
import Swal from "sweetalert2";
import { GrPowerReset } from "react-icons/gr";
import useFormatDate from "../../hooks/useFormatDateHooks";
import { FaUserGear } from "react-icons/fa6";
import { TbTrashXFilled } from "react-icons/tb";

const Layout = () => {
  const [dosen, setDosen] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedDataUser, setSelectedDataUser] = useState([]);

  const { formatDate } = useFormatDate();

  const changePage = ({ selected }) => {
    setPage(selected);

    if (selected === 9) {
      setMessage("Data tidak ditemukan");
    } else {
      setMessage("");
    }
  };

  const handleEditClick = (data, dataUser) => {
    setSelectedData(data);
    setSelectedDataUser(dataUser);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setMessage("");
    setKeyword(query);
  };

  const _listDosen = async () => {
    try {
      const res = await axios.get(
        `${urlApi}/dosen?search=${keyword}&page=${page}&limit=${limit}&adminProdi=${sessionStorage.getItem(
          "prodiAdmin"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      setDosen(res.data.result);
      console.log(res.data.result);
      setPages(res.data.totalPage);
      setRows(res.data.totalRows);
      setPage(res.data.page);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _listDosen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, keyword, limit]);

  const handleReset = async (idUser, tglLahir, fullname) => {
    Swal.fire({
      title: "Reset Password",
      text: `Yakin ingin reset password pada ${fullname} ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(
            `${urlApi}/dosen/update-pass/${idUser}`,
            {
              tglLahir: tglLahir,
            },
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          );

          Swal.fire("Berhasil!", `Password telah di reset`, "success");
        } catch (err) {
          Swal.fire("Error!", err.response.data.message, "error");
        }
      }
    });
  };

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
          await axios.delete(`${urlApi}/dosen/${id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          });

          Swal.fire("Terhapus!", `${fullname} telah terhapus`, "success");

          // Reload Table
          _listDosen();
        } catch (err) {
          Swal.fire("Error!", err.response.data.message, "error");
        }
      }
    });
  };

  const handleKaprodi = async (idDosen, fullname) => {
    Swal.fire({
      title: "Jadikan Kaprodi",
      text: `Yakin ingin jadikan ${fullname} kaprodi?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.put(
            `${urlApi}/dosen/create-kaprodi/${idDosen}`,
            {
              asKaprodi: "yes ",
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
              `${fullname} telah menjadi kaprodi`,
              "success"
            );

            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            Swal.fire("Oppsss...!", `${res.data.message}`, "error");
          }
        } catch (err) {
          Swal.fire("Error!", err.response.data.message, "error");
        }
      }
    });
  };

  const handleRemoveKaprodi = async (idDosen, fullname) => {
    Swal.fire({
      title: "Hapus Kaprodi",
      text: `Yakin ingin hapus ${fullname} dari kaprodi?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.put(
            `${urlApi}/dosen/remove-kaprodi/${idDosen}`,
            {
              asKaprodi: "no",
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
              `${fullname} telah dihapus dari kaprodi`,
              "success"
            );

            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            Swal.fire("Oppsss...!", `${res.data.message}`, "error");
          }
        } catch (err) {
          Swal.fire("Error!", err.response.data.message, "error");
        }
      }
    });
  };

  return (
    <>
      {/* Modal */}
      <ModalEdit
        isOpen={showModal}
        handleClose={handleCloseModal}
        data={selectedData}
        dataUser={selectedDataUser}
      />

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
        <div className="data-table-diagram-data-dosen">
          <table>
            <thead>
              <tr>
                <th>Nama</th>
                <th>NIP</th>
                <th>NIDN</th>
                <th>Email</th>
                <th>Prodi</th>
                <th>Jenis Kelamin</th>
                <th>Tempat Tanggal Lahir</th>
                <th>Jabatan</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dosen.length > 0 ? (
                dosen.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{val.fullname}</td>
                      <td>{val.nip}</td>
                      <td>{val.nidn}</td>
                      <td>{val.user.email}</td>
                      <td>{val.prodi}</td>
                      <td>{val.jenisKelamin}</td>
                      <td>
                        {val.tempatLahir}, {formatDate(val.tglLahir)}
                      </td>
                      <td>{val.asKaprodi === "yes" ? "Kaprodi" : "Dosen"}</td>
                      <td className="dt-cell-action-data-dosen ada-reset">
                        <TableAction
                          _onClickEdit={() => handleEditClick(val, val.user)}
                          urlDetail={`/admin/details/dosen/${val.id}`}
                          _onClickDelete={() => {
                            _handleDelete(val.userId, val.fullname);
                          }}
                        />
                        <button
                          onClick={() => {
                            handleReset(val.userId, val.tglLahir, val.fullname);
                          }}
                          className="reset-button-dosen green"
                        >
                          <GrPowerReset size={18} />
                        </button>
                        {val.asKaprodi === "no" && (
                          <button
                            onClick={() => {
                              handleKaprodi(val.id, val.fullname);
                            }}
                            className="set-role-kaprodi black"
                            title="Jadikan kaprodi"
                          >
                            <FaUserGear size={18} />
                          </button>
                        )}
                        {val.asKaprodi === "yes" && (
                          <button
                            onClick={() => {
                              handleRemoveKaprodi(val.id, val.fullname);
                            }}
                            className="hapus-kaprodi purple"
                            title="Hapus kaprodi"
                          >
                            <TbTrashXFilled size={18} />
                          </button>
                        )}
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

      {dosen.length > 0 ? (
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
