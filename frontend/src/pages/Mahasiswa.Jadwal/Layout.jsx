import { TiUser } from "react-icons/ti";
import "./style.scss";
import { MahasiswaContext } from "../../context/MahasiswaContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { urlApi } from "../../config";

const Layout = () => {
  const { result } = useContext(MahasiswaContext) || {};
  const [jadwalSenin, setJadwalSenin] = useState([]);
  const [jadwalSelasa, setJadwalSelasa] = useState([]);
  const [jadwalRabu, setJadwalRabu] = useState([]);
  const [jadwalKamis, setJadwalKamis] = useState([]);
  const [jadwalJumat, setJadwalJumat] = useState([]);

  const _listData = async () => {
    try {
      const getKelas = await axios.get(`${urlApi}/kelas/${result?.kelas}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      const idKelas = getKelas.data.result[0]?.id;

      const jadwalSenin = await axios.get(
        `${urlApi}/jadwal/Senin?kelas=${idKelas}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const jadwalSelasa = await axios.get(
        `${urlApi}/jadwal/Selasa?kelas=${idKelas}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const jadwalRabu = await axios.get(
        `${urlApi}/jadwal/Rabu?kelas=${idKelas}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      const jadwalKamis = await axios.get(
        `${urlApi}/jadwal/Kamis?kelas=${idKelas}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      const jadwalJumat = await axios.get(
        `${urlApi}/jadwal/Jumat?kelas=${idKelas}`,
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
        <div className="matkul" key={key}>
          <div className="jadwal-time">
            <div className="jadwal-dot"></div>
            <p className="jadwal-text-time">{val.jamMulai.slice(0, 5)} - {val.jamSelesai.slice(0, 5)}</p>
          </div>
          <p className="jadwal-name-matkul">{val.matkul.matkul}</p>
          <div className="jadwal-profile">
            <div className="jadwal-icon-profile">
              <TiUser size={18} />
            </div>
            <p className="jadwal-name-dosen">{val.matkul.dosenPengajar}</p>
          </div>
          <div className="jadwal-lab">
            <p className="jadwal-text-lab">{val.ruangan}</p>
          </div>
        </div>
      ))
    ) : (
      <p className="no-jadwal">Tidak ada jadwal</p>
    );
  };

  return (
    <>
      <div className="title-kelas">Kelas {result?.kelas}</div>
      <div className="jadwal-container">
        <table className="jadwal-table">
          <thead className="jadwal-head">
            <tr className="jadwal-days">
              <th className="jadwal-day">Senin</th>
              <th className="jadwal-day">Selasa</th>
              <th className="jadwal-day">Rabu</th>
              <th className="jadwal-day">Kamis</th>
              <th className="jadwal-day">Jumat</th>
            </tr>
          </thead>
          <tbody className="jadwal-body">
            {/* Render jadwal sebelum istirahat */}
            <tr className="jadwal-contents">
              <td className="jadwal-content">{renderJadwal(seninJadwal.beforeBreak)}</td>
              <td className="jadwal-content">{renderJadwal(selasaJadwal.beforeBreak)}</td>
              <td className="jadwal-content">{renderJadwal(rabuJadwal.beforeBreak)}</td>
              <td className="jadwal-content">{renderJadwal(kamisJadwal.beforeBreak)}</td>
              <td className="jadwal-content">{renderJadwal(jumatJadwal.beforeBreak)}</td>
            </tr>

            {/* Render waktu istirahat */}
            <tr className="jadwal-contents-istirahat">
              <td colSpan="5" className="jadwal-content-istirahat">
                <div className="jadwal-istirahat">
                  <p>12:00 - 13:00</p>
                  <p>|</p>
                  <p>Istirahat</p>
                </div>
              </td>
            </tr>

            {/* Render jadwal setelah istirahat */}
            <tr className="jadwal-contents">
              <td className="jadwal-content">{renderJadwal(seninJadwal.afterBreak)}</td>
              <td className="jadwal-content">{renderJadwal(selasaJadwal.afterBreak)}</td>
              <td className="jadwal-content">{renderJadwal(rabuJadwal.afterBreak)}</td>
              <td className="jadwal-content">{renderJadwal(kamisJadwal.afterBreak)}</td>
              <td className="jadwal-content">{renderJadwal(jumatJadwal.afterBreak)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Layout;
