import "./style.scss";
import { BsDatabaseAdd } from "react-icons/bs";
import { MdOutlineCancelScheduleSend } from "react-icons/md";
import { Formik } from "formik";
import * as Yup from "yup";

const Layout = () => {
  const validationSchema = Yup.object().shape({
    namaKegiatan: Yup.string().required("Nama Kegiatan harus diisi"),
    desc: Yup.string().required("Deskripsi Kegiatan harus diisi"),
    hariPelaksanaan: Yup.string().required("Hari Pelaksanaan harus diisi"),
    jamMulai: Yup.string().required("Hari harus diisi"),
    jamSelesai: Yup.string().required("Ruangan harus diisi"),
  });
  return (
    <div className="jadwal">
      <div className="container">
        <div className="content">
          <div className="buat-kegiatan">
            <p className="title">Buat Program Kerja</p>
            <Formik
              initialValues={{
                namaKegiatan: "",
                desc: "",
                hariPelaksanaan: "",
                jamMulai: "",
                jamSelesai: "",
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
                  className="form-buat-kegiatan"
                >
                  <div className="form-content">
                    <div className="form-group">
                      <label htmlFor="namaKegiatan">
                        Nama Kegiatan <span className="important">*</span>
                      </label>
                      <input
                        type="text"
                        id="namaKegiatan"
                        name="namaKegiatan"
                        onChange={handleChange}
                      />
                      {touched.namaKegiatan && errors.namaKegiatan ? (
                        <div className="error-form">{errors.namaKegiatan}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="desc">
                        Deskripsi Kegiatan <span className="important">*</span>
                      </label>
                      <input
                        type="text"
                        id="desc"
                        name="desc"
                        onChange={handleChange}
                      />
                      {touched.desc && errors.desc ? (
                        <div className="error-form">{errors.desc}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="hari">
                        Hari Pelaksanaan <span className="important">*</span>
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
                      <label htmlFor="jamMulai">
                        Jam Mulai Kegiatan <span className="important">*</span>
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
                        Jam Selesai Kegiatan{" "}
                        <span className="important">*</span>
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
