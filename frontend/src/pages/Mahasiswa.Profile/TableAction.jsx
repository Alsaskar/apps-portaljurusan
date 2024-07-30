import { HiOutlineEye, HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
import "./TableAction.scss"

const TableAction = () => {
  return (
    <>
      <div className="action-buttons">
        <Link to="/view" className="action-button blue">
          <HiOutlineEye size={18} />
        </Link>
        <Link to="/edit" className="action-button orange">
          <HiOutlinePencilAlt size={18} />
        </Link>
        <Link to="/delete" className="action-button red">
          <HiOutlineTrash size={18} />
        </Link>
      </div>
    </>
  );
};

export default TableAction;
