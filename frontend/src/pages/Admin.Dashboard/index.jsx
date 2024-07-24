import { useEffect } from "react";
import Layout from "./Layout";
import Helmet from 'react-helmet';
import {useNavigate} from 'react-router-dom'

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(sessionStorage.getItem('role') !== 'admin'){
      navigate(`/${sessionStorage.getItem('role')}`)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
