import { Link } from "react-router-dom"; // Import Link
import "./style.scss";
import { PiUsersThreeFill } from "react-icons/pi";
import {
  MdBusinessCenter,
  MdOutlineAssignment,
  MdOutlineGroupWork,
} from "react-icons/md";
import { FaBookReader, FaPalette, FaCode } from "react-icons/fa";

const departmentData = [
  {
    title: "HUMAS",
    icon: <PiUsersThreeFill size={50} />,
    color: "#f1c40f",
  },
  {
    title: "Koderisasi",
    icon: <FaCode size={50} />,
    color: "#f34141",
  },
  {
    title: "Kesekretariatan",
    icon: <MdOutlineAssignment size={50} />,
    color: "#5f47e8",
  },
  {
    title: "Kerohanian",
    icon: <FaBookReader size={50} />,
    color: "#2ecc71",
  },
  {
    title: "Minat Bakat",
    icon: <FaPalette size={50} />,
    color: "#9b59b6",
  },
  {
    title: "Kewirausahaan",
    icon: <MdBusinessCenter size={50} />,
    color: "#f29a2e",
  },
  {
    title: "Delegasi",
    icon: <MdOutlineGroupWork size={50} />,
    color: "#1abc9c",
  },
];

const Departemen = () => {
  return (
    <div className="departemen">
      <div className="container">
        <p className="title">Departemen HME 2024</p>
        <div className="departemen-section">
          {departmentData.map((dept, index) => (
            <div className="box-section" key={index}>
              <Link
                to={`/departemen/hme/${dept.title}`}
                className="box"
                style={{ backgroundColor: dept.color }}
              >
                {dept.icon}
              </Link>
              <p className="title-dep">{dept.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Departemen;
