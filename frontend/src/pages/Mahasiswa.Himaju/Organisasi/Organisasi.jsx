import "./style.scss";
import {
  FaStar,
  FaHandHoldingUsd,
  FaFileAlt,
  FaUserShield,
} from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi";

import {
  MdBusinessCenter,
  MdOutlineAssignment,
  MdOutlineGroupWork,
} from "react-icons/md";
import { FaBookReader, FaPalette, FaCode } from "react-icons/fa";

const Organisasi = () => {
  return (
    <section className="organisasi">
      <div className="container">
        <div className="content">
          <p className="title">Struktur Organisasi</p>
          <div className="tree">
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
          </div>

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
    </section>
  );
};

export default Organisasi;
