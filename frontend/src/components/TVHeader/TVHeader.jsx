import "./style.scss";
import { FaCircleUser } from "react-icons/fa6";
import { useUser } from "../../hooks/userHooks";

const TVHeader = () => {
  const { user } = useUser();
  return (
    <nav className="tv-header">
      <div className="content">
        <div className="name">
          <FaCircleUser size={18} />
          <p>{user.fullname}</p>
        </div>
      </div>
    </nav>
  );
};

export default TVHeader;
