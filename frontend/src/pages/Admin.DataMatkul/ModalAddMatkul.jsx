import PropTypes from "prop-types";
import { IoIosClose } from "react-icons/io";
import { BsDatabaseAdd } from "react-icons/bs";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import "./ModalAddMatkul.scss";
import "./AddMatkulForm.scss";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi } from "../../config";

const validationSchema = Yup.object().shape({
  matkul: Yup.string().required("Matkul harus diisi"),
  kodeMatkul: Yup.string().required("Kode Matakuliah harus diisi"),
  dosenPengajar: Yup.string().required("Dosen Pengajar harus diisi"),
});

const ModalAddMatkul = ({ isOpen, handleClose, dosenPengajar }) => {
  const [loading, setLoading] = useState(false);

  const _handleSubmit = async (values) => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const res = await axios.post(
          `${urlApi}/matkul`,
          {
            kodeMatkul: values.kodeMatkul,
            matkul: values.matkul,
            dosenPengajar: values.dosenPengajar,
            prodi: sessionStorage.getItem("prodiAdmin"),
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

        setTimeout(() => {
          window.location.reload();
        }, 2000);

        setLoading(false);
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
    <>
      {isOpen && (
        <div className="matkul-modal fade-in">
          <div className="modal-content-matkul fade-in">
            <button onClick={handleClose} className="button-close-modal">
              <IoIosClose size={20} />
            </button>

            <div className="form-matkul">
              <div className="form-matkul-container">
                <p className="title-matkul">Add Mata Kuliah</p>
                <Formik
                  initialValues={{
                    kodeMatkul: "",
                    matkul: "",
                    dosenPengajar: "",
                  }}
                  onSubmit={_handleSubmit}
                  validationSchema={validationSchema}
                >
                  {({ errors, touched, handleSubmit, handleChange }) => (
                    <form
                      method="post"
                      onSubmit={handleSubmit}
                      className="form-buat-matkul"
                    >
                      <div className="form-content-matkul">
                        <div className="form-group">
                          <label htmlFor="kodeMatkul">
                            Kode Mata Kuliah{" "}
                            <span className="important">*</span>
                          </label>
                          <Field
                            type="text"
                            id="kodeMatkul"
                            name="kodeMatkul"
                            onChange={handleChange}
                          />
                          {touched.kodeMatkul && errors.kodeMatkul ? (
                            <div className="error-form">
                              {errors.kodeMatkul}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="matkul">
                            Mata Kuliah <span className="important">*</span>
                          </label>
                          <Field
                            type="text"
                            id="matkul"
                            name="matkul"
                            onChange={handleChange}
                          />
                          {touched.matkul && errors.matkul ? (
                            <div className="error-form">{errors.matkul}</div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="dosenPengajar">
                            Dosen Pengajar <span className="important">*</span>
                          </label>
                          <Field
                            as="select"
                            id="dosenPengajar"
                            name="dosenPengajar"
                            onChange={handleChange}
                          >
                            <option value="">...</option>
                            {dosenPengajar.map((val, key) => {
                              return <option key={key}>{val.fullname}</option>;
                            })}
                          </Field>
                          {touched.dosenPengajar && errors.dosenPengajar ? (
                            <div className="error-form">
                              {errors.dosenPengajar}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      {loading ? (
                        <button disabled className="btn-simpan-matkul">
                          <BsDatabaseAdd size={16} />
                          <span>Loading...</span>
                        </button>
                      ) : (
                        <button type="submit" className="btn-simpan-matkul">
                          <BsDatabaseAdd size={16} />
                          <span>Simpan</span>
                        </button>
                      )}
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ModalAddMatkul.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  dosenPengajar: PropTypes.array.isRequired,
};

export default ModalAddMatkul;