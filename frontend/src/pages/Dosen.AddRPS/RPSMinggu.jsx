import "./style.scss";
import { BsDatabaseAdd } from "react-icons/bs";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import { urlApi } from "../../config";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const validationSchema = Yup.object().shape({
  mingguKe: Yup.string().required("Minggu ke harus diisi"),
  subCpmk: Yup.string().required("SUB CPMK harus diisi"),
  bahanKajian: Yup.string().required("Bahan Kajian harus diisi"),
  bentukMetode: Yup.string().required("Bentuk Metode harus diisi"),
  estimasiWaktu: Yup.string().required("Estimasi Waktu harus diisi"),
  pengalamanBelajar: Yup.string().required("Pengalaman Belajar harus diisi"),
  kriteriaBentuk: Yup.string().required("Kriteria Bentuk harus diisi"),
  indikator: Yup.string().required("Indikator harus diisi"),
  bobot: Yup.string().required("Bobot harus diisi"),
});

const RPSMinggu = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const _handleSubmit = async (values, { resetForm }) => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const res = await axios.post(
          `${urlApi}/rps/mingguan`,
          {
            idRps: id,
            mingguKe: values.mingguKe,
            subCpmk: values.subCpmk,
            bahanKajian: values.bahanKajian,
            bentukMetode: values.bentukMetode,
            estimasiWaktu: values.estimasiWaktu,
            pengalamanBelajar: values.pengalamanBelajar,
            kriteriaBentuk: values.kriteriaBentuk,
            indikator: values.indikator,
            bobot: values.bobot,
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
        <h3>Tambah RPS Mingguan</h3>

        <Formik
          initialValues={{
            mingguKe: "",
            subCpmk: "",
            bahanKajian: "",
            bentukMetode: "",
            estimasiWaktu: "",
            pengalamanBelajar: "",
            kriteriaBentuk: "",
            indikator: "",
            bobot: "",
          }}
          onSubmit={_handleSubmit}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          {({ errors, touched, handleSubmit, handleChange }) => (
            <form
              method="post"
              onSubmit={handleSubmit}
              className="form-add-rps-dosen"
            >
              <div className="form-content">
                <div className="form-group">
                  <label htmlFor="mingguKe">
                    Minggu Ke <span className="important">*</span>
                  </label>
                  <textarea
                    id="mingguKe"
                    name="mingguKe"
                    onChange={handleChange}
                    rows="4"
                    cols="50"
                    style={{ resize: "none" }}
                  />
                  {touched.mingguKe && errors.mingguKe ? (
                    <div className="error-form">{errors.mingguKe}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="subCpmk">
                    Sub CPMK <span className="important">*</span>
                  </label>
                  <textarea
                    id="subCpmk"
                    name="subCpmk"
                    onChange={handleChange}
                    rows="4"
                    cols="50"
                    style={{ resize: "none" }}
                  />
                  {touched.subCpmk && errors.subCpmk ? (
                    <div className="error-form">{errors.subCpmk}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="bahanKajian">
                    Bahan Kajian <span className="important">*</span>
                  </label>
                  <textarea
                    id="bahanKajian"
                    name="bahanKajian"
                    onChange={handleChange}
                    rows="4"
                    cols="50"
                    style={{ resize: "none" }}
                  />
                  {touched.bahanKajian && errors.bahanKajian ? (
                    <div className="error-form">{errors.bahanKajian}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="bentukMetode">
                    Bentuk Metode <span className="important">*</span>
                  </label>
                  <textarea
                    id="bentukMetode"
                    name="bentukMetode"
                    onChange={handleChange}
                    rows="4"
                    cols="50"
                    style={{ resize: "none" }}
                  />
                  {touched.bentukMetode && errors.bentukMetode ? (
                    <div className="error-form">{errors.bentukMetode}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="estimasiWaktu">
                    Estimasi Waktu <span className="important">*</span>
                  </label>
                  <textarea
                    id="estimasiWaktu"
                    name="estimasiWaktu"
                    onChange={handleChange}
                    rows="4"
                    cols="50"
                    style={{ resize: "none" }}
                  />
                  {touched.estimasiWaktu && errors.estimasiWaktu ? (
                    <div className="error-form">{errors.estimasiWaktu}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="pengalamanBelajar">
                    Pengalaman Belajar <span className="important">*</span>
                  </label>
                  <textarea
                    id="pengalamanBelajar"
                    name="pengalamanBelajar"
                    onChange={handleChange}
                    rows="4"
                    cols="50"
                    style={{ resize: "none" }}
                  />
                  {touched.pengalamanBelajar && errors.pengalamanBelajar ? (
                    <div className="error-form">{errors.pengalamanBelajar}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="kriteriaBentuk">
                    Kriteria Bentuk <span className="important">*</span>
                  </label>
                  <textarea
                    id="kriteriaBentuk"
                    name="kriteriaBentuk"
                    onChange={handleChange}
                    rows="4"
                    cols="50"
                    style={{ resize: "none" }}
                  />
                  {touched.kriteriaBentuk && errors.kriteriaBentuk ? (
                    <div className="error-form">{errors.kriteriaBentuk}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="indikator">
                    Indikator <span className="important">*</span>
                  </label>
                  <textarea
                    id="indikator"
                    name="indikator"
                    onChange={handleChange}
                    rows="4"
                    cols="50"
                    style={{ resize: "none" }}
                  />
                  {touched.indikator && errors.indikator ? (
                    <div className="error-form">{errors.indikator}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="bobot">
                    Bobot <span className="important">*</span>
                  </label>
                  <textarea
                    id="bobot"
                    name="bobot"
                    onChange={handleChange}
                    rows="4"
                    cols="50"
                    style={{ resize: "none" }}
                  />
                  {touched.bobot && errors.bobot ? (
                    <div className="error-form">{errors.bobot}</div>
                  ) : null}
                </div>
              </div>
              <div className="button-dua">
                <button type="submit" className="button-simpan-rps">
                  <BsDatabaseAdd size={16} />
                  <span>{loading ? "Loading..." : "Simpan"}</span>
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RPSMinggu;
