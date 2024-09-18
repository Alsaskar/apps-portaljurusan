import "./rpsTiga.scss";

const RPSTiga = () => {
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
                <th className="t-head-rps-tiga kriteria">Kriteria & Bentuk 
                <span className="no">(7)</span>
                </th>
                <th className="t-head-rps-tiga indikator">Indikator 
                <span className="no">(8)</span>
                </th>
                <th className="t-head-rps-tiga bobot">Bobot %
                <span className="no">(9)</span>
                </th>
              </tr>
            </tr>
          </thead>
          <tbody>
            {/*Minggu 1*/}
            <tr>
              <td className="t-body-rps-tiga width-minggu">I</td>
              <td className="t-body-rps-tiga width-sub"></td>
              <td className="t-body-rps-tiga width-bahan"></td>
              <td className="t-body-rps-tiga width-bentuk"></td>
              <td className="t-body-rps-tiga width-estimasi"></td>
              <td className="t-body-rps-tiga width-pengalaman"></td>
              <tr>
                <td className="t-body-rps-tiga width-kriteria"></td>
                <td className="t-body-rps-tiga width-indikator"></td>
                <td className="t-body-rps-tiga width-bobot"></td>
              </tr>
            </tr>
            {/*Minggu 2*/}
            <tr>
              <td className="t-body-rps-tiga width-minggu">II</td>
              <td className="t-body-rps-tiga width-sub"></td>
              <td className="t-body-rps-tiga width-bahan"></td>
              <td className="t-body-rps-tiga width-bentuk"></td>
              <td className="t-body-rps-tiga width-estimasi"></td>
              <td className="t-body-rps-tiga width-pengalaman"></td>
              <tr>
                <td className="t-body-rps-tiga width-kriteria"></td>
                <td className="t-body-rps-tiga width-indikator"></td>
                <td className="t-body-rps-tiga width-bobot"></td>
              </tr>
            </tr>
            {/*Minggu 3*/}
            <tr>
              <td className="t-body-rps-tiga width-minggu">III</td>
              <td className="t-body-rps-tiga width-sub"></td>
              <td className="t-body-rps-tiga width-bahan"></td>
              <td className="t-body-rps-tiga width-bentuk"></td>
              <td className="t-body-rps-tiga width-estimasi"></td>
              <td className="t-body-rps-tiga width-pengalaman"></td>
              <tr>
                <td className="t-body-rps-tiga width-kriteria"></td>
                <td className="t-body-rps-tiga width-indikator"></td>
                <td className="t-body-rps-tiga width-bobot"></td>
              </tr>
            </tr>
            {/*Minggu 4*/}
            <tr>
              <td className="t-body-rps-tiga width-minggu">IV</td>
              <td className="t-body-rps-tiga width-sub"></td>
              <td className="t-body-rps-tiga width-bahan"></td>
              <td className="t-body-rps-tiga width-bentuk"></td>
              <td className="t-body-rps-tiga width-estimasi"></td>
              <td className="t-body-rps-tiga width-pengalaman"></td>
              <tr>
                <td className="t-body-rps-tiga width-kriteria"></td>
                <td className="t-body-rps-tiga width-indikator"></td>
                <td className="t-body-rps-tiga width-bobot"></td>
              </tr>
            </tr>
            {/*Minggu 5*/}
            <tr>
              <td className="t-body-rps-tiga width-minggu">V</td>
              <td className="t-body-rps-tiga width-sub"></td>
              <td className="t-body-rps-tiga width-bahan"></td>
              <td className="t-body-rps-tiga width-bentuk"></td>
              <td className="t-body-rps-tiga width-estimasi"></td>
              <td className="t-body-rps-tiga width-pengalaman"></td>
              <tr>
                <td className="t-body-rps-tiga width-kriteria"></td>
                <td className="t-body-rps-tiga width-indikator"></td>
                <td className="t-body-rps-tiga width-bobot"></td>
              </tr>
            </tr>
            {/*Minggu 6*/}
            <tr>
              <td className="t-body-rps-tiga width-minggu">VI</td>
              <td className="t-body-rps-tiga width-sub"></td>
              <td className="t-body-rps-tiga width-bahan"></td>
              <td className="t-body-rps-tiga width-bentuk"></td>
              <td className="t-body-rps-tiga width-estimasi"></td>
              <td className="t-body-rps-tiga width-pengalaman"></td>
              <tr>
                <td className="t-body-rps-tiga width-kriteria"></td>
                <td className="t-body-rps-tiga width-indikator"></td>
                <td className="t-body-rps-tiga width-bobot"></td>
              </tr>
            </tr>
            {/*Minggu 7*/}
            <tr>
              <td className="t-body-rps-tiga width-minggu">VII</td>
              <td className="t-body-rps-tiga width-sub"></td>
              <td className="t-body-rps-tiga width-bahan"></td>
              <td className="t-body-rps-tiga width-bentuk"></td>
              <td className="t-body-rps-tiga width-estimasi"></td>
              <td className="t-body-rps-tiga width-pengalaman"></td>
              <tr>
                <td className="t-body-rps-tiga width-kriteria"></td>
                <td className="t-body-rps-tiga width-indikator"></td>
                <td className="t-body-rps-tiga width-bobot"></td>
              </tr>
            </tr>
            <tr>
              <th colSpan={9} className="t-body-rps-tiga ujian">Ujian Tengah Semester</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RPSTiga;
