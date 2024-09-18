import "./rpsSatu.scss";
import PropTypes from "prop-types";

const RPSSatu = ({ data }) => {
  const cplArray = data.cpl ? data.cpl.split(",") : [];
  const capaianPembelajaranArray = data.capaianPembelajaran ? data.capaianPembelajaran.split(",") : [];
  const cpmkArray = data.cpmk ? data.cpmk.split(",") : [];
  const subCpmkArray = data.subCpmk ? data.subCpmk.split(",") : [];

  const maxRows = Math.max(cplArray.length, capaianPembelajaranArray.length);
  return (
    <div className="rps-satu">
      <div className="title">
        <h1 className="title-rps">RENCANA PEMBELAJARAN SEMESTER</h1>
      </div>
      <div className="table-flex">
        <table className="table-rps">
          <thead>
            <tr>
              <th className="t-head-rps-satu">NAMA MATA KULIAH</th>
              <th className="t-head-rps-satu">KODE</th>
              <th className="t-head-rps-satu">RUMPUN M.K</th>
              <th className="t-head-rps-satu">BOBOT</th>
              <th className="t-head-rps-satu">SEMESTER</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="t-body-rps-satu width-mk">{data.otorisasi}</td>
              <td className="t-body-rps-satu width-kode">{data.kodeMatkul}</td>
              <td className="t-body-rps-satu width-rumpun">
                {data.rumpunMatkul}
              </td>
              <td className="t-body-rps-satu width-bobot">
                <div className="bobot-content">
                  <p>T</p>
                  <p>{data.bobot}</p>
                  <p>P</p>
                  <p></p>
                </div>
              </td>
              <td className="t-body-rps-satu width-sem">{data.semester}</td>
            </tr>
          </tbody>

          <thead>
            <tr>
              <th className="t-head-rps-satu">OTORISASI</th>
              <th className="t-head-rps-satu">PEMBUAT RP</th>
              <th className="t-head-rps-satu">PENGAMPU M.K</th>
              <th className="t-head-rps-satu">KOORDINATOR MK</th>
              <th className="t-head-rps-satu">KOR. PRODI</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="t-body-rps-satu width-mk">{data.otorisasi}</td>
              <td className="t-body-rps-satu width-kode">{data.pembuatRp}</td>
              <td className="t-body-rps-satu width-rumpun">{data.dosenPengampu}</td>
              <td className="t-body-rps-satu width-bobot">{data.kordinatorMatkul}</td>
              <td className="t-body-rps-satu width-sem">{data.kordinatorProdi}</td>
            </tr>
          </tbody>
        </table>

        {/*tanggal penyusunan*/}
        <table className="table-rps-tgl">
          <thead>
            <tr>
              <th className="t-head-rps-satu">TANGGAL PENYUSUNAN</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="t-body-rps-satu width-tgl">{data.tanggalPenyusunan}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/*tabel cpl*/}
      <table className="table-rps-capaian">
        <thead>
          <tr>
            <th className="t-head-rps-satu">CAPAIAN PEMBELAJARAN</th>
            <th className="t-head-rps-satu">
              C.P.L PRODI YANG DIBERIKAN PADA M.K
            </th>
          </tr>
        </thead>
        <tbody>
        {Array.from({ length: maxRows }).map((_, index) => (
            <tr key={index}>
              <td className="t-body-rps-satu">
                {/* Menampilkan capaian pembelajaran sesuai dengan indeks */}
                {capaianPembelajaranArray[index] ? capaianPembelajaranArray[index].trim() : ""}
              </td>
              <td className="t-body-rps-satu">
                <div className="cpl">
                  <div className="cpl-num">
                    {/* Menampilkan CPL, hanya ada satu jika lebih sedikit dari capaian */}
                    {index < cplArray.length ? `CPL-${index + 1}` : ""}
                  </div>
                  <div className="cpl-text">
                    {index < cplArray.length ? cplArray[index].trim() : ""}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*tabel cpl, kemampuan*/}
      <table className="table-rps-cpl-kem">
        <thead>
          <tr>
            <th className="t-head-rps-satu">
              CAPAIAN PEMBELAJARAN MATA KULIAH
            </th>
            <th className="t-head-rps-satu">
              KEMAMPUAN AKHIR TIAP TAHAPAN PEMBELAJARAN (SUB CPMK)
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.max(cpmkArray.length, subCpmkArray.length) }).map((_, index) => (
            <tr key={index}>
              <td className="t-body-rps-satu">
                <div className="cpl">
                  <div className="cpl-num">
                    {/* Menampilkan CPMK, hanya ada satu jika lebih sedikit dari sub CPMK */}
                    {index < cpmkArray.length ? `CPMK-${index + 1}` : ""}
                  </div>
                  <div className="cpl-text">
                    {index < cpmkArray.length ? cpmkArray[index].trim() : ""}
                  </div>
                </div>
              </td>
              <td className="t-body-rps-satu">
                <div className="cpl">
                  <div className="cpl-num">
                    {/* Menampilkan KODE, hanya ada satu jika lebih sedikit dari CPMK */}
                    {index < subCpmkArray.length ? `KODE` : ""}
                  </div>
                  <div className="cpl-text">
                    {index < subCpmkArray.length ? subCpmkArray[index].trim() : ""}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

RPSSatu.propTypes = {
  data: PropTypes.object.isRequired,
};

export default RPSSatu;
