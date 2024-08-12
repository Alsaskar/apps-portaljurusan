import "./style.scss";
import { BsDatabaseAdd } from "react-icons/bs";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi } from "../../config";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdRemoveRedEye } from "react-icons/md";

const validationSchema = Yup.object().shape({
  namaKegiatan: Yup.string().required("Nama Kegiatan harus diisi"),
  description: Yup.string().required("Deskripsi Kegiatan harus diisi"),
  tglPelaksanaan: Yup.string().required("Tanggal Pelaksanaan harus diisi"),
  jamMulai: Yup.string().required("Jam mUlia harus diisi"),
  jamSelesai: Yup.string().required("Jam Selesai harus diisi"),
  lokasi: Yup.string().required("Lokasi harus diisi"),
});

const Layout = () => {
  const [loading, setLoading] = useState(false);

  const _handleSubmit = async (values, { resetForm }) => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const res = await axios.post(
          `${urlApi}/himaju/add-proker`,
          {
            namaKegiatan: values.namaKegiatan,
            description: values.description,
            tglPelaksanaan: values.tglPelaksanaan,
            jamMulai: values.jamMulai,
            jamSelesai: values.jamSelesai,
            lokasi: values.lokasi,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
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

  return (
    <div className="program-kerja">
      <div className="container">
        <div className="content">
          <div className="text-title-program-kerja">
            <p className="title">Buat Program Kerja</p>
          </div>
          <Link
            to="/mahasiswa/data/program/kerja/hme"
            className="btn-data-program-kerja-hme"
          >
            <MdRemoveRedEye size={18} /> Lihat Data
          </Link>
          <div className="buat-program-kerja">
            <Formik
              initialValues={{
                namaKegiatan: "",
                description: "",
                tglPelaksanaan: "",
                jamMulai: "",
                jamSelesai: "",
                lokasi: "",
              }}
              onSubmit={_handleSubmit}
              validationSchema={validationSchema}
            >
              {({ errors, touched, handleSubmit, handleChange }) => (
                <form
                  method="post"
                  onSubmit={handleSubmit}
                  className="form-buat-program-kerja"
                >
                  <div className="form-content">
                    <div className="form-group">
                      <label htmlFor="namaKegiatan">
                        Nama Kegiatan <span className="important">*</span>
                      </label>
                      <Field
                        type="text"
                        id="namaKegiatan"
                        name="namaKegiatan"
                        onChange={handleChange}
                      />
                      {touched.namaKegiatan && errors.namaKegiatan ? (
                        <div className="error-form">{errors.namaKegiatan}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">
                        Deskripsi Kegiatan <span className="important">*</span>
                      </label>
                      <Field
                        type="text"
                        id="description"
                        name="description"
                        onChange={handleChange}
                      />
                      {touched.description && errors.description ? (
                        <div className="error-form">{errors.description}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="tglPelaksanaan">
                        Tanggal Pelaksanaan <span className="important">*</span>
                      </label>
                      <Field
                        type="date"
                        id="tglPelaksanaan"
                        name="tglPelaksanaan"
                        onChange={handleChange}
                      />
                      {touched.tglPelaksanaan && errors.tglPelaksanaan ? (
                        <div className="error-form">
                          {errors.tglPelaksanaan}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="jamMulai">
                        Jam Mulai Kegiatan <span className="important">*</span>
                      </label>
                      <Field
                        type="time"
                        id="jamMulai"
                        name="jamMulai"
                        onChange={handleChange}
                      />
                      {touched.jamMulai && errors.jamMulai ? (
                        <div className="error-form">{errors.jamMulai}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="jamSelesai">
                        Jam Selesai Kegiatan
                        <span className="important">*</span>
                      </label>
                      <Field
                        type="time"
                        id="jamSelesai"
                        name="jamSelesai"
                        onChange={handleChange}
                      />
                      {touched.jamSelesai && errors.jamSelesai ? (
                        <div className="error-form">{errors.jamSelesai}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="lokasi">
                        Tempat
                        <span className="important">*</span>
                      </label>
                      <Field
                        type="text"
                        id="lokasi"
                        name="lokasi"
                        onChange={handleChange}
                      />
                      {touched.lokasi && errors.lokasi ? (
                        <div className="error-form">{errors.lokasi}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="button-dua">
                    {loading ? (
                      <button disabled className="button-simpan-program-kerja">
                        <BsDatabaseAdd size={16} />
                        <span>Loading...</span>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="button-simpan-program-kerja"
                      >
                        <BsDatabaseAdd size={16} />
                        <span>Simpan</span>
                      </button>
                    )}
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
