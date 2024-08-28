import { useState } from "react";
import RequestOtpButton from "./RequestOtpButton";
import VerifyOtpForm from "./VerifyOtpForm";
import { BsDatabaseAdd } from "react-icons/bs";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi } from "../../config";
import { useUser } from "../../hooks/userHooks";
import "./style.scss";

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current Password harus diisi"),
  newPassword: Yup.string()
    .required("New Password harus diisi")
    .min(8, "New Password harus minimal 8 karakter")
    .matches(/[a-zA-Z]/, "New Password harus mengandung huruf")
    .matches(/[0-9]/, "New Password harus mengandung angka")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "New Password harus mengandung karakter khusus"
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password harus diisi")
    .oneOf(
      [Yup.ref("newPassword"), null],
      "Confirm Password harus cocok dengan New Password"
    ),
});

const Layout = () => {
  const { user } = useUser();
  const [step, setStep] = useState("requestOtp");
  const [loading, setLoading] = useState(false);

  console.log(user);

  const handleOtpRequested = () => {
    setStep("verifyOtp");
  };

  const handleOtpVerified = () => {
    setStep("changePassword");
  };

  const handlePasswordChange = async (values, { resetForm }) => {
    setLoading(true);

    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.post(
        `${urlApi}/auth/change-password`,
        {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
        text: err.response?.data?.message || "Terjadi kesalahan",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="form-ubah-password">
      <div className="form-ubah-password-container">
        <p className="title-ubah-password">Ubah Password</p>
        {step === "requestOtp" && (
          <RequestOtpButton
            onOtpRequested={handleOtpRequested}
            email={user?.email || ""}
          />
        )}
        {step === "verifyOtp" && (
          <VerifyOtpForm
            email={user?.email || ""}
            onVerified={handleOtpVerified}
          />
        )}
        {step === "changePassword" && (
          <Formik
            initialValues={{
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            onSubmit={handlePasswordChange}
            validationSchema={validationSchema}
          >
            {({ errors, touched, handleSubmit, handleChange }) => (
              <form
                method="post"
                onSubmit={handleSubmit}
                className="form-add-ubah-password"
              >
                <div className="form-content">
                  <div className="form-group">
                    <label htmlFor="currentPassword">
                      Current Password <span className="important">*</span>
                    </label>
                    <Field
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      onChange={handleChange}
                      className="input-ubah-pass"
                    />
                    {touched.currentPassword && errors.currentPassword ? (
                      <div className="error-form">{errors.currentPassword}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="newPassword">
                      New Password <span className="important">*</span>
                    </label>
                    <Field
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      onChange={handleChange}
                      className="input-ubah-pass"
                    />
                    {touched.newPassword && errors.newPassword ? (
                      <div className="error-form">{errors.newPassword}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">
                      Confirm Password <span className="important">*</span>
                    </label>
                    <Field
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      onChange={handleChange}
                      className="input-ubah-pass"
                    />
                    {touched.confirmPassword && errors.confirmPassword ? (
                      <div className="error-form">{errors.confirmPassword}</div>
                    ) : null}
                  </div>
                </div>
                <button type="submit">
                  <BsDatabaseAdd size={16} />
                  <span>{loading ? "Loading..." : "Ubah Password"}</span>
                </button>
              </form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default Layout;
