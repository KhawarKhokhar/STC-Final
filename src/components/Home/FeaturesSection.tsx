"use client";

import React, { ReactNode } from "react";
import { Users, TrendingUp } from "lucide-react";

// --- Types ---
interface SmallFeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface LargeFeatureCardProps {
  children?: ReactNode;
  title: string;
  description: string;
  className?: string;
}

// --- Card Components ---

const SmallFeatureCard: React.FC<SmallFeatureCardProps> = ({
  icon: Icon,
  title,
  description,
}) => (
  <div className="p-6 rounded-2xl bg-[#F3E3D9] backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-white/20">
    <div className="p-3 w-fit rounded-xl bg-white shadow-md mb-4">
      <Icon className="w-6 h-6 text-pink-700" />
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
    <p className="text-sm text-gray-500">{description}</p>
  </div>
);

const LargeFeatureCard: React.FC<LargeFeatureCardProps> = ({
  children,
  title,
  description,
  className = "",
}) => (
  <div className={`rounded-3xl p-4 md:p-6 shadow-2xl ${className}`}>
    <div className="h-full flex flex-col justify-end">
      {children}
      <div className="mt-4 pt-4 border-t border-white/10">
        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm sm:text-base text-gray-400">{description}</p>
      </div>
    </div>
  </div>
);

// Map Visualization (still kept, responsive)
const MapVisualization: React.FC = () => {
  const MapSVG = () => (
    <svg
      viewBox="0 0 500 250"
      className="w-full h-auto rounded-xl"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="500" height="250" fill="#EAEAEA" rx="12" />
      <path
        fill="#D1D1D1"
        d="M100 50 L150 40 L200 60 L250 50 L250 200 L150 180 L100 150 Z"
      />
      <path fill="#C0C0C0" d="M50 100 L100 50 L100 150 L50 200 Z" />
      <path
        fill="#8A48D5"
        d="M150 70 C180 80, 200 150, 150 170 C130 150, 100 130, 150 70 Z"
      />
      <rect x="250" y="80" width="120" height="50" fill="black" rx="8" />
      <text x="260" y="98" fill="white" fontSize="10" fontWeight="bold">
        United States
      </text>
      <text x="260" y="118" fill="white" fontSize="18" fontWeight="bold">
        60.10%
      </text>
      <polygon points="240,105 250,110 250,100" fill="black" />
    </svg>
  );

  return (
    <div className="relative w-full h-64 md:h-80 mb-4 rounded-xl overflow-hidden">
      <MapSVG />
    </div>
  );
};

// --- Main Component ---

const FeaturesSection: React.FC = () => {
  return (
    <div className="bg-[#f7f4f0] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 font-inter">
      {/* Header */}
      <header className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
        <span className="inline-block px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-bold text-white bg-linear-to-r from-pink-700 to-purple-800 rounded-full tracking-widest mb-4 shadow-xl cursor-default">
          FEATURES
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl py-4 font-light text-gray-900 leading-tight tracking-tight">
          Learn What Salore <br className="hidden sm:block" /> Products Can Do For You.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Discover how unified data and trusted AI help you connect with customers in a whole new way.
        </p>
      </header>

      {/* Feature Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left Side */}
        <LargeFeatureCard
          title="Real Time Sales Funneling"
          description="See how your sales are performing over time with a beautiful time-series chart."
          className="bg-black/80 rounded-3xl"
        >
          <div className="bg-[#F1F0EE] w-full h-80 sm:h-120 md:h-150 rounded-tl-3xl flex items-center justify-center">
            <div className="text-black text-sm sm:text-base"></div>
          </div>
        </LargeFeatureCard>

        {/* Right Side */}
        <div className="flex flex-col gap-6 lg:gap-8">
          <LargeFeatureCard
            title="Traffic Channel"
            description="Understand your audience with geographic data — on both a country and city level."
            className="bg-black/80 rounded-3xl"
          >
            <img
              src="/assets/images/map/mapusa.png"
              alt="Map USA"
              className="w-full h-auto rounded-xl object-contain"
            />
            {/* <MapVisualization /> */}
          </LargeFeatureCard>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <SmallFeatureCard
              icon={Users}
              title="Sales Management"
              description="Grow and increase your business sales."
            />
            <SmallFeatureCard
              icon={TrendingUp}
              title="Customer Stats"
              description="Keep up-to-date with your customer statistics"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
