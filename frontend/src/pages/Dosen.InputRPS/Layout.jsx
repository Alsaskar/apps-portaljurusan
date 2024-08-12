import "./style.scss";
import { BsDatabaseAdd } from "react-icons/bs";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi } from "../../config";

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required("Nama harus diisi"),
  noHp: Yup.string().required("No Hp harus diisi"),
  nim: Yup.string().required("NIM harus diisi"),
  jenisKelamin: Yup.string().required("Jenis Kelamin harus diisi"),
});

const Layout = () => {
  const [loading, setLoading] = useState(false);

  const _handleSubmit = async (values, { resetForm }) => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const res = await axios.post(
          `${urlApi}/mahasiswa`,
          {
            fullname: values.fullname,
            email: values.email,
            password: values.password,
            noHp: values.noHp,
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
    <div className="form-add-input-rps">
      <div className="form-add-input-rps-container">
        <h3>Input RPS</h3>

        <Formik
          initialValues={{
            fullname: "",
            email: "",
            password: "",
            noHp: "",
          }}
          onSubmit={_handleSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched, handleSubmit, handleChange }) => (
            <form
              method="post"
              onSubmit={handleSubmit}
              className="form-add-input"
            >
              <div className="form-content">
                <div className="form-group">
                  <label htmlFor="fullname">
                    Nama Lengkap <span className="important">*</span>
                  </label>
                  <Field
                    type="text"
                    id="fullname"
                    name="fullname"
                    onChange={handleChange}
                  />
                  {touched.fullname && errors.fullname ? (
                    <div className="error-form">{errors.fullname}</div>
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
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Layout;
