import { useEffect } from "react";
import Layout from "./Layout";
import Helmet from "react-helmet";
import { useNavigate } from "react-router-dom";

const AdminDataBimbingan = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "admin") {
      navigate(`/${sessionStorage.getItem("role")}`);
    }
  }, [navigate]);

  return (
    <div>
      <Helmet>
        <title>Admin Data Bimbingan</title>
      </Helmet>
      <Layout />
    </div>
  );
};

export default AdminDataBimbingan;
