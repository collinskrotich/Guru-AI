// "use client";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { TypeAnimation } from "react-type-animation";

// export default function Home() {
//   const router = useRouter();

//   const handleClick = () => {
//     router.push("/application"); // Navigate to /application
//   };

//   return (

//     <div
//       className="relative min-h-screen bg-black text-white"
//       // style={{
//       //   backgroundImage: "url('/ai.jpg')", // Path to your image
//       //   backgroundSize: "cover", // Cover the whole page
//       //   backgroundPosition: "center",
//       //   opacity: 0.9, // Center the image
//       // }}
//     >
//       {/* Header */}
//       <header className="flex items-center justify-between px-6 py-4 bg-gray-900">
//         <div className="text-lg font-bold">
//           <span className="bg-gray-700 text-white px-2 py-1 rounded">
//             GURU 
//           </span>
//           <span className="text-gray-400 ml-2">WORK AI FOR ME </span>
//         </div>
//         <button
//            onClick={handleClick}
//           className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-300 transition"
//         >
//           TryGURU
//         </button>
//       </header>

//       {/* Main Content */}
//       <main className="flex flex-col items-center justify-center h-[calc(100vh-64px)] text-center">
//         {/* Background Elements */}
//         {/* <div className="absolute inset-0 flex justify-center items-center">
//           <div className="h-64 w-64 bg-green-600 opacity-20 rounded-full"></div>
//           <div className="h-32 w-32 bg-green-800 opacity-10 rounded-full absolute top-10 right-20"></div>
//         </div> */}

//         {/* Text and Button */}
//         <h1 className="text-6xl font-extrabold text-gray-100 mb-4">
//           Do your <span className="text-green-400">best ...</span>
//         </h1>
//         <div className="text-6xl font-extrabold text-gray-100 mb-4">
//           <TypeAnimation
//             sequence={[
//               "Brainstorming",
//               1000,
//               "Closing deals",
//               1000,
//               "Debugging Devices",
//               1000,
//                "Recommending IoT SIM Card",
//               1000,
//               "Drafting SLAs",
//               1000,
//               "Analysing Test Report",
//               1000,

//               // Prepare me for a meeting with KenGen  on IoT Fuel management solution and Site sensors
//               // Plan a pre-sales survey with Eldoret Water 
//               // 	Recommend an IoT SIM card profile with package
//               // 	
//               // 	Summarize IoT CoE Squad Teams stand up
//               // 	
//               // 	Update me on the status of the VT08 Video Telematics Devices tests/ validations 
//               // 	Analyze and debug Shangda (MajiSmart) integrations
//               // 	Show me list of pre-qualified Video Telematics Vendors
//               // 	Do a Market analysis and share a list of suppliers for Temp Tag Batteries
//               // 	
//               // 	
//               // 	Research the latest trends in IoT and cloud technology and prepare a report for our next product launch
//               // 	Summarize Q3 Cloud financial report
//               // 	Generate a usage report for our IoT devices in the past quarter
//               // 	Do a Market analysis and share a list of suppliers for Temp Tag Batteries
//               // 	Monitor stock levels and forecast demand for IoT devices to ensure optimal stock availability
//               // 	Confirm if the supplier is prequalified and review attached quote.
//               // 	Give me the total number of devices we have in our inventory
//               // 	Configure for me a GPS Tracking device
//               // 	Prepare an FAQ document on our IoT solutions for the customer support team
//               // 	Generate monthly performance reports for connected IoT devices
//               // 	Propose a maintenance schedule for our deployed GPS tracking devices
//               // 	Do a Market analysis and share a list of suppliers for Temp Tag Batteries
//               // 	Monitor our inventory of Temp Tag Batteries and set up automated reorder alerts
//               // 	Assist with preparing tender documents for large-scale IoT implementation
//               // 	Research local and international regulations for temperature-sensitive IoT devices
//               // 	Prepare a detailed report on the competition in the smart water metering market
//               // 	Draft a service-level agreement (SLA) for IoT device maintenance
//               // 	Assess the current market for 5G IoT solutions and share opportunities
//               // 	Research the best pricing and availability for Temp Tag Batteries
//               // 	Schedule a follow-up calls with the KQ to discuss the proposal
//               // 	Set up sales meeting with a prospective customer 
//               // 	Draft personalized email replies to video customer inquiries
//               // 	Develop a training guide for field engineers on the new IoT devices
//               // 	Draft a technical specification document for a new IoT device
              

