import "./style.scss";
import { BsDatabaseAdd } from "react-icons/bs";
import { Formik } from "formik";
import * as Yup from "yup";

const Layout = () => {
  const validationSchema = Yup.object().shape({
    fileEvaluasi: Yup.string().required("File Evaluasi harus diisi"),
  });
  return (
    <div className="send-evaluasi">
      <div className="container">
        <div className="content">
          <p className="title">Kirim Evaluasi</p>
          <Formik
            initialValues={{
              fileEvaluasi: "",
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
                className="form-send-evaluasi"
              >
                <div className="form-content">
                  <div className="form-group">
                    <label htmlFor="fileEvaluasi">
                      File Evaluasi <span className="important">*</span>
                    </label>
                    <input
                      type="file"
                      id="fileEvaluasi"
                      name="fileEvaluasi"
                      onChange={handleChange}
                    />
                    {touched.fileEvaluasi && errors.fileEvaluasi ? (
                      <div className="error-form">{errors.fileEvaluasi}</div>
                    ) : null}
                  </div>
                </div>
                <div className="button-dua">
                  <button type="submit" className="button-simpan-rps">
                    <BsDatabaseAdd size={16} />
                    <span>Kirim</span>
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Layout;
