import CardMenu from "../../components/CardMenu/CardMenu";
import "./style.scss";
import { Link } from "react-router-dom";
import { RiHomeOfficeFill } from "react-icons/ri";

const Layout = () => {
  const cardData = [
    { title: "Profile", link: "/tv/profile" },
    { title: "Absensi", link: "/tv/absensi" },
    { title: "HME", link: "/tv/hme" },
    { title: "Jadwal", link: "/tv/jadwal" },
  ];

  return (
    <>
      <div className="tv-home-menu">
        <div className="card-section">
          {cardData.map((card, index) => (
            <CardMenu key={index} title={card.title} link={card.link} />
          ))}
        </div>

        <Link to="/tv/home/menu" className="back-to-home">
          <RiHomeOfficeFill size={20} />
        </Link>
      </div>
    </>
  );
};

export default Layout;