//             ]}
//             speed={50}
//             repeat={Infinity}
//             style={{ fontSize: "2em" }}
//           />
//         </div>

//         <p className="text-gray-400 mb-8">
//           GURU is your personalized work AI assistant powered by
//           Safaricom’s most capable model, TryGURU.
//         </p>

//         {/* <Link href="/application">
//           <button className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-300 transition">
//             TryGURU
//           </button>
//         </Link> */}
//       </main>
//     </div>
//   );
// }


// IDEA 2

// "use client";

// import React, { useState, useEffect } from 'react';

// const messages = [
//   "Prepare me for a meeting with KenGen on IoT Fuel management solution and Site sensors",
//   "Plan a pre-sales survey with Eldoret Water",
//   "Recommend an IoT SIM card profile with package",
//   "Summarize IoT CoE Squad Teams stand up",
//   "Update me on the status of the VT08 Video Telematics Devices tests/ validations",
//   "Analyze and debug Shangda (MajiSmart) integrations",
//   "Show me list of pre-qualified Video Telematics Vendors",
//   "Do a Market analysis and share a list of suppliers for Temp Tag Batteries",
//   "Research the latest trends in IoT and cloud technology and prepare a report for our next product launch",
//   "Summarize Q3 Cloud financial report",
//   "Generate a usage report for our IoT devices in the past quarter",
//   "Monitor stock levels and forecast demand for IoT devices to ensure optimal stock availability",
//   "Confirm if the supplier is prequalified and review attached quote.",
//   "Give me the total number of devices we have in our inventory",
//   "Configure for me a GPS Tracking device",
//   "Prepare an FAQ document on our IoT solutions for the customer support team",
//   "Generate monthly performance reports for connected IoT devices",
//   "Propose a maintenance schedule for our deployed GPS tracking devices",
//   "Monitor our inventory of Temp Tag Batteries and set up automated reorder alerts",
//   "Assist with preparing tender documents for large-scale IoT implementation",
//   "Research local and international regulations for temperature-sensitive IoT devices",
//   "Prepare a detailed report on the competition in the smart water metering market",
//   "Draft a service-level agreement (SLA) for IoT device maintenance",
//   "Assess the current market for 5G IoT solutions and share opportunities",
//   "Research the best pricing and availability for Temp Tag Batteries",
//   "Schedule a follow-up calls with the KQ to discuss the proposal",
//   "Set up sales meeting with a prospective customer",
//   "Draft personalized email replies to video customer inquiries",
//   "Develop a training guide for field engineers on the new IoT devices",
//   "Draft a technical specification document for a new IoT device"
// ];

// const TypewriterText = ({ speed = 50 }) => {
//   const [displayText, setDisplayText] = useState('');
//   const [messageIndex, setMessageIndex] = useState(0);

//   useEffect(() => {
//     let i = 0;
//     const currentMessage = messages[messageIndex];
    
//     const typingEffect = setInterval(() => {
//       if (i <= currentMessage.length) {
//         setDisplayText(currentMessage.slice(0, i));
//         i++;
//       } else {
//         clearInterval(typingEffect);
//         setTimeout(() => {
//           setDisplayText('');
//           setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
//         }, 2000); // Wait 2 seconds before starting the next message
//       }
//     }, speed);

//     return () => clearInterval(typingEffect);
//   }, [messageIndex, speed]);

//   return <span>{displayText}</span>;
// };

// const GuruAIInterface = () => {
//   return (
//     <div className="flex h-screen bg-gray-900 text-white font-sans">
//       <div className="w-1/2 p-12 flex flex-col justify-center">
//         <h1 className="text-5xl font-bold mb-8 text-white">
//           GURU
//           <span className="block text-2xl font-normal mt-2 text-green-500">WORK AI FOR ME</span>
//         </h1>
//         <p className="text-xl text-gray-300 h-24 border-l-4 border-green-500 pl-4">
//           <TypewriterText speed={30} />
//         </p>
//       </div>
//       <div className="w-1/2 bg-black bg-opacity-50 p-12 flex flex-col justify-center items-center">
//         <h2 className="text-4xl font-bold mb-12 text-green-500">TryGURU</h2>
//         <div className="w-64">
//           <a 
//             href="/application" 
//             className="block w-full bg-transparent text-green-500 py-3 px-6 rounded-full border-2 border-green-500 hover:bg-green-500 hover:text-black transition duration-300 text-lg font-semibold text-center"
//           >
//             Log in
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GuruAIInterface;


