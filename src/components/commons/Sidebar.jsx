import React from "react";

import { Favorite, List, TimeTracking, NeetoKb, Globe } from "neetoicons";

const Sidebar = () => (
  <nav className="flex h-screen w-16 flex-col items-center space-y-6 border-r-2 border-gray-200 py-4">
    <div className="neeto-ui-bg-black neeto-ui-text-white rounded-md p-0.5">
      <NeetoKb className="cursor-pointer" size={24} />
    </div>
    <div>
      <List
        className="hover:neeto-ui-text-white cursor-pointer rounded-md p-0.5 hover:bg-gray-900"
        size={24}
      />
    </div>
    <div>
      <TimeTracking
        className="hover:neeto-ui-text-white cursor-pointer rounded-md p-0.5 hover:bg-gray-900"
        size={24}
      />
    </div>
    <div>
      <Globe
        className="hover:neeto-ui-text-white cursor-pointer rounded-md p-0.5 hover:bg-gray-900"
        size={24}
      />
    </div>
    <div>
      <Favorite
        className="hover:neeto-ui-text-white cursor-pointer rounded-md p-0.5 hover:bg-gray-900"
        size={24}
      />
    </div>
  </nav>
);

export default Sidebar;
