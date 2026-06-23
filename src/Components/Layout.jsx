import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { useState } from "react";

const Layout = () => {
  const [showSideBar, setShowSideBar] = useState(true);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 700 ? true : false
  );
  return (
    <div className="flex h-screen">
      <div
        className={`${
          showSideBar && !isMobile
            ? "flex w-3/6 sm:w-2/6 md:w-4/12 lg:w-[24%] xl:w-[18%]"
            : showSideBar && isMobile
            ? "flex"
            : "hidden"
        }   h-full `}
      >
        <SideBar
          showSideBar={showSideBar}
          isMobile={isMobile}
          setShowSideBar={setShowSideBar}
          setIsMobile={setIsMobile}
        />
      </div>
      <div
        className={`flex flex-col ${
          showSideBar && !isMobile
            ? "w-3/6 sm:w-4/6 md:w-8/12 lg:w-[76%]  xl:w-[82%]"
            : "w-full"
        } `}
      >
        <NavBar setShowSideBar={setShowSideBar} setIsMobile={setIsMobile} />
        <div className="w-full overflow-y-auto h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
