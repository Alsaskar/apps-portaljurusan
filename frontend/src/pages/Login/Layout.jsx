import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { HiRefresh, HiEye, HiEyeOff } from "react-icons/hi";
import { HiMiniUser } from "react-icons/hi2";
import { IoShield, IoShieldCheckmark } from "react-icons/io5";
import { BsFillShieldLockFill } from "react-icons/bs";
import axios from "axios";
import Swal from "sweetalert2";
import { urlApi } from "../../config";
import Logo from "../../assets/images/logo_blue.png";
import Student from "../../assets/images/login_img.png";
import "./Login.scss";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [captchaValue, setCaptchaValue] = useState("");
  const [inputCaptchaValue, setInputCaptchaValue] = useState("");
  const [captchaFonts, setCaptchaFonts] = useState([]);
  const [captchaRotations, setCaptchaRotations] = useState([]);
  const [showCaptchaModal, setShowCaptchaModal] = useState(false);
  const [isCaptchaCorrect, setIsCaptchaCorrect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    generateCaptcha();
  }, []);

  //render captcha
  const renderCaptcha = () => {
    return captchaValue.split("").map((char, index) => (
      <span
        key={index}
        style={{
          fontFamily: captchaFonts[index],
          transform: `rotate(${captchaRotations[index]}deg)`, //apply rotation
        }}
      >
        {char}
      </span>
    ));
  };

  //generate captcha
  const generateCaptcha = () => {
    let value = btoa(Math.random() * 1000000000);
    value = value.slice(0, 6);
    setCaptchaValue(value);

    const fonts = ["Arial", "Roboto  Black", "Helvetica", "Verdana", "Georgia", "Times New Roman", "Courier New", "Trebuchet MS", "Palatino", "curve", "sans-serif", "serif", "monospace"];
    const fontsArray = [];
    const rotationsArray = [];
    for (let i = 0; i < value.length; i++) {
      const fontIndex = Math.floor(Math.random() * fonts.length);
      fontsArray.push(fonts[fontIndex]);
      rotationsArray.push(-20 + Math.trunc(Math.random() * 40)); //random rotation between -20 and 20 degrees
    }
    setCaptchaFonts(fontsArray);
    setCaptchaRotations(rotationsArray);
  };

  const handleRefreshCaptcha = () => {
    generateCaptcha();
  };

  // Handle confirm captcha
  const handleConfirmCaptcha = () => {
    if (inputCaptchaValue === captchaValue) {
      setIsCaptchaCorrect(true);
      setShowCaptchaModal(false);
      console.log("Kode Captcha Benar"); //ketika captcha benar
    } else {
      Swal.fire({
        title: "Invalid Captcha",
        text: "Silahkan masukan captcha yang sesuai",
        icon: "error",
        confirmButtonText: "Ok",
      });
      console.log("Kode Captcha Salah"); //ketika captcha salah
    }
  };

  //handle submit login
  const handleSubmitLoginForm = async (values) => {
    setLoading(true);
    setTimeout(async () => {
      try {
        if (inputCaptchaValue === captchaValue) {
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

  //handle login
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
        {/*card welcome*/}
        <div className="login-card">
          <h2 className="login-card-title">Selamat Datang Di Portal Jurusan</h2>
          <p className="login-card-desc">Anda dapat menemukan berbagai layanan yang disediakan oleh Jurusan Teknik Elektro untuk mendukung perjalanan Akademik Anda.</p>
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
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={handleSubmitLoginForm}
          >
            {({ handleSubmit, handleChange }) => (
              <form className="login-form" onSubmit={handleSubmit}>
                {/*form input username*/}
                <div className="form-group">
                  <span className="icon">
                    <HiMiniUser />
                  </span>
                  <input type="text" id="username" name="username" onChange={handleChange} placeholder="Username" />
                </div>

                {/*form input password*/}
                <div className="form-group">
                  <span className="icon" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <HiEyeOff /> : <HiEye />}
                  </span>
                  <input type={showPassword ? "text" : "password"} id="password" name="password" onChange={handleChange} placeholder="Password" />
                </div>

                {/*button verify captcha*/}
                <button type="button" className={`btn-open-captcha ${isCaptchaCorrect ? "success" : ""} ${isCaptchaCorrect ? "disabled" : ""}`} onClick={() => !isCaptchaCorrect && setShowCaptchaModal(true)} disabled={isCaptchaCorrect}>
                  <span className={`shield ${isCaptchaCorrect ? "success" : ""}`}>{isCaptchaCorrect ? <IoShieldCheckmark /> : <IoShield />}</span>
                  <span className={`title-verify ${isCaptchaCorrect ? "success" : ""}`}>{isCaptchaCorrect ? "Verification Success" : "Click to verify"}</span>
                </button>

                {/*forgot password*/}
                <div className="forgot-password">
                  <Link to="/lupa/password" className="text-forgot-password">
                    Forgot password?
                  </Link>
                </div>

                {/*button login*/}
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

      {/*modal show captcha*/}
      {showCaptchaModal && (
        <div className={`modal-captcha fade-in`} onClick={() => setShowCaptchaModal(false)}>
          <div className={`modal-content-captcha fade-in`} onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">
              <div className="bg-satu-captcha">
                <div className="bg-dua-captcha">
                  <div className="icon-shield-captcha">
                    <BsFillShieldLockFill size={22} />
                  </div>
                </div>
              </div>
            </div>
            <h2 className="title-captcha">Captcha</h2>
            <p className="captcha-desc">Silahkan memasukan kode captcha untuk verifikasi.</p>
            <div className="captcha">
              <div className="preview">
                {renderCaptcha()}
                <button type="button" className="captcha-refresh" onClick={handleRefreshCaptcha}>
                  <HiRefresh size={18} />
                </button>
              </div>
              <div className="captcha-form">
                <input type="text" id="captcha-form-modal" className="input-captcha" placeholder="Enter captcha here" onChange={(e) => setInputCaptchaValue(e.target.value)} />
              </div>
              <button type="button" className="btn-captcha-confirm" onClick={handleConfirmCaptcha}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
