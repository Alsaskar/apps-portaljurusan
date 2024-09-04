import { Outlet } from "react-router-dom";
import DosenSidebar from "../components/DosenSidebar/Sidebar";
import AppBar from "../components/AppBarDosen/AppBar"
import { useUser } from "../hooks/userHooks";
import { useLoading } from '../context/LoadingContext';
import LoadingAnimation from "../components/LoadingAnimation/LoadingAnimation";
import { useContext } from "react";
import { DosenContext } from "../context/DosenContext"

const MahasiswaLayout = () => {
  const { loading } = useLoading();
  const { user } = useUser();
  const { result } = useContext(DosenContext) || {};

  const foto = result?.foto || '';

  return (
    <main className="page-wrapper">
      {loading && <LoadingAnimation />}
      <DosenSidebar />
      <div className="content-wrapper">
      <AppBar fullname={user.fullname} email={user.email} foto={foto} />
      {/*<AppBar />*/}
        <Outlet />
      </div>
    </main>
  );
};

export default MahasiswaLayout;
