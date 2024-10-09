"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useMemo } from "react";
import { BsGem } from "react-icons/bs";
import { TfiHelpAlt } from "react-icons/tfi";
import { GiBackwardTime } from "react-icons/gi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
import { IoSearchOutline } from "react-icons/io5";
import { IoMicOutline } from "react-icons/io5"
import { FaBrain } from "react-icons/fa";

const menuItems = [
  { id: 1, label: "AI Search", icon: IoSearchOutline, link: "/application" },
  { id: 2, label: "Explore Gurus", icon: BsGem, link: "/application/guru" },
  { id: 6, label: "Guru Live", icon: IoMicOutline, link: "/application/guruLive" },
  { id: 7, label: "Brain", icon: FaBrain, link: "/application/brain" },
  { id: 3, label: "Help", icon: TfiHelpAlt, link: "/application/help" },
  { id: 4, label: "Activity", icon: GiBackwardTime, link: "/application/activities" },
  { id: 5, label: "Settings", icon: IoSettingsOutline, link: "/application/settings" },
];

type MenuItem = {
  id: number;
  label: string;
  icon: React.ComponentType;
  link: string;
};

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(true);
  const [isCollapsible, setIsCollapsible] = useState(false);

  // access current path
  const pathname = usePathname();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === pathname),
    [pathname]
  );

  const wrapperClasses = classNames(
    "h-screen  p-4 bg-slate-100 flex justify-between flex-col relative",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu: MenuItem) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-sky-200"]: activeMenu?.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col ">
        <div className="flex flex-col items-start space-y-10 relative ">
          <button className={collapseIconClasses} onClick={handleSidebarToggle}>
            <FaArrowLeft />
          </button>

          <Link href="/new-chat">
            <div className="flex py-4 px-3 items-center w-full h-full bg-slate-300 rounded-full">
              <div style={{ width: "2.5rem" }}>
                <FaPlus />
              </div>
              {!toggleCollapse && (
                <span
                  className={classNames("text-md font-medium text-text-light")}
                >
                  New chat
                </span>
              )}
            </div>
          </Link>
        </div>

        <div className="flex flex-col items-start ">
          {menuItems.map((menu) => {
            const classes = getNavItemClasses(menu);
            const Icon = menu.icon;
            return (
              <div className={classes} key={menu.id}>
                <Link href={menu.link}>
                  <div className="flex py-4 px-3 items-center w-full h-full">
                    <div style={{ width: "2.5rem" }}>
                      <Icon />
                    </div>
                    {!toggleCollapse && (
                      <span
                        className={classNames(
                          "text-md font-medium text-text-light"
                        )}
                      >
                        {menu.label}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}

      <div className="flex  px-3 items-center ">
        <div style={{ width: "2.5rem" }}>
          <GrLogout />
        </div>
        {!toggleCollapse && (
          <span className={classNames("text-lg font-bold text-text-light")}>
            Logout
          </span>
        )}
      </div>
        </div>
      </div>
{/* 
      <div className="flex  px-3 items-center">
        <div style={{ width: "2.5rem" }}>
          <GrLogout />
        </div>
        {!toggleCollapse && (
          <span className={classNames("text-md font-medium text-text-light")}>
            Logout
          </span>
        )}
      </div> */}
    </div>
  );
};


export default Sidebar;

// "use client";

// import React, { useState, useEffect } from 'react';
// import { 
//   ArrowLeft, Plus, Brain, Gem, HelpCircle, Clock, 
//   Settings, Search, Mic, LogOut
// } from 'lucide-react';

// const menuItems = [
//   { id: 1, label: "AI Search", icon: Search, link: "/application" },
//   { id: 2, label: "Explore Gurus", icon: Gem, link: "/application/guru" },
//   { id: 6, label: "Guru Live", icon: Mic, link: "/application/guruLive" },
//   { id: 7, label: "Brain", icon: Brain, link: "/application/brain" },
//   { id: 3, label: "Help", icon: HelpCircle, link: "/application/help" },
//   { id: 4, label: "Activity", icon: Clock, link: "/application/activities" },
//   { id: 5, label: "Settings", icon: Settings, link: "/application/settings" },
// ];

// const Sidebar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [activeLink, setActiveLink] = useState('/application');

//   useEffect(() => {
//     setActiveLink(window.location.pathname);
//   }, []);

//   const toggleCollapse = () => setIsCollapsed(!isCollapsed);

//   const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
//     e.preventDefault();
//     setActiveLink(link);
//     window.history.pushState({}, '', link);
//   };

//   const sidebarWidth = isCollapsed ? 'w-20' : 'w-64';

//   return (
//     <div className={`h-screen bg-slate-100 flex flex-col justify-between p-4 ${sidebarWidth} transition-all duration-300 relative`}>
//       <div>
//         <button 
//           onClick={toggleCollapse}
//           className={`absolute top-4 ${isCollapsed ? '-right-4' : 'right-4'} p-2 rounded bg-slate-200 hover:bg-slate-300 transition-colors`}
//           aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
//         >
//           <ArrowLeft className={`transform ${isCollapsed ? 'rotate-180' : ''} transition-transform duration-300`} />
//         </button>
        
//         <a 
//           href="/application/guru"
//           onClick={(e) => handleLinkClick(e, '/application/guru')}
//           className={`w-full mt-12 mb-8 flex items-center justify-center bg-slate-300 hover:bg-slate-400 rounded-full py-2 ${isCollapsed ? 'px-2' : 'px-4'} transition-colors`}
//         >
//           <Plus size={20} />
//           {!isCollapsed && <span className="ml-2">New chat</span>}
//         </a>
        
//         <nav>
//           {menuItems.map((item) => (
//             <a 
//               key={item.id}
//               href={item.link}
//               onClick={(e) => handleLinkClick(e, item.link)}
//               className={`flex items-center py-2 px-4 rounded-lg mb-2 ${activeLink === item.link ? 'bg-sky-200' : 'hover:bg-slate-200'} transition-colors`}
//             >
//               <item.icon size={20} />
//               {!isCollapsed && <span className="ml-4">{item.label}</span>}
//             </a>
//           ))}
//         </nav>
//       </div>
      
//       <button className="flex items-center py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors">
//         <LogOut size={20} />
//         {!isCollapsed && <span className="ml-4">Logout</span>}
//       </button>
//     </div>
//   );
// };

// export default Sidebar;
