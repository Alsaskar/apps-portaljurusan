import Card from "../../components/Cards";
import Calender from "../../components/Calender";
import { FaUsers } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { BsFillShieldLockFill } from "react-icons/bs";
import AreaWelcome from "../../components/WelcomeCard/AreaWelcome";
import "./style.scss";
import IpChart from "../../components/IpChart/ipChart";
import { useEffect, useState } from "react";
import axios from "axios";
import { urlApi } from "../../config";

const Layout = () => {
  const [blockedIpCount, setBlockedIpCount] = useState(0);
  const [totalMahasiswa, setTotalMahasiswa] = useState(0);

  useEffect(() => {
    const fetchTotalMahasiswa = async () => {
      try {
        const prodiAdmin = sessionStorage.getItem("prodiAdmin");

        if (!prodiAdmin) {
          console.error("ProdiAdmin tidak ditemukan di sessionStorage");
          return;
        }

        const res = await axios.get(`${urlApi}/mahasiswa/get-mahasiswa-count`, {
          params: { prodiAdmin: prodiAdmin },
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });

        setTotalMahasiswa(res.data.totalMahasiswa);
      } catch (error) {
        console.error("Error fetching total mahasiswa:", error);
      }
    };

    fetchTotalMahasiswa();
  }, []);

  useEffect(() => {
    const fetchBlockedIpCount = async () => {
      try {
        const res = await axios.get(`${urlApi}/auth/get-blocked-ip`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        setBlockedIpCount(res.data.blockedIpCount);
      } catch (error) {
        console.error("Error fetching blocked IP Count:", error);
      }
    };

    fetchBlockedIpCount();
  }, []);

  return (
    <>
      <AreaWelcome />
      <div className="card-grid">
        <Card
          title="Total Mahasiswa"
          icon={<FaUsers />}
          count={totalMahasiswa}
        />
        <Card title="Total Dosen" icon={<HiMiniUsers />} count={20} />
        <Card
          title="IP Diblokir"
          icon={<BsFillShieldLockFill />}
          count={blockedIpCount}
        />
      </div>
      <div className="cal-chart">
        <div className="calender">
          <Calender />
        </div>
        <div className="ip-chart">
          <IpChart />
        </div>
      </div>
    </>
  );
};

export default Layout;
