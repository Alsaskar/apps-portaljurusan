import Card from "../../components/Cards";
import Calender from "../../components/Calender";
import { FaUserTie } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { BsFillShieldLockFill } from "react-icons/bs";
import AreaWelcome from "../../components/WelcomeCard/AreaWelcome";
import "./style.scss";

const Layout = () => {
  return (
    <>
      <AreaWelcome />
      <div className="card-grid">
        <Card title="Total Mahasiswa" icon={<FaUsers />} count={1000} />
        <Card title="Total Dosen" icon={<HiMiniUsers />} count={32} />
        <Card title="Total Kaprodi" icon={<FaUserTie />} count={4} />
        <Card title="Serangan Bulan Ini" icon={<BsFillShieldLockFill />} count={4} />
      </div>
      <Calender />
    </>
  );
};

export default Layout;
