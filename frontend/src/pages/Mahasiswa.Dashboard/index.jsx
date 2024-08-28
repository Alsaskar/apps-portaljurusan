import { useEffect } from "react";
import Layout from "./Layout";
import Helmet from "react-helmet";
import { useNavigate } from "react-router-dom";

const MahasiswaDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "mahasiswa") {
      navigate(`/${sessionStorage.getItem("role")}`);
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Mahasiswa Dashboard</title>
      </Helmet>
      <Layout />
    </>
  );
};

export default MahasiswaDashboard;
