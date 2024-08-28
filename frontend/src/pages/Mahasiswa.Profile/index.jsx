import AreaTopProfile from "./areaTopProfile/AreaTopProfile";
import Helmet from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MahasiswaProfile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(sessionStorage.getItem('role') !== 'mahasiswa'){
      navigate(`/${sessionStorage.getItem('role')}`)
    }
  }, [navigate])

  return (
    <div>
       <Helmet>
        <title>Profile Mahasiswa</title>
      </Helmet>
      <AreaTopProfile />
    </div>
  );
}

export default MahasiswaProfile;
