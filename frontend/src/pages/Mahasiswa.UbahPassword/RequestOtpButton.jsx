import PropTypes from "prop-types";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi } from "../../config";
import { useLoading } from "../../context/LoadingContext";
import "./RequestOtpButton.scss";
import { FaKey } from "react-icons/fa";

const RequestOtpButton = ({ onOtpRequested, email }) => {
  const { setLoading } = useLoading();

  const handleRequestOtp = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Konfirmasi",
      text: `Ingin mengirim OTP ke email ${email}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Kirim OTP",
      cancelButtonText: "Batal",
    });

    if (isConfirmed) {
      setLoading(true);
      try {
        await axios.post(
          `${urlApi}/auth/send-otp`,
          { email },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        Swal.fire("Sukses", "OTP telah dikirim ke email Anda!", "success");
        onOtpRequested(); // Panggil callback jika OTP berhasil dikirim
      } catch (error) {
        Swal.fire("Gagal", "Gagal mengirim OTP", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="btn-otp">
      <p className="title">Kirim OTP ke email anda dan pastikan email anda sudah benar untuk menerima kode OTP.</p>
      <button onClick={handleRequestOtp} className="btn-kirim-otp">
        <FaKey size={15} /> Kirim OTP
      </button>
    </div>
  );
};

RequestOtpButton.propTypes = {
  onOtpRequested: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default RequestOtpButton;
