import "./style.scss";
import { BsDatabaseAdd } from "react-icons/bs";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useState } from "react";
import axios from "axios";
import { urlApi } from "../../config";

const validationSchema = Yup.object().shape({
  mataKuliah: Yup.string().required("Mata Kuliah harus diisi"),
  kelas: Yup.string().required("Kelas harus diisi"),
  hari: Yup.string().required("Hari harus diisi"),
  ruangan: Yup.string().required("Ruangan harus diisi"),
});

const Layout = () => {
  const [loading, setLoading] = useState(false);

  const _handleSubmit = async (values, { resetForm }) => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const res = await axios.post(
          `${urlApi}/jadwal`,
          {
            mataKuliah: values.mataKuliah,
            kelas: values.kelas,
            hari: values.hari,
            ruangan: values.ruangan,
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
    <div className="jadwal">
      <div className="container">
        <div className="content">
          <div className="add-category">
            <p className="title">Tambah Category</p>
            <Formik
              initialValues={{
                mataKuliah: "",
                kelas: "",
                hari: "",
                ruangan: "",
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
                      <label htmlFor="mataKuliah">
                        Mata Kuliah <span className="important">*</span>
                      </label>
                      <input
                        type="text"
                        id="mataKuliah"
                        name="mataKuliah"
                        onChange={handleChange}
                      />
                      {touched.mataKuliah && errors.mataKuliah ? (
                        <div className="error-form">{errors.mataKuliah}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="kelas">
                        Kelas <span className="important">*</span>
                      </label>
                      <input
                        type="text"
                        id="kelas"
                        name="kelas"
                        onChange={handleChange}
                      />
                      {touched.kelas && errors.kelas ? (
                        <div className="error-form">{errors.kelas}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="hari">
                        Hari <span className="important">*</span>
                      </label>
                      <input
                        type="text"
                        id="hari"
                        name="hari"
                        onChange={handleChange}
                      />
                      {touched.hari && errors.hari ? (
                        <div className="error-form">{errors.hari}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="ruangan">
                        Ruangan <span className="important">*</span>
                      </label>
                      <input
                        type="text"
                        id="ruangan"
                        name="ruangan"
                        onChange={handleChange}
                      />
                      {touched.ruangan && errors.ruangan ? (
                        <div className="error-form">{errors.ruangan}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="button-dua">
                    {loading ? (
                      <button disabled>
                        <BsDatabaseAdd size={16} />
                        <span>Loading...</span>
                      </button>
                    ) : (
                      <button type="submit" className="button-simpan-rps">
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
