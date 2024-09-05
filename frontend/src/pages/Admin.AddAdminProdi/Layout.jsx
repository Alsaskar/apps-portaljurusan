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
  email: Yup.string().email("Email tidak valid").required("Email harus diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password harus diisi"),
  noHp: Yup.string().required("No Hp harus diisi"),
  username: Yup.string().required("Username harus diisi"),
  prodi: Yup.string().required("Prodi harus diisi"),
});

const Layout = () => {
  const [loading, setLoading] = useState(false);

  const _handleSubmit = async (values, { resetForm }) => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const res = await axios.post(
          `${urlApi}/dosen`,
          {
            fullname: values.fullname,
            email: values.email,
            password: values.password,
            noHp: values.noHp,
            username: values.username,
            prodi: values.prodi,
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
    <div className="form-add">
      <div className="form-add-container">
        <h3>Tambah Admin</h3>

        <Formik
          initialValues={{
            fullname: "",
            email: "",
            password: "",
            noHp: "",
            username: "",
            prodi: "",
          }}
          onSubmit={_handleSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched, handleSubmit, handleChange }) => (
            <form
              method="post"
              onSubmit={handleSubmit}
              className="form-add-dosen"
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
                <div className="form-group">
                  <label htmlFor="email">
                    Email <span className="important">*</span>
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                  />
                  {touched.email && errors.email ? (
                    <div className="error-form">{errors.email}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    Password <span className="important">*</span>
                  </label>
                  <Field
                    type="text"
                    id="password"
                    name="password"
                    onChange={handleChange}
                  />
                  {touched.password && errors.password ? (
                    <div className="error-form">{errors.password}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="noHp">
                    No Hp <span className="important">*</span>
                  </label>
                  <Field
                    type="text"
                    id="noHp"
                    name="noHp"
                    onChange={handleChange}
                  />
                  {touched.noHp && errors.noHp ? (
                    <div className="error-form">{errors.noHp}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="username">
                    Username <span className="important">*</span>
                  </label>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    onChange={handleChange}
                  />
                  {touched.username && errors.username ? (
                    <div className="error-form">{errors.username}</div>
                  ) : null}
                </div>
                
                <div className="form-group">
                  <label htmlFor="prodi">
                    Prodi <span className="important">*</span>
                  </label>
                  <Field
                    as="select"
                    id="prodi"
                    name="prodi"
                    onChange={handleChange}
                  >
                    <option value="">...</option>
                    <option value="D4 Teknik Informatika">
                      D4 Teknik Informatika
                    </option>
                    <option value="D3 Teknik Komputer">
                      D3 Teknik Komputer
                    </option>
                    <option value="D4 Teknik Listrik">D4 Teknik Listrik</option>
                    <option value="D3 Teknik Listrik">D3 Teknik Listrik</option>
                  </Field>
                  {touched.prodi && errors.prodi ? (
                    <div className="error-form">{errors.prodi}</div>
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
