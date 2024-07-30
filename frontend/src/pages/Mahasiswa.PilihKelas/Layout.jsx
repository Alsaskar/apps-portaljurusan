import "./style.scss";
import { Link } from "react-router-dom"; 

const Layout = () => {
  return (
    <div className="pilih-kelas">
      <div className="container">
        <div className="content">
          <p className="title">Pilih Kelas</p>
          <p className="desc">
            Silahkan memilih kelas untuk melihat jadwal kuliah
          </p>
          {/*Kelas 4 TI*/}
          <div className="row-kelas 4ti">
            <Link to="/mahasiswa/jadwal" className="select-kelas">
              <p className="name-kelas">4 TI 1</p>
            </Link>
            <Link to="/mahasiswa/jadwal" className="select-kelas">
              <p className="name-kelas">4 TI 2</p>
            </Link>
            <Link to="/mahasiswa/jadwal" className="select-kelas">
              <p className="name-kelas">4 TI 3</p>
            </Link>
            <Link to="/mahasiswa/jadwal" className="select-kelas">
              <p className="name-kelas">4 TI 4</p>
            </Link>
            <Link to="/mahasiswa/jadwal" className="select-kelas">
              <p className="name-kelas">4 TI 5</p>
            </Link>
          </div>

          {/*Kelas 5 TI*/}
          <div className="row-kelas limaTI">
            <div className="select-kelas">
              <p className="name-kelas">5 TI 1</p>
            </div>
            <div className="select-kelas">
              <p className="name-kelas">5 TI 2</p>
            </div>
            <div className="select-kelas">
              <p className="name-kelas">5 TI 3</p>
            </div>
            <div className="select-kelas">
              <p className="name-kelas">5 TI 4</p>
            </div>
          </div>

          {/*Kelas 6 TI*/}
          <div className="row-kelas enamTI">
            <Link to="/mahasiswa/jadwal" className="select-kelas">
              <p className="name-kelas">6 TI 1</p>
            </Link>
            <div className="select-kelas">
              <p className="name-kelas">6 TI 2</p>
            </div>
            <div className="select-kelas">
              <p className="name-kelas">6 TI 3</p>
            </div>
            <div className="select-kelas">
              <p className="name-kelas">6 TI 4</p>
            </div>
            <div className="select-kelas">
              <p className="name-kelas">6 TI 5</p>
            </div>
            <div className="select-kelas">
              <p className="name-kelas">6 TI 5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
