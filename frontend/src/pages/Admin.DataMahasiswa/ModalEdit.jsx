import PropTypes from "prop-types";
import { IoIosClose } from "react-icons/io";
import { BsDatabaseAdd } from "react-icons/bs";
import { Formik } from "formik";
import * as Yup from "yup";
import "./modal.scss";
import "./EditForm.scss";
import { useMemo, useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi } from "../../config";

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required("Nama harus diisi"),
  email: Yup.string().required("Email harus diisi").email("Email tidak valid"),
  noHp: Yup.string().required("No HP harus diisi"),
  nim: Yup.string().required("NIM harus diisi"),
  kelas: Yup.string().required("Kelas harus diisi"),
  jenisKelamin: Yup.string().required("Jenis Kelamin harus diisi"),
  kota: Yup.string().required("Kota tidak valid"),
  tglLahir: Yup.string().required("Tanggal Lahir harus diisi"),
  kotaLahir: Yup.string().required("Kota Lahir harus diisi"),
  angkatan: Yup.string().required("angkatan harus diisi"),
  kodePos: Yup.string().required("Kode Pos harus diisi"),
  noTesMasuk: Yup.string().required("No Tes Masuk harus diisi"),
  statusMasukPt: Yup.string().required("Status Masuk PT harus diisi"),
  jurusan: Yup.string().required("Jurusan harus diisi"),
  agama: Yup.string().required("Agama harus diisi"),
  prodi: Yup.string().required("Prodi harus diisi"),
});

