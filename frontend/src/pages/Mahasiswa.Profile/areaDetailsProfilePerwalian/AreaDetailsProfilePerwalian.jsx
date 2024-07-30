import "./AreaDetailsProfilePerwalian.scss";

const AreaDetailsProfilePerwalian = () => {
  return (
    <div className="area-details-profile">
      <div className="area-details-container">
        <p className="area-details-title-head">Profile Perwalian</p>
        <div className="divider-perwalian"></div>
        <div className="area-details-content">
          {/*Nama*/}
          <div className="area-details-sub-content">
            <p className="area-details-title-content">Nama</p>
            <p className="area-details-title">Siapa namanya</p>
          </div>

          {/*No Telephone*/}
          <div className="area-details-sub-content">
            <p className="area-details-title-content">No. Telephone</p>
            <p className="area-details-title">+62 821-3475-9021</p>
          </div>

          {/*Alamat*/}
          <div className="area-details-sub-content">
            <p className="area-details-title-content">Alamat</p>
            <p className="area-details-title">Mencimai, Kutai Barat</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaDetailsProfilePerwalian;
