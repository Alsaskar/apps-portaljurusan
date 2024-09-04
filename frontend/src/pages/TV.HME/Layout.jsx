import "./style.scss";
import {
  FaStar,
  FaHandHoldingUsd,
  FaFileAlt,
  FaUserShield,
  FaCode,
  FaBookReader,
  FaPalette,
} from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi";
import {
  MdBusinessCenter,
  MdOutlineAssignment,
  MdOutlineGroupWork,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { RiHomeOfficeFill } from "react-icons/ri";

const Layout = () => {

  
  return (
    <section className="struktur">
      <div className="container">
        <div className="content">
          <div className="slides">
            <div className="slide">
              <p className="title">Struktur Organisasi</p>
              <div className="tree">
                {/* Struktur Organisasi content here */}
                <ul>
                  <li>
                    <div className="body-section">
                      <div className="icon-profile-user-departemen">
                        <FaStar size={20} />
                      </div>
                      <p className="title-departemen">Ketua</p>
                    </div>
                    <ul>
                      <li>
                        <div className="body-section">
                          <div className="icon-profile-user-departemen">
                            <FaHandHoldingUsd size={20} />
                          </div>
                          <p className="title-departemen">Wakil Ketua Umum</p>
                        </div>
                      </li>
                      <li>
                        <div className="body-section">
                          <div className="icon-profile-user-departemen">
                            <FaFileAlt size={20} />
                          </div>
                          <p className="title-departemen">Sekretaris Umum</p>
                        </div>
                      </li>
                      <li>
                        <div className="body-section">
                          <div className="icon-profile-user-departemen">
                            <FaUserShield size={20} />
                          </div>
                          <p className="title-departemen">Bendahara Umum</p>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
                <div className="tree_dua">
                  <ul>
                    <li>
                      <ul>
                        <li>
                          <div className="body-section">
                            <div className="icon-profile-user-departemen">
                              <PiUsersThreeFill size={20} />
                            </div>
                            <p className="title-departemen">HUMAS</p>
                          </div>
                        </li>
                        <li>
                          <div className="body-section">
                            <div className="icon-profile-user-departemen">
                              <FaCode size={20} />
                            </div>
                            <p className="title-departemen">Kederisasi</p>
                          </div>
                        </li>
                        <li>
                          <div className="body-section">
                            <div className="icon-profile-user-departemen">
                              <MdOutlineAssignment size={20} />
                            </div>
                            <p className="title-departemen">Kesekretariatan</p>
                          </div>
                        </li>
                        <li>
                          <div className="body-section">
                            <div className="icon-profile-user-departemen">
                              <FaBookReader size={20} />
                            </div>
                            <p className="title-departemen">Kerohanian</p>
                          </div>
                        </li>
                        <li>
                          <div className="body-section">
                            <div className="icon-profile-user-departemen">
                              <FaPalette size={20} />
                            </div>
                            <p className="title-departemen">Minat Bakat</p>
                          </div>
                        </li>
                        <li>
                          <div className="body-section">
                            <div className="icon-profile-user-departemen">
                              <MdBusinessCenter size={20} />
                            </div>
                            <p className="title-departemen">Kewirausahaan</p>
                          </div>
                        </li>
                        <li>
                          <div className="body-section">
                            <div className="icon-profile-user-departemen">
                              <MdOutlineGroupWork size={20} />
                            </div>
                            <p className="title-departemen">Delegasi</p>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="slide">
              <p className="title">Visi Misi</p>
              <div className="visi-misi">
                <h2>Visi</h2>
                <p>Menjadi organisasi yang unggul dalam mengembangkan potensi mahasiswa dan berkontribusi positif terhadap masyarakat.</p>
                <h2>Misi</h2>
                <ul>
                  <li>Mengembangkan potensi akademis dan non-akademis anggota.</li>
                  <li>Meningkatkan kerjasama dengan berbagai pihak untuk mencapai tujuan bersama.</li>
                  <li>Memperkuat peran organisasi dalam memajukan masyarakat.</li>
                </ul>
              </div>
            </div>

            <div className="slide">
              <p className="title">Program Kerja</p>
              <div className="proker">
                <h2>Visi</h2>
                <p>Menjadi organisasi yang unggul dalam mengembangkan potensi mahasiswa dan berkontribusi positif terhadap masyarakat.</p>
                <h2>Misi</h2>
                <ul>
                  <li>Mengembangkan potensi akademis dan non-akademis anggota.</li>
                  <li>Meningkatkan kerjasama dengan berbagai pihak untuk mencapai tujuan bersama.</li>
                  <li>Memperkuat peran organisasi dalam memajukan masyarakat.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link to="/tv/home/menu" className="back-to-home">
          <RiHomeOfficeFill size={20} />
        </Link>
    </section>
  );
};

export default Layout;
