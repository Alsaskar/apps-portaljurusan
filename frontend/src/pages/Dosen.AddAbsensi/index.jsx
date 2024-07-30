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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
