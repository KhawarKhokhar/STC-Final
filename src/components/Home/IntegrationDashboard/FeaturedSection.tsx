// components/FeaturedSection.tsx

import React from "react";

// --- Card 1: Meet STC Ai ---
export const MeetSTCAiCard: React.FC = () => (
  // Use a very light gray background for the entire card
  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-[#FBFBFC] p-6 shadow-xl lg:flex-row">
    {/* Left Content Area (Text and Button) */}
    <div className="flex w-full flex-col justify-between py-2 pr-0 lg:w-1/3 lg:pr-4">
      <span className="text-xs font-semibold text-[#7B67CB] uppercase tracking-wider">
        NEW
      </span>

      {/* Title and Subtitle */}
      <div>
        <h2 className="text-2xl font-medium text-gray-900 mt-1 mb-2 leading-snug">
          Meet STC Ai
        </h2>
        <p className="text-[#7B67CB] text-sm leading-tight">
          Ask your questions for our AI Chatbot
        </p>
      </div>

      {/* Button: Black, fully rounded corners (pill shape) */}
      <button className="mt-6 w-max rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700">
        Try it Now
      </button>
    </div>

    {/* Right Visual Placeholder (Chat UI) */}
    <div className="relative mt-6 flex w-full items-center justify-center rounded-xl border border-gay-100 bg-white p-4 shadow-inner lg:mt-0 lg:ml-4 lg:w-2/3">
      {/* Magic Icon (Sparkles) in the top corner */}
      <div className="absolute top-[-20] right-40 w-10 h-10 rounded-full bg-white flex items-center justify-center transform rotate-12">
        {/* Simplified Sparkles Icon using SVG (Lilac color) */}
        <svg
          className="w-12 h-12 text-purple-400 border-[#7B67CB] border rounded-xl"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="space-y-4 w-full pr-4">
        {/* Message 1 (AI Response) */}
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 rounded-full bg-[#C2D6FF]"></div>
          <div className="space-y-2 w-full">
            <div className="h-3 bg-gray-200 rounded-full w-1/5"></div>
            <div className="h-3 bg-gray-200 rounded-full w-4/5"></div>
          </div>
        </div>

        {/* Message 2 (User Input) - Note the different avatar color and position */}
        <div className="flex items-start space-x-2 pt-4">
          <div className="w-8 h-8 rounded-lg bg-purple-200 flex items-center justify-center">
            {/* Simple face/smiley icon */}
            <svg
              className="w-5 h-5 text-purple-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path
                d="M15.5 14.5c0 .28-.22.5-.5.5h-5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h5c.28 0 .5.22.5.5zM15 9h-2c-.55 0-1-.45-1-1V7h4v1c0 .55-.45 1-1 1zm-6 0H7c-.55 0-1-.45-1-1V7h4v1c0 .55-.45 1-1 1z"
                fill="white"
              />
            </svg>
          </div>
          <div className="space-y-2 w-full pt-1.5">
            <div className="h-3 bg-gray-200 rounded-full w-1/5"></div>
            <div className="h-3 bg-gray-200 rounded-full w-5/5"></div>
            <div className="h-3 bg-gray-200 rounded-full w-2/5"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Card 2: Jolly AI ---
const JollyAiCard: React.FC = () => (
  <div className="relative flex h-full flex-col items-center rounded-xl border border-gray-100 bg-white p-6 text-center shadow-lg">
    {/* Jolly AI Icon (Simplified) */}
    <div className="flex items-center space-x-6">
      {/* Left cute square face */}
      <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-purple-400 to-purple-300 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-7 h-7"
        >
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM9.5 9a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM8 14h8a4 4 0 0 1-8 0z" />
        </svg>
      </div>

      {/* Link icon */}
      <svg
        className="w-6 h-6 text-gray-700"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.828 10.172a4 4 0 0 0-5.656 0l-3 3a4 4 0 0 0 5.656 5.656l1.415-1.414m1.414-9.9a4 4 0 0 1 5.657 0l3 3a4 4 0 0 1-5.657 5.657l-1.414-1.415"
        />
      </svg>

      {/* Chrome logo */}
      <div className="w-12 h-12 flex items-center justify-center">
        <svg
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
        >
          <circle fill="#4CAF50" cx="24" cy="24" r="21" />
          <path fill="#FFC107" d="M24 3v18h21A21 21 0 0 0 24 3z" />
          <path fill="#F44336" d="M24 3a21 21 0 0 0-21 21h21V3z" />
          <circle fill="#2196F3" cx="24" cy="24" r="10" />
          <circle fill="#fff" cx="24" cy="24" r="6" />
        </svg>
      </div>
    </div>

    <h2 className="text-xl font-bold text-gray-900 my-3">
      Add Jolly AI to your<br/> browser today
    </h2>
    <p className="text-gray-600 text-sm mb-6 max-w-xs">
      Get instant answers, streamline tasks, and enhance your workflow without
      switching tabs.
    </p>
    <button className="flex items-center justify-center py-2 px-4 border border-gray-300 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        ></path>
      </svg>
      Install Extension
    </button>
  </div>
);

// --- Featured Section Wrapper ---
export const FeaturedSection: React.FC = () => (
  <div className="flex flex-col gap-8 lg:flex-row">
    <div className="w-full lg:w-3/5">
      <MeetSTCAiCard />
    </div>
    <div className="w-full lg:w-2/5">
      <JollyAiCard />
    </div>
  </div>
);
