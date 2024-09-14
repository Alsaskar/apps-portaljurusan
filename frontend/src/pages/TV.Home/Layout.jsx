import { Link } from "react-router-dom";
import "./style.scss";

const Layout = () => {
  return (
    <div className="tv-home">
      <Link to="/tv/login" className="text-section">
        <p className="text">Mulai</p>
      </Link>

    </div>
  );
};

export default Layout;
