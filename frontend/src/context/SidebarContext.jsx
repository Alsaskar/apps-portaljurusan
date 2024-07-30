import { createContext, useState } from "react";
import { PropTypes } from "prop-types";

export const SidebarContext = createContext({});

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [submenuTitle, setSubmenuTitle] = useState("Dashboard");

  const handleSubmenuClick = (title) => {
    setSubmenuTitle(title);
  };
  
  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        submenuTitle, 
        handleSubmenuClick,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

SidebarProvider.propTypes = {
  children: PropTypes.node,
};
