import Layout from "./Layout";
import { useEffect } from "react";
import Helmet from 'react-helmet';
import {useNavigate} from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(sessionStorage.getItem('role') !== 'admin'){
      navigate(`/${sessionStorage.getItem('role')}`)
    }
  }, [navigate])

  return (
    <>

      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>

      <Layout />
    </>
  );
};

export default AdminDashboard;
