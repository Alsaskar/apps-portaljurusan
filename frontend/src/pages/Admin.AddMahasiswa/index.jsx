import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const AdminAddMahasiswa = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "admin") {
      navigate(`/${sessionStorage.getItem("role")}`);
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Admin Tambah Mahasiswa</title>
      </Helmet>
      <Layout />
    </>
  );
};

export default AdminAddMahasiswa;