const ModalEdit = ({ data, dataUser, isOpen, handleClose }) => {
  const [loading, setLoading] = useState(false);

  const [kelas, setKelas] = useState([]);

  const _listDataKelas = async () => {
    try {
      const res = await axios.get(`${urlApi}/kelas`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      setKelas(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _listDataKelas();
  }, []);

  const dataDefault = useMemo(() => {
    if (!data) return {};

    return {
      userId: data.userId,
      fullname: data.fullname,
      email: dataUser.email,
      noHp: dataUser.noHp,
      nim: data.nim,
      kelas: data.kelas,
      jenisKelamin: data.jenisKelamin,
      kota: data.kota,
      tglLahir: data.tglLahir,
      kotaLahir: data.kotaLahir,
      angkatan: data.angkatan,
      kodePos: data.kodePos,
      tglTerdaftar: data.tglTerdaftar,
      noTesMasuk: data.noTesMasuk,
      statusMasukPt: data.statusMasukPt,
      jurusan: data.jurusan,
      agama: data.agama,
      prodi: data.prodi,
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dataUser]);

  const _handleSubmit = async (values) => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const res = await axios.put(
          `${urlApi}/mahasiswa/${dataDefault.userId}`,
          {
            fullname: values.fullname,
            email: values.email,
            noHp: values.noHp,
            nim: values.nim,
            kelas: values.kelas,
            jenisKelamin: values.jenisKelamin,
            kotaLahir: values.kotaLahir,
            tglLahir: values.tglLahir,
            prodi: values.prodi,
            alamatTerakhir: values.alamatTerakhir,
            kota: values.kota,
            kodePos: values.kodePos,
            angkatan: values.angkatan,
            noTestMasuk: values.noTestMasuk,
            tglTerdaftar: values.tglTerdaftar,
            statusMasukPt: values.statusMasukPt,
            jurusan: values.jurusan,
            agama: values.agama,
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
        <div className="edit-modal fade-in">
          <div className="modal-content-edit fade-in">
            <button onClick={handleClose} className="button-close-modal">
              <IoIosClose size={20} />
            </button>

            <div className="form-add">
              <div className="form-add-container">
                <h3 className="title-edit-dosen">Edit Mahasiswa</h3>

                <Formik
                  initialValues={{
                    fullname: dataDefault.fullname,
                    email: dataDefault.email,
                    noHp: dataDefault.noHp,
                    nim: dataDefault.nim,
                    kelas: dataDefault.kelas,
                    jenisKelamin: dataDefault.jenisKelamin,
                    kota: dataDefault.kota,
                    tglLahir: dataDefault.tglLahir,
                    kotaLahir: dataDefault.kotaLahir,
                    angkatan: dataDefault.angkatan,
                    kodePos: dataDefault.kodePos,
                    tglTerdaftar: dataDefault.tglTerdaftar,
                    noTesMasuk: dataDefault.noTesMasuk,
                    statusMasukPt: dataDefault.statusMasukPt,
                    jurusan: dataDefault.jurusan,
                    agama: dataDefault.agama,
                    prodi: dataDefault.prodi,
                    tahun: dataDefault.tahun,
                  }}
                  onSubmit={_handleSubmit}
                  validationSchema={validationSchema}
                >
                  {({
                    errors,
                    touched,
                    handleSubmit,
                    handleChange,
                    values,
                  }) => (
                    <form
                      method="post"
                      onSubmit={handleSubmit}
                      className="form-edit-mahasiswa"
                    >
                      <div className="form-content">
                        <div className="form-group">
                          <label htmlFor="fullname">
                            Nama Lengkap <span className="important">*</span>
                          </label>
                          <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            onChange={handleChange}
                            value={values.fullname}
                          />
                          {touched.fullname && errors.fullname ? (
                            <div className="error-form">{errors.fullname}</div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="jenisKelamin">
                            Jenis Kelamin <span className="important">*</span>
                          </label>
                          <select
                            id="jenisKelamin"
                            name="jenisKelamin"
                            onChange={handleChange}
                            value={values.jenisKelamin}
                          >
                            {touched.jenisKelamin && errors.jenisKelamin ? (
                              <div className="error-form">
                                {errors.jenisKelamin}
                              </div>
                            ) : null}
                            <option value="">...</option>
                            <option value="laki-laki">Laki-laki</option>
                            <option value="perempuan">Perempuan</option>
                          </select>
                          {touched.jenisKelamin && errors.jenisKelamin ? (
                            <div className="error-form">
                              {errors.jenisKelamin}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">
                            Email <span className="important">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            value={values.email}
                          />
                          {touched.email && errors.email ? (
                            <div className="error-form">{errors.email}</div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="noHp">
                            No Hp <span className="important">*</span>
                          </label>
                          <input
                            type="text"
                            id="noHp"
                            name="noHp"
                            onChange={handleChange}
                            value={values.noHp}
                          />
                          {touched.noHp && errors.noHp ? (
                            <div className="error-form">{errors.noHp}</div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="kelas">
                            Kelas <span className="important">*</span>
                          </label>
                          <select
                            id="kelas"
                            name="kelas"
                            onChange={handleChange}
                            value={values.kelas}
                          >
                            {touched.kelas && errors.kelas ? (
                              <div className="error-form">{errors.kelas}</div>
                            ) : null}
                            <option value="">...</option>
                            {kelas.map((val, key) => {
                              return <option key={key}>{val.namaKelas}</option>;
                            })}
                          </select>
                          {touched.kelas && errors.kelas ? (
                            <div className="error-form">{errors.kelas}</div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="tglLahir">
                            Tanggal Lahir <span className="important">*</span>
                          </label>
                          <input
                            type="date"
                            id="tglLahir"
                            name="tglLahir"
                            onChange={handleChange}
                            value={values.tglLahir}
                          />
                          {touched.tglLahir && errors.tglLahir ? (
                            <div className="error-form">{errors.tglLahir}</div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="kotaLahir">
                            Kota Lahir <span className="important">*</span>
                          </label>
                          <input
                            type="text"
                            id="kotaLahir"
                            name="kotaLahir"
                            onChange={handleChange}
                            value={values.kotaLahir}
                          />
                          {touched.kotaLahir && errors.kotaLahir ? (
                            <div className="error-form">{errors.kotaLahir}</div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="nim">
                            NIM <span className="important">*</span>
                          </label>
                          <input
                            type="text"
                            id="nim"
                            name="nim"
                            onChange={handleChange}
                            value={values.nim}
                          />
                          {touched.nim && errors.nim ? (
                            <div className="error-form">{errors.nim}</div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="kota">
                            Kota <span className="important">*</span>
                          </label>
                          <input
                            type="text"
                            id="kota"
                            name="kota"
                            onChange={handleChange}
                            value={values.kota}
                          />
                          {touched.kota && errors.kota ? (
                            <div className="error-form">{errors.kota}</div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="kodePos">
                            Kode Pos <span className="important">*</span>
                          </label>
                          <input
                            type="text"
                            id="kodePos"
                            name="kodePos"
                            onChange={handleChange}
                            value={values.kodePos}
                          />
                          {touched.kodePos && errors.kodePos ? (
                            <div className="error-form">{errors.kodePos}</div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="angkatan">
                            Angkatan <span className="important">*</span>
                          </label>
                          <input
                            type="text"
                            id="angkatan"
                            name="angkatan"
                            onChange={handleChange}
                            value={values.angkatan}
                          />
                          {touched.angkatan && errors.angkatan ? (
                            <div className="error-form">{errors.angkatan}</div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="jurusan">
                            Jurusan <span className="important">*</span>
                          </label>
                          <input
                            type="text"
                            id="jurusan"
                            name="jurusan"
                            onChange={handleChange}
                            value={values.jurusan}
                          />
                          {touched.jurusan && errors.jurusan ? (
                            <div className="error-form">{errors.jurusan}</div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="prodi">
                            Prodi <span className="important">*</span>
                          </label>
                          <select
                            id="prodi"
                            name="prodi"
                            onChange={handleChange}
                            value={values.prodi}
                          >
                            <option value="">...</option>
                            <option value="D4 Teknik Informatika">
                              D4 Teknik Informatika
                            </option>
                            <option value="D3 Teknik Komputer">
                              D3 Teknik Komputer
                            </option>
                            <option value="D4 Teknik Listrik">
                              D4 Teknik Listrik
                            </option>
                            <option value="D3 Teknik Listrik">
                              D3 Teknik Listrik
                            </option>
                          </select>
                          {touched.prodi && errors.prodi ? (
                            <div className="error-form">{errors.prodi}</div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="noTesMasuk">
                            No Tes Masuk <span className="important">*</span>
                          </label>
                          <input
                            type="text"
                            id="noTesMasuk"
                            name="noTesMasuk"
                            onChange={handleChange}
                            value={values.noTesMasuk}
                          />
                          {touched.noTesMasuk && errors.noTesMasuk ? (
                            <div className="error-form">
                              {errors.noTesMasuk}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="statusMasukPt">
                            Status Masuk PT <span className="important">*</span>
                          </label>
                          <input
                            type="text"
                            id="statusMasukPt"
                            name="statusMasukPt"
                            onChange={handleChange}
                            value={values.statusMasukPt}
                          />
                          {touched.statusMasukPt && errors.statusMasukPt ? (
                            <div className="error-form">
                              {errors.statusMasukPt}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="agama">
                            Agama <span className="important">*</span>
                          </label>
                          <select
                            id="agama"
                            name="agama"
                            onChange={handleChange}
                            value={values.agama}
                          >
                            <option value="">...</option>
                            <option value="Kristen Protestan">
                              Kristen Protestan
                            </option>
                            <option value="Katolik">Katolik</option>
                            <option value="Islam">Islam</option>
                            <option value="Hindu">Hindu</option>
                            <option value="Buddha">Buddha</option>
                            <option value="Konghucu">Konghucu</option>
                          </select>
                          {touched.agama && errors.agama ? (
                            <div className="error-form">{errors.agama}</div>
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
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  dataUser: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default ModalEdit;