/// IDEA - 3


// "use client";

// import React, { useState, useEffect } from 'react';

// const messages = [
//   "Prepare me for a meeting with KenGen on IoT Fuel management solution and Site sensors",
//   "Plan a pre-sales survey with Eldoret Water",
//   "Recommend an IoT SIM card profile with package",
//   "Summarize IoT CoE Squad Teams stand up",
//   "Update me on the status of the VT08 Video Telematics Devices tests/ validations",
//   "Pull a report from SF of all the deals I closed last month and predict next month's numbers",
//   "Analyze and debug Shangda (MajiSmart) integrations",
//   "Show me list of pre-qualified Video Telematics Vendors",
//   "Do a Market analysis and share a list of suppliers for Temp Tag Batteries",
//   "Research the latest trends in IoT and cloud technology and prepare a report for our next product launch",
//   "Summarize Q3 Cloud financial report",
//   "Generate a usage report for our IoT devices in the past quarter",
//   "Monitor stock levels and forecast demand for IoT devices to ensure optimal stock availability",
//   "Confirm if the supplier is prequalified and review attached quote.",
//   "Give me the total number of devices we have in our inventory",
//   "Configure for me a GPS Tracking device",
//   "Prepare an FAQ document on our IoT solutions for the customer support team",
//   "Generate monthly performance reports for connected IoT devices",
//   "Propose a maintenance schedule for our deployed GPS tracking devices",
//   "Monitor our inventory of Temp Tag Batteries and set up automated reorder alerts",
//   "Assist with preparing tender documents for large-scale IoT implementation",
//   "Research local and international regulations for temperature-sensitive IoT devices",
//   "Prepare a detailed report on the competition in the smart water metering market",
//   "Draft a service-level agreement (SLA) for IoT device maintenance",
//   "Assess the current market for 5G IoT solutions and share opportunities",
//   "Research the best pricing and availability for Temp Tag Batteries",
//   "Schedule a follow-up calls with the KQ to discuss the proposal",
//   "Set up sales meeting with a prospective customer",
//   "Draft personalized email replies to video customer inquiries",
//   "Develop a training guide for field engineers on the new IoT devices",
//   "Draft a technical specification document for a new IoT device"
// ];

// const TypewriterText = ({ speed = 50 }) => {
//   const [displayText, setDisplayText] = useState('');
//   const [messageIndex, setMessageIndex] = useState(0);

//   useEffect(() => {
//     let i = 0;
//     const currentMessage = messages[messageIndex];
    
//     const typingEffect = setInterval(() => {
//       if (i <= currentMessage.length) {
//         setDisplayText(currentMessage.slice(0, i));
//         i++;
//       } else {
//         clearInterval(typingEffect);
//         setTimeout(() => {
//           setDisplayText('');
//           setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
//         }, 2000); // Wait 2 seconds before starting the next message
//       }
//     }, speed);

//     return () => clearInterval(typingEffect);
//   }, [messageIndex, speed]);

//   return <span>{displayText}</span>;
// };

// const GuruAIInterface = () => {
//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900 text-white font-sans">
//       <div className="w-full lg:w-2/3 p-6 lg:p-12 flex flex-col justify-center">
//         <h1 className="text-4xl lg:text-5xl font-bold mb-4 lg:mb-8 text-white">
//           GURU
//           <span className="block text-xl lg:text-2xl font-normal mt-2 text-green-500">WORK AI FOR ME</span>
//         </h1>
//         <p className="text-lg lg:text-xl text-gray-300 h-24 border-l-4 border-green-500 pl-4">
//           <TypewriterText speed={30} />
//         </p>
//       </div>
//       <div className="w-full lg:w-1/3 bg-black bg-opacity-50 p-6 lg:p-12 flex flex-col justify-center items-center">
//         <h2 className="text-3xl lg:text-4xl font-bold mb-8 lg:mb-12 text-green-500">TryGURU</h2>
//         <div className="w-full max-w-xs">
//           <a 
//             href="/application" 
//             className="block w-full bg-transparent text-green-500 py-3 px-6 rounded-full border-2 border-green-500 hover:bg-green-500 hover:text-black transition duration-300 text-lg font-semibold text-center"
//           >
//             Log in
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GuruAIInterface;



