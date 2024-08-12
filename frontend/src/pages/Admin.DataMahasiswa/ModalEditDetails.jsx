import PropTypes from "prop-types";
import { IoIosClose } from "react-icons/io";
import { BsDatabaseAdd } from "react-icons/bs";
import { Formik } from "formik";
import * as Yup from "yup";
import "./modalEditDetails.scss";
import "./EditForm.scss";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi } from "../../config";

const validationSchema = Yup.object().shape({
  statusMahasiswa: Yup.string().required("Status Mahasiswa harus diisi"),
  tahunTamatSmta: Yup.string().required("Tahun Tamat SMTA harus diisi"),
  jurusanDiSmta: Yup.string().required("Jurusan Di SMTA harus diisi"),
  tglIjazahSmta: Yup.string().required("Tanggal Ijazah SMTA harus diisi"),
  nilaiUjianAkhirSmta: Yup.string().required("Nilai Ujian Akhir SMTA harus diisi"),
  namaOrtuWali: Yup.string().required("Nama Orangtua Wali harus diisi"),
  pendapatanOrtuWali: Yup.string().required("Pendapatan Orangtua Wali harus diisi"),
  alamatWali: Yup.string().required("Alamat Wali harus diisi"),
  kotaWali: Yup.string().required("Kota Wali harus diisi"),
  kodePosWali: Yup.string().required("Kode Pos Wali harus diisi"),
  noHpWali: Yup.string().required("No Hp Wali harus diisi"),
  emailWali: Yup.string().required("Email Wali harus diisi").email("Email tidak valid"),
});

