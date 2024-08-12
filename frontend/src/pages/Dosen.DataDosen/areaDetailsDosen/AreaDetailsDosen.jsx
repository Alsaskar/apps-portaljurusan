import "./AreaDetailsDosen.scss";
import { useContext, useEffect, useState } from "react";
import { DosenContext } from "../../../context/DosenContext";

const AreaDetailsDosen = () => {
  const dataDosen = useContext(DosenContext);
  const [dosen, setDosen] = useState(null);
  const [detailDosen, setDetailDosen] = useState(null);

  useEffect(() => {
    if (dataDosen !== null) {
      setDosen(dataDosen.result);
    }
  }, [dataDosen]);

  useEffect(() => {
    if (dataDosen !== null) {
      setDetailDosen(dataDosen.result.detaildosens[0]);
      console.log(dataDosen.result.detaildosens[0]);
    }
  }, [dataDosen]);
  
  if (
    dataDosen !== null &&
    dosen !== null &&
    detailDosen !== null
  ) {
    return (
      <div className="area-details-profile">
        <div className="area-details-container">
          <p className="area-details-title-head">Profile Saya</p>
          <div className="divider-profile"></div>
          <div className="area-details-content">
             {/*Jurusan*/}
             <div className="area-details-sub-content">
              <p className="area-details-title-content">Jurusan</p>
              <p className="area-details-title">{dosen.jurusan === null ? "Loading..." : dosen.jurusan}</p>
            </div>

             {/*Prodi*/}
             <div className="area-details-sub-content">
              <p className="area-details-title-content">Program Studi</p>
              <p className="area-details-title">{dosen.prodi === null ? "Loading..." : dosen.prodi}</p>
            </div>

            {/*Alamat*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Alamat</p>
              <p className="area-details-title">{dosen.alamatTerakhir === null ? "Loading..." : dosen.alamatTerakhir}</p>
            </div>

            {/*Kota*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Kota</p>
              <p className="area-details-title">{dosen.kota === null ? "Loading..." : dosen.kota}</p>
            </div>

            {/*Tahun Masuk*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Angkatan</p>
              <p className="area-details-title">{dosen.angkatan === null ? "Loading..." : dosen.angkatan}</p>
            </div>

            {/*Tempat Lahir*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Tempat Lahir</p>
              <p className="area-details-title">{dosen.tempatLahir === null ? "Loading..." : dosen.tempatLahir}</p>
            </div>

            {/*Tanggal Lahir*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Tanggal Lahir</p>
              <p className="area-details-title">{dosen.tglLahir === null ? "Loading..." : dosen.tglLahir}</p>
            </div>

            {/*Jenis Kelamin*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Jenis Kelamin</p>
              <p className="area-details-title">{dosen.jenisKelamin === null ? "Loading..." : dosen.jenisKelamin}</p>
            </div>

            {/*Kode Pos*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Kode Pos</p>
              <p className="area-details-title">{dosen.kodePos === null ? "Loading..." : dosen.kodePos}</p>
            </div>

            {/*Agama*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Agama</p>
              <p className="area-details-title">
                {detailDosen.agama === null ? "Loading..." : detailDosen.agama}
              </p>
            </div>

            {/*Status*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Status</p>
              <p className="area-details-title">
                {detailDosen.statusDosen === null
                  ? "Loading..."
                  : detailDosen.statusDosen}
              </p>
            </div>

             {/*Tanggal Terdaftar*/}
             <div className="area-details-sub-content">
              <p className="area-details-title-content">Tanggal Terdaftar</p>
              <p className="area-details-title">
                {dosen.tglTerdaftar === null
                  ? "Loading..."
                  : dosen.tglTerdaftar}
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

export default AreaDetailsDosen;
