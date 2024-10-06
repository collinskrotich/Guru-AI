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
import { IoHomeOutline } from "react-icons/io5";

const menuItems = [
  { id: 1, label: "Home", icon: IoHomeOutline , link: "/application" },
  { id: 2, label: "GURU Manager", icon: BsGem, link: "/application/guru" },
  { id: 3, label: "Help", icon: TfiHelpAlt, link: "/application/help" },
  { id: 4, label: "Activity", icon: GiBackwardTime, link: "/application/activities" },
  { id: 5, label: "Settings", icon: IoSettingsOutline, link: "/application/settings" },
];

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  // access current path
  const pathname = usePathname();


  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === pathname),
    [pathname]
  );

  const wrapperClasses = classNames(
    "h-screen px-4 pt-8 pb-4 bg-slate-100 flex justify-between flex-col",
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

  const getNavItemClasses = (menu) => {
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
      <div className="flex flex-col">
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

        <div className="flex flex-col items-start mt-96">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            const classes = getNavItemClasses(menu);
            return (
              <div className={classes}>
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
        </div>
      </div>

      <div className="flex py-4 px-3 items-center w-full h-full">
        <div style={{ width: "2.5rem" }}>
          <GrLogout />
        </div>
        {!toggleCollapse && (
          <span className={classNames("text-md font-medium text-text-light")}>
            Logout
          </span>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
