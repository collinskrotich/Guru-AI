"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/application"); // Navigate to /application
  };

  return (

    <div
      className="relative min-h-screen bg-black text-white"
      // style={{
      //   backgroundImage: "url('/ai.jpg')", // Path to your image
      //   backgroundSize: "cover", // Cover the whole page
      //   backgroundPosition: "center",
      //   opacity: 0.9, // Center the image
      // }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-gray-900">
        <div className="text-lg font-bold">
          <span className="bg-gray-700 text-white px-2 py-1 rounded">
            GURU 
          </span>
          <span className="text-gray-400 ml-2">WORK AI FOR ME </span>
        </div>
        <button
           onClick={handleClick}
          className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-300 transition"
        >
          TryGURU
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center h-[calc(100vh-64px)] text-center">
        {/* Background Elements */}
        {/* <div className="absolute inset-0 flex justify-center items-center">
          <div className="h-64 w-64 bg-green-600 opacity-20 rounded-full"></div>
          <div className="h-32 w-32 bg-green-800 opacity-10 rounded-full absolute top-10 right-20"></div>
        </div> */}

        {/* Text and Button */}
        <h1 className="text-6xl font-extrabold text-gray-100 mb-4">
          Do your <span className="text-green-400">best ...</span>
        </h1>
        <div className="text-6xl font-extrabold text-gray-100 mb-4">
          <TypeAnimation
            sequence={[
              "Brainstorming",
              1000,
              "Closing deals",
              1000,
              "Writing reports",
              1000,

              // Prepare me for a meeting with KenGen  on IoT Fuel management solution and Site sensors
              // Plan a pre-sales survey with Eldoret Water 
              // 	Recommend an IoT SIM card profile with package
              // 	
              // 	Summarize IoT CoE Squad Teams stand up
              // 	
              // 	Update me on the status of the VT08 Video Telematics Devices tests/ validations 
              // 	Analyze and debug Shangda (MajiSmart) integrations
              // 	Show me list of pre-qualified Video Telematics Vendors
              // 	Do a Market analysis and share a list of suppliers for Temp Tag Batteries
              // 	
              // 	
              // 	Research the latest trends in IoT and cloud technology and prepare a report for our next product launch
              // 	Summarize Q3 Cloud financial report
              // 	Generate a usage report for our IoT devices in the past quarter
              // 	Do a Market analysis and share a list of suppliers for Temp Tag Batteries
              // 	Monitor stock levels and forecast demand for IoT devices to ensure optimal stock availability
              // 	Confirm if the supplier is prequalified and review attached quote.
              // 	Give me the total number of devices we have in our inventory
              // 	Configure for me a GPS Tracking device
              // 	Prepare an FAQ document on our IoT solutions for the customer support team
              // 	Generate monthly performance reports for connected IoT devices
              // 	Propose a maintenance schedule for our deployed GPS tracking devices
              // 	Do a Market analysis and share a list of suppliers for Temp Tag Batteries
              // 	Monitor our inventory of Temp Tag Batteries and set up automated reorder alerts
              // 	Assist with preparing tender documents for large-scale IoT implementation
              // 	Research local and international regulations for temperature-sensitive IoT devices
              // 	Prepare a detailed report on the competition in the smart water metering market
              // 	Draft a service-level agreement (SLA) for IoT device maintenance
              // 	Assess the current market for 5G IoT solutions and share opportunities
              // 	Research the best pricing and availability for Temp Tag Batteries
              // 	Schedule a follow-up calls with the KQ to discuss the proposal
              // 	Set up sales meeting with a prospective customer 
              // 	Draft personalized email replies to video customer inquiries
              // 	Develop a training guide for field engineers on the new IoT devices
              // 	Draft a technical specification document for a new IoT device
              

            ]}
            speed={50}
            repeat={Infinity}
            style={{ fontSize: "2em" }}
          />
        </div>

        <p className="text-gray-400 mb-8">
          GURU is your personalized Work AI assistant powered by
          Safaricom ML, TryGURU.
        </p>

        <Link href="/application">
          <button className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-300 transition">
            TryGURU
          </button>
        </Link>
      </main>
    </div>
  );
}
