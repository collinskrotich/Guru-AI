// import React from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardTitle } from "@/components/ui/card";
// import { FcSalesPerformance, FcCustomerSupport } from "react-icons/fc";
// import { MdProductionQuantityLimits, MdInsights } from "react-icons/md";
// import Link from "next/link";

// // Define the types for the props
// interface GuruCardProps {
//   title: string;
//   description: string;
//   icon: React.ComponentType; // For the Icon, we expect a React component
//   link: string;
// }

// //Card Component
// const GuruCard:React.FC<GuruCardProps> = ({ title, description, icon: Icon, link }) => (
//   <Card>
//     <CardContent>
//       <div className="flex items-center justify-between py-4">
//         <CardTitle>{title}</CardTitle>
//         <div className="text-6xl">
//           <Icon />
//         </div>
//       </div>
//       <p className="text-gray-600 mt-2">{description}</p>
//       <Link href={link} passHref>
//         <button className="mt-4 flex items-center text-blue-600 font-semibold group text-2xl">
//           Explore
//           <span className="ml-2 inline-block transform group-hover:translate-x-6 transition-transform duration-300 text-4xl">
//             →
//           </span>
//         </button>
//       </Link>
//     </CardContent>
//   </Card>
// );

// export default function GURUManager() {
//   // Card data
//   const cards = [
//     {
//       title: "Sales Assistant",
//       description: "Prep for meetings and access all the product knowledge, so you can close more deals.",
//       icon: FcSalesPerformance,
//       link: "/application/guru/SalesAssistant"
//     },
//     {
//       title: "Product Recommendations (Retail ) ",
//       description: "Close deals faster, accurately and put customer first.",
//       icon: MdProductionQuantityLimits,
//       link: "/application/guru/RetailAssistant"
//     },
//     {
//       title: "Customer Support",
//       description: "Engage customers with speed and confidence.",
//       icon: FcCustomerSupport,
//       link: "/application/guru/CustomerSupport"
//     },
//     {
//       title: "Customer Insights",
//       description: "Aggregate Intel from market and online for strategy and decision making.",
//       icon: MdInsights,
//       link: "/application/guru/CustomerInsights"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-white p-10">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-green-900">GURU Manager</h1>
//       </div>

//       {/* Main content */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 space-y-6">
//           <section>
//             <h2 className="text-lg font-semibold mb-4 text-gray-700">
//               Pre-made by Safaricom
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-full overflow-hidden">
//               {/* rendered cards */}
//               {cards.map((card, index) => (
//                 <GuruCard
//                   key={index}
//                   title={card.title}
//                   description={card.description}
//                   icon={card.icon}
//                   link={card.link}
//                 />
//               ))}
//             </div>
//           </section>

//           {/* <Button variant="default" className="w-28">
//             New GURU
//           </Button> */}
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";

// import React, { useState } from "react";
// import { Card, CardContent, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ShoppingCart, HeadsetIcon, BarChart, ChevronDown, Plus, MoreHorizontal, Sparkles } from "lucide-react";

// interface GuruCardProps {
//   title: string;
//   description: string;
//   link: string;
//   Icon: React.ElementType;
//   iconColor: string;
// }

// const GuruCard: React.FC<GuruCardProps> = ({ title, description, link, Icon, iconColor }) => (
//   <Card className="bg-gray-100 hover:bg-gray-200 transition-all duration-300 cursor-pointer">
//     <CardContent className="p-6">
//       <div className="flex items-center justify-between mb-4">
//         <div className={`p-2 rounded-full ${iconColor}`}>
//           <Icon className="w-6 h-6 text-white" />
//         </div>
//         <MoreHorizontal className="text-gray-400" />
//       </div>
//       <CardTitle className="text-xl font-bold mb-2 text-black">{title}</CardTitle>
//       <p className="text-gray-600">{description}</p>
//     </CardContent>
//   </Card>
// );

// export default function GURUManager() {
//   const [showAll, setShowAll] = useState(false);

