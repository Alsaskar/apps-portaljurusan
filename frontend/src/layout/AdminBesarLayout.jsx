import { Outlet } from "react-router-dom";
import AdminBesarSidebar from "../components/AdminBesarSidebar/Sidebar";
import AppBar from "../components/AppBar/AppBar"
import { useUser } from "../hooks/userHooks";
import { useLoading } from '../context/LoadingContext';
import LoadingAnimation from "../components/LoadingAnimation/LoadingAnimation";

const AdminBesarLayout = () => {
  const { loading } = useLoading();
  const { user } = useUser();
  return (
    <main className="page-wrapper">
       {loading && <LoadingAnimation />}
      <AdminBesarSidebar />
      <div className="content-wrapper">
      <AppBar fullname={user.fullname} email={user.email} />
     {/*<AppBar />*/}
        <Outlet />
      </div>
    </main>
  );
};

export default AdminBesarLayout;
