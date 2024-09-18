import Hello from "../../assets/images/hello.png";
import Calendar from "../../components/Calender";
// import CardAchiev from "../../components/CardAchiev";
import DigitalClock from "../../components/DigitalClock";
import "./style.scss";

const Layout = () => {
  return (
    <div className="section-dashboard">
      <div className="dashboard">
        <img src={Hello} alt="" className="hello" />
        <div className="text-welcome">
          <p className="text-hallo">Hallo👋</p>
          <p className="text-desc">
            Selamat Datang Di Portal Jurusan <span className="text-bold">Teknik Elektro</span>!
          </p>
        </div>
      </div>
      <div className="card-satu">
        <div>
          <DigitalClock />
          <Calendar />
        </div>
        {/* <CardAchiev className="card-achiev" /> */}
      </div>
    </div>
  );
};

export default Layout;
