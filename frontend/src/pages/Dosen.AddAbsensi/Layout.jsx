import "./style.scss";
import { BsDatabaseAdd } from "react-icons/bs";
import { Formik } from "formik";
import * as Yup from "yup";

const Layout = () => {
  const validationSchema = Yup.object().shape({
    noPresensi: Yup.string().required("No Presensi harus diisi"),
    mataKuliah: Yup.string().required("Mata Kuliah harus diisi"),
    tglAbsensi: Yup.string().required("Tanggal Absensi harus diisi"),
    lab: Yup.string().required("LAB harus diisi"),
    jamMulai: Yup.string().required("Jam Mulai harus diisi"),
    jamSelesai: Yup.string().required("Jam Selesai harus diisi"),
  });

  return (
    <div className="form-add">
      <div className="form-add-container">
        <h3>Form Buat Absensi</h3>

        <Formik
          initialValues={{
            noPresensi: "",
            mataKuliah: "",
            tglAbsensi: "",
            lab: "",
            jamMulai: "",
            jamSelesai: "",
          }}
          onSubmit={() => {
            console.log("submit");
          }}
          validationSchema={validationSchema}
        >
          {({ errors, touched, handleSubmit, handleChange }) => (
            <form method="post" onSubmit={handleSubmit} className="form-add-absensi">
              <div className="form-content">
                <div className="form-group">
                  <label htmlFor="noPresensi">
                    No Presensi <span className="important">*</span>
                  </label>
                  <input type="text" id="noPresensi" name="noPresensi" onChange={handleChange} />
                  {touched.noPresensi && errors.noPresensi ? <div className="error-form">{errors.noPresensi}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="mataKuliah">
                    Mata Kuliah <span className="important">*</span>
                  </label>
                  <select id="mataKuliah" name="mataKuliah" onChange={handleChange}>
                    {touched.mataKuliah && errors.mataKuliah ? <div className="error-form">{errors.mataKuliah}</div> : null}
                    <option value="mata-kuliah-1">Mata Kuliah 1</option>
                    <option value="mata-kuliah-2">Mata Kuliah 2</option>
                  </select>
                  {touched.mataKuliah && errors.mataKuliah ? <div className="error-form">{errors.mataKuliah}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="tglAbsensi">
                    Tanggal <span className="important">*</span>
                  </label>
                  <input type="date" id="tglAbsensi" name="tglAbsensi" onChange={handleChange} />
                  {touched.tglAbsensi && errors.tglAbsensi ? <div className="error-form">{errors.tglAbsensi}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="lab">
                    LAB <span className="important">*</span>
                  </label>
                  <select id="lab" name="lab" onChange={handleChange}>
                    {touched.lab && errors.lab ? <div className="error-form">{errors.lab}</div> : null}
                    <option value="pemograman">Pemograman</option>
                    <option value="website">Website</option>
                  </select>
                  {touched.lab && errors.lab ? <div className="error-form">{errors.lab}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="jamMulai">
                    Jam Mulai <span className="important">*</span>
                  </label>
                  <input type="time" id="jamMulai" name="jamMulai" onChange={handleChange} />
                  {touched.jamMulai && errors.jamMulai ? <div className="error-form">{errors.jamMulai}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="jamSelesai">
                    Jam Selesai <span className="important">*</span>
                  </label>
                  <input type="time" id="jamSelesai" name="jamSelesai" onChange={handleChange} />
                  {touched.jamSelesai && errors.jamSelesai ? <div className="error-form">{errors.jamSelesai}</div> : null}
                </div>
              </div>
              <button type="submit">
                <BsDatabaseAdd size={16} />
                <span>Simpan</span>
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Layout;
