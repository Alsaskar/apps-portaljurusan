import { HiOutlineEye, HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./TableAction.scss";

const TableAction = ({ urlEdit, _onClickEdit,_onClickDetail, _onClickDelete, urlDetail = null }) => {
  return (
    <div className="action-buttons">
      {urlDetail != null ? (
        <Link to={urlDetail} className="action-button blue">
          <HiOutlineEye size={18} />
        </Link>
      ) : (
        <button onClick={_onClickDetail} className="action-button blue">
          <HiOutlineEye size={18} />
        </button>
      )}

      {/*Edit*/}
      {urlEdit ? (
        <Link to={urlEdit} className="action-button orange">
          <HiOutlinePencilAlt size={18} />
        </Link>
      ) : (
        <button onClick={_onClickEdit} className="action-button orange">
          <HiOutlinePencilAlt size={18} />
        </button>
      )}

      {/*Delete*/}
      <button onClick={_onClickDelete} className="action-button red">
        <HiOutlineTrash size={18} />
      </button>
    </div>
  );
};

// PropTypes
TableAction.propTypes = {
  urlEdit: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  _onClickEdit: PropTypes.func,
  _onClickDetail: PropTypes.func,
  _onClickDelete: PropTypes.func,
  urlDetail: PropTypes.string,
};

export default TableAction;
