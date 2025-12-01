// components/Sidebar.tsx

import React from "react";

// Sidebar Link data
const topPlatforms = [
  { name: "Featured", active: true },
  { name: "All Integrations", active: false },
];

const integrationPlatforms = [
  { name: "Collaboration", active: false },
  { name: "Analytics", active: false },
  { name: "Calendar", active: false },
  { name: "Video Conferencing", active: false },
  { name: "Browser Extension", active: false },
];

export const Sidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="w-full py-2 px-8 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-sm"
        />
        {/* Search Icon (Simplified) */}
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
        {/* Close/Clear Button */}
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
          ×
        </button>
      </div>

      {/* Top Integration Platforms */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase text-gray-500 tracking-wider">
          TOP INTEGRATION PLATFORMS
        </h3>

        <nav className="space-y-1">
          {topPlatforms.map((item) => (
            <a
              key={item.name}
              href="#"
              className={`flex items-center space-x-2 py-1 px-2 rounded-md transition-colors text-sm
          ${
            item.active
              ? "bg-gray-200 text-gray-800 font-medium"
              : "text-gray-600 hover:bg-gray-100"
          }`}
            >
              {/* checkbox + tick */}
              <span
                className={`flex items-center justify-center w-4 h-4 rounded-lg border text-white text-[10px] leading-none
            ${
              item.active
                ? "bg-purple-600 border-purple-600"
                : "bg-white border-gray-400"
            }`}
              >
                {item.active && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>

              {/* label */}
              <span>{item.name}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Integration Platforms Categories */}
      <div className="space-y-3 pt-4">
        <h3 className="text-xs font-semibold uppercase text-gray-500 tracking-wider">
          INTEGRATION PLATFORMS
        </h3>

        <nav className="space-y-1">
          {integrationPlatforms.map((item) => (
            <a
              key={item.name}
              href="#"
              className={`flex items-center space-x-2 py-1 px-2 rounded-md transition-colors text-sm
          ${
            item.active
              ? "bg-gray-200 text-gray-800 font-medium"
              : "text-gray-600 hover:bg-gray-100"
          }`}
            >
              {/* Checkbox */}
              <span
                className={`flex items-center justify-center w-4 h-4 rounded-lg border text-white text-[10px] leading-none
            ${
              item.active
                ? "bg-purple-600 border-purple-600"
                : "bg-white border-gray-400"
            }`}
              >
                {item.active && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>

              {/* Platform name */}
              <span>{item.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};
