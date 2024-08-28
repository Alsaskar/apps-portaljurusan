import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const AdminDataMahasiswa = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "admin") {
      navigate(`/${sessionStorage.getItem("role")}`);
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Admin Data Mahasiswa</title>
      </Helmet>
      <Layout />
    </>
  );
};

export default AdminDataMahasiswa;
