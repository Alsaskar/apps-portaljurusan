import PropTypes from "prop-types";
import { IoIosClose } from "react-icons/io";
import { BsDatabaseAdd } from "react-icons/bs";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import "./modal.scss";
import "./EditForm.scss";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi } from "../../../config";
import info_foto from "../../../assets/images/info-foto.png";

const validationSchema = Yup.object().shape({
  fotoProfile: Yup.string().required("Foto harus diisi"),
});

const ModalEdit = ({ isOpen, handleClose }) => {
  const [loading, setLoading] = useState(false);

  

  const _handleSubmit = async (values, { resetForm }) => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const res = await axios.post(
          `${urlApi}/mahasiswa`,
          {
            fotoProfile: values.fotoProfile,
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
    <>
      {isOpen && (
        <div className="upload-modal fade-in">
          <div className="modal-content-upload fade-in">
            <button onClick={handleClose} className="button-close-modal">
              <IoIosClose size={20} />
            </button>

            <div className="form-upload-foto">
              <div className="form-upload-foto-container">
                <h3 className="title-edit-dosen">Upload Foto</h3>

                <div className="img-section">
                  <img src={info_foto} alt="info-foto" className="info-foto" />
                </div>

                <Formik
                  initialValues={{
                    fotoProfile: "",
                  }}
                  onSubmit={_handleSubmit}
                  validationSchema={validationSchema}
                >
                  {({ errors, touched, handleSubmit, handleChange }) => (
                    <form
                      method="post"
                      onSubmit={handleSubmit}
                      className="form-upload-foto-data"
                    >
                      <div className="form-content-upload">
                        <div className="form-group">
                          <label htmlFor="fotoProfile">
                            Foto <span className="important">*</span>
                          </label>
                          <Field
                            type="file"
                            id="fotoProfile"
                            name="fotoProfile"
                            onChange={handleChange}
                          />
                          {touched.fotoProfile && errors.fotoProfile ? (
                            <div className="error-form">
                              {errors.fotoProfile}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="button-simkel">
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

                        <button
                          type="button"
                          onClick={handleClose}
                          className="button-keluar"
                        >
                          <BsDatabaseAdd size={16} />
                          <span>Keluar</span>
                        </button>
                      </div>
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

ModalEdit.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ModalEdit;
