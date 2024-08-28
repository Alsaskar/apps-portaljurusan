import PropTypes from "prop-types";
import { IoIosClose } from "react-icons/io";
import { BsDatabaseAdd } from "react-icons/bs";
import { Formik } from "formik";
import * as Yup from "yup";
import "./modal.scss";
import "./EditForm.scss";
import { useState, useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi } from "../../../config";
import info_foto from "../../../assets/images/info-foto.png";
import { DosenContext } from "../../../context/DosenContext";

const validationSchema = Yup.object().shape({
  foto: Yup.mixed().required("Foto harus diisi"),
});

const ModalUploadFoto = ({ isOpen, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const { result } = useContext(DosenContext) || {};


  const _handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
  
    try {
      const formData = new FormData();
      formData.append('foto', values.foto);
      formData.append('dosenId', result.id); // Menyertakan ID mahasiswa
  
      const res = await axios.post(
        `${urlApi}/dosen/upload-foto`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
  
      Swal.fire({
        title: "Berhasil",
        text: res.data.message,
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      });
  
      setLoading(false);
      resetForm();
      handleClose();
    } catch (err) {
      setLoading(false);
      Swal.fire({
        title: "Gagal",
        text: err.response?.data?.message || 'Terjadi Kesalahan',
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
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
                    foto: null,
                  }}
                  onSubmit={_handleSubmit}
                  validationSchema={validationSchema}
                  encType="multipart/form-data"
                >
                  {({ errors, touched, handleSubmit, setFieldValue }) => (
                    <form
                      method="post"
                      onSubmit={handleSubmit}
                      className="form-upload-foto-data"
                    >
                      <div className="form-content-upload">
                        <div className="form-group">
                          <label htmlFor="foto">
                            Foto <span className="important">*</span>
                          </label>
                          <input
                            type="file"
                            id="foto"
                            name="foto"
                            onChange={(event) => setFieldValue("foto", event.currentTarget.files[0])}
                          />
                          {touched.foto && errors.foto ? (
                            <div className="error-form">
                              {errors.foto}
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

ModalUploadFoto.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ModalUploadFoto;