import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar/Sidebar";
import AppBar from "../components/AppBar/AppBar"
import { useUser } from "../hooks/userHooks";

const AdminLayout = () => {
  const { user } = useUser();
  return (
    <main className="page-wrapper">
      <AdminSidebar />
      <div className="content-wrapper">
      <AppBar fullname={user.fullname} email={user.email} />
     {/*<AppBar />*/}
        <Outlet />
      </div>
    </main>
  );
};

export default AdminLayout;
