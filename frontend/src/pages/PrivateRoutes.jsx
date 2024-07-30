import { Outlet, Navigate } from "react-router-dom";
import { UserContext, UserProvider } from "../context/UserContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { MahasiswaProvider } from "../context/MahasiswaContext";
import { DosenProvider } from "../context/DosenContext";

const RoleBasedProvider = ({children}) => {
  const data = useContext(UserContext);

  if(data.user.role === 'mahasiswa'){
    return <MahasiswaProvider>{children}</MahasiswaProvider>
  }else if(data.user.role === 'dosen'){
    return <DosenProvider>{children}</DosenProvider>
  }else{
    return <div>{children}</div>
  }
}
const PrivateRoutes = () => {
  let auth = sessionStorage.getItem('isLoggedIn');

  return ( 
    auth ? // telah login
      <UserProvider>
      <RoleBasedProvider>
        <Outlet />
      </RoleBasedProvider>
      </UserProvider> : <Navigate to="/" />
  )
}

export default PrivateRoutes;

RoleBasedProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
