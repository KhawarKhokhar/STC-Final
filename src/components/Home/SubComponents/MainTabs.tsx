// components/MainContentTabs.tsx

import React from 'react';

// This is a simple placeholder for the content inside each tab section.
const PlaceholderContent: React.FC = () => (
  <div className="bg-[#D9D9D9] p-4 h-full w-full flex items-center justify-center text-gray-500">
    Content Placeholder
  </div>
);

export const MainContentTabs: React.FC = () => {
  return (
    <div
      className="flex h-full flex-col"
    style={{
          background: 'linear-gradient(to right,  #3DD3CE 0%, #F4E7C3 75%, #FFF2D0 100%)'
        }}>
      {/* Tab Headers */}
      <div className="flex flex-col justify-between gap-2 px-6 pt-8 text-base font-semibold text-gray-700 sm:flex-row sm:items-center sm:text-lg">
        <div className="w-full sm:w-1/3 text-white"> {/* Blue-green */}
          <span className="block py-2 sm:py-4">CHART<br className="hidden sm:block" /> MOVEMENT</span>
        </div>
        <div className="w-full sm:w-1/3 text-white"> {/* Lighter blue-green */}
          <span className="block py-2 sm:py-4">GRAPHIC<br className="hidden sm:block" /> OVERVIEW</span>
        </div>
        <div className="w-full sm:w-1/3 text-gray-800"> {/* Pale yellow */}
          <span className="block py-2 sm:py-4">FILE MANAGEMENT</span>
        </div>
      </div>

      {/* Main Content Area with Gradient Background */}
      <div className="grid flex-1 grid-cols-1 gap-5 px-6 pb-8 pt-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:px-8 lg:pb-10">
        {/* Placeholder Boxes */}
        <div className="flex h-full items-center justify-center">
          <PlaceholderContent />
        </div>
        <div className="flex h-full items-center justify-center">
          <PlaceholderContent />
        </div>
        <div className="flex h-full items-center justify-center">
          <PlaceholderContent />
        </div>
      </div>
    </div>
  );
};
