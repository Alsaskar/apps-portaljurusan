import "./AreaDetailsProfile.scss";
import { useContext, useEffect, useState } from "react";
import { MahasiswaContext } from "../../../context/MahasiswaContext";

const AreaDetailsProfile = () => {
  const dataMahasiswa = useContext(MahasiswaContext);
  const [mahasiswa, setMahasiswa] = useState(null);
  const [detailMahasiswa, setDetailMahasiswa] = useState(null);

  useEffect(() => {
    if (dataMahasiswa !== null) {
      setMahasiswa(dataMahasiswa.result);
    }
  }, [dataMahasiswa]);

  useEffect(() => {
    if (dataMahasiswa !== null) {
      setDetailMahasiswa(dataMahasiswa.result.detailmahasiswas[0]);
    }
  }, [dataMahasiswa]);

  if (
    dataMahasiswa !== null &&
    mahasiswa !== null &&
    detailMahasiswa !== null
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
              <p className="area-details-title">{mahasiswa.jurusan === null ? "Loading..." : mahasiswa.jurusan}</p>
            </div>

             {/*Prodi*/}
             <div className="area-details-sub-content">
              <p className="area-details-title-content">Program Studi</p>
              <p className="area-details-title">{mahasiswa.prodi === null ? "Loading..." : mahasiswa.prodi}</p>
            </div>

            {/*Alamat*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Alamat</p>
              <p className="area-details-title">{mahasiswa.alamatTerakhir === null ? "Loading..." : mahasiswa.alamatTerakhir}</p>
            </div>

            {/*Kota*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Kota</p>
              <p className="area-details-title">{mahasiswa.kota === null ? "Loading..." : mahasiswa.kota}</p>
            </div>

            {/*Tahun Masuk*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Angkatan</p>
              <p className="area-details-title">{mahasiswa.angkatan === null ? "Loading..." : mahasiswa.angkatan}</p>
            </div>

            {/*Tempat Lahir*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Tempat Lahir</p>
              <p className="area-details-title">{mahasiswa.kotaLahir === null ? "Loading..." : mahasiswa.kotaLahir}</p>
            </div>

            {/*Tanggal Lahir*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Tanggal Lahir</p>
              <p className="area-details-title">{mahasiswa.tglLahir === null ? "Loading..." : mahasiswa.tglLahir}</p>
            </div>

            {/*Jenis Kelamin*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Jenis Kelamin</p>
              <p className="area-details-title">{mahasiswa.jenisKelamin === null ? "Loading..." : mahasiswa.jenisKelamin}</p>
            </div>

            {/*Kode Pos*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Kode Pos</p>
              <p className="area-details-title">{mahasiswa.kodePos === null ? "Loading..." : mahasiswa.kodePos}</p>
            </div>

            {/*Agama*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Agama</p>
              <p className="area-details-title">
                {mahasiswa.agama === null ? "Loading..." : mahasiswa.agama}
              </p>
            </div>

            {/*Status*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Status</p>
              <p className="area-details-title">
                {detailMahasiswa.statusMahasiswa === null
                  ? "Loading..."
                  : detailMahasiswa.statusMahasiswa}
              </p>
            </div>

             {/*Tanggal Terdaftar*/}
             <div className="area-details-sub-content">
              <p className="area-details-title-content">Tanggal Terdaftar</p>
              <p className="area-details-title">
                {mahasiswa.tglTerdaftar === null
                  ? "Loading..."
                  : mahasiswa.tglTerdaftar}
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

export default AreaDetailsProfile;
