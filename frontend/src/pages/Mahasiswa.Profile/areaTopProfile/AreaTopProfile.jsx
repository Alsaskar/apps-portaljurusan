import "./AreaTopProfile.scss";
import ProfileM from "../../../assets/images/foto.jpg";
import AreaDetailsProfile from "../areaDetailsProfile/AreaDetailsProfile";
import AreaDetailsProfileOrangtua from "../areaDetailsProfileOrangtua/AreaDetailsProfileOrangtua";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { useUser } from "../../../hooks/userHooks";
import { MahasiswaContext } from "../../../context/MahasiswaContext";

const AreaTopProfile = () => {
  const { user } = useUser();
  const dataMahasiswa = useContext(MahasiswaContext);
  const [detailMahasiswa, setDetailMahasiswa] = useState(null);

  useEffect(() => {
    if (dataMahasiswa !== null) {
      setDetailMahasiswa(dataMahasiswa.result.detailmahasiswas[0]);
    }
  }, [dataMahasiswa]);

  if (dataMahasiswa !== null && detailMahasiswa !== null) {
    return (
      <div className="area-profile">
        <div className="area-container">
          <div className="area-profile-top">
            <div className="area-profile-details">
              <img
                className="area-profile-img"
                src={ProfileM}
                alt="Area Profile"
              />
              <div className="area-profile-top1">
                <h3 className="area-profile-name">{user.fullname}</h3>
                <p className="area-profile-nim">{user.username}</p>
                <div className="area-profile-contact">
                  <p className="area-profile-email">{user.email}</p>
                  <p className="garis">|</p>
                  <p className="area-profile-phone">{user.noHp}</p>
                </div>
              </div>
            </div>

            <button type="button" className="edit-details-mahasiswa">
              <BiSolidMessageSquareEdit size={16} />
              Edit
            </button>
          </div>
          <div className="area-profile-details">
            <AreaDetailsProfile />
            <AreaDetailsProfileOrangtua />
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default AreaTopProfile;
