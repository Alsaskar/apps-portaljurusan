import PropTypes from "prop-types";
import { IoIosClose } from "react-icons/io";
import { BsDatabaseAdd } from "react-icons/bs";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import "./ModalSolusi.scss";
import "./SolusiForm.scss";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi } from "../../config";

const validationSchema = Yup.object().shape({
  solusi: Yup.string().required("Solusi harus diisi"),
});

const ModalSolusi = ({ isOpen, handleClose, evaluasi, setEvaluasi }) => {
  const [loading, setLoading] = useState(false);
  const [evaluasiId, setEvaluasiId] = useState(null);

  useEffect(() => {
    if (evaluasi) {
      setEvaluasiId(evaluasi.id);
    }
  }, [evaluasi]);

  const _handleSubmit = async (values, { resetForm }) => {
    if (!evaluasiId) {
      console.error("Evaluasi ID is missing in _handleSubmit");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.patch(
        `${urlApi}/evaluasimahasiswa/solusi/${evaluasiId}`,
        { solusi: values.solusi },
        { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } }
      );

      Swal.fire({
        title: "Berhasil",
        text: res.data.message,
        icon: "success",
        confirmButtonText: "Ok",
      });

      setEvaluasi((prevEvaluasi) =>
        prevEvaluasi.map((item) =>
          item.id === evaluasiId
            ? { ...item, solusi: values.solusi }
            : item
        )
      );

      setLoading(false);
      resetForm();
      handleClose();
    } catch (err) {
      console.error("API Error:", err);
      setLoading(false);
      Swal.fire({
        title: "Gagal",
        text: err.response?.data?.message || "Terjadi Kesalahan",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
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
                <p className="title-solusi">Berikan Solusi</p>
                <Formik
                  initialValues={{
                    solusi: evaluasi?.solusi || "", // Kosong jika belum ada solusi
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
                          <label htmlFor="solusi">
                            Solusi <span className="important">*</span>
                          </label>
                          <Field
                            type="text"
                            id="solusi"
                            name="solusi"
                            onChange={handleChange}
                          />
                          {touched.solusi && errors.solusi ? (
                            <div className="error-form">{errors.solusi}</div>
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
  evaluasi: PropTypes.object,
  setEvaluasi: PropTypes.func.isRequired,
};

export default ModalSolusi;
