import Layout from "./Layout";
import Helmet from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminAddAdminProdi = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(sessionStorage.getItem('role') !== 'admin'){
      navigate(`/${sessionStorage.getItem('role')}`)
    }
  }, [navigate])

  return (
    <div>
      <Helmet>
        <title>Tambah Admin Prodi</title>
      </Helmet>

      <Layout />
    </div>
  );
};

export default AdminAddAdminProdi;
