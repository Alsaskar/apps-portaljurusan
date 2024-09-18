import { TiUser } from "react-icons/ti";
import "./JadwalTV.scss";
import { DosenContext } from "../../context/DosenContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { urlApi } from "../../config";

const TVJadwalDosen = () => {
  const { result } = useContext(DosenContext) || {};
  const [jadwalSenin, setJadwalSenin] = useState([]);
  const [jadwalSelasa, setJadwalSelasa] = useState([]);
  const [jadwalRabu, setJadwalRabu] = useState([]);
  const [jadwalKamis, setJadwalKamis] = useState([]);
  const [jadwalJumat, setJadwalJumat] = useState([]);

  const _listData = async () => {
    try {
      const jadwalSenin = await axios.get(
        `${urlApi}/jadwal/list-dosen?hari=Senin&dosenPengajar=${result?.fullname}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const jadwalSelasa = await axios.get(
        `${urlApi}/jadwal/list-dosen?hari=Selasa&dosenPengajar=${result?.fullname}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const jadwalRabu = await axios.get(
        `${urlApi}/jadwal/list-dosen?hari=Rabu&dosenPengajar=${result?.fullname}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      const jadwalKamis = await axios.get(
        `${urlApi}/jadwal/list-dosen?hari=Kamis&dosenPengajar=${result?.fullname}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      const jadwalJumat = await axios.get(
        `${urlApi}/jadwal/list-dosen?hari=Jumat&dosenPengajar=${result?.fullname}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      setJadwalSenin(jadwalSenin.data.result);
      setJadwalSelasa(jadwalSelasa.data.result);
      setJadwalRabu(jadwalRabu.data.result);
      setJadwalKamis(jadwalKamis.data.result);
      setJadwalJumat(jadwalJumat.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _listData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  // Fungsi untuk memisahkan jadwal sebelum dan setelah istirahat
  const pisahJadwal = (jadwal) => {
    const beforeBreak = jadwal.filter((val) => val.jamMulai < "12:00");
    const afterBreak = jadwal.filter((val) => val.jamMulai >= "13:00");
    return { beforeBreak, afterBreak };
  };

  const seninJadwal = pisahJadwal(jadwalSenin);
  const selasaJadwal = pisahJadwal(jadwalSelasa);
  const rabuJadwal = pisahJadwal(jadwalRabu);
  const kamisJadwal = pisahJadwal(jadwalKamis);
  const jumatJadwal = pisahJadwal(jadwalJumat);

  const renderJadwal = (jadwal) => {
    return jadwal.length > 0 ? (
      jadwal.map((val, key) => (
        <div className="matkul-tv" key={key}>
          <div className="jadwal-time-tv">
            <div className="jadwal-dot-tv"></div>
            <p className="jadwal-text-time-tv">
              {val.jamMulai.slice(0, 5)} - {val.jamSelesai.slice(0, 5)}
            </p>
          </div>
          <p className="jadwal-name-matkul-tv">{val.matkul.matkul}</p>
          <div className="jadwal-profile-tv">
            <div className="jadwal-icon-profile-tv">
              <TiUser size={17} />
            </div>
            <p className="jadwal-name-dosen-tv">{val.matkul.dosenPengajar}</p>
          </div>
          <div className="jadwal-lab-tv">
            <p className="jadwal-text-lab-tv">{val.ruangan}</p>
          </div>
        </div>
      ))
    ) : (
      <p className="no-jadwal-tv">Tidak ada jadwal</p>
    );
  };

  return (
    <>
      <div className="kelas-tv">Jadwal Mengajar Anda</div>
      <div className="jadwal-container-tv">
        <table className="jadwal-table-tv">
          <thead className="jadwal-head-tv">
            <tr className="jadwal-days-tv">
              <th className="jadwal-day-tv">Senin</th>
              <th className="jadwal-day-tv">Selasa</th>
              <th className="jadwal-day-tv">Rabu</th>
              <th className="jadwal-day-tv">Kamis</th>
              <th className="jadwal-day-tv">Jumat</th>
            </tr>
          </thead>
          <tbody className="jadwal-body-tv">
            {/* Render jadwal sebelum istirahat */}
            <tr className="jadwal-contents-tv">
              <td className="jadwal-content-tv">
                {renderJadwal(seninJadwal.beforeBreak)}
              </td>
              <td className="jadwal-content-tv">
                {renderJadwal(selasaJadwal.beforeBreak)}
              </td>
              <td className="jadwal-content-tv">
                {renderJadwal(rabuJadwal.beforeBreak)}
              </td>
              <td className="jadwal-content-tv">
                {renderJadwal(kamisJadwal.beforeBreak)}
              </td>
              <td className="jadwal-content-tv">
                {renderJadwal(jumatJadwal.beforeBreak)}
              </td>
            </tr>

            {/* Render waktu istirahat */}
            <tr className="jadwal-contents-istirahat-tv">
              <td colSpan="5" className="jadwal-content-istirahat-tv">
                <div className="jadwal-istirahat-tv">
                  <p>12:00 - 13:00</p>
                  <p>|</p>
                  <p>Istirahat</p>
                </div>
              </td>
            </tr>

            {/* Render jadwal setelah istirahat */}
            <tr className="jadwal-contents-tv">
              <td className="jadwal-content-tv">
                {renderJadwal(seninJadwal.afterBreak)}
              </td>
              <td className="jadwal-content-tv">
                {renderJadwal(selasaJadwal.afterBreak)}
              </td>
              <td className="jadwal-content-tv">
                {renderJadwal(rabuJadwal.afterBreak)}
              </td>
              <td className="jadwal-content-tv">
                {renderJadwal(kamisJadwal.afterBreak)}
              </td>
              <td className="jadwal-content-tv">
                {renderJadwal(jumatJadwal.afterBreak)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TVJadwalDosen;
