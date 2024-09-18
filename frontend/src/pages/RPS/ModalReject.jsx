import PropTypes from "prop-types";
import { IoIosClose } from "react-icons/io";
import { BsDatabaseAdd } from "react-icons/bs";
import { Formik } from "formik";
import * as Yup from "yup";
import "./modalReject.scss";
import "./RejectForm.scss";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi } from "../../config";
import { useParams } from "react-router-dom";

const validationSchema = Yup.object().shape({
  ketTolak: Yup.string().required("Keterangan harus diisi"),
});

const ModalReject = ({ isOpen, handleClose }) => {
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const _handleSubmit = async (values) => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const res = await axios.put(
          `${urlApi}/rps/reject/${id}`,
          {
            status: "reject",
            ketTolak: values.ketTolak,
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
        <div className="reject-modal fade-in">
          <div className="modal-content-reject fade-in">
            <button onClick={handleClose} className="button-close-modal">
              <IoIosClose size={20} />
            </button>

            <div className="form-reject-foto">
              <div className="form-reject-foto-container">
                <h3 className="title-edit-dosen">Tolak RPS</h3>

                <Formik
                  initialValues={{
                    ketTolak: "",
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
                          <label htmlFor="ketTolak">
                            Keterangan
                            <span className="important">*</span>
                          </label>
                          <textarea
                            id="ketTolak"
                            name="ketTolak"
                            onChange={handleChange}
                            rows="4"
                            cols="50"
                            style={{ resize: "none" }}
                          />
                          {touched.ketTolak && errors.ketTolak ? (
                            <div className="error-form">{errors.ketTolak}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="button-simkel">
                        {loading ? (
                          <button disabled className="btn-loading">
                            <BsDatabaseAdd size={16} />
                            <span>Loading...</span>
                          </button>
                        ) : (
                          <button type="submit" className="btn-upload-foto">
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

ModalReject.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ModalReject;
