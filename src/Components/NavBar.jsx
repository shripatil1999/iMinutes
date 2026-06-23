import React from "react";
import Logo from "/images/pump_logo_hd2.png";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import BootstrapTooltip from "../MainReUsables/BootstrapTooltip";

const NavBar = ({ setShowSideBar, setIsMobile }) => {
  const navigate = useNavigate();

  // Function to toggle the sidebar
  const toggleSideBar = () => {
    setShowSideBar((prevShowSideBar) => !prevShowSideBar);
    if (window.innerWidth <= 800) {
      setIsMobile(true);
      // setShowSidebar(!showSidebar);
    } else {
      // setShowSidebar(!showSidebar);
      setIsMobile(false);
    }
  };

  return (
    <div
      className="p-3 flex items-center justify-start bg-slate-100"
      style={{
        boxShadow:
          "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
      }}
    >
      {/* Call toggleSideBar function onClick */}
      <BootstrapTooltip title="Menu" placement="right">
        <MenuIcon onClick={toggleSideBar} className="w-11 cursor-pointer" />
      </BootstrapTooltip>
      <div className="flex justify-center w-full">
        <img
          className="w-[60%] md:w-[20%] lg:w-[14%] h-11 self-start"
          src={Logo}
          alt="Logo"
        />
      </div>
    </div>
  );
};

export default NavBar;
