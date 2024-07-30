import CardAbsensi from "../../components/CardAbsensi";
import "./style.scss";

const Layout = () => {
  return (
    <div className="absensi">
      <div className="absensi-head">
        <div className="text-head-absensi">
          <p className="text-title-absensi">Absensi</p>
          <p className="text-desc-absensi">Silahkan <span className="text-absensi-bold">Absen</span> dengan memilih mata kuliah sesuai jadwal mu.</p>
        </div>
      </div>
      <div className="card-grid-absensi">
        <CardAbsensi title="Matematika Teknik 1" time="09.00 - 11.00" month="Des" date="28" lab="Lab." nameLab="Pemograman" />
        <CardAbsensi title="Agama" time="07.30 - 09.30" month="Des" date="12" lab="Lab." nameLab="Pemograman" />
        <CardAbsensi title="Pemograman Web" time="09.00 - 11.00" month="Des" date="28" lab="Lab." nameLab="Pemograman" />
      </div>
    </div>
  );
};

export default Layout;
