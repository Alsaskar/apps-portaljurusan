import { useState } from "react";
import "./style.scss";
import Image from "../../assets/images/profile_no_image.png";
import { Link } from "react-router-dom";
import { RiHomeOfficeFill } from "react-icons/ri";

const Layout = () => {
  const [activeProfile, setActiveProfile] = useState("myProfile");

  return (
    <div>
      <div className="profile-container">
        <div className="profile-content">
          <div className="profile-content-mahasiswa">
            <div className="img-section">
              <img src={Image} alt="" className="profile-image" />
            </div>

            <div className="profile-buttons">
              <button
                className={activeProfile === "myProfile" ? "active" : ""}
                onClick={() => setActiveProfile("myProfile")}
              >
                My Profile
              </button>
              <button
                className={activeProfile === "profileWali" ? "active" : ""}
                onClick={() => setActiveProfile("profileWali")}
              >
                Profile Wali
              </button>
            </div>

            {activeProfile === "myProfile" && (
              <div className="text-section">
                <div className="name-section">
                  <div className="title">Name</div>
                  <div className="name">Oswald Tanlee Pongayow</div>
                </div>

                <div className="name-section">
                  <div className="title">Email</div>
                  <div className="name">oswaldtanladasdsa44@gmail.com</div>
                </div>

                <div className="name-section">
                  <div className="title">NIM</div>
                  <div className="name">20024038</div>
                </div>

                <div className="name-section">
                  <div className="title">No Hp.</div>
                  <div className="name">+62 82154926917</div>
                </div>

                <div className="name-section">
                  <div className="title">Prodi</div>
                  <div className="name">D4 Teknik Informatika</div>
                </div>

                <div className="name-section">
                  <div className="title">Status</div>
                  <div className="name">Aktif</div>
                </div>
              </div>
            )}
            {activeProfile === "profileWali" && (
              <div className="profile-content-wali">
                <div className="text-section">
                  <div className="name-section">
                    <div className="title">Name Wali</div>
                    <div className="name">Oswald Tanlee Pongayow</div>
                  </div>

                  <div className="name-section">
                    <div className="title">Email Wali</div>
                    <div className="name">oswaldtanlee44@gmail.com</div>
                  </div>

                  <div className="name-section">
                    <div className="title">Alamat Wali</div>
                    <div className="name">Matungkas</div>
                  </div>

                  <div className="name-section">
                    <div className="title">No Hp. Wali</div>
                    <div className="name">+62 82154926917</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Link to="/tv/home/menu" className="back-to-home">
        <RiHomeOfficeFill size={20} />
      </Link>
    </div>
  );
};

export default Layout;
