import { useState } from "react";
import axios from "axios";
import { urlApi } from "../../config";
import "./style.scss";
import { BiQrScan } from "react-icons/bi";

const LoginWithQRCode = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false); 

  const handleQRCodeScan = () => {
    setScanning(true); 

    const inputElement = document.createElement("input");
    inputElement.style.position = "absolute";
    inputElement.style.left = "-9999px";
    document.body.appendChild(inputElement);

    inputElement.focus();

    const handleKeyPress = async (event) => {
      if (event.key === "Enter") {
        const qrCodeToken = inputElement.value;
        await handleLoginWithQRCode(qrCodeToken);

        // Remove the input element safely
        if (document.body.contains(inputElement)) {
          document.body.removeChild(inputElement);
        }
      }
    };

    inputElement.addEventListener("keypress", handleKeyPress);
  };

  // Handle QR code login
  const handleLoginWithQRCode = async (qrCodeToken) => {
    setLoading(true);
    setError("");

    try {
      // console.log("Sending token:", qrCodeToken);
      const res = await axios.post(`${urlApi}/qrcode/login-with-qr-code`, {
        qrCodeToken,
      });

      const data = res.data;

      if (data.success) {
        setTimeout(() => {
          localStorage.setItem("token", data.token);
          setUser(data.user);
          setLoading(false);
          setScanning(false);
        }, 1500);
      } else {
        setError(data.message);
        setUser(null);
        setLoading(false);
        setScanning(false);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error.message);
      setError("Terjadi kesalahan saat login");
      setUser(null);
      setLoading(false);
      setScanning(false);
    }
  };

  return (
    <div className="login-qr">
      <button
        onClick={handleQRCodeScan}
        disabled={loading}
        className="login-qr-button"
      >
        {loading ? "Memproses..." : "Scan QR Code"}
      </button>
      {scanning && (
        <div className="scanning-animation">
          <div className="scanning-section">
            <BiQrScan size={85} />
            Scanning
          </div>
        </div>
      )}{" "}
      {loading && <p className="loading">Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {user && !loading && (
        <div className="detail">
          <p>User ID: {user.id}</p>
          <p>{user.fullname}</p>
          <p>{user.username}</p>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
};

export default LoginWithQRCode;
