import "./style.scss";
import { BsDatabaseAdd } from "react-icons/bs";
import { Formik } from "formik";
import * as Yup from "yup";

const Layout = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Jam Selesai harus diisi"),
  });

  return (
    <div className="form-ubah-password">
      <div className="form-ubah-password-container">
        <h3>Ubah Password</h3>

        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={() => {
            console.log("submit");
          }}
          validationSchema={validationSchema}
        >
          {({ errors, touched, handleSubmit, handleChange }) => (
            <form method="post" onSubmit={handleSubmit} className="form-add-ubah-password">
              <div className="form-content">
                <div className="form-group">
                  <label htmlFor="email">
                    Current Password <span className="important">*</span>
                  </label>
                  <input type="text" id="email" name="email" onChange={handleChange} />
                  {touched.email && errors.email ? <div className="error-form">{errors.email}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    New Password <span className="important">*</span>
                  </label>
                  <input type="text" id="email" name="email" onChange={handleChange} />
                  {touched.email && errors.email ? <div className="error-form">{errors.email}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    Confirm Password <span className="important">*</span>
                  </label>
                  <input type="text" id="email" name="email" onChange={handleChange} />
                  {touched.email && errors.email ? <div className="error-form">{errors.email}</div> : null}
                </div>
              </div>
              <button type="submit">
                <BsDatabaseAdd size={16} />
                <span>Ubah Password</span>
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Layout;
