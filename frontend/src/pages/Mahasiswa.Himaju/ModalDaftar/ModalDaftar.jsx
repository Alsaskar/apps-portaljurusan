import "./style.scss";
import PropTypes from "prop-types";
import { RiCloseCircleFill } from "react-icons/ri";

const ModalDaftar = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal fade-in">
      <div className="modal-content fade-in">
        <button onClick={onClose} className="close-button">
          <RiCloseCircleFill size={22} />
        </button>

        <form className="form-daftar">
          <div className="form-content">
            <p className="title">Daftar HME</p>
            <div className="form-group">
              <label htmlFor="fullname">
                Nama Lengkap <span className="important">*</span>
              </label>
              <input type="text" id="fullname" name="fullname" placeholder="Masukan nama lengkap anda"></input>
            </div>
            <div className="form-group">
              <label htmlFor="nim">
                NIM <span className="important">*</span>
              </label>
              <input type="text" id="nim" name="nim" placeholder="Masukan nim anda"></input>
            </div>
            <div className="form-group">
              <label htmlFor="prodi">
                Prodi <span className="important">*</span>
              </label>
              <select id="prodi" name="prodi">
                <option value="">...</option>
                <option value="D4 Teknik Informatika">D4 Teknik Informatika</option>
                <option value="D3 Teknik Komputer">D3 Teknik Komputer</option>
                <option value="D4 Teknik Listrik">D4 Teknik Listrik</option>
                <option value="D3 Teknik Listrik">D3 Teknik Listrik</option>
              </select>
            </div>
            <div className="form-group">
            <label htmlFor="noHp">
              No Hp <span className="important">*</span>
            </label>
            <input type="text" id="noHp" name="noHp" placeholder="Masukan no hp anda"></input>
            <p className="desc-no">*Pastikan nomor yang di isi adalah nomor Whatsapp aktif.</p>
          </div>
          </div>

          <button className="button-daftar">Daftar</button>
        </form>
      </div>
    </div>
  );
};

ModalDaftar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalDaftar;
