import { Outlet } from "react-router-dom";
import DosenSidebar from "../components/DosenSidebar/Sidebar";
import AppBar from "../components/AppBarDosen/AppBar";
import { useUser } from "../hooks/userHooks";
import { useLoading } from "../context/LoadingContext";
import LoadingAnimation from "../components/LoadingAnimation/LoadingAnimation";
import { useContext } from "react";
import { DosenContext } from "../context/DosenContext";
import GenerateQRCode from "../components/Qrcode/GenerateQr";

const MahasiswaLayout = () => {
  const { loading } = useLoading();
  const { user } = useUser();
  const { result } = useContext(DosenContext) || {};

  const foto = result?.foto || "";

  return (
    <main className="dosen-page-wrapper">
      {loading && <LoadingAnimation />}
      <DosenSidebar />
      <div className="dosen-content-wrapper">
        <AppBar fullname={user.fullname} email={user.email} foto={foto} />
        {/*<AppBar />*/}
        <Outlet />
      </div>

      <div className="qr-code">
        <GenerateQRCode />
      </div>
    </main>
  );
};

export default MahasiswaLayout;
