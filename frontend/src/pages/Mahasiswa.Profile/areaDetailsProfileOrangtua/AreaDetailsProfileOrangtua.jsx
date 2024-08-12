import "./AreaDetailsProfileOrangtua.scss";
import { useContext, useEffect, useState } from "react";
import { MahasiswaContext } from "../../../context/MahasiswaContext";

const AreaDetailsProfileOrangtua = () => {
  const dataMahasiswa = useContext(MahasiswaContext);
  const [detailMahasiswa, setDetailMahasiswa] = useState(null);

  useEffect(() => {
    if (dataMahasiswa !== null) {
      setDetailMahasiswa(dataMahasiswa.result.detailmahasiswas[0]);
    }
  }, [dataMahasiswa]);

  if (dataMahasiswa !== null && detailMahasiswa !== null) {
    return (
      <div className="area-details-profile">
        <div className="area-details-container">
          <p className="area-details-title-head">Profile Wali</p>
          <div className="divider-orangtua"></div>
          <div className="area-details-content">
            {/*Nama*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Nama</p>
              <p className="area-details-title">
                {detailMahasiswa.namaOrtuWali === null
                  ? "Loading..."
                  : detailMahasiswa.namaOrtuWali}
              </p>
            </div>

            {/*No Telephone*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">No. Telephone</p>
              <p className="area-details-title">
              {detailMahasiswa.noHpWali === null
                  ? "Loading..."
                  : detailMahasiswa.noHpWali}
              </p>
            </div>

            {/*Alamat*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Alamat</p>
              <p className="area-details-title">
                {detailMahasiswa.alamatWali === null
                  ? "Loading..."
                  : detailMahasiswa.alamatWali}
              </p>
            </div>

            {/*Email*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Email</p>
              <p className="area-details-title">
                {detailMahasiswa.emailWali === null
                  ? "Loading..."
                  : detailMahasiswa.emailWali}
              </p>
            </div>

            {/*Kode Pos*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Kode Pos</p>
              <p className="area-details-title">
                {detailMahasiswa.kodePosWali === null
                  ? "Loading..."
                  : detailMahasiswa.kodePosWali}
              </p>
            </div>

            {/*Pendapatan*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Pendapatan Orang Tua</p>
              <p className="area-details-title">
                {detailMahasiswa.pendapatanOrtuWali === null
                  ? "Loading..."
                  : detailMahasiswa.pendapatanOrtuWali}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default AreaDetailsProfileOrangtua;
