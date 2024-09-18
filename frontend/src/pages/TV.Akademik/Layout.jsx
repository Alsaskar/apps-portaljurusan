import CardMenu from "../../components/CardMenu/CardMenu";
import "./style.scss";
import { Link } from "react-router-dom";
import { RiHomeOfficeFill } from "react-icons/ri";
import poli1 from "../../assets/images/poli_1.jpg";
import poli3 from "../../assets/images/poli_3.jpeg";

const Layout = () => {
  const role = sessionStorage.getItem("role");

  const cardData = [
    {
      title: "Jadwal",
      link: role === "mahasiswa" ? "/tv/jadwal/mahasiswa" : "/tv/jadwal/dosen",
      backgroundImage: poli1,
    },
  ];

  // Jika role adalah mahasiswa, tambahkan menu DataDosen
  if (role === "mahasiswa") {
    cardData.push({
      title: "DataDosen",
      link: "/tv/data/dosen",
      backgroundImage: poli3,
    });
  }

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
        </div>
      </div>
    </>
  );
};

export default Layout;
