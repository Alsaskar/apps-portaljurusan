import { Outlet } from "react-router-dom";
import DosenSidebar from "../components/DosenSidebar/Sidebar";
import AppBar from "../components/AppBar/AppBar"
import { useUser } from "../hooks/userHooks";

const MahasiswaLayout = () => {
  const { user } = useUser();
  return (
    <main className="page-wrapper">
      <DosenSidebar />
      <div className="content-wrapper">
      <AppBar fullname={user.fullname} email={user.email} />
      {/*<AppBar />*/}
        <Outlet />
      </div>
    </main>
  );
};

export default MahasiswaLayout;