//   const gurus = [
//     {
//       title: "Sales Assistant",
//       description: "Prep for meetings and access all the product knowledge, so you can close more deals.",
//       link: "/application/guru/SalesAssistant",
//       Icon: Sparkles,
//       iconColor: "bg-blue-500"
//     },
//     {
//       title: "Product Recommendations (Retail)",
//       description: "Close deals faster, accurately and put customer first.",
//       link: "/application/guru/RetailAssistant",
//       Icon: ShoppingCart,
//       iconColor: "bg-blue-500"
//     },
//     {
//       title: "Customer Support",
//       description: "Engage customers with speed and confidence.",
//       link: "/application/guru/CustomerSupport",
//       Icon: HeadsetIcon,
//       iconColor: "bg-blue-500"
//     },
//     {
//       title: "Customer Insights",
//       description: "Aggregate Intel from market and online for strategy and decision making.",
//       link: "/application/guru/CustomerInsights",
//       Icon: BarChart,
//       iconColor: "bg-blue-500"
//     }
//   ];

//   const visibleGurus = showAll ? gurus : gurus.slice(0, 4);

//   return (
//     <div className="min-h-screen bg-white p-10">
//       <h1 className="text-4xl font-bold mb-8 text-green-500">GURU manager</h1>
      
//       <div className="mb-8">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-gray-700">Premade by Safaricom</h2>
//           <Button 
//             variant="ghost" 
//             className="text-blue-500 hover:text-blue-600"
//             onClick={() => setShowAll(!showAll)}
//           >
//             Show {showAll ? 'less' : 'more'} <ChevronDown className="ml-2" />
//           </Button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {visibleGurus.map((guru, index) => (
//             <GuruCard
//               key={index}
//               title={guru.title}
//               description={guru.description}
//               link={guru.link}
//               Icon={guru.Icon}
//               iconColor={guru.iconColor}
//             />
//           ))}
//         </div>
//       </div>
      
//       <div>
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-gray-700">Your GURUs</h2>
//           <Button variant="outline" className="text-gray-600 border-gray-300">
//             <Plus className="mr-2" /> New GURU
//           </Button>
//         </div>
//         <Card className="bg-blue-50 text-black">
//           <CardContent className="p-6">
//             <h3 className="text-2xl font-bold mb-2">Check out GURUs</h3>
//             <p>Explore pre-made GURUs or create your own to supercharge your conversations.</p>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }


// "use client";

// import React, { useState } from "react";
// import { Card, CardContent, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ShoppingCart, HeadsetIcon, BarChart, ChevronDown, Plus, MoreHorizontal, Sparkles } from "lucide-react";

// interface GuruCardProps {
//   title: string;
//   description: string;
//   link: string;
//   Icon: React.ElementType;
//   iconColor: string;
// }

// const GuruCard: React.FC<GuruCardProps> = ({ title, description, link, Icon, iconColor }) => (
//   <Card className="bg-gray-50 hover:bg-gray-100 transition-all duration-300 cursor-pointer shadow-sm">
//     <CardContent className="p-6">
//       <div className="flex items-center justify-between mb-4">
//         <div className={`p-2 rounded-full ${iconColor}`}>
//           <Icon className="w-6 h-6 text-white" />
//         </div>
//         <MoreHorizontal className="text-gray-400" />
//       </div>
//       <CardTitle className="text-xl font-bold mb-2 text-gray-800">{title}</CardTitle>
//       <p className="text-gray-600">{description}</p>
//     </CardContent>
//   </Card>
// );

// export default function GURUManager() {
//   const [showAll, setShowAll] = useState(false);

//   const gurus = [
//     {
//       title: "Sales Assistant",
//       description: "Prep for meetings and access all the product knowledge, so you can close more deals.",
//       link: "/application/guru/SalesAssistant",
//       Icon: Sparkles,
//       iconColor: "bg-blue-400"
//     },
//     {
//       title: "Product Recommendations (Retail)",
//       description: "Close deals faster, accurately and put customer first.",
//       link: "/application/guru/RetailAssistant",
//       Icon: ShoppingCart,
//       iconColor: "bg-green-400"
//     },
//     {
//       title: "Customer Support",
//       description: "Engage customers with speed and confidence.",
//       link: "/application/guru/CustomerSupport",
//       Icon: HeadsetIcon,
//       iconColor: "bg-purple-400"
//     },
//     {
//       title: "Customer Insights",
//       description: "Aggregate Intel from market and online for strategy and decision making.",
//       link: "/application/guru/CustomerInsights",
//       Icon: BarChart,
//       iconColor: "bg-orange-400"
//     }
//   ];

//   const visibleGurus = showAll ? gurus : gurus.slice(0, 4);

//   return (
//     <div className="min-h-screen bg-gray-50 p-10">
//       <h1 className="text-4xl font-bold mb-8 text-gray-800">GURU manager</h1>
      
