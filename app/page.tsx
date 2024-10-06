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
            Enterprise AI
          </span>
          <span className="text-gray-400 ml-2">EXPERIMENT</span>
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
            ]}
            speed={50}
            repeat={Infinity}
            style={{ fontSize: "2em" }}
          />
        </div>

        <p className="text-gray-400 mb-8">
          GURU is your personalized work AI assistant powered by
          Safaricom’s most capable model, TryGURU.
        </p>

        {/* <Link href="/application">
          <button className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-300 transition">
            TryGURU
          </button>
        </Link> */}
      </main>
    </div>
  );
}
