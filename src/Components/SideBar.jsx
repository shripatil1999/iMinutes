import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "./SideBar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import iMinLogo from "/images/iminutes_logo_white.png";
import { alertField } from "../MainReUsables/AlertField";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

let sidebarMenuAdmin = [
  {
    id: 1,
    name: "Home",
    path: "/home",
    icon: <HomeIcon />,
  },
  {
    id: 2,
    name: "Minutes of Meeting",
    icon: <NoteAltIcon />,
    subMenu: [
      {
        id: 21,
        name: "New Meeting",
        path: "/newMeeting",
      },
      {
        id: 22,
        name: "Meeting History",
        path: "/meetingHistory",
      },
    ],
  },
  {
    id: 3,
    name: "Tasks",
    icon: <ListAltIcon />,
    subMenu: [
      {
        id: 31,
        name: "My Tasks",
        path: "/myTasks",
      },
      {
        id: 32,
        name: "My SubTasks",
        path: "/subTasks",
      },
    ],
  },
  {
    id: 4,
    name: "Manage Profile",
    path: "/manageProfile",
    icon: <ManageAccountsIcon />,
  },
  {
    id: 5,
    name: "Manage Codes",
    path: "/manageCodes",
    icon: <NoteAddIcon />,
  },
  {
    id: 6,
    name: "My Profile",
    path: "/myProfile",
    icon: <PermContactCalendarIcon />,
  },
  {
    id: 7,
    name: "Help & Support",
    path: "/help",
    icon: <HelpCenterIcon />,
  },
];

let sidebarMenuUser = [
  {
    id: 1,
    name: "Home",
    path: "/home",
    icon: <HomeIcon />,
  },
  {
    id: 2,
    name: "Minutes of Meeting",
    icon: <NoteAltIcon />,
    subMenu: [
      {
        id: 21,
        name: "New Meeting",
        path: "/newMeeting",
      },
      {
        id: 22,
        name: "Meeting History",
        path: "/meetingHistory",
      },
    ],
  },
  {
    id: 3,
    name: "Tasks",
    icon: <ListAltIcon />,
    subMenu: [
      {
        id: 31,
        name: "My Tasks",
        path: "/myTasks",
      },
      {
        id: 32,
        name: "My SubTasks",
        path: "/subTasks",
      },
    ],
  },
  {
    id: 6,
    name: "My Profile",
    path: "/myProfile",
    icon: <PermContactCalendarIcon />,
  },
  {
    id: 7,
    name: "Help & Support",
    path: "/help",
    icon: <HelpCenterIcon />,
  },
];

