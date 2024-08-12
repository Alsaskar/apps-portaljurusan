import "./style.scss";
import { BsDatabaseAdd } from "react-icons/bs";
import { MdRemoveRedEye } from "react-icons/md";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi } from "../../config";
import { Link } from "react-router-dom";

// Validasi schema
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title harus diisi"),
  deskripsi: Yup.string().required("Deskripsi harus diisi"),
  foto: Yup.mixed().required("Foto harus diisi"), // Validasi untuk file
});

const Layout = () => {
  const [loading, setLoading] = useState(false);

  const _handleSubmit = async (values) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("deskripsi", values.deskripsi);
    formData.append("foto", values.foto);

    try {
      await axios.post(`${urlApi}/galeri`, formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        title: "Berhasil",
        text: "Galeri berhasil dibuat",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        window.location.reload(); // Refresh halaman
      });
    } catch (err) {
      console.error("Error response:", err.response);
      Swal.fire({
        title: "Gagal",
        text: err.response?.data?.message || "Terjadi kesalahan",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="buat-galeri-hme">
      <div className="container">
        <p className="title">Buat Galeri</p>
        <Link to="/mahasiswa/data/galeri" className="btn-data-galeri">
          <MdRemoveRedEye size={18} /> Lihat Data
        </Link>
        <Formik
          initialValues={{
            title: "",
            deskripsi: "",
            foto: null,
          }}
          onSubmit={_handleSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="form-buat-galeri">
              <div className="form-content">
                <div className="form-group">
                  <label htmlFor="title">
                    Title <span className="important">*</span>
                  </label>
                  <Field type="text" id="title" name="title" />
                  {touched.title && errors.title ? (
                    <div className="error-form">{errors.title}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="deskripsi">
                    Deskripsi <span className="important">*</span>
                  </label>
                  <Field type="text" id="deskripsi" name="deskripsi" />
                  {touched.deskripsi && errors.deskripsi ? (
                    <div className="error-form">{errors.deskripsi}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="foto">
                    Foto <span className="important">*</span>
                  </label>
                  <input
                    type="file"
                    id="foto"
                    name="foto"
                    onChange={(event) => {
                      setFieldValue("foto", event.currentTarget.files[0]);
                    }}
                    accept="image/*" // Filter hanya gambar
                  />
                  {touched.foto && errors.foto ? (
                    <div className="error-form">{errors.foto}</div>
                  ) : null}
                </div>
              </div>
              {loading ? (
                <button disabled>
                  <BsDatabaseAdd size={16} />
                  <span>Loading...</span>
                </button>
              ) : (
                <button type="submit">
                  <BsDatabaseAdd size={16} />
                  <span>Simpan</span>
                </button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Layout;