import React from "react";

import { NAV_LINKS } from "components/constants";
import { NeetoKb } from "neetoicons";
import { useLocation, Link } from "react-router-dom";

const Sidebar = () => {
  const currentPath = useLocation().pathname;

  return (
    <nav className="flex h-screen w-16 flex-col items-center space-y-6 border-r-2 border-gray-200 py-4">
      <div className="neeto-ui-bg-black neeto-ui-text-white rounded-md p-0.5">
        <Link to="/kanban">
          <NeetoKb className="cursor-pointer" size={24} />
        </Link>
      </div>
      {NAV_LINKS.map(({ to, icon: Icon }) => (
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
