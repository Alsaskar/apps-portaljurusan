import "./AreaTopProfile.scss";
import ProfileNoImage from "../../../assets/images/profile_no_image.png";
import AreaDetailsDosen from "../areaDetailsDosen/AreaDetailsDosen";
import { useContext, useEffect, useState } from "react";
import { useUser } from "../../../hooks/userHooks";
import { DosenContext } from "../../../context/DosenContext";
import { RiImageAddFill } from "react-icons/ri";
import ModalUploadFoto from "./ModalUploadFoto";
import { urlApi, urlStaticAssetsDosen } from "../../../config";
import axios from "axios";
import Swal from "sweetalert2";
import { HiTrash } from "react-icons/hi2";

const AreaTopProfile = () => {
  const { user } = useUser();
  const dataDosen = useContext(DosenContext);
  const [detailDosen, setDetailDosen] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedDataUser, setSelectedDataUser] = useState([]);
  const [hasFoto, setHasFoto] = useState(false);

  const handleUpload = (data, dataUser) => {
    setSelectedData(data);
    setSelectedDataUser(dataUser);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteFoto = async () => {
    try {
      // Menampilkan konfirmasi SweetAlert2 sebelum melanjutkan
      const result = await Swal.fire({
        title: "Hapus Foto",
        text: "Yakin ingin menghapus foto profile?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        await axios.delete(`${urlApi}/dosen/${dataDosen.result.id}/foto`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });

        // Update state dan UI setelah penghapusan
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        Swal.fire("Dihapus!", "Foto telah dihapus.", "success");
      }
    } catch (err) {
      console.error("Error deleting photo:", err);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus foto.", "error");
    }
  };

  useEffect(() => {
    if (dataDosen !== null) {
      setDetailDosen(dataDosen.result.detaildosens[0]);
      setHasFoto(dataDosen.result.foto ? true : false);
    }
  }, [dataDosen]);

  if (dataDosen !== null && detailDosen !== null) {
    return (
      <>
        {/* Modal */}
        <ModalUploadFoto
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
                  src={
                    hasFoto
                      ? `${urlStaticAssetsDosen}/${dataDosen.result.foto}`
                      : ProfileNoImage
                  }
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

              {hasFoto ? (
                <button
                  type="button"
                  className="btn-details-mahasiswa red"
                  onClick={handleDeleteFoto}
                >
                  <HiTrash size={16} />
                  Hapus Foto
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-details-mahasiswa blue"
                  onClick={() => handleUpload(detailDosen, user)}
                >
                  <RiImageAddFill size={16} />
                  Upload Foto
                </button>
              )}
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
