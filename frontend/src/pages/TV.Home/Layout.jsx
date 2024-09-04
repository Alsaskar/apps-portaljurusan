import { Link } from "react-router-dom";
import "./style.scss";

const Layout = () => {
  return (
    <div className="tv-home">
      <Link to="/tv/home/menu" className="text-section">
        <p className="text">MULAI</p>
      </Link>

    </div>
  );
};

export default Layout;
