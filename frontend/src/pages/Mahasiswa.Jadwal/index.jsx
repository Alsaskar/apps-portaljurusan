import Layout from "./Layout";
import Helmet from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MahasiswaJadwal = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "mahasiswa") {
      navigate(`/${sessionStorage.getItem("role")}`);
    }
  }, [navigate]);

  return (
    <div>
      <Helmet>
        <title>Mahasiswa Jadwal</title>
      </Helmet>
      <Layout />
    </div>
  );
};

export default MahasiswaJadwal;
