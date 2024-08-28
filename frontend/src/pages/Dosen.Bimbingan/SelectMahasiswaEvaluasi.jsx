import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { urlApi } from "../../config";
import { DosenContext } from "../../context/DosenContext";
import "./SelectMahasiswaEvaluasi.scss";

const SelectMahasiswaEvaluasi = () => {
  const { result } = useContext(DosenContext) || {};
  const navigate = useNavigate();
  const [mahasiswaList, setMahasiswaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!result?.id || isNaN(result.id)) {
      setLoading(false);
      return;
    }

    const fetchDosenWithMahasiswa = async () => {
      try {
        const res = await axios.get(
          `${urlApi}/bimbingan/mahasiswa-bimbingan/${result.id}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        if (Array.isArray(res.data.mahasiswa)) {
          setMahasiswaList(res.data.mahasiswa.filter((m) => m));
        } else {
          setMahasiswaList([]);
        }
      } catch (error) {
        console.error("Error fetching dosen with mahasiswa:", error);
        setError("Error fetching mahasiswa data.");
        setMahasiswaList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDosenWithMahasiswa();
  }, [result?.id]);

  const handleSelectMahasiswaEvaluasi = (mahasiswaId) => {
    navigate(`/dosen/bimbingan/${mahasiswaId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="select-mahasiswa-evaluasi">
      <p className="title">Mahasiswa Bimbingan</p>
      <p className="desc">
        Silahkan pilih mahasiswa untuk bimbingan melalui chat.
      </p>
      {error && <div className="error">{error}</div>}
      <div className="select-mahasiswa-list">
        {mahasiswaList.length > 0 ? (
          mahasiswaList.map((mahasiswa) =>
            mahasiswa ? (
              <div
                key={mahasiswa.id}
                onClick={() => handleSelectMahasiswaEvaluasi(mahasiswa.id)}
                className="select-mahasiswa-item"
              >
                <p className="name">
                  {mahasiswa.fullname || "No Fullname"} (
                  {mahasiswa.nim || "No NIM"})
                </p>
              </div>
            ) : null
          )
        ) : (
          <li>Belum ada mahasiswa</li>
        )}
      </div>
    </div>
  );
};

export default SelectMahasiswaEvaluasi;
