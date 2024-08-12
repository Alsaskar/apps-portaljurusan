import HimajuNavbar from "../../../components/HimajuNavbar/HimajuNavbar";
import { useEffect, useState } from "react";
import Hero from "../Hero/Hero";
import Footer from "../Footer/Footer";
import "./style.scss";
import axios from "axios";
import { urlApi } from "../../../config";
import useFormatDate from "../../../hooks/useFormatDateHooks";

const ProgramKerja = () => {
  const [proker, setProker] = useState([]);
  const { formatDate } = useFormatDate();

  const currentYear = new Date().getFullYear();

  const _listProker = async () => {
    try {
      const res = await axios.get(`${urlApi}/himaju/list-proker`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      setProker(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _listProker();
  }, []);

  return (
    <main className="himaju-page-wrapper">
      <HimajuNavbar />
      <div className="container-himaju">
        <Hero title="Program Kerja HME" />
        <div className="content-himaju">
          <div className="bg-content">
            <div className="body-content">
              <div className="program-kerja">
                <div className="container">
                  <p className="title-program-kerja">
                    Program Kerja HME {currentYear}
                  </p>
                  <section className="content-area-table-program-kerja">
                    <div className="data-table-diagram-program-kerja">
                      <table>
                        <thead>
                          <tr>
                            <th>Nama Kegiatan</th>
                            <th>Deskripsi Kegiatan</th>
                            <th>Tanggal</th>
                            <th>Jam Mulai</th>
                            <th>Jam Selesai</th>
                            <th className="start-tempat">Tempat</th>
                          </tr>
                        </thead>
                        <tbody>
                          {proker.length > 0 ? (
                            proker.map((val, key) => {
                              return (
                                <tr key={key}>
                                  <td>{val.namaKegiatan}</td>
                                  <td>{val.description}</td>
                                  <td>{formatDate(val.tglPelaksanaan)}</td>
                                  <td>{val.jamMulai}</td>
                                  <td>{val.jamSelesai}</td>
                                  <td>{val.lokasi}</td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={18} align="center">
                                Belum ada data
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProgramKerja;
