import Layout from "./Layout";
import Helmet from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MahasiswaJadwalKu = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "mahasiswa") {
      navigate(`/${sessionStorage.getItem("role")}`);
    }
  }, [navigate]);

  return (
    <div>
      <Helmet>
        <title>Jadwal Ku</title>
      </Helmet>
      <Layout />
    </div>
  );
};

export default MahasiswaJadwalKu;
