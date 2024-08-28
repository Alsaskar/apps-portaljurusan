import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { urlApi, urlStaticAssets } from "../../config";
import { DosenContext } from "../../context/DosenContext";
import ProfileNoImage from "../../assets/images/profile_no_image.png";
import "./SelectMahasiswa.scss";

const SelectMahasiswa = () => {
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

  const handleSelectMahasiswa = (mahasiswaId) => {
    navigate(`/dosen/bimbingan/chat/${mahasiswaId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="select-mahasiswa">
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
                onClick={() => handleSelectMahasiswa(mahasiswa.id)}
                className="select-mahasiswa-item"
              >
                <img
                  className="profile-img"
                  src={
                    mahasiswa.foto
                      ? `${urlStaticAssets}/${mahasiswa.foto}`
                      : ProfileNoImage
                  }
                  alt="Area Profile"
                />
                <p className="name">
                  {mahasiswa.fullname || "No Fullname"} 
                </p>
                <p className="nim">{mahasiswa.nim || "No NIM"}</p>
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

export default SelectMahasiswa;
