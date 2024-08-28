import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi } from "../../config";
import OtpInput from "react-otp-input";
import "./VerifyOtpForm.scss";
import { PiKeyholeFill } from "react-icons/pi";

const VerifyOtpForm = ({ email, onVerified }) => {
  const [otp, setOtp] = useState("");
  const [expiryTime, setExpiryTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const fetchOtpExpiryTime = async () => {
      try {
        const response = await axios.post(
          `${urlApi}/auth/get-otp-expiry`,
          { email },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        setExpiryTime(new Date(response.data.expiryTime));
      } catch (error) {
        console.error("Failed to fetch OTP expiry time", error);
      }
    };

    fetchOtpExpiryTime();
  }, [email]);

  useEffect(() => {
    if (!expiryTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeDifference = expiryTime - now;

      if (timeDifference <= 0) {
        clearInterval(interval);
        setTimeLeft("OTP kadaluarsa");
      } else {
        const minutes = Math.floor(timeDifference / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        setTimeLeft(`${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryTime]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${urlApi}/auth/verify-otp`,
        { email, otp },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire("Sukses", "OTP berhasil diverifikasi!", "success");
      onVerified();
    } catch (error) {
      Swal.fire("Gagal", "Verifikasi OTP gagal", "error");
    }
  };

  return (
    <form onSubmit={handleVerifyOtp} className="form-input-otp">
      <label htmlFor="otp" className="label-masukan-otp">Masukkan OTP </label>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        separator={<span>-</span>}
        containerStyle={{
          display: "flex",
          justifyContent: "center",
          columnGap: "10px"
        }}
        inputStyle={{
          width: "100%",
          height: "40px",
          textAlign: "center",
          fontSize: "1rem",
          borderRadius: "4px",
        }}
        renderInput={(props) => <input {...props} />}
      />
      <div className="otp-expiry">
        {timeLeft ? `Waktu tersisa: ${timeLeft}` : "Menunggu OTP..."}
      </div>
      <button type="submit" className="btn-verify-otp">
        <PiKeyholeFill size={18} /> Verifikasi OTP
      </button>
    </form>
  );
};

VerifyOtpForm.propTypes = {
  email: PropTypes.string.isRequired,
  onVerified: PropTypes.func.isRequired,
};

export default VerifyOtpForm;
