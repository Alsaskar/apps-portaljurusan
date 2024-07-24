import "./style.scss";
import { BsDatabaseAdd } from "react-icons/bs";
import { MdOutlineCancelScheduleSend } from "react-icons/md";
import { Formik } from "formik";
import * as Yup from "yup";

const Layout = () => {
  const validationSchema = Yup.object().shape({
    mataKuliah: Yup.string().required("Mata Kuliah harus diisi"),
    kelas: Yup.string().required("Kelas harus diisi"),
    hari: Yup.string().required("Hari harus diisi"),
    ruangan: Yup.string().required("Ruangan harus diisi"),
  });
  return (
    <div className="jadwal">
      <div className="container">
        <div className="content">
          <div className="add-category">
            <p className="title">Tambah Category</p>
            <Formik
              initialValues={{
                mataKuliah: "",
                kelas: "",
                hari: "",
                ruangan: "",
              }}
              onSubmit={() => {
                console.log("submit");
              }}
              validationSchema={validationSchema}
            >
              {({ errors, touched, handleSubmit, handleChange }) => (
                <form
                  method="post"
                  onSubmit={handleSubmit}
                  className="form-add-category"
                >
                  <div className="form-content">
                    <div className="form-group">
                      <label htmlFor="mataKuliah">
                        Mata Kuliah <span className="important">*</span>
                      </label>
                      <input
                        type="text"
                        id="mataKuliah"
                        name="mataKuliah"
                        onChange={handleChange}
                      />
                      {touched.mataKuliah && errors.mataKuliah ? (
                        <div className="error-form">{errors.mataKuliah}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="kelas">
                        Kelas <span className="important">*</span>
                      </label>
                      <input
                        type="text"
                        id="kelas"
                        name="kelas"
                        onChange={handleChange}
                      />
                      {touched.kelas && errors.kelas ? (
                        <div className="error-form">{errors.kelas}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="hari">
                        Hari <span className="important">*</span>
                      </label>
                      <input
                        type="text"
                        id="hari"
                        name="hari"
                        onChange={handleChange}
                      />
                      {touched.hari && errors.hari ? (
                        <div className="error-form">{errors.hari}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="ruangan">
                        Ruangan <span className="important">*</span>
                      </label>
                      <input
                        type="text"
                        id="ruangan"
                        name="ruangan"
                        onChange={handleChange}
                      />
                      {touched.ruangan && errors.ruangan ? (
                        <div className="error-form">{errors.ruangan}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="button-dua">
                    <button type="submit" className="button-simpan-rps">
                      <BsDatabaseAdd size={16} />
                      <span>Simpan</span>
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>

          <div className="add-jadwal">
            <p className="title">Buat Jadwal</p>
            <Formik
              initialValues={{
                mataKuliah: "",
                kelas: "",
                hari: "",
                ruangan: "",
              }}
              onSubmit={() => {
                console.log("submit");
              }}
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
                      <label htmlFor="mataKuliah">
                        Mata Kuliah <span className="important">*</span>
                      </label>
                      <select
                        id="mataKuliah"
                        name="mataKuliah"
                        onChange={handleChange}
                      >
                        {touched.mataKuliah && errors.mataKuliah ? (
                          <div className="error-form">{errors.mataKuliah}</div>
                        ) : null}
                        <option value="Mata Kuliah 1">Mata Kuliah 1</option>
                        <option value="Mata Kuliah 2">Mata Kuliah 2</option>
                      </select>
                      {touched.mataKuliah && errors.mataKuliah ? (
                        <div className="error-form">{errors.mataKuliah}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="dosen">
                        Dosen Pengajar <span className="important">*</span>
                      </label>
                      <select id="dosen" name="dosen" onChange={handleChange}>
                        {touched.dosen && errors.dosen ? (
                          <div className="error-form">{errors.dosen}</div>
                        ) : null}
                        <option value="Dosen 1">Dosen 1</option>
                        <option value="Dosen 2">Dosen 2</option>
                      </select>
                      {touched.dosen && errors.dosen ? (
                        <div className="error-form">{errors.dosen}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="kelas">
                        Kelas <span className="important">*</span>
                      </label>
                      <select id="kelas" name="kelas" onChange={handleChange}>
                        {touched.kelas && errors.kelas ? (
                          <div className="error-form">{errors.kelas}</div>
                        ) : null}
                        <option value="Kelas 1">Kelas 1</option>
                        <option value="Kelas 2">Kelas 2</option>
                      </select>
                      {touched.kelas && errors.kelas ? (
                        <div className="error-form">{errors.kelas}</div>
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
                        <option value="Senin">Senin</option>
                        <option value="Selasa">Selasa</option>
                        <option value="Rabu">Rabu</option>
                      </select>
                      {touched.hari && errors.hari ? (
                        <div className="error-form">{errors.hari}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="ruangan">
                        Ruangan <span className="important">*</span>
                      </label>
                      <select id="ruangan" name="ruangan" onChange={handleChange}>
                        {touched.ruangan && errors.ruangan ? (
                          <div className="error-form">{errors.ruangan}</div>
                        ) : null}
                        <option value="lab 1">Lab. 1</option>
                        <option value="lab 2">Lab. 2</option>
                      </select>
                      {touched.ruangan && errors.ruangan ? (
                        <div className="error-form">{errors.ruangan}</div>
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
                    <div className="form-group">
                      <label htmlFor="jamSelesai">
                        Jam Selesai <span className="important">*</span>
                      </label>
                      <input
                        type="time"
                        id="jamSelesai"
                        name="jamSelesai"
                        onChange={handleChange}
                      />
                      {touched.jamSelesai && errors.jamSelesai ? (
                        <div className="error-form">{errors.jamSelesai}</div>
                      ) : null}
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
      </div>
    </div>
  );
};

export default Layout;
