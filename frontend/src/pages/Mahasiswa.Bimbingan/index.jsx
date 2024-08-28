import Layout from "./Layout";
import Helmet from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SocketProvider } from "../../context/SocketProvider";

const MahasiswaBimbingan = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "mahasiswa") {
      navigate(`/${sessionStorage.getItem("role")}`);
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Bimbingan Dosen Wali</title>
      </Helmet>

      <SocketProvider>
        <Layout />
      </SocketProvider>
    </>
  );
};

export default MahasiswaBimbingan;
