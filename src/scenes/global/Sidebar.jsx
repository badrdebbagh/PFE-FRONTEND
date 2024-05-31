import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  DocumentIcon,
  Bars3Icon as MenuIcon,
} from "@heroicons/react/24/outline";
import { jwtDecode } from "jwt-decode";
import { Button } from "../../componentsShadn/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "../../state/authentication/Action";

const SidebarItem = ({ title, to, icon: Icon, selected, setSelected }) => {
  const isSelected = selected === title;
  return (
    <Link
      to={to}
      className={`flex items-center p-3 my-1 rounded-md transition-colors duration-200 ${
        isSelected
          ? "bg-orange-500 text-white"
          : "bg-transparent text-orange-500 hover:bg-orange-100"
      }`}
      onClick={() => setSelected(title)}
    >
      <Icon className="h-5 w-5 mr-3" />
      <span>{title}</span>
    </Link>
  );
};

const Sidebar = () => {
  const [selected, setSelected] = useState("Dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jwt = localStorage.getItem("jwt");
  const decoded = jwtDecode(jwt);
  const userRole = decoded.authorities;
  const handleLogout = () => {
    dispatch(logout(navigate));
  };
  return (
    <div className="h-screen bg-white shadow-lg flex flex-col transition w-[300px]">
      <div className="flex items-center justify-center p-4 border-b">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-md bg-[#f2762a] "
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>
      <div className={`flex-1 p-4 ${isCollapsed ? "hidden" : "block"} `}>
        {userRole === "ADMIN" && (
          <>
            <SidebarItem
              title="Dashboard"
              to="/"
              icon={HomeIcon}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="Gestion des utilisateurs"
              to="/team"
              icon={UsersIcon}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="Projects"
              to="/projects"
              icon={DocumentIcon}
              selected={selected}
              setSelected={setSelected}
            />
          </>
        )}
        {userRole === "CHEF_DE_PROJECT" && (
          <>
            <SidebarItem
              title="Affectation"
              to="/affectation"
              icon={HomeIcon}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="Projects"
              to="/projects"
              icon={DocumentIcon}
              selected={selected}
              setSelected={setSelected}
            />
          </>
        )}
        {userRole === "USER" && (
          <>
            <SidebarItem
              title="Projects"
              to="/projects"
              icon={DocumentIcon}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="Tests"
              to="/tests"
              icon={DocumentIcon}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="Projects saisie"
              to="/projects2"
              icon={DocumentIcon}
              selected={selected}
              setSelected={setSelected}
            />
          </>
        )}
        <div className="  h-1/2  flex items-center justify-center">
          <Button onClick={handleLogout} variant="thirdly">
            Se Deconnecter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
