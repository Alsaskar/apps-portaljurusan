import Image from "../../assets/images/medal.png";
import BgAchiev from "../../assets/images/bg_achiev.svg";
import "./style.scss";

const CardAchiev = () => {
  return (
    <div className="card-achiev">
    <img src={BgAchiev} alt="bg_achiev" className="bg-achiev" />
      <div className="title-persentase">
        <p className="title-achiev-persentase">56%</p>
        <div className="badge-achiev-kehadiran">Kehadiran</div>
      </div>
      <div className="achiev-details">
        <div className="achiev-text">
          <p className="achiev-title">Pencapaian Kehadiran!</p>
          <p className="achiev-desc">Pencapaian kehadiran anda pada perkuliahan dalam persentase.</p>
        </div>
        <img src={Image} alt="achiev-img" className="achiev-img" />
      </div>
    </div>
  );
};

export default CardAchiev;
