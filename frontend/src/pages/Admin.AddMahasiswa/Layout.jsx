import "./style.scss";
import { BsDatabaseAdd } from "react-icons/bs";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi } from "../../config";

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required("Nama harus diisi"),
  email: Yup.string().email("Email tidak valid").required("Email harus diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password harus diisi"),
  noHp: Yup.string().required("No Hp harus diisi"),
  nim: Yup.string().required("NIM harus diisi"),
  jenisKelamin: Yup.string().required("Jenis Kelamin harus diisi"),
  kotaLahir: Yup.string().required("Kota Lahir harus diisi"),
  tglLahir: Yup.string().required("Tanggal Lahir harus diisi"),
  prodi: Yup.string().required("Prodi harus diisi"),
  alamatTerakhir: Yup.string().required("Alamat Terakhir harus diisi"),
  kota: Yup.string().required("Kota harus diisi"),
  kodePos: Yup.string().required("Kode Pos harus diisi"),
  angkatan: Yup.string().required("Angkatan harus diisi"),
  noTestMasuk: Yup.string().required("No Test Masuk harus diisi"),
  tglTerdaftar: Yup.string().required("Tanggal Terdaftar harus diisi"),
  statusMasukPt: Yup.string().required("Status Masuk PT harus diisi"),
  jurusan: Yup.string().required("Jurusan harus diisi"),
  kelas: Yup.string().required("Kelas harus diisi"),
  agama: Yup.string().required("Agama harus diisi"),
});

