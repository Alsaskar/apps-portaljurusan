import { useEffect, useState } from "react";
import { MdSearch, MdRemoveRedEye } from "react-icons/md";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import "./style.scss";
import axios from "axios";
import { urlApi, urlStatic } from "../../config"; // Import urlStatic
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useLoading } from "../../context/LoadingContext";

const Layout = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const { setLoading } = useLoading();
  const [fileExistence, setFileExistence] = useState({});

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

      const mahasiswaData = res.data.result;

      // Fetch details for each mahasiswa to include emailWali
      for (const student of mahasiswaData) {
        await getMahasiswaWithDetails(student.id, student);
        await checkFileExistence(student.id);
      }

      setMahasiswa(mahasiswaData);
      setPages(res.data.totalPage);
      setRows(res.data.totalRows);
      setPage(res.data.page);
    } catch (err) {
      console.log(err);
    }
  };

  const getMahasiswaWithDetails = async (id, student) => {
    try {
      if (!id) {
        console.error("ID mahasiswa tidak tersedia");
        return;
      }

      const res = await axios.get(`${urlApi}/mahasiswa/detail/${id}/details`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      const detail = res.data.result.detailmahasiswas[0] || {};
      const file = res.data.result.uploadfileevaluasis[0] || {};

      student.emailWali = detail.emailWali || "Email Wali tidak tersedia";
      student.fileName = file.fileName || "Nama File Tidak Tersedia";
      student.fileUrl = file.fileUrl || "";
    } catch (err) {
      console.error("Gagal memuat detail mahasiswa:", err);
    }
  };

  const checkFileExistence = async (id) => {
    try {
      const res = await axios.get(`${urlApi}/evaluasimahasiswa/files/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      // Mengembalikan nilai boolean
      return res.data.hasFile;
    } catch (err) {
      console.error("Gagal memeriksa keberadaan file:", err);
      return false; // Kembalikan false jika terjadi kesalahan
    }
  };

  useEffect(() => {
    const checkFiles = async () => {
      const checks = mahasiswa.map((student) =>
        checkFileExistence(student.id).then((exists) => ({
          id: student.id,
          exists,
        }))
      );

      const results = await Promise.all(checks);

      const fileStatus = results.reduce((acc, { id, exists }) => {
        acc[id] = exists;
        return acc;
      }, {});

      setFileExistence(fileStatus);
    };

    if (mahasiswa.length > 0) {
      checkFiles();
    }
  }, [mahasiswa]);

  useEffect(() => {
    _listMahasiswa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, keyword, limit]);

  const handleSendEvaluasi = async (emailWali, fileUrl, id) => {
    // Cek apakah file ada
    const fileExists = await checkFileExistence(id);

    if (!fileExists) {
      Swal.fire({
        title: "File Tidak Ditemukan",
        text: "Tidak ada file yang terkait dengan mahasiswa ini.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return; // Hentikan eksekusi jika file tidak ada
    }

    const subject = "Evaluasi Akademik";
    const body = `
      INI ADALAH EVALUASI AKADEMI MAHASISWA\n\n
      Lihat Evaluasi: ${urlStatic}${fileUrl}\n\n
      Persentase kehadiran mahasiswa selama semester ini 80%.
    `;

    Swal.fire({
      title: "Kirim Evaluasi",
      text: `Yakin ingin mengirim evaluasi ke Wali dengan alamat email ${emailWali}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);

        try {
          await axios.post(
            `${urlApi}/email/send-email`,
            {
              to: emailWali,
              subject: subject,
              text: body,
            },
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          );

          Swal.fire(
            "Terkirim!",
            `Evaluasi telah dikirim ke Wali dengan email ${emailWali}`,
            "success"
          );
        } catch (error) {
          Swal.fire(
            "Gagal!",
            `Terjadi kesalahan: ${
              error.response ? error.response.data.message : error.message
            }`,
            "error"
          );
        } finally {
          setLoading(false);
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
        <div className="data-table-diagram-data-mahasiswa">
          <table>
            <thead>
              <tr>
                <th>Nama</th>
                <th>NIM</th>
                <th>Email Wali</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {mahasiswa.length > 0 ? (
                mahasiswa.map((val, key) => (
                  <tr key={key}>
                    <td>{val.fullname}</td>
                    <td>{val.nim}</td>
                    <td>{val.emailWali || "Email Wali tidak tersedia"}</td>
                    <td className="dt-cell-action-btn-all-evaluasi">
                      <Link
                        to={`${urlStatic}${val.fileUrl}`} // Menambahkan link ke rute baru
                        target="_blank"
                        className={`action-button-ev blue ${
                          fileExistence[val.id] ? "blue" : "grey"
                        }`}
                      >
                        <MdRemoveRedEye size={18} />
                      </Link>
                      <button
                        className="action-button-ev green"
                        onClick={() =>
                          handleSendEvaluasi(val.emailWali, val.fileUrl, val.id)
                        }
                      >
                        <BsFillSendArrowUpFill size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} align="center">
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
            activeLinkClassName={"page-item active"}
            disabledLinkClassName={"page-item disabled"}
          />
        </nav>
      ) : null}
    </>
  );
};

export default Layout;
