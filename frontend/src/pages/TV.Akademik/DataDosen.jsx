import "./DataDosen.scss";
import { IoSearch } from "react-icons/io5";
import ImgDosen from "../../assets/images/profile_no_image.png";
import { urlApi, urlStaticAssetsDosen } from "../../config";
import axios from "axios";
import { useState } from "react";

const DataDosen = () => {
  const [dataDosen, setDataDosen] = useState([]);
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `${urlApi}/dosen/search-data?search=${query}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      setDataDosen(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="data-dosen-tv">
      <div className="container">
        <div className="content">
          <p className="title-cari-dosen">Cari Data Dosen</p>
          <div className="form-data-dosen">
            <input
              type="text"
              placeholder="Cari data dosen"
              className="input-data-dosen"
              name="search"
              id="search"
              onChange={(e) => setQuery(e.target.value)}
            />

            <button
              type="button"
              className="btn-cari-data"
              onClick={handleSearch}
            >
              <IoSearch size={20} />
            </button>
          </div>

          {/* Show data */}
          {dataDosen.length > 0 && (
            <div className="show-data">
              <div className="content">
                {dataDosen.map((val, key) => {
                  // Define image URL
                  const imageUrl = val.foto
                    ? `${urlStaticAssetsDosen}/${val.foto}`
                    : ImgDosen; // Fallback image if `foto` is not available

                  return (
                    <div className="grid-data" key={key}>
                      <img src={imageUrl} alt="Dosen" className="img-dosen" />
                      <div className="data">
                        <div className="data-section">
                          <p className="title">Nama Dosen</p>
                          <p className="data">{val.fullname}</p>
                        </div>
                        <div className="data-section">
                          <p className="title">NIP</p>
                          <p className="data">{val.nip}</p>
                        </div>
                        <div className="data-section">
                          <p className="title">NIDN</p>
                          <p className="data">{val.nidn}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataDosen;
