import "./rpsDua.scss";
import PropTypes from "prop-types";

const RPSDua = ({ data }) => {
  return (
    <div className="rps-dua">
      <div className="left-header-table">
        <div className="body-rps-dua">
          <div className="rps-dua-flex">
            <div className="t-head-rps-dua desc">DESKRIPSI SINGKAT M.K</div>
            <div className="t-body-rps-dua">{data.deskripsiMk}</div>
          </div>
          <div className="rps-dua-flex">
            <div className="t-head-rps-dua bahan">BAHAN KAJIAN/MATERI PEMBELAJARAN</div>
            <div className="t-body-rps-dua">{data.bahanKajian}</div>
          </div>
          <div className="rps-dua-flex">
            <div className="t-head-rps-dua daftar">DAFTAR PUSTAKA</div>
            <div className="t-body-rps-dua">{data.daftarPustaka}</div>
          </div>
          <div className="rps-dua-flex">
            <div className="t-head-rps-dua pengampu">DOSEN PENGAMPU</div>
            <div className="t-body-rps-dua">{data.dosenPengampu}</div>
          </div>
          <div className="rps-dua-flex">
            <div className="t-head-rps-dua prasyarat">MATA KULIAH PRASYARAT <span className="jika-ada">(JIKA ADA)</span></div>
            <div className="t-body-rps-dua">{data.matkulPrasyarat}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

RPSDua.propTypes = {
  data: PropTypes.string.isRequired,
};

export default RPSDua;
