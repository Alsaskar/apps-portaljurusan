import "./AreaDetailsDosen.scss";
import { useContext, useEffect, useState } from "react";
import { DosenContext } from "../../../context/DosenContext";
import useFormatDate from "../../../hooks/useFormatDateHooks";

const AreaDetailsDosen = () => {
  const dataDosen = useContext(DosenContext);
  const [dosen, setDosen] = useState(null);
  const [detailDosen, setDetailDosen] = useState(null);

  const { formatDate } = useFormatDate(); 

  useEffect(() => {
    if (dataDosen !== null) {
      setDosen(dataDosen.result);
    }
  }, [dataDosen]);

  useEffect(() => {
    if (dataDosen !== null) {
      setDetailDosen(dataDosen.result.detaildosens[0]);
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
             {/*NIDN*/}
             <div className="area-details-sub-content">
              <p className="area-details-title-content">NIDN</p>
              <p className="area-details-title">{dosen.nidn === null ? "Loading..." : dosen.nidn}</p>
            </div>

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
              <p className="area-details-title-content">Pendidikan Terakhir</p>
              <p className="area-details-title">{detailDosen.pendidikanTerakhir === null ? "Loading..." : detailDosen.pendidikanTerakhir}</p>
            </div>

            {/*Kota*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">PNS</p>
              <p className="area-details-title">{dosen.pns === null ? "Loading..." : dosen.pns}</p>
            </div>

            {/*Tahun Masuk*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Karpeg</p>
              <p className="area-details-title">{dosen.karpeg === null ? "Loading..." : dosen.karpeg}</p>
            </div>

            {/*Tempat Lahir*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Tempat Lahir</p>
              <p className="area-details-title">{dosen.tempatLahir === null ? "Loading..." : dosen.tempatLahir}</p>
            </div>

            {/*Tanggal Lahir*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Tanggal Lahir</p>
              <p className="area-details-title">{formatDate(dosen.tglLahir) === null ? "Loading..." : formatDate(dosen.tglLahir)}</p>
            </div>

            {/*Jenis Kelamin*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Jenis Kelamin</p>
              <p className="area-details-title">{dosen.jenisKelamin === null ? "Loading..." : dosen.jenisKelamin}</p>
            </div>

            {/*Kode Pos*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Tahun</p>
              <p className="area-details-title">{detailDosen.tahun === null ? "Loading..." : detailDosen.tahun}</p>
            </div>

            {/*Agama*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Agama</p>
              <p className="area-details-title">
                {detailDosen.agama === null ? "Loading..." : detailDosen.agama}
              </p>
            </div>

            {/*Gol*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">Gol</p>
              <p className="area-details-title">
                {detailDosen.gol === null
                  ? "Loading..."
                  : detailDosen.gol}
              </p>
            </div>

             {/*Jabatan*/}
             <div className="area-details-sub-content">
              <p className="area-details-title-content">Jabatan</p>
              <p className="area-details-title">
                {detailDosen.jabatan === null
                  ? "Loading..."
                  : detailDosen.jabatan}
              </p>
            </div>

             {/*TMT GOL*/}
             <div className="area-details-sub-content">
              <p className="area-details-title-content">TMT Gol</p>
              <p className="area-details-title">
                {formatDate(detailDosen.tmtGolongan) === null
                  ? "Loading..."
                  : formatDate(detailDosen.tmtGolongan)}
              </p>
            </div>

            {/*TMT Jabatan*/}
            <div className="area-details-sub-content">
              <p className="area-details-title-content">TMT Jabatan</p>
              <p className="area-details-title">
                {formatDate(detailDosen.tmtJabatan) === null
                  ? "Loading..."
                  : formatDate(detailDosen.tmtJabatan)}
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
