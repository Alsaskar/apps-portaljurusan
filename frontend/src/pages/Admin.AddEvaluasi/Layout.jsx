import "./style.scss";
import { BsDatabaseAdd } from "react-icons/bs";
import { Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { urlApi } from "../../config";
import { useParams } from "react-router-dom";

const Layout = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
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

  const validationSchema = Yup.object().shape({
    mataKuliah: Yup.string().required("Mata Kuliah harus diisi"),
    kelas: Yup.string().required("Kelas harus diisi"),
    hari: Yup.string().required("Hari harus diisi"),
    ruangan: Yup.string().required("Ruangan harus diisi"),
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
              mataKuliah: "",
              kelas: "",
              hari: "",
              ruangan: "",
            }}
            onSubmit={() => {
              console.log("submit");
            }}
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
                    <label htmlFor="tanggal">
                      Tanggal <span className="important">*</span>
                    </label>
                    <input
                      type="date"
                      id="tanggal"
                      name="tanggal"
                      onChange={handleChange}
                    />
                    {touched.tanggal && errors.tanggal ? (
                      <div className="error-form">{errors.tanggal}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="kegiatan">
                      Kegiatan Mah. Saat Ini{" "}
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
                      Tanda Tangan Mahasiswa{" "}
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
                    <span>Simpan</span>
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
