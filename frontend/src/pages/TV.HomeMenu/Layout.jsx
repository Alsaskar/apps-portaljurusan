import CardMenu from "../../components/CardMenu/CardMenu";
import "./style.scss";
import { Link } from "react-router-dom";
import { RiHomeOfficeFill } from "react-icons/ri";
import poli1 from "../../assets/images/poli_1.jpg";
import poli2 from "../../assets/images/poli_2.jpg";
import poli3 from "../../assets/images/poli_3.jpeg";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
const Layout = () => {
  const navigate = useNavigate();

  const _logout = () => {
    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah Anda Yakin Ingin Keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("isLoggedIn");

        navigate("/tv/login");
      }
    });
  };

  const cardData = [
    {
      title: "Profile",
      link:
        sessionStorage.getItem("role") === "mahasiswa"
          ? "/tv/profile/mahasiswa"
          : "/tv/profile/dosen",
      backgroundImage: poli1,
    },
    { title: "Akademik", link: "/tv/akademik", backgroundImage: poli3 },
    { title: "HME", link: "/tv/hme", backgroundImage: poli2 },
  ];

  return (
    <>
      <div className="tv-home-menu">
        <div className="card-section">
          {cardData.map((card, index) => (
            <CardMenu
              key={index}
              title={card.title}
              link={card.link}
              backgroundImage={card.backgroundImage}
            />
          ))}
        </div>

        <div className="logback-section">
          <Link to="/tv/home/menu" className="back-to-homee">
            <RiHomeOfficeFill size={20} />
          </Link>

          <div className="tv-logout" onClick={() => _logout()}>
            <div className="btn-logout-tv">
              <IoLogOut size={20} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
