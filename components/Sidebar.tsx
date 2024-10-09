"use client";

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Plus, Brain, Gem, HelpCircle, Clock, 
  Settings, Search, Mic, LogOut
} from 'lucide-react';

const menuItems = [
  { id: 1, label: "AI Search", icon: Search, link: "/application" },
  { id: 2, label: "Explore Gurus", icon: Gem, link: "/application/guru" },
  { id: 6, label: "Guru Live", icon: Mic, link: "/application/guruLive" },
  { id: 7, label: "Brain", icon: Brain, link: "/application/brain" },
  { id: 3, label: "Help", icon: HelpCircle, link: "/application/help" },
  { id: 4, label: "Activity", icon: Clock, link: "/application/activities" },
  { id: 5, label: "Settings", icon: Settings, link: "/application/settings" },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeLink, setActiveLink] = useState('/application');

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    setActiveLink(link);
    window.history.pushState({}, '', link);
  };

  const sidebarWidth = isCollapsed ? 'w-20' : 'w-64';

  return (
    <div className={`h-screen bg-slate-100 flex flex-col justify-between p-4 ${sidebarWidth} transition-all duration-300 relative`}>
      <div>
        <button 
          onClick={toggleCollapse}
          className={`absolute top-4 ${isCollapsed ? '-right-4' : 'right-4'} p-2 rounded bg-slate-200 hover:bg-slate-300 transition-colors`}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ArrowLeft className={`transform ${isCollapsed ? 'rotate-180' : ''} transition-transform duration-300`} />
        </button>
        
        <a 
          href="/application/guru"
          onClick={(e) => handleLinkClick(e, '/application/guru')}
          className={`w-full mt-12 mb-8 flex items-center justify-center bg-slate-300 hover:bg-slate-400 rounded-full py-2 ${isCollapsed ? 'px-2' : 'px-4'} transition-colors`}
        >
          <Plus size={20} />
          {!isCollapsed && <span className="ml-2">New chat</span>}
        </a>
        
        <nav>
          {menuItems.map((item) => (
            <a 
              key={item.id}
              href={item.link}
              onClick={(e) => handleLinkClick(e, item.link)}
              className={`flex items-center py-2 px-4 rounded-lg mb-2 ${activeLink === item.link ? 'bg-sky-200' : 'hover:bg-slate-200'} transition-colors`}
            >
              <item.icon size={20} />
              {!isCollapsed && <span className="ml-4">{item.label}</span>}
            </a>
          ))}
        </nav>
      </div>
      
      <button className="flex items-center py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors">
        <LogOut size={20} />
        {!isCollapsed && <span className="ml-4">Logout</span>}
      </button>
    </div>
  );
};

export default Sidebar;
