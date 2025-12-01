// components/SeamlessInternetSection.tsx

import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  detailsLink: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  detailsLink,
}) => {
  return (
    <div className="p-8 font-poppins bg-[#F7F7F7] rounded-xl shadow-lg border border-gray-100 
                    flex flex-col justify-between space-y-6 
                    hover:shadow-xl transition-shadow duration-300 h-full">
      {/* Top Section (Icon + Text) */}
      <div className="flex flex-col space-y-6">
        {/* Icon Area */}
        <div className="w-12 h-12 bg-[#F8F7F4] rounded-lg flex items-center justify-center">
          {icon}
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-[#8D8D8D] leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Bottom Section (Link) */}
      <a
        href="#"
        className="text-sm font-medium text-[#8D8D8D] hover:text-gray-900 underline transition-colors"
      >
        {detailsLink}
      </a>
    </div>
  );
};


export const SeamlessInternetSection: React.FC = () => {
  return (
    // Main container with the pale background color
    <section className="bg-[#F5F1ED] px-6 py-12 font-poppins sm:px-8 md:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16">
        {/* --- Top Hero Section (Two Columns) --- */}
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:gap-14">
          {/* Left Column: Large Placeholder */}
          <div className="h-72 w-full rounded-2xl bg-[#D9D9D9] shadow-lg sm:h-80 lg:h-[395px] lg:max-w-[635px]">
            {/* Image/Visual Placeholder */}
          </div>

          {/* Right Column: Heading, Text, and Search */}
          <div className="w-full space-y-6 lg:w-2/5">
            <div className="space-y-2">
              <h1 className="max-w-xl text-3xl font-medium tracking-tight text-gray-900 md:text-4xl">
                Seamless extends to the nation's remotest areas
              </h1>
              <p className="max-w-lg pt-6 text-base text-[#8D8D8D] sm:text-lg">
                Seamless brings reliable, high-speed internet to every corner of
                the country, ensuring that even the most remote areas stay
                connected. Our commitment to expanding digital access.
              </p>
            </div>

            {/* Search/CTA Group */}
            <div className="flex flex-col items-center space-y-3 pt-8 sm:flex-row sm:space-y-0 sm:space-x-4">
              {/* Dropdown 1: Country */}
              <div className="relative w-full sm:w-60">
                <select
                  className="w-full cursor-pointer appearance-none rounded-4xl border border-gray-300 px-6 py-2 pr-10 text-[#8D8D8D] shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
                >
                  <option>Country</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Dropdown 2: City */}
              <div className="relative w-full sm:w-60">
                <select
                  className="w-full cursor-pointer appearance-none rounded-4xl border border-gray-300 px-6 py-2 pr-10 text-[#8D8D8D] shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
                >
                  <option>City</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Search Button */}
              <button className="w-16 h-10 bg-gray-900 text-white rounded-3xl flex items-center justify-center hover:bg-gray-700 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
            </div>

            {/* 'See all Country' Link */}
            <a
              href="#"
              className="flex items-center space-x-2 pt-6 font-medium italic text-[#8D8D8D] underline transition-colors hover:text-gray-900"
            >
              <span>See all Country</span>
              <svg
                className="w-4 h-4 transform translate-y-px"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </a>
          </div>
        </div>

        {/* --- Bottom Feature Cards Grid --- */}
        <div className="grid grid-cols-1 gap-8 pt-4 sm:grid-cols-2 lg:grid-cols-3">
           <FeatureCard
            icon={
              <img
                src="/assets/icons/access-internet.svg"
                alt="Internet Access Icon"
                className="w-12 h-12 text-gray-600"
              />
            }
            title="Access Internet"
            description="Access internet is a fundamental service provided by internet service providers (ISPs), ensuring that individuals."
            detailsLink="See Details"
          />
          <FeatureCard
            icon={
              <img
                src="/assets/icons/digital-connection.svg"
                alt="Internet Access Icon"
                className="w-12 h-12 text-gray-600"
              />
            }
            title="Digital Connection"
            description="Digital connection refers to the various ways individuals and devices communicate."
            detailsLink="See Details"
          />
           <FeatureCard
            icon={
              <img
                src="/assets/icons/high-internet.svg"
                alt="High-Speed Internet"
                className="w-12 h-12 text-gray-600"
              />
            }
            title="High-Speed Internet"
            description="High-speed internet refers to a fast and reliable internet connection that allows users to access online content."
            detailsLink="See Details"
          />
        </div>
      </div>
    </section>
  );
};
