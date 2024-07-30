import "./style.scss";
import { BsDatabaseAdd } from "react-icons/bs";
import { MdOutlineCancelScheduleSend } from "react-icons/md";
import { Formik } from "formik";
import * as Yup from "yup";

const Layout = () => {
  const validationSchema = Yup.object().shape({
    pilihDosen: Yup.string().required("Pilih Dosen harus diisi"),
  });

  return (
    <div className="form-add">
      <div className="form-add-container">
        <h3>Tambah RPS</h3>

        <Formik
          initialValues={{
            pilihDosen: "",
          }}
          onSubmit={() => {
            console.log("submit");
          }}
          validationSchema={validationSchema}
        >
          {({ errors, touched, handleSubmit, handleChange }) => (
            <form method="post" onSubmit={handleSubmit} className="form-add-rps-dosen">
              <div className="form-content">
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
                  <label htmlFor="kodeMataKuliah">
                    Kode Mata Kuliah <span className="important">*</span>
                  </label>
                  <select id="kodeMataKuliah" name="kodeMataKuliah" onChange={handleChange}>
                    {touched.kodeMataKuliah && errors.kodeMataKuliah ? <div className="error-form">{errors.kodeMataKuliah}</div> : null}
                    <option value="mata-kuliah-1">Kode Mata Kuliah 1</option>
                    <option value="mata-kuliah-2">Kode Mata Kuliah 2</option>
                  </select>
                  {touched.kodeMataKuliah && errors.kodeMataKuliah ? <div className="error-form">{errors.kodeMataKuliah}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="semeseter">
                    Semeseter <span className="important">*</span>
                  </label>
                  <select id="semeseter" name="semeseter" onChange={handleChange}>
                    {touched.semeseter && errors.semeseter ? <div className="error-form">{errors.semeseter}</div> : null}
                    <option value="semeseter-1">Semeseter 1</option>
                    <option value="semeseter-2">Semeseter 2</option>
                  </select>
                  {touched.semeseter && errors.semeseter ? <div className="error-form">{errors.semeseter}</div> : null}
                </div>
              </div>
              <div className="button-dua">
                <div className="button-batal-rps">
                  <MdOutlineCancelScheduleSend size={16} />
                  <span>Batal</span>
                </div>

                <button type="submit" className="button-simpan-rps">
                  <BsDatabaseAdd size={16} />
                  <span>Simpan</span>
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
