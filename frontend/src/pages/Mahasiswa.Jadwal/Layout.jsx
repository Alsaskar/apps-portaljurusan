import { TiUser } from "react-icons/ti";
import "./style.scss";

const Layout = () => {
  return (
    <>
      <div className="title-kelas">Kelas 6 TI 1</div>
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
            <tr className="jadwal-contents">
              <td className="jadwal-content">
                <div className="matkul">
                  <div className="jadwal-time">
                    <div className="jadwal-dot"></div>
                    <p className="jadwal-text-time">07.25 - 09.35</p>
                  </div>
                  <p className="jadwal-name-matkul">Pemograman Web</p>
                  <div className="jadwal-profile">
                    <div className="jadwal-icon-profile">
                      <TiUser size={18} />
                    </div>
                    <p className="jadwal-name-dosen">Tracy Marcela SST,.MT</p>
                  </div>
                  <div className="jadwal-lab">
                    <p className="jadwal-text-lab">Lab. Pemograman Web</p>
                    {/*<div className="jadwal-lab-icon">
                    <TiLocation size={12} />
                  </div>*/}
                  </div>
                </div>
              </td>
              <td className="jadwal-content">
                <div className="matkul">
                  <div className="jadwal-time">
                    <div className="jadwal-dot"></div>
                    <p className="jadwal-text-time">07.25 - 09.35</p>
                  </div>
                  <p className="jadwal-name-matkul">Matematika Teknik 1</p>
                  <div className="jadwal-profile">
                    <div className="jadwal-icon-profile">
                      <TiUser size={18} />
                    </div>
                    <p className="jadwal-name-dosen">Tracy Marcela SST,.MT</p>
                  </div>
                  <div className="jadwal-lab">
                    <p className="jadwal-text-lab">Lab. Pemograman Web</p>
                    {/*<div className="jadwal-lab-icon">
                    <TiLocation size={12} />
                  </div>*/}
                  </div>
                </div>
              </td>
              <td className="jadwal-content">
                <div className="matkul">
                  <div className="jadwal-time">
                    <div className="jadwal-dot"></div>
                    <p className="jadwal-text-time">07.25 - 09.35</p>
                  </div>
                  <p className="jadwal-name-matkul">Arsitektur Komputer</p>
                  <div className="jadwal-profile">
                    <div className="jadwal-icon-profile">
                      <TiUser size={18} />
                    </div>
                    <p className="jadwal-name-dosen">Tracy Marcela SST,.MT</p>
                  </div>
                  <div className="jadwal-lab">
                    <p className="jadwal-text-lab">Lab. Pemograman Web</p>
                    {/*<div className="jadwal-lab-icon">
                    <TiLocation size={12} />
                  </div>*/}
                  </div>
                </div>
              </td>
              <td className="jadwal-content">
                <div className="matkul">
                  <div className="jadwal-time">
                    <div className="jadwal-dot"></div>
                    <p className="jadwal-text-time">07.25 - 09.35</p>
                  </div>
                  <p className="jadwal-name-matkul">Bahasa Inggris Teknik 1</p>
                  <div className="jadwal-profile">
                    <div className="jadwal-icon-profile">
                      <TiUser size={18} />
                    </div>
                    <p className="jadwal-name-dosen">Tracy Marcela SST,.MT</p>
                  </div>
                  <div className="jadwal-lab">
                    <p className="jadwal-text-lab">Lab. Pemograman Web</p>
                    {/*<div className="jadwal-lab-icon">
                    <TiLocation size={12} />
                  </div>*/}
                  </div>
                </div>
              </td>
              <td className="jadwal-content">
                <div className="matkul">
                  <div className="jadwal-time">
                    <div className="jadwal-dot"></div>
                    <p className="jadwal-text-time">07.25 - 09.35</p>
                  </div>
                  <p className="jadwal-name-matkul">UI/UX</p>
                  <div className="jadwal-profile">
                    <div className="jadwal-icon-profile">
                      <TiUser size={18} />
                    </div>
                    <p className="jadwal-name-dosen">Tracy Marcela SST,.MT</p>
                  </div>
                  <div className="jadwal-lab">
                    <p className="jadwal-text-lab">Lab. Pemograman Web</p>
                    {/*<div className="jadwal-lab-icon">
                    <TiLocation size={12} />
                  </div>*/}
                  </div>
                </div>
              </td>
            </tr>

            <tr className="jadwal-contents">
              <td className="jadwal-content">
                <div className="matkul">
                  <div className="jadwal-time">
                    <div className="jadwal-dot"></div>
                    <p className="jadwal-text-time">07.25 - 09.35</p>
                  </div>
                  <p className="jadwal-name-matkul">Pemograman Web</p>
                  <div className="jadwal-profile">
                    <div className="jadwal-icon-profile">
                      <TiUser size={18} />
                    </div>
                    <p className="jadwal-name-dosen">Tracy Marcela SST,.MT</p>
                  </div>
                  <div className="jadwal-lab">
                    <p className="jadwal-text-lab">Lab. Pemograman Web</p>
                    {/*<div className="jadwal-lab-icon">
                    <TiLocation size={12} />
                  </div>*/}
                  </div>
                </div>
              </td>
              <td className="jadwal-content"></td>
              <td className="jadwal-content">
                <div className="matkul">
                  <div className="jadwal-time">
                    <div className="jadwal-dot"></div>
                    <p className="jadwal-text-time">07.25 - 09.35</p>
                  </div>
                  <p className="jadwal-name-matkul">Arsitektur Komputer</p>
                  <div className="jadwal-profile">
                    <div className="jadwal-icon-profile">
                      <TiUser size={18} />
                    </div>
                    <p className="jadwal-name-dosen">Tracy Marcela SST,.MT</p>
                  </div>
                  <div className="jadwal-lab">
                    <p className="jadwal-text-lab">Lab. Pemograman Web</p>
                    {/*<div className="jadwal-lab-icon">
                    <TiLocation size={12} />
                  </div>*/}
                  </div>
                </div>
              </td>
              <td className="jadwal-content">
                <div className="matkul">
                  <div className="jadwal-time">
                    <div className="jadwal-dot"></div>
                    <p className="jadwal-text-time">07.25 - 09.35</p>
                  </div>
                  <p className="jadwal-name-matkul">Bahasa Inggris Teknik 1</p>
                  <div className="jadwal-profile">
                    <div className="jadwal-icon-profile">
                      <TiUser size={18} />
                    </div>
                    <p className="jadwal-name-dosen">Tracy Marcela SST,.MT</p>
                  </div>
                  <div className="jadwal-lab">
                    <p className="jadwal-text-lab">Lab. Pemograman Web</p>
                    {/*<div className="jadwal-lab-icon">
                    <TiLocation size={12} />
                  </div>*/}
                  </div>
                </div>
              </td>
              <td className="jadwal-content"></td>
            </tr>

            <tr className="jadwal-contents-istirahat">
              <td colSpan="5" className="jadwal-content-istirahat">
                <div className="jadwal-istirahat">
                  <p>12:00 - 13:00</p>
                  <p>|</p>
                  <p>Istirahat</p>
                </div>
              </td>
            </tr>

            <tr className="jadwal-contents">
              <td className="jadwal-content">
                <div className="matkul">
                  <div className="jadwal-time">
                    <div className="jadwal-dot"></div>
                    <p className="jadwal-text-time">07.25 - 09.35</p>
                  </div>
                  <p className="jadwal-name-matkul">Pemograman Web</p>
                  <div className="jadwal-profile">
                    <div className="jadwal-icon-profile">
                      <TiUser size={18} />
                    </div>
                    <p className="jadwal-name-dosen">Tracy Marcela SST,.MT</p>
                  </div>
                  <div className="jadwal-lab">
                    <p className="jadwal-text-lab">Lab. Pemograman Web</p>
                    {/*<div className="jadwal-lab-icon">
                    <TiLocation size={12} />
                  </div>*/}
                  </div>
                </div>
              </td>
              <td className="jadwal-content"></td>
              <td className="jadwal-content">
                <div className="matkul">
                  <div className="jadwal-time">
                    <div className="jadwal-dot"></div>
                    <p className="jadwal-text-time">07.25 - 09.35</p>
                  </div>
                  <p className="jadwal-name-matkul">Arsitektur Komputer</p>
                  <div className="jadwal-profile">
                    <div className="jadwal-icon-profile">
                      <TiUser size={18} />
                    </div>
                    <p className="jadwal-name-dosen">Tracy Marcela SST,.MT</p>
                  </div>
                  <div className="jadwal-lab">
                    <p className="jadwal-text-lab">Lab. Pemograman Web</p>
                    {/*<div className="jadwal-lab-icon">
                    <TiLocation size={12} />
                  </div>*/}
                  </div>
                </div>
              </td>
              <td className="jadwal-content">
                <div className="matkul">
                  <div className="jadwal-time">
                    <div className="jadwal-dot"></div>
                    <p className="jadwal-text-time">07.25 - 09.35</p>
                  </div>
                  <p className="jadwal-name-matkul">Bahasa Inggris Teknik 1</p>
                  <div className="jadwal-profile">
                    <div className="jadwal-icon-profile">
                      <TiUser size={18} />
                    </div>
                    <p className="jadwal-name-dosen">Tracy Marcela SST,.MT</p>
                  </div>
                  <div className="jadwal-lab">
                    <p className="jadwal-text-lab">Lab. Pemograman Web</p>
                    {/*<div className="jadwal-lab-icon">
                    <TiLocation size={12} />
                  </div>*/}
                  </div>
                </div>
              </td>
              <td className="jadwal-content"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Layout;
