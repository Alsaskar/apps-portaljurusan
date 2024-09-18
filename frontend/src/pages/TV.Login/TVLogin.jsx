import { useEffect, useState } from "react";
import axios from "axios";
import { urlApi } from "../../config";
import "./style.scss";
import { BiQrScan } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { MdTouchApp } from "react-icons/md";

const LoginWithQRCode = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      navigate(`/tv/home/menu`);
    }
  }, [navigate]);

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

      // return;

      if (data.success) {
        setTimeout(() => {
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("role", data.user.role);
          sessionStorage.setItem("prodiAdmin", data.user.prodiAdmin);
          sessionStorage.setItem("prodiDosen", data.user.prodiDosen);
          sessionStorage.setItem("isLoggedIn", true);
          sessionStorage.setItem("username", data.user.username);

          setLoading(false);
          setScanning(false);

          navigate("/tv/home/menu");
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
      <div className="absolute">
        <div className="absolute inset-0 justify-center">
          <div className="bg-shape1 bg-primary opacity-50 bg-blur"></div>
          <div className="bg-shape2 bg-pink opacity-50 bg-blur"></div>
          <div className="bg-shape3 bg-purple opacity-50 bg-blur"></div>
        </div>
      </div>
      {loading ? (
        <div disabled={loading} className="login-qr-button">
          <p>Memproses...</p>
        </div>
      ) : (
        <div
          onClick={handleQRCodeScan}
          disabled={loading}
          className="login-qr-button"
        >
          <MdTouchApp size={30} />
          <p>Scan QR Code</p>
        </div>
      )}
      {scanning && (
        <div className="scanning-animation">
          <div className="scanning-section">
            <BiQrScan size={85} />
            Scan QR Code
          </div>
        </div>
      )}{" "}
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
