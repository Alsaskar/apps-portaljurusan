import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { HiMiniUser } from "react-icons/hi2";
import { IoShield, IoShieldCheckmark } from "react-icons/io5";
import axios from "axios";
import Swal from "sweetalert2";
import { urlApi } from "../../config";
import Logo from "../../assets/images/logo_blue.png";
import Student from "../../assets/images/login_img.png";
import Captcha from "../../components/Captcha/Captcha";
import "./Login.scss";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isCaptchaCorrect, setIsCaptchaCorrect] = useState(false);
  const [showCaptchaModal, setShowCaptchaModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmitLoginForm = async (values) => {
    setLoading(true);
    setTimeout(async () => {
      try {
        if (isCaptchaCorrect) {
          await _handleLogin(values.username, values.password);
        } else {
          setLoading(false);
          Swal.fire({
            title: "Belum Verifikasi",
            text: 'Silahkan pilih "Click to verify"',
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      } catch (err) {
        setLoading(false);
        Swal.fire({
          title: "Gagal Login",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    }, 1000);
  };

  const _handleLogin = async (username, password) => {
    try {
      const res = await axios.post(`${urlApi}/auth/login`, {
        username: username,
        password: password,
      });

      if (res.data.success) {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("role", res.data.role);
        sessionStorage.setItem("prodiAdmin", res.data.prodiAdmin);
        sessionStorage.setItem("isLoggedIn", true);

        navigate(`${res.data.role}`)
      }
    } catch (err) {
      setLoading(false);
      Swal.fire({
        title: "Gagal Login",
        text: err.response.data.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };


  useEffect(() => {
    const auth = sessionStorage.getItem("isLoggedIn");
    if (auth) navigate("/admin");
  });

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-card-title">Selamat Datang Di Portal Jurusan</h2>
          <p className="login-card-desc">
            Anda dapat menemukan berbagai layanan yang disediakan oleh Jurusan
            Teknik Elektro untuk mendukung perjalanan Akademik Anda.
          </p>
          <img src={Student} alt="" className="login-student-img" />
        </div>
        <div className="login-content">
          <div className="login-head-logo">
            <img src={Logo} alt="" className="login-img-logo" />
            <h3 className="login-text-logo">Eduvate</h3>
          </div>
          <h2 className="login-title">Login Form</h2>
          <p className="login-desc">Please login to your account</p>

          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={handleSubmitLoginForm}
          >
            {({ handleSubmit, handleChange }) => (
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <span className="icon">
                    <HiMiniUser />
                  </span>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={handleChange}
                    placeholder="Username"
                  />
                </div>
                <div className="form-group">
                  <span
                    className="icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <HiEyeOff /> : <HiEye />}
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                  />
                </div>
                <button
                  type="button"
                  className={`btn-open-captcha ${
                    isCaptchaCorrect ? "success" : ""
                  } ${isCaptchaCorrect ? "disabled" : ""}`}
                  onClick={() => !isCaptchaCorrect && setShowCaptchaModal(true)}
                  disabled={isCaptchaCorrect}
                >
                  <span
                    className={`shield ${isCaptchaCorrect ? "success" : ""}`}
                  >
                    {isCaptchaCorrect ? <IoShieldCheckmark /> : <IoShield />}
                  </span>
                  <span
                    className={`title-verify ${
                      isCaptchaCorrect ? "success" : ""
                    }`}
                  >
                    {isCaptchaCorrect
                      ? "Verification Success"
                      : "Click to verify"}
                  </span>
                </button>

                {/*forgot password*/}
                <div className="forgot-password">
                  <Link to="/lupa/password" className="text-forgot-password">
                    Forgot password?
                  </Link>
                </div>

                <div className="login-button">
                  {loading ? (
                    <button type="button" className="btn-login">
                      Loading...
                    </button>
                  ) : (
                    <button type="submit" className="btn-login">
                      Login
                    </button>
                  )}
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <Captcha
        showCaptchaModal={showCaptchaModal}
        setShowCaptchaModal={setShowCaptchaModal}
        setIsCaptchaCorrect={setIsCaptchaCorrect}
      />
    </div>
  );
};

export default Login;
