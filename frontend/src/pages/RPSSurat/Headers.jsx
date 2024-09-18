import "./Headers.scss";
import LogoPoli from "../../assets/images/logo_poli.png";

const Headers = () => {
  return (
    <div className="header">
      <div className="header-border">
        <div className="header-content">
          <img src={LogoPoli} alt="logo-poli" className="logo-poli" />
          <div className="text-section">
            <h1 className="header-title">POLITEKNIK NEGERI MANADO</h1>
            <h2 className="header-jurusan">JURUSAN TEKNIK ELEKTRO</h2>
            <h2 className="header-prodi">
              PROGRAM STUDI SARJANA TERAPAN TEKNIK INFORMATIKA
            </h2>
          </div>

          <div className="details">
            <div className="text-detail-section">
              <p className="text-detail">FORMULIR</p>
              <p className="text-detail">FM-072 ed.A rev. 2</p>
              <p className="text-detail">ISSUE: A</p>
              <p className="text-detail">Issued: 31-01-2007</p>
              <p className="text-detail">UPDATE: 2</p>
              <p className="text-detail">Updated: 09-11-2021</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headers;
