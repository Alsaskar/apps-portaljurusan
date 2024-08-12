import "./AreaTopProfile.scss";
import ProfileM from "../../../assets/images/foto.jpg";
import AreaDetailsDosen from "../areaDetailsDosen/AreaDetailsDosen";
import { useContext, useEffect, useState } from "react";
import { useUser } from "../../../hooks/userHooks";
import { DosenContext } from "../../../context/DosenContext";
import { RiImageAddFill } from "react-icons/ri";
import ModalEdit from "./ModalEdit";

const AreaTopProfile = () => {
  const { user } = useUser();
  const dataDosen = useContext(DosenContext);
  const [detailDosen, setDetailDosen] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedDataUser, setSelectedDataUser] = useState([]);

  const handleUpload = (data, dataUser) => {
    setSelectedData(data);
    setSelectedDataUser(dataUser);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (dataDosen !== null) {
      setDetailDosen(dataDosen.result.detaildosens[0]);
    }
  }, [dataDosen]);

  if (dataDosen !== null && detailDosen !== null) {
    return (
      <>
        {/* Modal */}
        <ModalEdit
          isOpen={showModal}
          handleClose={handleCloseModal}
          data={selectedData}
          dataUser={selectedDataUser}
        />
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

              <button type="button" className="edit-details-mahasiswa" onClick={handleUpload}>
                <RiImageAddFill size={16} />
                Upload Foto
              </button>
            </div>
            <div className="area-profile-details">
              <AreaDetailsDosen />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default AreaTopProfile;