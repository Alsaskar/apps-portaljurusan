import { Outlet } from "react-router-dom";

const TVLayout = () => {
  return (
    <main className="tv-page-wrapper">
      <div className="tv-content-wrapper">
        <div className="tv-container-wrapper">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default TVLayout;
