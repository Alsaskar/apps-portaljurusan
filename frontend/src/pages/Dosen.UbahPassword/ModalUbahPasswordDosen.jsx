import PropTypes from "prop-types";
import { useState } from "react";
import RequestOtpButtonDosen from "./RequestOtpButtonDosen";
import VerifyOtpForm from "./VerifyOtpForm";
import { BsDatabaseAdd } from "react-icons/bs";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi } from "../../config";
import { useUser } from "../../hooks/userHooks";
import { IoIosClose } from "react-icons/io";
import "./ModalUbahPasswordDosen.scss";

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

const ModalUbahPasswordDosen = ({ isOpen, handleClose }) => {
  const { user } = useUser();
  const [step, setStep] = useState("requestOtp");
  const [loading, setLoading] = useState(false);

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
      }).then(() => {
        setLoading(false);
        resetForm();
        handleClose(); 
        window.location.reload();
      });
    } catch (err) {
      setLoading(false);
      Swal.fire({
        title: "Gagal",
        text: err.response?.data?.message || "Terjadi kesalahan",
        icon: "error",
        confirmButtonText: "Ok",
      }).then(() => {
        handleClose(); // Menutup modal jika diperlukan saat gagal (opsional)
      });
    }
  };

  return (
    <>
      {isOpen && (
        <div className="ubah-password-dosen-modal fade-in">
          <div className="modal-content-ubah-password-dosen fade-in">
            <button onClick={handleClose} className="button-close-modal">
              <IoIosClose size={20} />
            </button>

            <div className="form-ubah-password-dosen">
              <div className="form-ubah-password-dosen-container">
                <p className="title-ubah-password-dosen">Ubah Password</p>
                {step === "requestOtp" && (
                  <RequestOtpButtonDosen
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
                        className="form-add-ubah-password-dosen"
                      >
                        <div className="form-content">
                          <div className="form-group">
                            <label htmlFor="currentPassword">
                              Current Password{" "}
                              <span className="important">*</span>
                            </label>
                            <Field
                              type="password"
                              id="currentPassword"
                              name="currentPassword"
                              onChange={handleChange}
                              className="input-ubah-pass"
                            />
                            {touched.currentPassword &&
                            errors.currentPassword ? (
                              <div className="error-form">
                                {errors.currentPassword}
                              </div>
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
                              <div className="error-form">
                                {errors.newPassword}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group">
                            <label htmlFor="confirmPassword">
                              Confirm Password{" "}
                              <span className="important">*</span>
                            </label>
                            <Field
                              type="password"
                              id="confirmPassword"
                              name="confirmPassword"
                              onChange={handleChange}
                              className="input-ubah-pass"
                            />
                            {touched.confirmPassword &&
                            errors.confirmPassword ? (
                              <div className="error-form">
                                {errors.confirmPassword}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <button type="submit">
                          <BsDatabaseAdd size={16} />
                          <span>
                            {loading ? "Loading..." : "Ubah Password"}
                          </span>
                        </button>
                      </form>
                    )}
                  </Formik>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ModalUbahPasswordDosen.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ModalUbahPasswordDosen;