//       <div className="mb-8">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-gray-700">Premade by Safaricom</h2>
//           <Button
//             variant="ghost"
//             className="text-blue-600 hover:text-blue-700"
//             onClick={() => setShowAll(!showAll)}
//           >
//             Show {showAll ? 'less' : 'more'} <ChevronDown className="ml-2" />
//           </Button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {visibleGurus.map((guru, index) => (
//             <GuruCard
//               key={index}
//               title={guru.title}
//               description={guru.description}
//               link={guru.link}
//               Icon={guru.Icon}
//               iconColor={guru.iconColor}
//             />
//           ))}
//         </div>
//       </div>
      
//       <div>
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-gray-700">Your GURUs</h2>
//           <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-100">
//             <Plus className="mr-2" /> New GURU
//           </Button>
//         </div>
//         <Card className="bg-blue-50 text-gray-800 shadow-sm">
//           <CardContent className="p-6">
//             <h3 className="text-2xl font-bold mb-2">Check out GURUs</h3>
//             <p>Explore pre-made GURUs or create your own to supercharge your conversations.</p>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { ArrowLeft, Plus, Brain, Gem, HelpCircle, Clock, Settings, Search, Mic, LogOut } from 'lucide-react';

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

//   const handleLinkClick = (e, link) => {
//     e.preventDefault();
//     setActiveLink(link);
//     window.history.pushState({}, '', link);
//     // Trigger a custom event for page changes
//     window.dispatchEvent(new CustomEvent('pageChange', { detail: { path: link } }));
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






// "use client";

// import React, { useState } from "react";
// import { Card, CardContent, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ShoppingCart, HeadsetIcon, BarChart, ChevronDown, Plus, MoreHorizontal, Sparkles } from "lucide-react";

// interface GuruCardProps {
//   title: string;
//   description: string;
//   link: string;
//   Icon: React.ElementType;
//   iconColor: string;
// }

// const GuruCard: React.FC<GuruCardProps> = ({ title, description, link, Icon, iconColor }) => (
//   <Card className="bg-gray-50 hover:bg-gray-100 transition-all duration-300 cursor-pointer shadow-sm">
//     <CardContent className="p-6">
//       <div className="flex items-center justify-between mb-4">
//         <div className={`p-2 rounded-full ${iconColor}`}>
//           <Icon className="w-6 h-6 text-white" />
//         </div>
//         <MoreHorizontal className="text-gray-400" />
//       </div>
//       <CardTitle className="text-xl font-bold mb-2 text-gray-800">{title}</CardTitle>
//       <p className="text-gray-600">{description}</p>
//     </CardContent>
//   </Card>
// );

// const GURUManager: React.FC = () => {
//   const [showAll, setShowAll] = useState(false);

//   const gurus = [
//     {
//       title: "Sales Assistant",
//       description: "Prep for meetings and access all the product knowledge, so you can close more deals.",
//       link: "/application/guru/SalesAssistant",
//       Icon: Sparkles,
//       iconColor: "bg-blue-400"
//     },
//     {
//       title: "Product Recommendations (Retail)",
//       description: "Close deals faster, accurately and put customer first.",
//       link: "/application/guru/RetailAssistant",
//       Icon: ShoppingCart,
//       iconColor: "bg-green-400"
//     },
//     {
//       title: "Customer Support",
//       description: "Engage customers with speed and confidence.",
//       link: "/application/guru/CustomerSupport",
//       Icon: HeadsetIcon,
//       iconColor: "bg-purple-400"
//     },
//     {
//       title: "Customer Insights",
//       description: "Aggregate Intel from market and online for strategy and decision making.",
//       link: "/application/guru/CustomerInsights",
//       Icon: BarChart,
//       iconColor: "bg-orange-400"
//     }
//   ];

//   const visibleGurus = showAll ? gurus : gurus.slice(0, 4);

//   return (
//     <div className="min-h-screen bg-gray-50 p-10">
//       <h1 className="text-4xl font-bold mb-8 text-gray-800">GURU manager</h1>
      
//       <div className="mb-8">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-gray-700">Premade by Safaricom</h2>
//           <Button
//             variant="ghost"
//             className="text-blue-600 hover:text-blue-700"
//             onClick={() => setShowAll(!showAll)}
//           >
//             Show {showAll ? 'less' : 'more'} <ChevronDown className="ml-2" />
//           </Button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {visibleGurus.map((guru, index) => (
//             <GuruCard
//               key={index}
//               title={guru.title}
//               description={guru.description}
//               link={guru.link}
//               Icon={guru.Icon}
//               iconColor={guru.iconColor}
//             />
//           ))}
//         </div>
//       </div>
      
