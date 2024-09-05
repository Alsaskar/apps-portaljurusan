import "./rpsDua.scss";

const RPSDua = () => {
  return (
    <div className="rps-dua">
      <div className="left-header-table">
        <div className="body-rps-dua">
          <div className="rps-dua-flex">
            <div className="t-head-rps-dua desc">DESKRIPSI SINGKAT M.K</div>
            <div className="t-body-rps-dua">Data 1-1</div>
          </div>
          <div className="rps-dua-flex">
            <th className="t-head-rps-dua bahan">BAHAN KAJIAN/MATERI PEMBELAJARAN</th>
            <div className="t-body-rps-dua">Data 2-1</div>
          </div>
          <div className="rps-dua-flex">
            <th className="t-head-rps-dua daftar">DAFTAR PUSTAKA</th>
            <div className="t-body-rps-dua">Data 3-1</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RPSDua;
