import "./style.scss";
import { BsDatabaseAdd } from "react-icons/bs";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { urlApi } from "../../config";
import { HiTrash } from "react-icons/hi";
import { MdAddCircle } from "react-icons/md";
import Swal from "sweetalert2";

const validationSchema = Yup.object().shape({
  capaianPembelajaran: Yup.array()
    .of(Yup.string().required("Capaian Pemebelajaran harus diisi"))
    .min(1, "At least one Capaian Pembelajaran is required"),
  cpl: Yup.array()
    .of(Yup.string().required("CPL harus diisi"))
    .min(1, "At least one CPL is required"),
  cpmk: Yup.array()
    .of(Yup.string().required("Capaian MK harus diisi"))
    .min(1, "At least one CPMK is required"),
  subCpmk: Yup.array()
    .of(Yup.string().required("Kemampuan Akhir harus diisi"))
    .min(1, "At least one SubCPMK is required"),
  idMatkul: Yup.string().required("Mata Kuliah harus diisi"),
  semester: Yup.string().required("Semester harus diisi"),
  rumpunMK: Yup.string().required("Rumpun MK harus diisi"),
  bobot: Yup.string().required("Bobot MK harus diisi"),
  dosenPengampu: Yup.string().required("Dosen Pengampu harus diisi"),
  matkulPrasyarat: Yup.string().required("Matkul Prasyarat harus diisi"),
  bahanKajian: Yup.string().required("Bahan Kajian harus diisi"),
  koordinatorProdi: Yup.string().required("Koordinator Prodi harus diisi"),
  koordinatorMatkul: Yup.string().required("Koordinator MK harus diisi"),
  tanggalPenyusunan: Yup.string().required("Tanggal Penysunan harus diisi"),
  pengampuMatkul: Yup.string().required("Pengampu Matkul harus diisi"),
  pembuatRp: Yup.string().required("Pembuat Rp harus diisi"),
  otorisasi: Yup.string().required("Otorisasi harus diisi"),
  daftarPustaka: Yup.string().required("Daftar Pustaka harus diisi"),
  deskripsiMk: Yup.string().required("Deskripsi MK harus diisi"),
  rumpunMatkul: Yup.string().required("Rumpun MK harus diisi"),
});

const Layout = () => {
  const [matkul, setMatkul] = useState([]);
  const [loading, setLoading] = useState(false);

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

      setMatkul(dataMatkul.data.result);
      console.log(dataMatkul.data.result);
      console.log(sessionStorage.getItem("prodiAdmin"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _listData();
  }, []);

  const _handleSubmit = async (values, { resetForm }) => {
    setLoading(true);

    // Gabungkan array menjadi string tunggal
    const concatenatedCapaianPembelajaran =
      values.capaianPembelajaran.join(", ");

    const concatenatedCPL = values.cpl.join(", ");

    const concatenatedCapaianMK = values.capaianMK.join(", ");
    const concatenatedKemampuanAkhir = values.kemampuanAkhir.join(", ");

    setTimeout(async () => {
      try {
        const res = await axios.post(
          `${urlApi}/mahasiswa`,
          {
            idMatkul: values.idMatkul,
            rumpunMatkul: values.rumpunMatkul,
            bobot: values.bobot,
            semester: values.semester,
            deskripsiMk: values.deskripsiMk,
            bahanKajian: values.bahanKajian,
            dosenPengampu: values.dosenPengampu,
            tanggalPenyusunan: values.tanggalPenyusunan,
            matkulPrasyarat: values.matkulPrasyarat,
            koordinatorProdi: values.koordinatorProdi,
            otorisasi: values.otorisasi,
            daftarPustaka: values.daftarPustaka,
            koordinatorMatkul: values.koordinatorMatkul,
            pengampuMatkul: values.pengampuMatkul,
            pembuatRp: values.pembuatRp,
            capaianPembelajaran: concatenatedCapaianPembelajaran,
            cpl: concatenatedCPL,
            cpmk: concatenatedCapaianMK,
            subCpmk: concatenatedKemampuanAkhir,
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
        <h3>Tambah RPS</h3>

        <Formik
          initialValues={{
            idMatkul: "",
            rumpunMatkul: "",
            bobot: "",
            semester: "",
            tanggalPenyusunan: "",
            otorisasi: "",
            pembuatRp: "",
            pengampuMatkul: "",
            koordinatorMatkul: "",
            koordinatorProdi: "",
            capaianPembelajaran: [""],
            cpl: [""],
            cpmk: [""],
            subCpmk: [""],
            deskripsiMk: "",
            bahanKajian: "",
            daftarPustaka: "",
            dosenPengampu: "",
            matkulPrasyarat: "",
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
            setFieldValue,
          }) => (
            <form
              method="post"
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
              }}
              className="form-add-rps-dosen"
            >
              <div className="form-content">
                <div className="form-group">
                  <label htmlFor="idMatkul">
                    Mata Kuliah <span className="important">*</span>
                  </label>
                  <select id="idMatkul" name="idMatkul" onChange={handleChange}>
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
                  <label htmlFor="semester">
                    Semester <span className="important">*</span>
                  </label>
                  <select id="semester" name="semester" onChange={handleChange}>
                    {touched.semester && errors.semester ? (
                      <div className="error-form">{errors.semester}</div>
                    ) : null}
                    <option value="">...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>
                  {touched.semester && errors.semester ? (
                    <div className="error-form">{errors.semester}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="rumpunMatkul">
                    Rumpun MK <span className="important">*</span>
                  </label>
                  <input
                    type="text"
                    id="rumpunMatkul"
                    name="rumpunMatkul"
                    onChange={handleChange}
                  />
                  {touched.rumpunMatkul && errors.rumpunMatkul ? (
                    <div className="error-form">{errors.rumpunMatkul}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="bobot">
                    Bobot MK <span className="important">*</span>
                  </label>
                  <input
                    type="text"
                    id="bobot"
                    name="bobot"
                    onChange={handleChange}
                  />
                  {touched.bobot && errors.bobot ? (
                    <div className="error-form">{errors.bobot}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="tanggalPenyusunan">
                    Tanggal Penyusunan <span className="important">*</span>
                  </label>
                  <textarea
                    id="tanggalPenyusunan"
                    name="tanggalPenyusunan"
                    onChange={handleChange}
                    rows="4"
                    cols="50"
                    style={{ resize: "none" }}
                  />
                  {touched.tanggalPenyusunan && errors.tanggalPenyusunan ? (
                    <div className="error-form">{errors.tanggalPenyusunan}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="otorisasi">
                    Otorisasi <span className="important">*</span>
                  </label>
                  <input
                    type="text"
                    id="otorisasi"
                    name="otorisasi"
                    onChange={handleChange}
                  />
                  {touched.otorisasi && errors.otorisasi ? (
                    <div className="error-form">{errors.otorisasi}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="pembuatRp">
                    Pembuat RP <span className="important">*</span>
                  </label>
                  <input
                    type="text"
                    id="pembuatRp"
                    name="pembuatRp"
                    onChange={handleChange}
                  />
                  {touched.pembuatRp && errors.pembuatRp ? (
                    <div className="error-form">{errors.pembuatRp}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="pengampuMatkul">
                    Pemngampu MK <span className="important">*</span>
                  </label>
                  <input
                    type="text"
                    id="pengampuMatkul"
                    name="pengampuMatkul"
                    onChange={handleChange}
                  />
                  {touched.pengampuMatkul && errors.pengampuMatkul ? (
                    <div className="error-form">{errors.pengampuMatkul}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="koordinatorMatkul">
                    Koordinator MK <span className="important">*</span>
                  </label>
                  <input
                    type="text"
                    id="koordinatorMatkul"
                    name="koordinatorMatkul"
                    onChange={handleChange}
                  />
                  {touched.koordinatorMatkul && errors.koordinatorMatkul ? (
                    <div className="error-form">{errors.koordinatorMatkul}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="koordinatorProdi">
                    Koor Prodi <span className="important">*</span>
                  </label>
                  <input
                    type="text"
                    id="koordinatorProdi"
                    name="koordinatorProdi"
                    onChange={handleChange}
                  />
                  {touched.koordinatorProdi && errors.koordinatorProdi ? (
                    <div className="error-form">{errors.koordinatorProdi}</div>
                  ) : null}
                </div>

                <p className="capaian-pem">
                  Capaian Pembelajaran
                  <span className="important"> *</span>
                </p>
                <FieldArray name="capaianPembelajaran">
                  {({ remove, push }) => (
                    <>
                      {values.capaianPembelajaran.map((capaian, index) => (
                        <div
                          key={index}
                          className="form-content capaian-pembelajaran"
                        >
                          <div className="form-group">
                            <input
                              type="text"
                              id={`capaianPembelajaran-${index}`}
                              name={`capaianPembelajaran.${index}`}
                              className="input-capai"
                              value={capaian}
                              onChange={(event) => {
                                setFieldValue(
                                  `capaianPembelajaran.${index}`,
                                  event.target.value
                                );
                              }}
                              placeholder={`Capaian Pembelajaran ${index + 1}`}
                            />
                            {touched.capaianPembelajaran?.[index] &&
                              errors.capaianPembelajaran?.[index] && (
                                <div className="error-form">
                                  {errors.capaianPembelajaran[index]}
                                </div>
                              )}
                          </div>
                          {values.capaianPembelajaran.length > 1 && (
                            <div>
                              <button
                                type="button"
                                className="btn-hapus"
                                onClick={() => remove(index)}
                              >
                                <HiTrash size={18} />
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                      <div className="btn-section">
                        <button
                          type="button"
                          className="btn orange"
                          onClick={() => push("")}
                        >
                          <MdAddCircle size={18} /> Tambah Capaain
                        </button>
                      </div>
                    </>
                  )}
                </FieldArray>

                <p className="capaian-pem">
                  CPL
                  <span className="important"> *</span>
                </p>
                <FieldArray name="cpl">
                  {({ remove, push }) => (
                    <>
                      {values.cpl.map((cplProdi, index) => (
                        <div
                          key={index}
                          className="form-content capaian-pembelajaran"
                        >
                          <div className="form-group">
                            <input
                              type="text"
                              id={`cpl-${index}`}
                              name={`cpl.${index}`}
                              className="input-capai"
                              value={cplProdi}
                              onChange={(event) => {
                                setFieldValue(
                                  `cpl.${index}`,
                                  event.target.value
                                );
                              }}
                              placeholder={`CPL ${index + 1}`}
                            />
                            {touched.cpl?.[index] && errors.cpl?.[index] && (
                              <div className="error-form">
                                {errors.cpl[index]}
                              </div>
                            )}
                          </div>
                          {values.cpl.length > 1 && (
                            <button
                              type="button"
                              className="btn-hapus"
                              onClick={() => remove(index)}
                            >
                              <HiTrash size={18} />
                            </button>
                          )}
                        </div>
                      ))}
                      <div className="btn-section">
                        <button
                          type="button"
                          className="btn orange"
                          onClick={() => push("")}
                        >
                          <MdAddCircle size={18} /> Tambah CPL
                        </button>
                      </div>
                    </>
                  )}
                </FieldArray>

                <p className="capaian-pem">
                  Capaian Pembelajaran Mata Kuliah
                  <span className="important"> *</span>
                </p>
                <FieldArray name="cpmk">
                  {({ remove, push }) => (
                    <>
                      {values.cpmk.map((capaiMK, index) => (
                        <div
                          key={index}
                          className="form-content capaian-pembelajaran"
                        >
                          <div className="form-group">
                            <input
                              type="text"
                              id={`cpmk-${index}`}
                              name={`cpmk.${index}`}
                              className="input-capai"
                              value={capaiMK}
                              onChange={(event) => {
                                setFieldValue(
                                  `cpmk.${index}`,
                                  event.target.value
                                );
                              }}
                              placeholder={`Capaian Pembelajaran MK ${
                                index + 1
                              }`}
                            />
                            {touched.cpmk?.[index] && errors.cpmk?.[index] && (
                              <div className="error-form">
                                {errors.cpmk[index]}
                              </div>
                            )}
                          </div>
                          {values.cpmk.length > 1 && (
                            <button
                              type="button"
                              className="btn-hapus"
                              onClick={() => remove(index)}
                            >
                              <HiTrash size={18} />
                            </button>
                          )}
                        </div>
                      ))}
                      <div className="btn-section">
                        <button
                          type="button"
                          className="btn orange"
                          onClick={() => push("")}
                        >
                          <MdAddCircle size={18} /> Tambah Capaian MK
                        </button>
                      </div>
                    </>
                  )}
                </FieldArray>

                <p className="capaian-pem">
                  Kemampuan Akhir Tiap Tahapan Pembelajara (SUB CPMK)
                  <span className="important"> *</span>
                </p>
                <FieldArray name="subCpmk">
                  {({ remove, push }) => (
                    <>
                      {values.subCpmk.map((kemMK, index) => (
                        <div
                          key={index}
                          className="form-content capaian-pembelajaran"
                        >
                          <div className="form-group">
                            <input
                              type="text"
                              id={`subCpmk-${index}`}
                              name={`subCpmk.${index}`}
                              className="input-capai"
                              value={kemMK}
                              onChange={(event) => {
                                setFieldValue(
                                  `subCpmk.${index}`,
                                  event.target.value
                                );
                              }}
                              placeholder={`Kemampuan Akhir Tiap Tahap ${
                                index + 1
                              }`}
                            />
                            {touched.subCpmk?.[index] &&
                              errors.subCpmk?.[index] && (
                                <div className="error-form">
                                  {errors.subCpmk[index]}
                                </div>
                              )}
                          </div>
                          {values.subCpmk.length > 1 && (
                            <button
                              type="button"
                              className="btn-hapus"
                              onClick={() => remove(index)}
                            >
                              <HiTrash size={18} />
                            </button>
                          )}
                        </div>
                      ))}
                      <div className="btn-section">
                        <button
                          type="button"
                          className="btn orange"
                          onClick={() => push("")}
                        >
                          <MdAddCircle size={18} /> Kemampuan Akhir
                        </button>
                      </div>
                    </>
                  )}
                </FieldArray>
                <div className="form-group">
                  <label htmlFor="deskripsiMk">
                    Deskripsi MK <span className="important">*</span>
                  </label>
                  <textarea
                    id="deskripsiMk"
                    name="deskripsiMk"
                    onChange={handleChange}
                    rows="4"
                    cols="50"
                    style={{ resize: "none" }}
                  />
                  {touched.deskripsiMk && errors.deskripsiMk ? (
                    <div className="error-form">{errors.deskripsiMk}</div>
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
                  <label htmlFor="daftarPustaka">
                    Daftar Pustaka <span className="important">*</span>
                  </label>
                  <textarea
                    id="daftarPustaka"
                    name="daftarPustaka"
                    onChange={handleChange}
                    rows="4"
                    cols="50"
                    style={{ resize: "none" }}
                  />
                  {touched.daftarPustaka && errors.daftarPustaka ? (
                    <div className="error-form">{errors.daftarPustaka}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="dosenPengampu">
                    Dosen Pengampu <span className="important">*</span>
                  </label>
                  <textarea
                    id="dosenPengampu"
                    name="dosenPengampu"
                    onChange={handleChange}
                    rows="4"
                    cols="50"
                    style={{ resize: "none" }}
                  />
                  {touched.dosenPengampu && errors.dosenPengampu ? (
                    <div className="error-form">{errors.dosenPengampu}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="daftarPustaka">
                    Mata Kuliha Prasyarat <span className="important">*</span>
                  </label>
                  <textarea
                    id="daftarPustaka"
                    name="daftarPustaka"
                    onChange={handleChange}
                    rows="4"
                    cols="50"
                    style={{ resize: "none" }}
                  />
                  {touched.daftarPustaka && errors.daftarPustaka ? (
                    <div className="error-form">{errors.daftarPustaka}</div>
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

export default Layout;
