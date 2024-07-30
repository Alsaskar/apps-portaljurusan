import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
import "./TableAction.scss"

const TableAction = () => {
  return (
    <>
      <div className="action-buttons-dosen">
        <Link to="/edit" className="action-button-dosen orange">
          <HiOutlinePencilAlt size={18} />
        </Link>
        <Link to="/delete" className="action-button-dosen red">
          <HiOutlineTrash size={18} />
        </Link>
      </div>
    </>
  );
};

export default TableAction;
