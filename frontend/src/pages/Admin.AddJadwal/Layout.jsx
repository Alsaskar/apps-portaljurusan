import "./style.scss";
import { BsDatabaseAdd } from "react-icons/bs";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import axios from "axios";
import { urlApi } from "../../config";

const validationSchema = Yup.object().shape({
  idMatkul: Yup.string().required("Mata Kuliah harus diisi"),
  idKelas: Yup.string().required("Kelas harus diisi"),
  hari: Yup.string().required("Hari harus diisi"),
  ruangan: Yup.string().required("Ruangan harus diisi"),
  jamMulai: Yup.string().required("Jam Mulai harus diisi"),
  dosenPengajar: Yup.string().required("Dosen Pengajar harus diisi"),
});

const Layout = () => {
  const [loading, setLoading] = useState(false);
  const [matkul, setMatkul] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [dosen, setDosen] = useState([]);

  const _listData = async () => {
    try {
      const dataMatkul = await axios.get(
        `${urlApi}/matkul?prodi=${sessionStorage.getItem("prodiAdmin")}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      const dataKelas = await axios.get(`${urlApi}/kelas`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      const dataDosen = await axios.get(
        `${urlApi}/dosen/list-all/${sessionStorage.getItem("prodiAdmin")}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      setMatkul(dataMatkul.data.result);
      setKelas(dataKelas.data.result);
      setDosen(dataDosen.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _listData();
  }, []);

  const _handleSubmit = async (values, { resetForm }) => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const res = await axios.post(
          `${urlApi}/jadwal`,
          {
            prodiAdmin: sessionStorage.getItem("prodiAdmin"),
            idMatkul: values.idMatkul,
            idKelas: values.idKelas,
            hari: values.hari,
            ruangan: values.ruangan,
            jamMulai: values.jamMulai,
            dosenPengajar: values.dosenPengajar,
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
    <div className="jadwal">
      <div className="container">
        <div className="content">
          <div className="add-jadwal">
            <p className="title">Buat Jadwal</p>
            <Formik
              initialValues={{
                idMatkul: "",
                idKelas: "",
                hari: "",
                ruangan: "",
                jamMulai: "",
                dosenPengajar: "",
              }}
              onSubmit={_handleSubmit}
              validationSchema={validationSchema}
            >
              {({ errors, touched, handleSubmit, handleChange }) => (
                <form
                  method="post"
                  onSubmit={handleSubmit}
                  className="form-add-jadwal"
                >
                  <div className="form-content">
                    <div className="form-group">
                      <label htmlFor="idMatkul">
                        Mata Kuliah <span className="important">*</span>
                      </label>
                      <select
                        id="idMatkul"
                        name="idMatkul"
                        onChange={handleChange}
                      >
                        {touched.idMatkul && errors.idMatkul ? (
                          <div className="error-form">{errors.idMatkul}</div>
                        ) : null}
                        <option value="">...</option>
                        {matkul.map((val, key) => {
                          return (
                            <option key={key} value={val.id}>
                              {val.matkul}
                            </option>
                          );
                        })}
                      </select>
                      {touched.idMatkul && errors.idMatkul ? (
                        <div className="error-form">{errors.idMatkul}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="idKelas">
                        Kelas <span className="important">*</span>
                      </label>
                      <select
                        id="idKelas"
                        name="idKelas"
                        onChange={handleChange}
                      >
                        {touched.idKelas && errors.idKelas ? (
                          <div className="error-form">{errors.idKelas}</div>
                        ) : null}
                        <option value="">...</option>
                        {kelas.map((val, key) => {
                          return (
                            <option key={key} value={val.id}>
                              {val.namaKelas}
                            </option>
                          );
                        })}
                      </select>
                      {touched.idKelas && errors.idKelas ? (
                        <div className="error-form">{errors.idKelas}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="hari">
                        Hari <span className="important">*</span>
                      </label>
                      <select id="hari" name="hari" onChange={handleChange}>
                        {touched.hari && errors.hari ? (
                          <div className="error-form">{errors.hari}</div>
                        ) : null}
                        <option value="">....</option>
                        <option value="Senin">Senin</option>
                        <option value="Selasa">Selasa</option>
                        <option value="Rabu">Rabu</option>
                        <option value="Kamis">Kamis</option>
                        <option value="Jumat">Jumat</option>
                      </select>
                      {touched.hari && errors.hari ? (
                        <div className="error-form">{errors.hari}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="ruangan">
                        Ruangan <span className="important">*</span>
                      </label>
                      <select
                        id="ruangan"
                        name="ruangan"
                        onChange={handleChange}
                      >
                        {touched.ruangan && errors.ruangan ? (
                          <div className="error-form">{errors.ruangan}</div>
                        ) : null}
                        <option value="">...</option>
                        <option value="Lab. 1">Lab. 1</option>
                        <option value="Lab. 2">Lab. 2</option>
                        <option value="Lab. 3">Lab. 3</option>
                      </select>
                      {touched.ruangan && errors.ruangan ? (
                        <div className="error-form">{errors.ruangan}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="dosenPengajar">
                        Dosen Pengajar <span className="important">*</span>
                      </label>
                      <Field
                        as="select"
                        id="dosenPengajar"
                        name="dosenPengajar"
                        onChange={handleChange}
                      >
                        <option value="">...</option>
                        {dosen.map((val, key) => {
                          return <option key={key}>{val.fullname}</option>;
                        })}
                      </Field>
                      {touched.dosenPengajar && errors.dosenPengajar ? (
                        <div className="error-form">{errors.dosenPengajar}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="jamMulai">
                        Jam Mulai <span className="important">*</span>
                      </label>
                      <input
                        type="time"
                        id="jamMulai"
                        name="jamMulai"
                        onChange={handleChange}
                      />
                      {touched.jamMulai && errors.jamMulai ? (
                        <div className="error-form">{errors.jamMulai}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="button-dua">
                    {loading ? (
                      <button disabled className="btn-loading">
                        <BsDatabaseAdd size={16} />
                        <span>Loading...</span>
                      </button>
                    ) : (
                      <button type="submit" className="button-simpan-jadwal">
                        <BsDatabaseAdd size={16} />
                        <span>Simpan</span>
                      </button>
                    )}
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
