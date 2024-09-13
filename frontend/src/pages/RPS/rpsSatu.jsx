import "./rpsSatu.scss";

const RPSSatu = () => {
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
              <td className="t-body-rps-satu width-mk"></td>
              <td className="t-body-rps-satu width-kode"></td>
              <td className="t-body-rps-satu width-rumpun"></td>
              <td className="t-body-rps-satu width-bobot">
                <div className="bobot-content">
                  <p>T</p>
                  <p></p>
                  <p>P</p>
                  <p></p>
                </div>
              </td>
              <td className="t-body-rps-satu width-sem"></td>
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
              <td className="t-body-rps-satu width-mk"></td>
              <td className="t-body-rps-satu width-kode"></td>
              <td className="t-body-rps-satu width-rumpun"></td>
              <td className="t-body-rps-satu width-bobot"></td>
              <td className="t-body-rps-satu width-sem"></td>
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
              <td className="t-body-rps-satu width-tgl"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/*tabel cpl*/}
      <table className="table-rps-capaian">
        <thead>
          <tr>
            <th className="t-head-rps-satu">CAPAIAN PEMBELAJARAN</th>
            <th className="t-head-rps-satu">C.P.L PRODI YANG DIBERIKAN PADA M.K</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="t-body-rps-satu"></td>
            <td className="t-body-rps-satu">
              <div className="cpl">
                <div className="cpl-num">CPL-1</div>
                <div className="cpl-text"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="t-body-rps-satu"></td>
            <td className="t-body-rps-satu">
              <div className="cpl">
                <div className="cpl-num">CPL-2</div>
                <div className="cpl-text"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="t-body-rps-satu"></td>
            <td className="t-body-rps-satu">
              <div className="cpl">
                <div className="cpl-num">CPL-3</div>
                <div className="cpl-text"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="t-body-rps-satu"></td>
            <td className="t-body-rps-satu">
              <div className="cpl">
                <div className="cpl-num">CPL-4</div>
                <div className="cpl-text"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/*tabel cpl, kemampuan*/}
      <table className="table-rps-cpl-kem">
        <thead>
          <tr>
            <th className="t-head-rps-satu">CAPAIAN PEMBELAJARAN MATA KULIAH</th>
            <th className="t-head-rps-satu">KEMAMPUAN AKHIR TIAP TAHAPAN PEMBELAJARAN (SUB CPMK)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="t-body-rps-satu">
              <div className="cpl">
                <div className="cpl-num">CPMK-1</div>
                <div className="cpl-text"></div>
              </div>
            </td>
            <td className="t-body-rps-satu">
              <div className="cpl">
                <div className="cpl-num">KODE</div>
                <div className="cpl-text"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="t-body-rps-satu">
              <div className="cpl">
                <div className="cpl-num">CPMK-2</div>
                <div className="cpl-text"></div>
              </div>
            </td>
            <td className="t-body-rps-satu">
              <div className="cpl">
                <div className="cpl-num">KODE</div>
                <div className="cpl-text"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="t-body-rps-satu">
              <div className="cpl">
                <div className="cpl-num">CPMK-3</div>
                <div className="cpl-text"></div>
              </div>
            </td>
            <td className="t-body-rps-satu">
              <div className="cpl">
                <div className="cpl-num">KODE</div>
                <div className="cpl-text"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="t-body-rps-satu">
              <div className="cpl">
                <div className="cpl-num">CPMK-4</div>
                <div className="cpl-text"></div>
              </div>
            </td>
            <td className="t-body-rps-satu">
              <div className="cpl">
                <div className="cpl-num">KODE</div>
                <div className="cpl-text"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RPSSatu;
