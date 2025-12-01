// components/SalesGraphCard.tsx

import React from "react";

// Define the data for the bars/labels
const salesData = [
  { label: "Lec", height: "h-2/5" },
  { label: "Sed", height: "h-3/5" },
  { label: "Molestee", height: "h-4/5" },
  { label: "Cursus", height: "h-5/5" },
  { label: "Exit", height: "h-6/5" },
];

// NOTE: The line is the trickiest part. We'll use absolute positioning and a slight rotation
// to create a stylized, curving path, simulating an SVG or a complex border path.

const SalesGraphCard: React.FC = () => {
  return (
    <div className="w-full max-w-sm mt-30 sm:max-w-md lg:max-w-lg p-5 sm:p-6 rounded-4xl bg-white shadow-2xl border border-gray-100 flex flex-col space-y-6">
      {/* Card Header */}
      <div className="flex items-center space-x-2">
        <svg
          className="w-5 h-5 text-teal-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8H11V7h2v2z" />
        </svg>
        <p className="text-lg font-semibold text-gray-800 pl-4">Sales Report</p>
      </div>

      {/* Sales Value */}
      <p className="pl-3 text-2xl text-gray-900 sm:text-3xl">$132,3212</p>

      {/* Graph Area */}
      <div className="relative w-full h-40 pt-4">
        {/* Background Grid/Divider - simplified for demonstration */}
        <div className="absolute inset-0 border-b border-gray-200"></div>

        {/* Bar Chart Bars */}
        <div className="absolute bottom-0 left-0 right-0 h-full flex items-end justify-around space-x-2 sm:space-x-4">
          {salesData.map((data, index) => {
            const opacities = [0.2, 0.3, 0.5, 0.7, 1]; // 20%, 30%, 50%, 70%, 100%
            return (
              <div
                key={data.label}
                className={`w-10 sm:w-14 rounded-xl bg-[#3DD3CE] transition-all duration-700 ${data.height}`}
                style={{ opacity: opacities[index % opacities.length] }} // Map index to opacity values
              ></div>
            );
          })}
        </div>

        <div className="absolute top-1/2 left-6 right-6 transform -translate-y-1/2">
          {/* Line Start Point (The black dot) */}
          <img
            src="/assets/icons/graph-line.svg"
            className="mx-auto h-48 w-full max-w-xs sm:h-52 sm:max-w-sm"
            alt="icon"
          />
        </div>
      </div>

      {/* X-Axis Labels */}
      <div className="flex justify-around text-xs font-semibold text-gray-500 pt-2">
        {salesData.map((data) => (
          <span
            key={data.label}
            className={data.label === "Molestee" ? "text-teal-600" : ""}
          >
            {data.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SalesGraphCard;