// IDEA - 4

// "use client";
// import React, { useState, useEffect } from 'react';

// const messages = [
//   "Prepare me for a meeting with KenGen on IoT Fuel management solution and Site sensors",
//   "Plan a pre-sales survey with Eldoret Water",
//   "Recommend an IoT SIM card profile with package",
//   "Summarize IoT CoE Squad Teams stand up",
//   "Update me on the status of the VT08 Video Telematics Devices tests/ validations",
//   "Pull a report from SF of all the deals I closed last month and predict next month's numbers",
//   "Analyze and debug Shangda (MajiSmart) integrations",
//   "Show me list of pre-qualified Video Telematics Vendors",
//   "Do a Market analysis and share a list of suppliers for Temp Tag Batteries",
//   "Research the latest trends in IoT and cloud technology and prepare a report for our next product launch",
//   "Summarize Q3 Cloud financial report",
//   "Generate a usage report for our IoT devices in the past quarter",
//   "Monitor stock levels and forecast demand for IoT devices to ensure optimal stock availability",
//   "Confirm if the supplier is prequalified and review attached quote.",
//   "Give me the total number of devices we have in our inventory",
//   "Configure for me a GPS Tracking device",
//   "Prepare an FAQ document on our IoT solutions for the customer support team",
//   "Generate monthly performance reports for connected IoT devices",
//   "Propose a maintenance schedule for our deployed GPS tracking devices",
//   "Monitor our inventory of Temp Tag Batteries and set up automated reorder alerts",
//   "Assist with preparing tender documents for large-scale IoT implementation",
//   "Research local and international regulations for temperature-sensitive IoT devices",
//   "Prepare a detailed report on the competition in the smart water metering market",
//   "Draft a service-level agreement (SLA) for IoT device maintenance",
//   "Assess the current market for 5G IoT solutions and share opportunities",
//   "Research the best pricing and availability for Temp Tag Batteries",
//   "Schedule a follow-up calls with the KQ to discuss the proposal",
//   "Set up sales meeting with a prospective customer",
//   "Draft personalized email replies to video customer inquiries",
//   "Develop a training guide for field engineers on the new IoT devices",
//   "Draft a technical specification document for a new IoT device"
// ];

// const TypewriterText = ({ speed = 50 }) => {
//   const [displayText, setDisplayText] = useState('');
//   const [messageIndex, setMessageIndex] = useState(0);

//   useEffect(() => {
//     let i = 0;
//     const currentMessage = messages[messageIndex];
    
//     const typingEffect = setInterval(() => {
//       if (i <= currentMessage.length) {
//         setDisplayText(currentMessage.slice(0, i));
//         i++;
//       } else {
//         clearInterval(typingEffect);
//         setTimeout(() => {
//           setDisplayText('');
//           setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
//         }, 2000); // Wait 2 seconds before starting the next message
//       }
//     }, speed);

//     return () => clearInterval(typingEffect);
//   }, [messageIndex, speed]);

//   return <span className="animate-pulse">{displayText || "Animation will appear here..."}</span>;
// };

// const GuruAIInterface = () => {
//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen bg-white text-gray-800 font-sans">
//       <div className="w-full lg:w-2/3 p-6 lg:p-12 flex flex-col justify-center">
//         <h1 className="text-4xl lg:text-5xl font-bold mb-4 lg:mb-8 text-gray-800">
//           GURU
//           <span className="block text-xl lg:text-2xl font-normal mt-2 text-green-500">WORK AI FOR ME</span>
//         </h1>
//         <div className="text-lg lg:text-xl text-gray-600 h-24 border-l-4 border-green-500 pl-4 bg-gray-100 rounded overflow-hidden">
//           <TypewriterText speed={30} />
//         </div>
//       </div>
//       <div className="w-full lg:w-1/3 bg-gray-100 p-6 lg:p-12 flex flex-col justify-center items-center">
//         <h2 className="text-3xl lg:text-4xl font-bold mb-8 lg:mb-12 text-green-500">TryGURU</h2>
//         <div className="w-full max-w-xs">
//           <a 
//             href="/application" 
//             className="block w-full bg-green-500 text-white py-3 px-6 rounded-full hover:bg-green-600 transition duration-300 text-lg font-semibold text-center"
//           >
//             Log in
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GuruAIInterface;