const SideBar = ({ showSideBar, isMobile, setShowSideBar, setIsMobile }) => {
  // State variables to manage sidebar toggling, visibility, mobile view, and submenu openness
  // const [toggled, setToggled] = useState(true);
  // const [showSidebar, setShowSidebar] = useState(true);
  // const [isMobile, setIsMobile] = useState(false);

  // React Router hooks for navigation and location
  const navigate = useNavigate();
  const location = useLocation();

  // Extracting current route path
  const currentRoute = location.pathname;

  let sidebarMenu = [];
  const userData = sessionStorage.getItem("userData"); //get user data from session storage
  const parsedData = JSON.parse(userData); // parse the user data
  const isAdmin = parsedData[0].IsAdmin; // get the IsAdmin value from the user data
  sidebarMenu = isAdmin ? sidebarMenuAdmin : sidebarMenuUser;

  // Effect hook to set mobile view based on window width
  useEffect(() => {
    if (window.innerWidth <= 700) {
      setIsMobile(true);
      setShowSideBar(false);
    } else {
      setIsMobile(false);
      setShowSideBar(true);
    }
  }, []);

  // TtyTwoTone;

  // Function to handle submenu toggling

  // Function to handle logout action
  const handleLogout = () => {
    // Clear all items from sessionStorage
    sessionStorage.clear();
    navigate("/"); // Redirecting to Login Page
    alertField("Logged out Succsessfully", "success");
  };

  // Event listener to close the sidebar when backdrop is clicked
  const collection = document.getElementsByClassName("ps-sidebar-backdrop");
  if (collection.length > 0) {
    collection[0].addEventListener("click", function () {
      setShowSideBar(false);
    });
  }

  return (
    <>
      <div className={`flex ${showSideBar ? "w-full" : ""}`}>
        {/* Sidebar component */}
        {showSideBar && (
          <Sidebar
            toggled={showSideBar}
            customBreakPoint="800px"
            onBreakPoint={setIsMobile}
            onBackdropClick={() => setShowSideBar(false)}
            backgroundColor="#252c48"
            className="text-white "
            transitionDuration={500}
            rootStyles={{
              width:
                showSideBar && !isMobile
                  ? "100%"
                  : showSideBar && isMobile
                  ? ""
                  : "",
            }}
          >
            {/* Brand logo and name */}
            <div className="flex justify-center items-center gap-1 p-1">
              <img className="w-[100%] " src={iMinLogo} alt="" />
              {/* <span className="text-white text-2xl font-semibold">
                iPUMPNET
              </span> */}
            </div>

            {/* Sidebar menu */}
            <Menu
              transitionDuration={1000}
              // closeOnClick={() => {
              //   console.log("close");
              //   setShowSideBar(true);
              // }}

              menuItemStyles={{
                button: {
                  fontWeight: "bold",
                  padding: "12%",
                  "&.active": {
                    backgroundColor: "#335B8C !important",
                    color: "white !important",
                  },
                  "&:hover": {
                    backgroundColor: "#335B8C !important",
                    color: "white !important",
                  },
                },
              }}
            >
              {/* Mapping through sidebar menu items */}
              {sidebarMenu.map((menuItem) => (
                <React.Fragment key={menuItem.id}>
                  {/* Rendering MenuItem or SubMenu based on whether it has a path or submenu */}
                  {menuItem.path ? (
                    <MenuItem
                      onClick={() => {
                        if (window.innerWidth <= 700) {
                          setShowSideBar(false);
                        }
                      }}
                      component={
                        <Link
                          className={
                            currentRoute === menuItem.path
                              ? "tab active"
                              : "tab"
                          }
                          to={menuItem.path}
                        />
                      }
                    >
                      {menuItem.icon}
                      &nbsp; {menuItem.name}
                    </MenuItem>
                  ) : (
                    <SubMenu
                      defaultOpen={menuItem.subMenu.some((subMenuItem) =>
                        currentRoute.includes(subMenuItem.path)
                      )}
                      label={menuItem.name}
                      icon={menuItem.icon}
                    >
                      {/* Mapping through submenu items */}
                      {menuItem.subMenu.map((subMenuItem) => (
                        <MenuItem
                          key={subMenuItem.id}
                          label={subMenuItem.name}
                          onClick={() => {
                            if (window.innerWidth <= 700) {
                              setShowSideBar(false);
                            }
                          }}
                          component={
                            <Link
                              className={
                                currentRoute === subMenuItem.path
                                  ? "tab active"
                                  : "tab"
                              }
                              to={subMenuItem.path}
                            />
                          }
                        >
                          {subMenuItem.icon}
                          &nbsp; {subMenuItem.name}
                        </MenuItem>
                      ))}
                    </SubMenu>
                  )}
                </React.Fragment>
              ))}

              {/* Logout MenuItem */}
              <MenuItem className="borderBottomMenu" onClick={handleLogout}>
                <LogoutIcon />
                &nbsp;&nbsp;&nbsp;Logout
              </MenuItem>
            </Menu>
          </Sidebar>
        )}

        {/* <main className="">
          <div
            className="sb-button  text-black absolute top-4 ml-5 text-4xl"
            onClick={() => {
              if (window.innerWidth <= 800) {
                setIsMobile(true);
                setShowSidebar(!showSidebar);
              } else {
                setShowSidebar(!showSidebar);
                setIsMobile(false);
              }
            }}
          >
            <MenuIcon />
          </div>
        </main> */}
        {/*Sidebar is hidden on smaller screens and visible on larger screens. On smaller screens, we display a clickable sidebar button to toggle the sidebar. */}
      </div>
    </>
  );
};

export default SideBar;
