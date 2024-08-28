import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { urlApi, urlStatic } from "../../config";
import { DosenContext } from "../../context/DosenContext";
import { MdRemoveRedEye, MdNoSim } from "react-icons/md";
import "./File.scss";
import { Link } from "react-router-dom";

const File = () => {
  const dosenContext = useContext(DosenContext);
  const idDosen = dosenContext?.result?.id;

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${urlApi}/evaluasimahasiswa/dosen/${idDosen}/files`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        if (res.data.files) {
          setFiles(res.data.files);
        } else {
          setFiles([]);
        }
      } catch (error) {
        console.error("Error fetching files:", error);
        setError("Terjadi kesalahan dalam mengambil file.");
        setFiles([]); // Ensure to handle as empty if error occurs
      } finally {
        setLoading(false);
      }
    };

    if (idDosen) {
      fetchFiles();
    }
  }, [idDosen]);

  return (
    <div className="file-mahasiswa">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : files.length > 0 ? (
        files.map((file, key) => (
          <div key={key}>
            <div>
              <Link
                to={`${urlStatic}${file.fileUrl}`}
                target="_blank"
                className="button-file"
              >
                <MdRemoveRedEye size={18} /> File Evaluasi Mahasiswa
              </Link>
            </div>
          </div>
        ))
      ) : (
        <button className="no-file" disabled>
          <MdNoSim size={18} /> Mahasiswa blum upload file
        </button>
      )}
    </div>
  );
};

export default File;
