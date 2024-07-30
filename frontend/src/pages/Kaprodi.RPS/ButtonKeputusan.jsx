import "./ButtonKeputusan.scss";
import { IoIosCloseCircle } from "react-icons/io";
import { TbSquareRoundedCheckFilled } from "react-icons/tb";

const ButtonKeputusan = () => {
  return (
    <div className="button-keputusan">
      <button className="button-tolak" type="button">
        <IoIosCloseCircle size={17} /> Tolak
      </button>
      <button className="button-terima" type="button">
        <TbSquareRoundedCheckFilled size={17} /> Terima
      </button>
    </div>
  );
};

export default ButtonKeputusan;
