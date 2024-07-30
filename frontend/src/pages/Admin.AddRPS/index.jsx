import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const AdminAddRPS = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "admin") {
      navigate(`/${sessionStorage.getItem("role")}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Helmet>
        <title>Admin Tambah RPS</title>
      </Helmet>
      <Layout />
    </div>
  );
};

export default AdminAddRPS;
