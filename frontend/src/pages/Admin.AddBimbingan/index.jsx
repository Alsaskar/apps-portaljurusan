import Layout from "./Layout";
import { useEffect } from "react";
import Helmet from 'react-helmet';
import {useNavigate} from 'react-router-dom';

const AdminAddBimbingan = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "admin") {
      navigate(`/${sessionStorage.getItem("role")}`);
    }
  }, [navigate]);

  return (
    <div>
      <Helmet>
        <title>Admin Add Bimbingan</title>
      </Helmet>
      <Layout />
    </div>
  );
}

export default AdminAddBimbingan;
