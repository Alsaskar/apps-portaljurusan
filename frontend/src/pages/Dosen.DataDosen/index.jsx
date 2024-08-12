import AreaTopProfile from "./areaTopProfile/AreaTopProfile";
import Helmet from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DosenDataDosen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(sessionStorage.getItem('role') !== 'dosen'){
      navigate(`/${sessionStorage.getItem('role')}`)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
       <Helmet>
        <title>Profile Mahasiswa</title>
      </Helmet>
      <AreaTopProfile />
    </div>
  );
}

export default DosenDataDosen;