const Layout = () => {
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

  const _handleSubmit = async (values, { resetForm }) => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const res = await axios.post(
          `${urlApi}/mahasiswa`,
          {
            fullname: values.fullname,
            email: values.email,
            password: values.password,
            noHp: values.noHp,
            nim: values.nim,
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
            kelas: values.kelas,
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
    <div className="form-add">
      <div className="form-add-container">
        <h3>Tambah Mahasiswa</h3>

        <Formik
          initialValues={{
            fullname: "",
            email: "",
            password: "",
            noHp: "",
            nim: "",
            jenisKelamin: "",
            kotaLahir: "",
            tglLahir: "",
            prodi: "",
            alamatTerakhir: "",
            kota: "",
            kodePos: "",
            angkatan: "",
            noTestMasuk: "",
            tglTerdaftar: "",
            statusMasukPt: "",
            jurusan: "",
            kelas: "",
            agama: "",
          }}
          onSubmit={_handleSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched, handleSubmit, handleChange }) => (
            <form
              method="post"
              onSubmit={handleSubmit}
              className="form-add-mahasiswa"
            >
              <div className="form-content">
                <div className="form-group">
                  <label htmlFor="fullname">
                    Nama Lengkap <span className="important">*</span>
                  </label>
                  <Field
                    type="text"
                    id="fullname"
                    name="fullname"
                    onChange={handleChange}
                  />
                  {touched.fullname && errors.fullname ? (
                    <div className="error-form">{errors.fullname}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    Email <span className="important">*</span>
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                  />
                  {touched.email && errors.email ? (
                    <div className="error-form">{errors.email}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="noHp">
                    Nomor Telepon <span className="important">*</span>
                  </label>
                  <Field
                    type="text"
                    id="noHp"
                    name="noHp"
                    onChange={handleChange}
                  />
                  {touched.noHp && errors.noHp ? (
                    <div className="error-form">{errors.noHp}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    Password <span className="important">*</span>
                  </label>
                  <Field
                    type="text"
                    id="password"
                    name="password"
                    onChange={handleChange}
                  />
                  {touched.password && errors.password ? (
                    <div className="error-form">{errors.password}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="nim">
                    NIM <span className="important">*</span>
                  </label>
                  <Field
                    type="text"
                    id="nim"
                    name="nim"
                    onChange={handleChange}
                  />
                  {touched.nim && errors.nim ? (
                    <div className="error-form">{errors.nim}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="jenisKelamin">
                    Jenis Kelamin <span className="important">*</span>
                  </label>
                  <Field
                    as="select"
                    id="jenisKelamin"
                    name="jenisKelamin"
                    onChange={handleChange}
                  >
                    {touched.jenisKelamin && errors.jenisKelamin ? (
                      <div className="error-form">{errors.jenisKelamin}</div>
                    ) : null}
                    <option value="">...</option>
                    <option value="laki-laki">Laki-Laki</option>
                    <option value="perempuan">Perempuan</option>
                  </Field>
                  {touched.jenisKelamin && errors.jenisKelamin ? (
                    <div className="error-form">{errors.jenisKelamin}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="kotaLahir">
                    Kota Lahir <span className="important">*</span>
                  </label>
                  <Field
                    type="text"
                    id="kotaLahir"
                    name="kotaLahir"
                    onChange={handleChange}
                  />
                  {touched.kotaLahir && errors.kotaLahir ? (
                    <div className="error-form">{errors.kotaLahir}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="tglLahir">
                    Tanggal Lahir <span className="important">*</span>
                  </label>
                  <Field
                    type="date"
                    id="tglLahir"
                    name="tglLahir"
                    onChange={handleChange}
                  />
                  {touched.tglLahir && errors.tglLahir ? (
                    <div className="error-form">{errors.tglLahir}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="prodi">
                    Prodi <span className="important">*</span>
                  </label>
                  <Field
                    as="select"
                    id="prodi"
                    name="prodi"
                    onChange={handleChange}
                  >
                    <option value="">...</option>
                    <option value="D4 Teknik Informatika">
                      D4 Teknik Informatika
                    </option>
                    <option value="D3 Teknik Komputer">
                      D3 Teknik Komputer
                    </option>
                    <option value="D4 Teknik Listrik">D4 Teknik Listrik</option>
                    <option value="D3 Teknik Listrik">D3 Teknik Listrik</option>
                  </Field>
                  {touched.prodi && errors.prodi ? (
                    <div className="error-form">{errors.prodi}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="alamatTerakhir">
                    Alamat Terakhir <span className="important">*</span>
                  </label>
                  <Field
                    type="text"
                    id="alamatTerakhir"
                    name="alamatTerakhir"
                    onChange={handleChange}
                  />
                  {touched.alamatTerakhir && errors.alamatTerakhir ? (
                    <div className="error-form">{errors.alamatTerakhir}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="kota">
                    Kota <span className="important">*</span>
                  </label>
                  <Field
                    type="text"
                    id="kota"
                    name="kota"
                    onChange={handleChange}
                  />
                  {touched.kota && errors.kota ? (
                    <div className="error-form">{errors.kota}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="kodePos">
                    Kode Pos <span className="important">*</span>
                  </label>
                  <Field
                    type="text"
                    id="kodePos"
                    name="kodePos"
                    onChange={handleChange}
                  />
                  {touched.kodePos && errors.kodePos ? (
                    <div className="error-form">{errors.kodePos}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="angkatan">
                    Angakatan <span className="important">*</span>
                  </label>
                  <Field
                    type="text"
                    id="angkatan"
                    name="angkatan"
                    onChange={handleChange}
                  />
                  {touched.angkatan && errors.angkatan ? (
                    <div className="error-form">{errors.angkatan}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="noTestMasuk">
                    No Test Masuk <span className="important">*</span>
                  </label>
                  <Field
                    type="text"
                    id="noTestMasuk"
                    name="noTestMasuk"
                    onChange={handleChange}
                  />
                  {touched.noTestMasuk && errors.noTestMasuk ? (
                    <div className="error-form">{errors.noTestMasuk}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="tglTerdaftar">
                    Tanggal Terdaftar <span className="important">*</span>
                  </label>
                  <Field
                    type="date"
                    id="tglTerdaftar"
                    name="tglTerdaftar"
                    onChange={handleChange}
                  />
                  {touched.tglTerdaftar && errors.tglTerdaftar ? (
                    <div className="error-form">{errors.tglTerdaftar}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="statusMasukPt">
                    Status Masuk PT <span className="important">*</span>
                  </label>
                  <Field
                    type="text"
                    id="statusMasukPt"
                    name="statusMasukPt"
                    onChange={handleChange}
                  />
                  {touched.statusMasukPt && errors.statusMasukPt ? (
                    <div className="error-form">{errors.statusMasukPt}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="jurusan">
                    Jurusan <span className="important">*</span>
                  </label>
                  <Field
                    type="text"
                    id="jurusan"
                    name="jurusan"
                    onChange={handleChange}
                  />
                  {touched.jurusan && errors.jurusan ? (
                    <div className="error-form">{errors.jurusan}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="kelas">
                    Kelas <span className="important">*</span>
                  </label>
                  <Field
                    as="select"
                    id="kelas"
                    name="kelas"
                    onChange={handleChange}
                  >
                    <option value="">...</option>
                    {kelas.map((val, key) => {
                      return <option key={key}>{val.namaKelas}</option>;
                    })}
                  </Field>
                  {touched.kelas && errors.kelas ? (
                    <div className="error-form">{errors.kelas}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="agama">
                    Agama <span className="important">*</span>
                  </label>
                  <Field
                    as="select"
                    id="agama"
                    name="agama"
                    onChange={handleChange}
                  >
                    <option value="">...</option>
                    <option value="Kristen Protestan">Kristen Protestan</option>
                    <option value="Katolik">Katolik</option>
                    <option value="Islam">Islam</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Buddha">Buddha</option>
                    <option value="Konghucu">Konghucu</option>
                  </Field>
                  {touched.agama && errors.agama ? (
                    <div className="error-form">{errors.agama}</div>
                  ) : null}
                </div>
              </div>
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
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Layout;