// IDEA 5
"use client";

import React, { useState, useEffect } from 'react';

const messages = [
  "Prepare me for a meeting with KenGen on IoT Fuel management solution and Site sensors",
  "Plan a pre-sales survey with Eldoret Water",
  "Recommend an IoT SIM card profile with package",
  "Summarize IoT CoE Squad Teams stand up",
  "Update me on the status of the VT08 Video Telematics Devices tests/ validations",
  "Pull a report from SF of all the deals I closed last month and predict next month's numbers",
  "Analyze and debug Shangda (MajiSmart) integrations",
  "Show me list of pre-qualified Video Telematics Vendors",
  "Do a Market analysis and share a list of suppliers for Temp Tag Batteries",
  "Research the latest trends in IoT and cloud technology and prepare a report for our next product launch",
  "Summarize Q3 Cloud financial report",
  "Generate a usage report for our IoT devices in the past quarter",
  "Monitor stock levels and forecast demand for IoT devices to ensure optimal stock availability",
  "Confirm if the supplier is prequalified and review attached quote.",
  "Give me the total number of devices we have in our inventory",
  "Configure for me a GPS Tracking device",
  "Prepare an FAQ document on our IoT solutions for the customer support team",
  "Generate monthly performance reports for connected IoT devices",
  "Propose a maintenance schedule for our deployed GPS tracking devices",
  "Monitor our inventory of Temp Tag Batteries and set up automated reorder alerts",
  "Assist with preparing tender documents for large-scale IoT implementation",
  "Research local and international regulations for temperature-sensitive IoT devices",
  "Prepare a detailed report on the competition in the smart water metering market",
  "Draft a service-level agreement (SLA) for IoT device maintenance",
  "Assess the current market for 5G IoT solutions and share opportunities",
  "Research the best pricing and availability for Temp Tag Batteries",
  "Schedule a follow-up calls with the KQ to discuss the proposal",
  "Set up sales meeting with a prospective customer",
  "Draft personalized email replies to video customer inquiries",
  "Develop a training guide for field engineers on the new IoT devices",
  "Draft a technical specification document for a new IoT device"
];

const TypewriterText = ({ speed = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    let i = 0;
    const currentMessage = messages[messageIndex];
    
    const typingEffect = setInterval(() => {
      if (i <= currentMessage.length) {
        setDisplayText(currentMessage.slice(0, i));
        i++;
      } else {
        clearInterval(typingEffect);
        setTimeout(() => {
          setDisplayText('');
          setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 2000); // Wait 2 seconds before starting the next message
      }
    }, speed);

    return () => clearInterval(typingEffect);
  }, [messageIndex, speed]);

  return <span className="animate-pulse">{displayText || "Animation will appear here..."}</span>;
};

const GuruAIInterface = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white text-gray-800 font-sans">
      <div className="w-full lg:w-2/3 p-6 lg:p-12 flex flex-col justify-center">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 lg:mb-8 text-gray-800">
          GURU
          <span className="block text-xl lg:text-2xl font-normal mt-2 text-green-500">WORK AI FOR ME</span>
        </h1>
        <div className="text-lg lg:text-xl text-gray-600 h-24 border-l-4 border-green-500 pl-4 bg-gray-100 rounded overflow-hidden">
          <TypewriterText speed={30} />
        </div>
      </div>
      <div className="w-full lg:w-1/3 bg-gray-100 p-6 lg:p-12 flex flex-col justify-center items-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-8 lg:mb-12 text-green-500">TryGURU</h2>
        <div className="w-full max-w-xs space-y-4">
          <a 
            href="/application" 
            className="block w-full bg-green-500 text-white py-3 px-6 rounded-full hover:bg-green-600 transition duration-300 text-lg font-semibold text-center"
          >
            Log in
          </a>
          <button className="w-full bg-white text-green-500 border border-green-500 py-3 px-6 rounded-full hover:bg-green-50 transition duration-300 text-lg font-semibold">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuruAIInterface;