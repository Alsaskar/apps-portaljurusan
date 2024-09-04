import PropTypes from "prop-types";
import { IoIosClose } from "react-icons/io";
import { BsDatabaseAdd } from "react-icons/bs";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import "./ModalAddKelas.scss";
import "./AddKelasForm.scss";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi } from "../../config";

const validationSchema = Yup.object().shape({
  namaKelas: Yup.string().required("Nama Kelas harus diisi"),
});

const ModalSolusi = ({ isOpen, handleClose }) => {
  const [loading, setLoading] = useState(false);

  const _handleSubmit = async (values) => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const res = await axios.post(
          `${urlApi}/kelas`,
          {
            namaKelas: values.namaKelas,
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
        <div className="solusi-modal fade-in">
          <div className="modal-content-solusi fade-in">
            <button onClick={handleClose} className="button-close-modal">
              <IoIosClose size={20} />
            </button>

            <div className="form-solusi">
              <div className="form-solusi-container">
                <p className="title-solusi">Add Kelas</p>
                <Formik
                  initialValues={{
                    kelas: "",
                  }}
                  onSubmit={_handleSubmit}
                  validationSchema={validationSchema}
                >
                  {({ errors, touched, handleSubmit, handleChange }) => (
                    <form
                      method="post"
                      onSubmit={handleSubmit}
                      className="form-berikan-solusi"
                    >
                      <div className="form-content-solusi">
                        <div className="form-group">
                          <label htmlFor="namaKelas">
                            Kelas <span className="important">*</span>
                          </label>
                          <Field
                            type="text"
                            id="namaKelas"
                            name="namaKelas"
                            onChange={handleChange}
                          />
                          {touched.namaKelas && errors.namaKelas ? (
                            <div className="error-form">{errors.namaKelas}</div>
                          ) : null}
                        </div>
                      </div>
                      {loading ? (
                        <button disabled className="btn-buat-evaluasi">
                          <BsDatabaseAdd size={16} />
                          <span>Loading...</span>
                        </button>
                      ) : (
                        <button type="submit" className="btn-buat-evaluasi">
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

ModalSolusi.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ModalSolusi;
