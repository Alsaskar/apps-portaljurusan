import { FaDoorOpen, FaLaptopMedical  } from "react-icons/fa";
import { IoExit } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./TableAction.scss"

const TableAction = () => {
  return (
    <>
      <div className="action-buttons">
        <Link to="/masuk" className="action-button blue">
          <p>Masuk</p> <FaDoorOpen size={15} />
        </Link>
        <Link to="/keluar" className="action-button orange">
        <p>Keluar</p> <IoExit size={15} />
        </Link>
        <Link to="/izin" className="action-button red">
        <p>Izin</p> <FaLaptopMedical size={15} />
        </Link>
      </div>
    </>
  );
};

export default TableAction;
