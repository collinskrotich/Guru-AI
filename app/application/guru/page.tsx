import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { FcSalesPerformance, FcCustomerSupport } from "react-icons/fc";
import { MdProductionQuantityLimits, MdInsights } from "react-icons/md";
import Link from "next/link";

// Define the types for the props
interface GuruCardProps {
  title: string;
  description: string;
  icon: React.ComponentType; // For the Icon, we expect a React component
  link: string;
}

//Card Component
const GuruCard:React.FC<GuruCardProps> = ({ title, description, icon: Icon, link }) => (
  <Card>
    <CardContent>
      <div className="flex items-center justify-between py-4">
        <CardTitle>{title}</CardTitle>
        <div className="text-6xl">
          <Icon />
        </div>
      </div>
      <p className="text-gray-600 mt-2">{description}</p>
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

export default function GURUManager() {
  // Card data
  const cards = [
    {
      title: "Sales Assistant",
      description: "Prep for meetings and access all the product knowledge, so you can close more deals.",
      icon: FcSalesPerformance,
      link: "/application/guru/SalesAssistant"
    },
    {
      title: "Product Recommendations (Retail ) ",
      description: "Close deals faster, accurately and put customer first.",
      icon: MdProductionQuantityLimits,
      link: "/application/guru/RetailAssistant"
    },
    {
      title: "Customer Support",
      description: "Engage customers with speed and confidence.",
      icon: FcCustomerSupport,
      link: "/application/guru/CustomerSupport"
    },
    {
      title: "Customer Insights",
      description: "Aggregate Intel from market and online for strategy and decision making.",
      icon: MdInsights,
      link: "/application/guru/CustomerInsights"
    }
  ];

  return (
    <div className="min-h-screen bg-white p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-900">GURU Manager</h1>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Pre-made by Safaricom
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-full overflow-hidden">
              {/* rendered cards */}
              {cards.map((card, index) => (
                <GuruCard
                  key={index}
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  link={card.link}
                />
              ))}
            </div>
          </section>

          {/* <Button variant="default" className="w-28">
            New GURU
          </Button> */}
        </div>
      </div>
    </div>
  );
}

