import Layout from "./Layout"
import Helmet from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MahasiswaProfileHME = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "mahasiswa") {
      navigate(`/${sessionStorage.getItem("role")}`);
    }
  }, [navigate]);

  return (
    <div>
       <Helmet>
        <title>Profle HME</title>
      </Helmet>
      <Layout /></div>
  )
}

export default MahasiswaProfileHME