const ModalEditDetails = ({ data, isOpen, handleClose }) => {
  const [loading, setLoading] = useState(false);

  const dataDefault = useMemo(() => {
    if (!data) return {};

    return {
      mahasiswaId: data.mahasiswaId,
      statusMahasiswa: data.statusMahasiswa,
      tahunTamatSmta: data.tahunTamatSmta,
      jurusanDiSmta: data.jurusanDiSmta,
      tglIjazahSmta: data.tglIjazahSmta,
      jenisKelamin: data.jenisKelamin,
      nilaiUjianAkhirSmta: data.nilaiUjianAkhirSmta,
      namaOrtuWali: data.namaOrtuWali,
      kotaLahir: data.kotaLahir,
      pendapatanOrtuWali: data.pendapatanOrtuWali,
      alamatWali: data.alamatWali,
      kotaWali: data.kotaWali,
      kodePosWali: data.kodePosWali,
      noHpWali: data.noHpWali,
      emailWali: data.emailWali,
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const _handleSubmit = async (values) => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const res = await axios.post(
          `${urlApi}/mahasiswa/add-detail?idMahasiswa=${dataDefault.mahasiswaId}`,
          {
            statusMahasiswa: values.statusMahasiswa,
            tahunTamatSmta: values.tahunTamatSmta,
            jurusanDiSmta: values.jurusanDiSmta,
            tglIjazahSmta: values.tglIjazahSmta,
            jenisKelamin: values.jenisKelamin,
            nilaiUjianAkhirSmta: values.nilaiUjianAkhirSmta,
            namaOrtuWali: values.namaOrtuWali,
            kotaLahir: values.kotaLahir,
            pendapatanOrtuWali: values.pendapatanOrtuWali,
            alamatWali: values.alamatWali,
            kotaWali: values.kotaWali,
            kodePosWali: values.kodePosWali,
            noHpWali: values.noHpWali,
            emailWali: values.emailWali,
          },
          { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } }
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
        <div className="edit-modal-details fade-in">
          <div className="modal-content-detailss fade-in">
            <button onClick={handleClose} className="button-close-modal">
              <IoIosClose size={20} />
            </button>

            <div className="form-add">
              <div className="form-add-container">
                <h3 className="title-edit-dosen">Edit Mahasiswa</h3>

                <Formik
                  initialValues={{
                    statusMahasiswa: dataDefault.statusMahasiswa,
                    tahunTamatSmta: dataDefault.tahunTamatSmta,
                    jurusanDiSmta: dataDefault.jurusanDiSmta,
                    tglIjazahSmta: dataDefault.tglIjazahSmta,
                    jenisKelamin: dataDefault.jenisKelamin,
                    nilaiUjianAkhirSmta: dataDefault.nilaiUjianAkhirSmta,
                    namaOrtuWali: dataDefault.namaOrtuWali,
                    kotaLahir: dataDefault.kotaLahir,
                    pendapatanOrtuWali: dataDefault.pendapatanOrtuWali,
                    alamatWali: dataDefault.alamatWali,
                    kotaWali: dataDefault.kotaWali,
                    kodePosWali: dataDefault.kodePosWali,
                    noHpWali: dataDefault.noHpWali,
                    emailWali: dataDefault.emailWali,
                  }}
                  onSubmit={_handleSubmit}
                  validationSchema={validationSchema}
                >
                  {({ errors, touched, handleSubmit, handleChange, values }) => (
                    <form method="post" onSubmit={handleSubmit} className="form-edit-mahasiswa">
                      <div className="form-content">
                        <div className="form-group">
                          <label htmlFor="statusMahasiswa">
                            Status Mahasiswa <span className="important">*</span>
                          </label>
                          <select id="statusMahasiswa" name="statusMahasiswa" onChange={handleChange} value={values.statusMahasiswa}>
                            {touched.statusMahasiswa && errors.statusMahasiswa ? <div className="error-form">{errors.statusMahasiswa}</div> : null}
                            <option value="">...</option>
                            <option value="Aktif">Aktif</option>
                            <option value="Tidak Aktif">Aktif</option>
                            <option value="Cuti">Cuti</option>
                          </select>
                          {touched.statusMahasiswa && errors.statusMahasiswa ? <div className="error-form">{errors.statusMahasiswa}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="tahunTamatSmta">
                            Tahun Tamat Smta <span className="important">*</span>
                          </label>
                          <input type="text" id="tahunTamatSmta" name="tahunTamatSmta" onChange={handleChange} value={values.tahunTamatSmta} />
                          {touched.tahunTamatSmta && errors.tahunTamatSmta ? <div className="error-form">{errors.tahunTamatSmta}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="jurusanDiSmta">
                            Jurusan Di Smta <span className="important">*</span>
                          </label>
                          <input type="text" id="jurusanDiSmta" name="jurusanDiSmta" onChange={handleChange} value={values.jurusanDiSmta} />
                          {touched.jurusanDiSmta && errors.jurusanDiSmta ? <div className="error-form">{errors.jurusanDiSmta}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="tglIjazahSmta">
                            Tanggal Ijazah Smta <span className="important">*</span>
                          </label>
                          <input type="date" id="tglIjazahSmta" name="tglIjazahSmta" onChange={handleChange} value={values.tglIjazahSmta} />
                          {touched.tglIjazahSmta && errors.tglIjazahSmta ? <div className="error-form">{errors.tglIjazahSmta}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="nilaiUjianAkhirSmta">
                            Nilai Ujian Akhir Smta <span className="important">*</span>
                          </label>
                          <input type="text" id="nilaiUjianAkhirSmta" name="nilaiUjianAkhirSmta" onChange={handleChange} value={values.nilaiUjianAkhirSmta} />
                          {touched.nilaiUjianAkhirSmta && errors.nilaiUjianAkhirSmta ? <div className="error-form">{errors.nilaiUjianAkhirSmta}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="namaOrtuWali">
                            Nama Orangtua Wali <span className="important">*</span>
                          </label>
                          <input type="text" id="namaOrtuWali" name="namaOrtuWali" onChange={handleChange} value={values.namaOrtuWali} />
                          {touched.namaOrtuWali && errors.namaOrtuWali ? <div className="error-form">{errors.namaOrtuWali}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="pendapatanOrtuWali">
                            Pendapatan Orangtua Wali <span className="important">*</span>
                          </label>
                          <input type="text" id="pendapatanOrtuWali" name="pendapatanOrtuWali" onChange={handleChange} value={values.pendapatanOrtuWali} />
                          {touched.pendapatanOrtuWali && errors.pendapatanOrtuWali ? <div className="error-form">{errors.pendapatanOrtuWali}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="alamatWali">
                            Alamat Wali <span className="important">*</span>
                          </label>
                          <input type="text" id="alamatWali" name="alamatWali" onChange={handleChange} value={values.alamatWali} />
                          {touched.alamatWali && errors.alamatWali ? <div className="error-form">{errors.alamatWali}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="kotaWali">
                            Kota Wali <span className="important">*</span>
                          </label>
                          <input type="text" id="kotaWali" name="kotaWali" onChange={handleChange} value={values.kotaWali} />
                          {touched.kotaWali && errors.kotaWali ? <div className="error-form">{errors.kotaWali}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="kodePosWali">
                            Kode Pos Wali <span className="important">*</span>
                          </label>
                          <input type="text" id="kodePosWali" name="kodePosWali" onChange={handleChange} value={values.kodePosWali} />
                          {touched.kodePosWali && errors.kodePosWali ? <div className="error-form">{errors.kodePosWali}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="noHpWali">
                            No Hp Wali <span className="important">*</span>
                          </label>
                          <input type="text" id="noHpWali" name="noHpWali" onChange={handleChange} value={values.noHpWali} />
                          {touched.noHpWali && errors.noHpWali ? <div className="error-form">{errors.noHpWali}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="emailWali">
                            Email Wali <span className="important">*</span>
                          </label>
                          <input type="email" id="emailWali" name="emailWali" onChange={handleChange} value={values.emailWali} />
                          {touched.emailWali && errors.emailWali ? <div className="error-form">{errors.emailWali}</div> : null}
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

                        <button type="button" onClick={handleClose} className="button-keluar">
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

ModalEditDetails.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default ModalEditDetails;
