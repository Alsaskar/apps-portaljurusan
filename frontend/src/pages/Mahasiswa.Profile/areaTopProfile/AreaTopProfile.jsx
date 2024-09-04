import "./AreaTopProfile.scss";
import ProfileNoImage from "../../../assets/images/profile_no_image.png";
import AreaDetailsProfile from "../areaDetailsProfile/AreaDetailsProfile";
import AreaDetailsProfileOrangtua from "../areaDetailsProfileOrangtua/AreaDetailsProfileOrangtua";
import { useContext, useEffect, useState } from "react";
import { useUser } from "../../../hooks/userHooks";
import { MahasiswaContext } from "../../../context/MahasiswaContext";
import { RiImageAddFill } from "react-icons/ri";
import { HiTrash } from "react-icons/hi2";
import ModalUploadFoto from "./ModalUploadFoto";
import axios from "axios";
import { urlApi, urlStaticAssets } from "../../../config";
import Swal from "sweetalert2";

const AreaTopProfile = () => {
  const { user } = useUser();
  const dataMahasiswa = useContext(MahasiswaContext);
  const [detailMahasiswa, setDetailMahasiswa] = useState(null);
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
        await axios.delete(`${urlApi}/mahasiswa/${dataMahasiswa.result.id}/foto`, {
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
    if (dataMahasiswa && dataMahasiswa.result) {
      const mahasiswaDetail = dataMahasiswa.result.detailmahasiswas[0];
      setDetailMahasiswa(mahasiswaDetail);
      setHasFoto(Boolean(dataMahasiswa.result.foto)); // Set based on existence of foto
    }
  }, [dataMahasiswa]);

  if (dataMahasiswa !== null && detailMahasiswa !== null) {
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
                      ? `${urlStaticAssets}/${dataMahasiswa.result.foto}`
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
                  onClick={() => handleUpload(detailMahasiswa, user)}
                >
                  <RiImageAddFill size={16} />
                  Upload Foto
                </button>
              )}
            </div>
            <div className="area-profile-details">
              <AreaDetailsProfile />
              <AreaDetailsProfileOrangtua />
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
