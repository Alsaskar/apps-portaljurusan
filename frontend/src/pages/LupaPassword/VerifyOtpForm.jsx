import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { urlApi } from '../../config';
import OtpInput from 'react-otp-input';
import './VerifyOtpForm.scss';

const VerifyOtpForm = ({ email, onVerified }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [expiryTime, setExpiryTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const fetchOtpExpiryTime = async () => {
      try {
        const response = await axios.post(
          `${urlApi}/auth/get-reset-otp-expiry`,
          { email },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          }
        );
        setExpiryTime(new Date(response.data.expiryTime));
      } catch (error) {
        console.error('Failed to fetch OTP expiry time', error);
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
        setTimeLeft('OTP kadaluarsa');
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
    setLoading(true);
    try {
      await axios.post(`${urlApi}/auth/verify-reset-otp`, { email, otp });
      onVerified();
    } catch (err) {
      Swal.fire({
        title: 'Failed',
        text: err.response.data.message,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleVerifyOtp}>
      <p className="title-input-otp">Kode OTP</p>
      <div className="otp-container">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          separator={<span>-</span>}
          containerStyle={{
            display: 'flex',
            justifyContent: 'center',
            columnGap: '10px',
          }}
          inputStyle={{
            width: '100%',
            textAlign: 'center',
            fontSize: '1rem',
            borderRadius: '4px',
          }}
          renderInput={(props) => <input {...props} />}
        />

        <div className="otp-expire">
          {timeLeft ? `Waktu tersisa: ${timeLeft}` : 'Menunggu OTP...'}
        </div>
      </div>
      <button type="submit" disabled={loading} className="btn-verify-otp">
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>
    </form>
  );
};

VerifyOtpForm.propTypes = {
  email: PropTypes.string.isRequired,
  onVerified: PropTypes.func.isRequired,
};

export default VerifyOtpForm;