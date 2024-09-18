import { useContext } from "react";
import "./style.scss";
import Image from "../../assets/images/profile_no_image.png";
import { Link } from "react-router-dom";
import { RiHomeOfficeFill } from "react-icons/ri";
import { useUser } from "../../hooks/userHooks";
import { DosenContext } from "../../context/DosenContext";

const Layout = () => {
  const { user } = useUser();
  const { result } = useContext(DosenContext) || {};
  // const [detailDosen, setDetailDosen] = useState([])
  
  // useEffect(() => {
  //   if(result && result.detailmahasiswas){
  //     setDetailDosen(result.detailmahasiswas[0])
  //   }
    
  // }, [result, user])

console.log(result)
  return (
    <div>
      <div className="profile-container">
        <div className="profile-content">
          <div className="profile-content-dosen">
            <div className="img-section">
              <img src={Image} alt="" className="profile-image" />
            </div>


              <div className="text-section">
                <div className="name-section">
                  <div className="title">Name</div>
                  <div className="name">{user.fullname}</div>
                </div>

                <div className="name-section">
                  <div className="title">Email</div>
                  <div className="name">{user.email}</div>
                </div>

                <div className="name-section">
                  <div className="title">NIM</div>
                  <div className="name">{user.username}</div>
                </div>

                <div className="name-section">
                  <div className="title">No Hp.</div>
                  <div className="name">{user.noHp}</div>
                </div>

                <div className="name-section">
                  <div className="title">Prodi</div>
                  <div className="name">{result?.prodi}</div>
                </div>

                <div className="name-section">
                  <div className="title">Status</div>
                  <div className="name">.</div>
                </div>
              </div>
          
            
          </div>
        </div>
      </div>
      <Link to="/tv/home/menu" className="back-to-home">
        <RiHomeOfficeFill size={20} />
      </Link>
    </div>
  );
};

export default Layout;
