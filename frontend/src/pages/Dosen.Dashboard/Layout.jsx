import Card from "../../components/Cards";
import Calender from "../../components/Calender";
import { FaUserTie } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import AreaWelcome from "../../components/WelcomeCard/AreaWelcome";
import "./style.scss";
import axios from "axios";
import { urlApi } from "../../config";
import { useEffect, useState } from "react";

const Layout = () => {
  const [totalMahasiswa, setTotalMahasiswa] = useState(0);
  const [totalDosen, setTotalDosen] = useState(0);

  useEffect(() => {
    const fetchTotalMahasiswa = async () => {
      try {
        const prodiDosen = sessionStorage.getItem("prodiDosen");

        if (!prodiDosen) {
          console.error("ProdiDosen tidak ditemukan di sessionStorage");
          return;
        }

        const res = await axios.get(`${urlApi}/mahasiswa/get-mahasiswa-count`, {
          params: { prodiDosen: prodiDosen },
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });

        setTotalMahasiswa(res.data.totalMahasiswa);
      } catch (error) {
        console.error("Error fetching total mahasiswa:", error);
      }
    };

    const fetchTotalDosen = async () => {
      try {
        const prodiDosen = sessionStorage.getItem("prodiDosen");

        if (!prodiDosen) {
          console.error("ProdiDosen tidak ditemukan di sessionStorage");
          return;
        }

        const res = await axios.get(`${urlApi}/dosen/total-dosen/${prodiDosen}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });

        setTotalDosen(res.data.totalDosen);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching total mahasiswa:", error);
      }
    };

    fetchTotalMahasiswa();
    fetchTotalDosen();
  }, []);
  return (
    <>
      <AreaWelcome />
      <div className="card-grid-dosen">
        <Card title="Total Mahasiswa" icon={<FaUsers />} count={totalMahasiswa} />
        <Card title="Total Dosen" icon={<FaUserTie />} count={totalDosen} />
      </div>
      <Calender />
    </>
  );
};

export default Layout;
