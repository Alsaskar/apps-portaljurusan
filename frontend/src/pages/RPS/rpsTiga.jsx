import "./rpsTiga.scss";
import PropTypes from "prop-types";

const RPSTiga = ({ data }) => {
  return (
    <div className="rps-tiga">
      <div className="table-flex">
        <table className="table-rps">
          <thead>
            <tr>
              <th className="t-head-rps-tiga">
                Minggu Ke-
                <span className="no">(1)</span>
              </th>
              <th className="t-head-rps-tiga">
                Sub-CPMK (Kemampuan akhir yg direncanakan)
                <span className="no">(2)</span>
              </th>
              <th className="t-head-rps-tiga">
                Bahan Kajian (Materi Pembelajaran)
                <span className="no">(3)</span>
              </th>
              <th className="t-head-rps-tiga">
                Bentuk dan Metode Pembelajaran{" "}
                <span className="bentuk">[Media & Sumber Belajar]</span>
                <span className="no">(4)</span>
              </th>
              <th className="t-head-rps-tiga">
                Estimasi Waktu <span className="no">(5)</span>
              </th>
              <th className="t-head-rps-tiga">
                Pengalaman Belajar Mahasiswa
                <span className="no">(6)</span>
              </th>
              <tr>
                <th colSpan="3" className="t-head-rps-tiga-penilaian">
                  Penilaian
                </th>
              </tr>
              <tr>
                <th className="t-head-rps-tiga kriteria">
                  Kriteria & Bentuk
                  <span className="no">(7)</span>
                </th>
                <th className="t-head-rps-tiga indikator">
                  Indikator
                  <span className="no">(8)</span>
                </th>
                <th className="t-head-rps-tiga bobot">
                  Bobot %<span className="no">(9)</span>
                </th>
              </tr>
            </tr>
          </thead>
          <tbody>
            {/*Minggu 1*/}
            {data.map((val, key) => {
              return (
                <tr key={key}>
                  <td className="t-body-rps-tiga width-minggu">{val.mingguKe}</td>
                  <td className="t-body-rps-tiga width-sub">{val.subCpmk}</td>
                  <td className="t-body-rps-tiga width-bahan">{val.bahanKajian}</td>
                  <td className="t-body-rps-tiga width-bentuk">{val.bentukMetode}</td>
                  <td className="t-body-rps-tiga width-estimasi">{val.estimasiWaktu}</td>
                  <td className="t-body-rps-tiga width-pengalaman">{val.pengalamanBelajar}</td>
                  <tr>
                    <td className="t-body-rps-tiga width-kriteria">{val.kriteriaBentuk}</td>
                    <td className="t-body-rps-tiga width-indikator">{val.indikator}</td>
                    <td className="t-body-rps-tiga width-bobot">{val.bobot}</td>
                  </tr>
                </tr>
              );
            })}
            <tr>
              <td className="t-body-rps-tiga" style={{ textAlign: "center" }}>
                VIII
              </td>
              <td colSpan={8} className="t-body-rps-tiga ujian">
                Ujian Tengah Semester
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

RPSTiga.propTypes = {
  data: PropTypes.array.isRequired,
};

export default RPSTiga;
