// components/IntegrationList.tsx

import React from "react";

type Integration = {
  name: string;
  description: string;
  tags: string[];
  status: 'Connect' | 'Disconnect';
  icon: string;              // <-- string path only
  iconAlt?: string;
};


// Data matching the image
const integrationsData: Integration[] = [
  {
    name: "Google Meet",
    description:
      "Auto-joins Google Meet meetings to record audio, write notes, capture slides.",
    tags: ["Video Conferencing", "Video Calls", "Meetings"],
    status: "Connect",
    icon: "/assets/icons/googlemeet.svg",
  },
  {
    name: "Slack",
    description:
      "Jolly automatically shares real-time updates with teammates in Slack.",
    tags: ["Collaboration", "Messaging"],
    status: "Disconnect",
    icon: "/assets/icons/sleck.svg",
  },
  {
    name: "Zoom",
    description:
      "Auto-joins Zoom meetings to record audio, write notes, capture slides.",
    tags: ["Video Conferencing", "Video Calls", "Meetings"],
    status: "Connect",
    icon: "/assets/icons/zoom.svg",
  },
  {
    name: "Notion",
    description:
      "Jolly automatically pushes transcripts and meeting summaries to Notion.",
    tags: ["Collaboration", "Project Management", "Notes"],
    status: "Connect",
    icon: "/assets/icons/notion.svg",
  },
];

const IntegrationItem: React.FC<{ data: Integration }> = ({ data }) => {
  const isConnected = data.status === "Connect";

  return (
    <div className="flex flex-col gap-4 border-b border-gray-200 py-4 last:border-b-0 md:flex-row md:items-center md:justify-between">
      {/* Left Content (Icon, Text, Tags) */}
      <div className="flex items-start space-x-4">
        {/* Icon */}
        <img
          src={data.icon}
          alt={data.name + " icon"}
          className="w-10 h-10 object-contain"
        />

        {/* Text + Tags */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800">{data.name}</h3>
          <p className="mb-2 text-sm text-gray-600">{data.description}</p>

          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Status Button */}
      <button
        className={`flex w-full items-center justify-center space-x-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors md:w-auto
          ${
            isConnected
              ? "border-gray-300 text-gray-700 hover:bg-gray-50"
              : "border-red-400 text-red-600 hover:bg-red-50"
          }`}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span>{data.status}</span>
      </button>
    </div>
  );
};

export const IntegrationList: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">All Integrations</h2>
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 divide-y divide-gray-100">
        {integrationsData.map((integration, index) => (
          <IntegrationItem key={index} data={integration} />
        ))}
      </div>
    </div>
  );
};
