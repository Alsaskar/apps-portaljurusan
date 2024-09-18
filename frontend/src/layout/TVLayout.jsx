import { Outlet } from "react-router-dom";
import TVToggleTheme from "../components/tvToggleTheme/tvToggleTheme";
import TVHeader from "../components/TVHeader/TVHeader";

const TVLayout = () => {
  return (
    <main className="tv-page-wrapper">
      <TVHeader />
      <div className="absolute">
        <div className="absolute inset-0 justify-center">
          <div className="bg-shape1 bg-primary opacity-50 bg-blur"></div>
          <div className="bg-shape2 bg-pink opacity-50 bg-blur"></div>
          <div className="bg-shape3 bg-purple opacity-50 bg-blur"></div>
        </div>
      </div>
      <div className="tv-content-wrapper">
        <div className="tv-container-wrapper">
          <Outlet />

          <div className="tv-home-menu-toggle-theme">
            <TVToggleTheme />
          </div>
        </div>
      </div>
    </main>
  );
};

export default TVLayout;
