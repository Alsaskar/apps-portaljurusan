import "./style.scss";
import { BsDatabaseAdd } from "react-icons/bs";
import { Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { urlApi } from "../../config";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Layout = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const _getMahasiswa = async () => {
    try {
      const res = await axios.get(`${urlApi}/mahasiswa/${id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });

      setMahasiswa(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _getMahasiswa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _handleSubmit = async (values, { resetForm }) => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const res = await axios.post(
          `${urlApi}/evaluasi`,
          {
            tgl: values.tgl,
            kegiatan: values.kegiatan,
            permasalahan: values.permasalahan,
            solusi: values.solusi,
            tandaTanganMah: values.tandaTanganMah,
          },
          { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } }
        );

        Swal.fire({
          title: "Berhasil",
          text: res.data.message,
          icon: "success",
          confirmButtonText: "Ok",
        });

        setLoading(false);
        resetForm();
      } catch (err) {
        setLoading(false);
        Swal.fire({
          title: "Gagal",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    }, 1500);
  };

  const validationSchema = Yup.object().shape({
    tgl: Yup.string().required("Mata Kuliah harus diisi"),
    kegiatan: Yup.string().required("Kelas harus diisi"),
    permasalahan: Yup.string().required("Hari harus diisi"),
    solusi: Yup.string().required("Ruangan harus diisi"),
    tandaTanganMah: Yup.string().required("Ruangan harus diisi"),
  });
  return (
    <div className="evaluasi">
      <div className="container">
        <div className="text-section">
          <p className="name-title">
            {mahasiswa.fullname === undefined
              ? "Loading..."
              : mahasiswa.fullname}
          </p>
          <p className="name-title">
            {mahasiswa.fullname === undefined
              ? "Loading..."
              : mahasiswa.nim}
          </p>
          <p className="name-title">
            {mahasiswa.fullname === undefined
              ? "Loading..."
              : mahasiswa.user.email}
          </p>
        </div>
        <div className="content">
          <p className="title">Buat Daftar Konsultasi</p>
          <Formik
            initialValues={{
              tgl: "",
              kegiatan: "",
              permasalahan: "",
              solusi: "",
              tandaTanganMah: "",
            }}
            onSubmit={_handleSubmit}
            validationSchema={validationSchema}
          >
            {({ errors, touched, handleSubmit, handleChange }) => (
              <form
                method="post"
                onSubmit={handleSubmit}
                className="form-add-category"
              >
                <div className="form-content">
                  <div className="form-group">
                    <label htmlFor="tgl">
                      Tanggal <span className="important">*</span>
                    </label>
                    <input
                      type="date"
                      id="tgl"
                      name="tgl"
                      onChange={handleChange}
                    />
                    {touched.tgl && errors.tgl ? (
                      <div className="error-form">{errors.tgl}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="kegiatan">
                      Kegiatan Mah. Saat Ini
                      <span className="important">*</span>
                    </label>
                    <input
                      type="text"
                      id="kegiatan"
                      name="kegiatan"
                      onChange={handleChange}
                    />
                    {touched.kegiatan && errors.kegiatan ? (
                      <div className="error-form">{errors.kegiatan}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="permasalahan">
                      Permasalahan <span className="important">*</span>
                    </label>
                    <input
                      type="text"
                      id="permasalahan"
                      name="permasalahan"
                      onChange={handleChange}
                    />
                    {touched.permasalahan && errors.permasalahan ? (
                      <div className="error-form">{errors.permasalahan}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="solusi">
                      Solusi <span className="important">*</span>
                    </label>
                    <input
                      type="text"
                      id="solusi"
                      name="solusi"
                      onChange={handleChange}
                    />
                    {touched.solusi && errors.solusi ? (
                      <div className="error-form">{errors.solusi}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="tandaTanganMah">
                      Tanda Tangan Mahasiswa
                      <span className="important">*</span>
                    </label>
                    <input
                      type="text"
                      id="tandaTanganMah"
                      name="tandaTanganMah"
                      onChange={handleChange}
                    />
                    {touched.tandaTanganMah && errors.tandaTanganMah ? (
                      <div className="error-form">{errors.tandaTanganMah}</div>
                    ) : null}
                  </div>
                </div>
                <div className="button-dua">
                  <button type="submit" className="button-simpan-rps">
                    <BsDatabaseAdd size={16} />
                    <span>
                      {loading ? "Loading..." : "Simpan"}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Layout;