//       <div>
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-gray-700">Your GURUs</h2>
//           <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-100">
//             <Plus className="mr-2" /> New GURU
//           </Button>
//         </div>
//         <Card className="bg-blue-50 text-gray-800 shadow-sm">
//           <CardContent className="p-6">
//             <h3 className="text-2xl font-bold mb-2">Check out GURUs</h3>
//             <p>Explore pre-made GURUs or create your own to supercharge your conversations.</p>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default GURUManager;



"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, HeadsetIcon, BarChart, ChevronDown, Plus, MoreHorizontal, Sparkles } from "lucide-react";
import Link from "next/link";

interface GuruCardProps {
  title: string;
  description: string;
  link: string;
  Icon: React.ElementType;
  iconColor: string;
  isSelected: boolean;
  // onClick: () => void;
}

// const GuruCard: React.FC<GuruCardProps> = ({ title, description, link, Icon, iconColor, isSelected, onClick }) => (
  const GuruCard: React.FC<GuruCardProps> = ({ title, description, link, Icon, iconColor, isSelected }) => (
  <Card 
    className={`bg-gray-50 hover:bg-gray-100 transition-all duration-300 cursor-pointer shadow-sm ${isSelected ? 'bg-sky-200' : ''}`}
    // onClick={onClick}
  >
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-full ${iconColor}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <MoreHorizontal className="text-gray-400" />
      </div>
      <CardTitle className="text-xl font-bold mb-2 text-gray-800">{title}</CardTitle>
      <p className="text-gray-600">{description}</p>
      <Link href={link} passHref>
        <button className="mt-4 flex items-center text-blue-600 font-semibold group text-2xl">
          Explore
          <span className="ml-2 inline-block transform group-hover:translate-x-6 transition-transform duration-300 text-4xl">
            →
          </span>
        </button>
      </Link>
    </CardContent>
  </Card>
);

const GURUManager: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedGuru, setSelectedGuru] = useState<string | null>(null);

  const gurus = [
    {
      title: "Sales Assistant",
      description: "Prep for meetings and access all the product knowledge, so you can close more deals.",
      link: "/application/guru/SalesAssistant",
      Icon: Sparkles,
      iconColor: "bg-blue-400"
    },
    {
      title: "Product Recommendations (Retail)",
      description: "Close deals faster, accurately and put customer first.",
      link: "/application/guru/RetailAssistant",
      Icon: ShoppingCart,
      iconColor: "bg-green-400"
    },
    {
      title: "Customer Support",
      description: "Engage customers with speed and confidence.",
      link: "/application/guru/CustomerSupport",
      Icon: HeadsetIcon,
      iconColor: "bg-purple-400"
    },
    {
      title: "Customer Insights",
      description: "Aggregate Intel from market and online for strategy and decision making.",
      link: "/application/guru/CustomerInsights",
      Icon: BarChart,
      iconColor: "bg-orange-400"
    }
  ];

  const visibleGurus = showAll ? gurus : gurus.slice(0, 4);

  useEffect(() => {
    const handlePopState = () => {
      const currentPath = window.location.pathname;
      const guru = gurus.find(g => g.link === currentPath);
      if (guru) {
        setSelectedGuru(guru.link);
      }
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState(); // Set initial state

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // const handleGuruClick = (link: string) => {
  //   setSelectedGuru(link);
  //   window.history.pushState({}, '', link);
  //   window.dispatchEvent(new Event('popstate'));
  // };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">GURU manager</h1>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Premade by Safaricom</h2>
          <Button
            variant="ghost"
            className="text-blue-600 hover:text-blue-700"
            onClick={() => setShowAll(!showAll)}
          >
            Show {showAll ? 'less' : 'more'} <ChevronDown className="ml-2" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleGurus.map((guru, index) => (
            <GuruCard
              key={index}
              title={guru.title}
              description={guru.description}
              link={guru.link}
              Icon={guru.Icon}
              iconColor={guru.iconColor}
              isSelected={selectedGuru === guru.link}
              // onClick={() => handleGuruClick(guru.link)}
            />
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Your GURUs</h2>
          <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-100">
            <Plus className="mr-2" /> New GURU
          </Button>
        </div>
        <Card className="bg-blue-50 text-gray-800 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold mb-2">Check out GURUs</h3>
            <p>Explore pre-made GURUs or create your own to supercharge your conversations.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GURUManager;