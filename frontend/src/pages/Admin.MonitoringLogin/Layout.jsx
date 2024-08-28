import { useEffect, useState } from "react";
import { IoMdUnlock } from "react-icons/io";
import "./style.scss";
import axios from "axios";
import { urlApi } from "../../config";
import Swal from "sweetalert2";

const Layout = () => {
  const [blockedIps, setBlockedIps] = useState([]);

  useEffect(() => {
    // Di komponen frontend setelah mendapatkan data
    // const formatIp = (ip) => {
    //   return ip.replace(/^::ffff:/, ""); // Menghapus awalan ::ffff:
    // };

    // Mengambil data IP yang diblokir dan memformatnya
    const fetchBlockedIps = async () => {
      try {
        const response = await axios.get(`${urlApi}/auth/blocked-ips`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        const data = response.data.map((ipEntry) => ({
          ipAddress: ipEntry.ipAddress,
          attemptCount: ipEntry.attemptCount,
        }));
        setBlockedIps(data);
      } catch (error) {
        console.error("Error fetching blocked IPs:", error.message);
      }
    };

    fetchBlockedIps();
  }, []);

  const unblockIp = async (ipAddress) => {
    const result = await Swal.fire({
      title: "Konfirmasi",
      text: `Apakah Anda yakin ingin membuka block IP ${ipAddress}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, buka block",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.post(
          `${urlApi}/auth/unblock-ip`,
          { ipAddress },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        // Hapus IP dari daftar yang diblokir di frontend
        setBlockedIps(blockedIps.filter((ip) => ip.ipAddress !== ipAddress));
        Swal.fire("Success", "IP telah dibuka kembali", "success");
      } catch (error) {
        console.error("Error unblocking IP:", error);
        Swal.fire("Error", "Gagal membuka block IP", "error");
      }
    }
  };

  return (
    <div className="monitoring">
      <div className="container">
        <div className="ip-gagal">
          <section className="content-area-table">
            <div className="data-table-diagram-monitoring">
              <table>
                <thead>
                  <tr>
                    <th>IP</th>
                    <th>Jumlah Serangan</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {blockedIps.length > 0 ? (
                    blockedIps.map((ip) => (
                      <tr key={ip.ipAddress}>
                        <td>{ip.ipAddress}</td>
                        <td>{ip.attemptCount}</td>
                        <td className="dt-cell-action">
                          <button
                            className="btn-unblock"
                            title="Unblock"
                            onClick={() => unblockIp(ip.ipAddress)}
                          >
                            <IoMdUnlock size={19} /> Buka Block
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} align="center">
                        Belum ada ip yang di block
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Layout;
