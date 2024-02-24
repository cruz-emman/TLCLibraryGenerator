import { NavbarLinks } from "@/data";
import { LayoutDashboard } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className='"fixed left-0 top-0 z-40 h-screen w-64 transition-transform'>
      <div className="flex flex-col h-full px-3 py-4 overflow-y-auto border-r border-slate-200 ">
        <div className="flex items-center px-3 py-2 mb-10 rounded-lg">
          <LayoutDashboard />
          <span className="ml-3 text-base font-semibold">TCET</span>
        </div>

        <ul className="space-y-2 text-sm font-medium">
          {NavbarLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={`${link.path}`}
                className="flex items-center px-3 py-2 rounded-lg text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
              >
                <span className="flex-1 ml-3 whitespace-nowrap">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
