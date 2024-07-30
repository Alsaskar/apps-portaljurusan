import PropTypes from "prop-types";
import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";
import { urlApi } from "../config";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // data user yang sedang login
  const _dataUser = async () => {
    const res = await axios.get(`${urlApi}/auth`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    });

    setUser(res.data);
  };

  useEffect(() => {
    _dataUser();
  }, []);

  const value = useMemo(
    () => ({
      user,
    }),
    [user]
  );

  return user === null ? <div className="loading-spinner"></div> : <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};