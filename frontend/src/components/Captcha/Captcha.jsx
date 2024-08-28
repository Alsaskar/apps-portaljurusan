// src/components/Captcha.js
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { HiRefresh } from "react-icons/hi";
import { BsFillShieldLockFill } from "react-icons/bs";
import Swal from "sweetalert2";
import './Captcha.scss';

const Captcha = ({ showCaptchaModal, setShowCaptchaModal, setIsCaptchaCorrect }) => {
  const [captchaValue, setCaptchaValue] = useState("");
  const [inputCaptchaValue, setInputCaptchaValue] = useState("");
  const [captchaFonts, setCaptchaFonts] = useState([]);
  const [captchaRotations, setCaptchaRotations] = useState([]);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const renderCaptcha = () => {
    return captchaValue.split("").map((char, index) => (
      <span
        key={index}
        style={{
          fontFamily: captchaFonts[index],
          transform: `rotate(${captchaRotations[index]}deg)`,
        }}
      >
        {char}
      </span>
    ));
  };

  const generateCaptcha = () => {
    let value = btoa(Math.random() * 1000000000).slice(0, 6);
    setCaptchaValue(value);
    const fonts = ["Arial", "Helvetica", "Verdana", "Georgia", "Courier New"];
    const fontsArray = [];
    const rotationsArray = [];
    for (let i = 0; i < value.length; i++) {
      fontsArray.push(fonts[Math.floor(Math.random() * fonts.length)]);
      rotationsArray.push(-20 + Math.trunc(Math.random() * 40));
    }
    setCaptchaFonts(fontsArray);
    setCaptchaRotations(rotationsArray);
  };

  const handleConfirmCaptcha = () => {
    if (inputCaptchaValue === captchaValue) {
      setIsCaptchaCorrect(true);
      setShowCaptchaModal(false);
    } else {
      Swal.fire({
        title: "Invalid Captcha",
        text: "Silahkan masukan captcha yang sesuai",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return showCaptchaModal ? (
    <div className="modal-captcha fade-in" onClick={() => setShowCaptchaModal(false)}>
      <div className="modal-content-captcha fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">
          <div className="bg-satu-captcha">
          <div className="bg-dua-captcha">
          <BsFillShieldLockFill size={22} className="icon-shield-captcha" />
          </div>
          </div>
         
          
        </div>
        <h2 className="title-captcha">Captcha</h2>
        <p className="captcha-desc">Silahkan memasukan kode captcha untuk verifikasi.</p>
        <div className="captcha">
          <div className="preview">
            {renderCaptcha()}
            <button type="button" className="captcha-refresh" onClick={generateCaptcha}>
              <HiRefresh size={18} />
            </button>
          </div>
          <div className="captcha-form">
            <input
              type="text"
              className="input-captcha"
              placeholder="Enter captcha here"
              onChange={(e) => setInputCaptchaValue(e.target.value)}
            />
          </div>
          <button type="button" className="btn-captcha-confirm" onClick={handleConfirmCaptcha}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

Captcha.propTypes = {
  showCaptchaModal: PropTypes.bool.isRequired,
  setShowCaptchaModal: PropTypes.func.isRequired,
  setIsCaptchaCorrect: PropTypes.func.isRequired,
};

export default Captcha;
