import "./style.scss";
import { Link } from "react-router-dom";
import { RiHomeOfficeFill } from "react-icons/ri";

const Layout = () => {
  return (
    <div>Jadwal
      <Link to="/tv/home/menu" className="back-to-home">
          <RiHomeOfficeFill size={20} />
        </Link>
    </div>
  )
}

export default Layout