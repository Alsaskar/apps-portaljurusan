import "./BuatEvaluasi.scss";
import "./style.scss";
import { BsDatabaseAdd } from "react-icons/bs";
import { Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useRef, useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi } from "../../config";
import { Link } from "react-router-dom";
import { MdRemoveRedEye } from "react-icons/md";
import SignatureCanvas from "react-signature-canvas";
import { MahasiswaContext } from "../../context/MahasiswaContext";

const validationSchema = Yup.object().shape({
  tgl: Yup.string().required("Tanggal harus diisi"),
  kegiatan: Yup.string().required("Kegiatan Mahasiswa Saat ini harus diisi"),
  permasalahan: Yup.string().required("Permasalahan harus diisi"),
  ttd: Yup.string().required("Tanda tangan diperlukan"),
});

const BuatEvaluasi = () => {
  const [loading, setLoading] = useState(false);
  const sigCanvas = useRef(null);
  const { result } = useContext(MahasiswaContext) || {};

  const idMahasiswa = result ? result.id : null;

  const _handleSubmit = async (values, { resetForm }) => {
    // setLoading(true);

    try {
      const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL();

      const res = await axios.post(
        `${urlApi}/evaluasimahasiswa`,
        {
          tgl: values.tgl,
          kegiatan: values.kegiatan,
          permasalahan: values.permasalahan,
          ttd: dataURL,
          idMahasiswa,
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
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      setLoading(false);
      Swal.fire({
        title: "Gagal",
        text: err.response?.data?.message || "Terjadi kesalahan",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const clearSignature = (setFieldValue) => {
    sigCanvas.current.clear();
    setFieldValue("ttd", ""); // Clear Formik field value
  };

  return (
    <div className="form-buat-evaluasi">
      <p className="title-buat-evaluasi">Buat Evaluasi</p>

      <Link
        to="/mahasiswa/lihat/data/evaluasi/bimbingan"
        className="lihat-file-evaluasi"
      >
        <MdRemoveRedEye size={18} />
        Lihat File
      </Link>
      <div className="form-buat-evaluasi-container">
        <Formik
          initialValues={{
            tgl: "",
            kegiatan: "",
            permasalahan: "",
            ttd: "",
          }}
          onSubmit={_handleSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched, handleSubmit, handleChange, setFieldValue }) => (
            <form
              method="post"
              onSubmit={handleSubmit}
              className="form-buat-evaluasi-mahasiswa"
            >
              <div className="form-content">
                <div className="form-group">
                  <label htmlFor="tgl">
                    Tanggal <span className="important">*</span>
                  </label>
                  <Field
                    type="date"
                    id="tgl"
                    name="tgl"
                    onChange={handleChange}
                  />
                  {touched.tgl && errors.tgl ? (
                    <div className="error-form">{errors.tgl}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="kegiatan">
                    Kegiatan Mah. Saat Ini <span className="important">*</span>
                  </label>
                  <Field
                    type="text"
                    id="kegiatan"
                    name="kegiatan"
                    onChange={handleChange}
                  />
                  {touched.kegiatan && errors.kegiatan ? (
                    <div className="error-form">{errors.kegiatan}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="permasalahan">
                    Permasalahan <span className="important">*</span>
                  </label>
                  <Field
                    type="text"
                    id="permasalahan"
                    name="permasalahan"
                    onChange={handleChange}
                  />
                  {touched.permasalahan && errors.permasalahan ? (
                    <div className="error-form">{errors.permasalahan}</div>
                  ) : null}
                </div>
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
                          const dataURL = sigCanvas.current
                            .getTrimmedCanvas()
                            .toDataURL();
                          setFieldValue("ttd", dataURL);
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
                  <div className="error-message">
                    <ErrorMessage name="ttd">
                      {(msg) => <span className="error-text">{msg}</span>}
                    </ErrorMessage>
                  </div>
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
  );
};

export default BuatEvaluasi;
