import "./style.scss";
import PropTypes from "prop-types";
import { RiCloseCircleFill } from "react-icons/ri";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi } from "../../../config";
import { MahasiswaContext } from "../../../context/MahasiswaContext";
import { useContext } from "react";

const ModalDaftar = ({ isOpen, handleClose }) => {
  const dataMahasiswa = useContext(MahasiswaContext);

  const handelDaftar = async () => {
    try {
      const mahasiswa = dataMahasiswa.result;

      const res = await axios.post(
        `${urlApi}/himaju`,
        {
          idMahasiswa: mahasiswa.id,
          fullname: mahasiswa.fullname,
          status: 'pending'
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        Swal.fire(
          "Berhasil!",
          `Anda berhasil mendaftar himaju`,
          "success"
        );

        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        Swal.fire("Oppsss...!", `${res.data.message}`, "error");
      }
    } catch (err) {
      Swal.fire("Error!", err.response.data.message, "error");
    }
  }

  if (!isOpen) return null;

  return (
    <div className="modal fade-in">
      <div className="modal-content fade-in">
        <button onClick={handleClose} className="close-button">
          <RiCloseCircleFill size={22} />
        </button>

        <div className="daftar-hme">
          <div className="container">
            <p className="title">Daftar HME</p>
            <p className="text">Apakah anda yakin ingin daftar HME?</p>
            <div className="validasi">
              <p className="select blue" onClick={handelDaftar}>Ya</p>
              <p className="select red">Tidak</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ModalDaftar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.object, 
  dataUser: PropTypes.object, 
};

export default ModalDaftar;
