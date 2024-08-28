import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const DosenAddAbsensi = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "dosen") {
      navigate(`/${sessionStorage.getItem("role")}`);
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Dosen Tambah Absensi</title>
      </Helmet>
      <Layout />
    </>
  );
};

export default DosenAddAbsensi;
