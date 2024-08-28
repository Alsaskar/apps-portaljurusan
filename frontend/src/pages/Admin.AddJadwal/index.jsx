import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const AdminAddJadwal = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "admin") {
      navigate(`/${sessionStorage.getItem("role")}`);
    }
  }, [navigate]);

  return (
    <div>
      <Helmet>
        <title>Admin Tambah Jadwal</title>
      </Helmet>
      <Layout />
    </div>
  );
};

export default AdminAddJadwal;
