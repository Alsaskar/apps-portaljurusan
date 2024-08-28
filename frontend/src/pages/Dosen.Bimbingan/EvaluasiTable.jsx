import { useEffect, useState } from 'react';
import axios from 'axios';
import { urlApi } from "../../config";

const EvaluasiTable = ({ idMahasiswa }) => {
  const [evaluasi, setEvaluasi] = useState([]);

  useEffect(() => {
    const fetchEvaluasi = async () => {
      try {
        const response = await axios.get(`${urlApi}/evaluasi/dosen/${idMahasiswa}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
        });
        setEvaluasi(response.data.evaluasi);
      } catch (error) {
        console.error('Error fetching evaluasi data:', error);
      }
    };

    fetchEvaluasi();
  }, [idMahasiswa]);

  return (
    <div>
      <h2>Evaluasi Mahasiswa</h2>
      <table>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Kegiatan</th>
            <th>Permasalahan</th>
            <th>Solusi</th>
            <th>TTD</th>
          </tr>
        </thead>
        <tbody>
          {evaluasi.map((item, index) => (
            <tr key={index}>
              <td>{item.tgl}</td>
              <td>{item.kegiatan}</td>
              <td>{item.permasalahan}</td>
              <td>{item.solusi}</td>
              <td>{item.ttd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EvaluasiTable;