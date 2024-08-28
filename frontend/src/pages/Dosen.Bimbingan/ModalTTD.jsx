import * as Yup from 'yup';
import PropTypes from "prop-types";
import { IoIosClose } from "react-icons/io";
import { BsDatabaseAdd } from "react-icons/bs";
import { Formik, ErrorMessage } from "formik";
import "./ModalTTD.scss";
import "./TTDForm.scss";
import { useState, useContext, useRef } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi } from "../../config";
import SignatureCanvas from "react-signature-canvas";
import { DosenContext } from "../../context/DosenContext";

const ModalTTD = ({ isOpen, handleClose, idMahasiswa }) => {
  const [loading, setLoading] = useState(false);
  const sigCanvas = useRef(null);
  const { result } = useContext(DosenContext) || {};
  const idDosen = result ? result.id : null;

  const _handleSubmit = async (values, { resetForm }) => {
    setLoading(true);

    try {
      const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL();

      if (!dataURL || dataURL === 'data:,') {
        Swal.fire({
          title: "Gagal",
          text: "Tanda tangan tidak boleh kosong",
          icon: "warning",
          confirmButtonText: "Ok",
        });
        setLoading(false);
        return;
      }

      const res = await axios.post(
        `${urlApi}/dosensignature`,
        {
          ttd: dataURL,
          idDosen,
          idMahasiswa, // Kirim idMahasiswa ke backend
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (res.status === 201) {
        Swal.fire({
          title: "Berhasil",
          text: "TTD berhasil disimpan",
          icon: "success",
          confirmButtonText: "Ok",
        });

        setLoading(false);
        resetForm();
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      setLoading(false);
      if (err.response?.status === 400) {
        Swal.fire({
          title: "Gagal",
          text: err.response?.data?.message || "Terjadi kesalahan",
          icon: "warning",
          confirmButtonText: "Ok",
        });
      } else {
        Swal.fire({
          title: "Gagal",
          text: "Terjadi kesalahan",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    }
  };

  const clearSignature = (setFieldValue) => {
    sigCanvas.current.clear();
    setFieldValue('ttd', ''); // Clear Formik field value
  };

  const validationSchema = Yup.object({
    ttd: Yup.string().required('Tanda tangan diperlukan'),
  });

  return (
    <>
      {isOpen && (
        <div className="ttd-modal fade-in">
          <div className="modal-content-ttd fade-in">
            <button onClick={handleClose} className="button-close-modal">
              <IoIosClose size={20} />
            </button>

            <div className="form-ttd">
              <div className="form-ttd-container">
                <p className="title-ttd">Buat Tanda Tangan</p>
                <Formik
                  initialValues={{
                    ttd: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={_handleSubmit}
                >
                  {({ handleSubmit, setFieldValue }) => (
                    <form
                      method="post"
                      onSubmit={handleSubmit}
                      className="form-ttd-dosen"
                    >
                      <div className="form-content-ttd">
                        <div className="form-group">
                          <label htmlFor="ttd">
                            Tanda Tangan <span className="important">*</span>
                          </label>
                          <div className="signature-section">
                            <div className="signature">
                              <SignatureCanvas
                                ref={sigCanvas}
                                penColor="black"
                                canvasProps={{
                                  className: "sigCanvas",
                                }}
                                onEnd={() => {
                                  const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL();
                                  setFieldValue('ttd', dataURL);
                                }}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => clearSignature(setFieldValue)}
                              className="btn-clear-signature"
                            >
                              Clear
                            </button>
                          </div>
                        </div>
                        <div className="error-message">
                          <ErrorMessage name="ttd">
                            {msg => <span className="error-text">{msg}</span>}
                          </ErrorMessage>
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

ModalTTD.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  idMahasiswa: PropTypes.string.isRequired, // Menambahkan prop idMahasiswa
};

export default ModalTTD;
