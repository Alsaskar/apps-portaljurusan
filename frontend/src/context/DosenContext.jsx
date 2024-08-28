import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { urlApi } from "../config";
import axios from "axios";
import { UserContext } from "./UserContext";

export const DosenContext = createContext();

export const DosenProvider = ({ children }) => {
  const data = useContext(UserContext);
  const [dosen, setDosen] = useState(null);

  useEffect(() => {
    const _dataUser = async () => {
      const res = await axios.get(`${urlApi}/auth/get-dosen/${data.user.id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });

      setDosen(res.data);
    };

    _dataUser();
  }, [data]);

  return <DosenContext.Provider value={dosen}>{children}</DosenContext.Provider>;
};

DosenProvider.propTypes = {
  children: PropTypes.node.isRequired,
};