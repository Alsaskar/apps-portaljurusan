import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { urlApi } from "../config";
import axios from "axios";
import { UserContext } from "./UserContext";

export const DataMahasiswa = createContext();

export const MahasiswaProvider = ({ children }) => {
  const data = useContext(UserContext);
  const [mahasiswa, setMahasiswa] = useState(null);

  useEffect(() => {
    const _dataUser = async () => {
      const res = await axios.get(`${urlApi}/mahasiswa/${data.user.id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });

      setMahasiswa(res.data);
    };

    _dataUser();
  }, [data]);

  return <DataMahasiswa.Provider value={mahasiswa}>{children}</DataMahasiswa.Provider>;
};

MahasiswaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
