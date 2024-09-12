import "./style.scss";
import { useState } from "react";
import { Formik, Field } from "formik";
import { urlApi } from "../../config";
import { Link, useNavigate } from "react-router-dom";
import { TbPasswordUser } from "react-icons/tb";
import VerifyOtpForm from "./VerifyOtpForm";
import axios from "axios";
import Swal from "sweetalert2";
import * as Yup from "yup";

const ResetPasswordPage = () => {
  const [step, setStep] = useState("requestEmail"); 
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle email submission
  const handleEmailSubmitted = async (values) => {
    setLoading(true);
    try {
      await axios.post(`${urlApi}/auth/request-reset-otp`, {
        email: values.email,
      });
      setEmail(values.email);
      setStep("verifyOtp");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  const handleOtpVerified = () => {
    setStep("resetPassword");
  };

  // Handle password reset
  const handlePasswordReset = async (values) => {
    setLoading(true);
    try {
      await axios.post(`${urlApi}/auth/reset-password`, { ...values, email });
      Swal.fire({
        title: "Success",
        text: "Password has been reset successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigate("/"); // Navigate to login page after success
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password">
      <div className="reset-password-container">
        <div className="icon-section">
          <div className="bg-satu-reset-password">
            <div className="bg-dua-reset-password">
              <TbPasswordUser size={30} className="icon-reset-password" />
            </div>
          </div>
        </div>

        {step === "requestEmail" && (
          <Formik
            initialValues={{ email: "" }}
            onSubmit={handleEmailSubmitted}
            validationSchema={Yup.object({
              email: Yup.string()
                .required("Email harus disis")
                .email("Invalid email address"),
            })}
          >
            {({ errors, touched, handleSubmit, handleChange }) => (
              <form
                method="post"
                onSubmit={handleSubmit}
                className="form-reset-password"
              >
                <p className="title-reset-password">Request OTP</p>
                <p className="desc-reset-password">Email yang di input merupkan email dari Portal Jurusan Anda!</p>
                <div className="form-content">
                  <div className="form-group">
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      placeholder="Masukan email"
                      className="input-reset-password"
                    />
                    {touched.email && errors.email ? (
                      <div className="error-form">{errors.email}</div>
                    ) : null}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-reset-password"
                >
                  <span>{loading ? "Loading..." : "Request OTP"}</span>
                </button>
              </form>
            )}
          </Formik>
        )}
        {step === "verifyOtp" && (
          <VerifyOtpForm email={email} onVerified={handleOtpVerified} />
        )}
        {step === "resetPassword" && (
          <Formik
            initialValues={{
              newPassword: "",
              confirmPassword: "",
            }}
            onSubmit={handlePasswordReset}
            validationSchema={Yup.object({
              newPassword: Yup.string()
                .required("Password baru harus diisi")
                .min(8, "Password must be at least 8 characters")
                .matches(/[a-zA-Z]/, "Password must contain letters")
                .matches(/[0-9]/, "Password must contain numbers")
                .matches(/[\W_]/, "Password must contain special characters"),
              confirmPassword: Yup.string()
                .required("Confirm password is required")
                .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
            })}
          >
            {({ errors, touched, handleSubmit, handleChange }) => (
              <form
                method="post"
                onSubmit={handleSubmit}
                className="form-reset-password"
              >
                <p className="title-reset-password">Reset Password</p>
                <div className="form-content">
                  <div className="form-group">
                    <Field
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      onChange={handleChange}
                      placeholder="Password baru"
                      className="input-reset-password"
                    />
                    {touched.newPassword && errors.newPassword ? (
                      <div className="error-form">{errors.newPassword}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <Field
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      onChange={handleChange}
                      placeholder="Konfirmasi Password baru"
                      className="input-reset-password"
                    />
                    {touched.confirmPassword && errors.confirmPassword ? (
                      <div className="error-form">{errors.confirmPassword}</div>
                    ) : null}
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-reset-password">
                  <span>{loading ? "Loading..." : "Reset Password"}</span>
                </button>

                
              </form>
            )}
          </Formik>
        )}
        <Link to="/" className="login-link">Back to login?</Link>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
