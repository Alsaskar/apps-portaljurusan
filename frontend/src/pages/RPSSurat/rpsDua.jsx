import "./rpsDua.scss";

const RPSDua = () => {
  return (
    <div className="rps-dua">
      <div className="left-header-table">
        <div className="body-rps-dua">
          <div className="rps-dua-flex">
            <div className="t-head-rps-dua desc">DESKRIPSI SINGKAT M.K</div>
            <div className="t-body-rps-dua"></div>
          </div>
          <div className="rps-dua-flex">
            <div className="t-head-rps-dua bahan">BAHAN KAJIAN/MATERI PEMBELAJARAN</div>
            <div className="t-body-rps-dua"></div>
          </div>
          <div className="rps-dua-flex">
            <div className="t-head-rps-dua daftar">DAFTAR PUSTAKA</div>
            <div className="t-body-rps-dua"></div>
          </div>
          <div className="rps-dua-flex">
            <div className="t-head-rps-dua pengampu">DOSEN PENGAMPU</div>
            <div className="t-body-rps-dua"></div>
          </div>
          <div className="rps-dua-flex">
            <div className="t-head-rps-dua prasyarat">MATA KULIAH PRASYARAT <span className="jika-ada">(JIKA ADA)</span></div>
            <div className="t-body-rps-dua"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RPSDua;
