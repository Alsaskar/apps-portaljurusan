import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const AdminDataDosen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "admin") {
      navigate(`/${sessionStorage.getItem("role")}`);
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Admin Data Dosen</title>
      </Helmet>
      <Layout />
    </>
  );
};

export default AdminDataDosen;
