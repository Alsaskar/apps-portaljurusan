import CardMenu from "../../components/CardMenu/CardMenu";
import "./style.scss";

const Layout = () => {
  const cardData = [
    { title: "Profile" },
    { title: "Absensi" },
    { title: "HME" },
    { title: "Jadwal" },
  ];

  return (
    <div className="tv-home">
      <div className="card-section">
        {cardData.map((card, index) => (
          <CardMenu key={index} title={card.title} />
        ))}
      </div>
    </div>
  );
};

export default Layout;
