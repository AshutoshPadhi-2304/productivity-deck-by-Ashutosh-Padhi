import React from "react";

import { Favorite, List, TimeTracking, NeetoKb, Globe } from "neetoicons";
import { useLocation, Link } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navLinks = [
    { to: "/kanban", icon: List },
    { to: "/pomodoro", icon: TimeTracking },
    { to: "/news", icon: Globe },
    { to: "/favorite", icon: Favorite },
  ];

  return (
    <nav className="flex h-screen w-16 flex-col items-center space-y-6 border-r-2 border-gray-200 py-4">
      <div className="neeto-ui-bg-black neeto-ui-text-white rounded-md p-0.5">
        <Link to="/kanban">
          <NeetoKb className="cursor-pointer" size={24} />
        </Link>
      </div>
      {navLinks.map(({ to, icon: Icon }) => (
        <div key={to}>
          <Link to={to}>
            <Icon
              size={24}
              className={`cursor-pointer rounded-md p-0.5 ${
                currentPath === to
                  ? "bg-black text-white"
                  : "text-gray-800 hover:bg-gray-900 hover:text-white"
              }`}
            />
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default Sidebar;
