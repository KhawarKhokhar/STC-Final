'use client'

import React from "react";

import SalesGraphCard from "./SubComponents/SalesGraphCard";
import CustomButton from "../ui/DesignButton";

const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 2px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 2px)
  `,
  backgroundSize: "40px 40px",
  backgroundColor: "#F3EFE8",
};

const BookCallButton: React.FC = () => {
  return (
    <button
      className="px-8 py-3 rounded-full text-lg sm:text-xl text-white font-semibold transition-all duration-300 ease-in-out
      bg-[#3DD3CE] hover:bg-[#48DAB3] shadow-lg focus:outline-none focus:ring-4 focus:ring-[#56EBC4]/50"
    >
      Schedule Meeting
    </button>
  );
};

interface TeamStatProps {
  count: string;
  label: string;
}

const TeamStat: React.FC<TeamStatProps> = ({ count, label }) => {
  return (
    <div className="flex items-center rounded-full bg-[#FFF2D0] px-6 py-3 shadow-lg sm:px-8 sm:py-4">
      <div className="flex -space-x-4 sm:-space-x-5">
        {/* Placeholder for the overlapping circles */}
        <div className="h-12 w-12 rounded-full border-2 border-[#FCF4E2] bg-[rgba(0,0,0,0.2)] sm:h-14 sm:w-14"></div>
        <div className="h-12 w-12 rounded-full border-3 border-white bg-[rgba(0,0,0,0.2)] sm:h-14 sm:w-14"></div>
        <div className="h-12 w-12 rounded-full border-3 border-white bg-[rgba(0,0,0,0.2)] sm:h-14 sm:w-14"></div>
      </div>
      <div className="ml-4 pr-2 text-left sm:pr-4">
        <p className="text-xl font-medium text-[#363435] sm:text-2xl">
          {count}
        </p>
        <p className="text-sm text-gray-600 pt-1 sm:text-base sm:pt-2">
          {label}
        </p>
      </div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section style={gridBackgroundStyle} className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-12 px-6 lg:flex-row lg:items-stretch lg:gap-16 xl:px-10">
        {/* 1. Left Content Area (Text, Stat, Button) */}
        <div className="flex w-full flex-col items-center space-y-8 text-center lg:w-1/2 lg:items-start lg:text-left">
          {/* Heading and Subheading */}
          <div className="space-y-4">
            <img
              src="/assets/icons/three-lines.svg"
              className="relative top-3 mx-auto h-10 w-10 sm:h-12 sm:w-12 lg:top-6 right-12 lg:mx-3"
              alt="icon"
            />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#363435] leading-tight">
              Real Sales Tax Relief Through Human Expertise
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-xl -mt-1">
              Our expert team acts as your in-house department, automating
              filings where efficient while delivering human oversight on
              registrations, state queries, notices, bi-weekly reviews, and
              issue resolutions—stepping in where full automation risks costly
              disasters.
            </p>
            <p className="text-xl sm:text-2xl font-bold text-gray-700 max-w-xl -mt-1">
              Start your Monthly Sales tax Compliance
            </p>
          </div>

          {/* Team Stat and Button Group */}
          <div className="flex flex-col items-center justify-center space-y-6 sm:flex-row sm:space-y-0 sm:space-x-8 lg:items-center lg:justify-start">
            <TeamStat count="1.289" label="Our Expert Team" />
          </div>
          <div className="flex gap-3">
            <CustomButton text="Chat Now" href="#" icon="chat"/>
            <CustomButton text="Call Now" href="#" icon="call"/>
            </div>
          <div className="flex gap-10 mt-3 sm:mt-2">
            <BookCallButton />
          </div>
        </div>

        {/* 2. Right Content Area (Graph Card) */}
        <div className="mt-6 w-full max-w-md lg:mt-0 lg:max-w-none lg:w-2/5 xl:w-4/12">
          <SalesGraphCard />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
