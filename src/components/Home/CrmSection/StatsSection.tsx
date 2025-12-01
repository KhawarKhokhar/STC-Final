"use client";
import React from "react";
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle,
  MoreHorizontal,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

// --- Chart Data ---
const data = [
  { name: "A", value: 40 },
  { name: "B", value: 30 },
  { name: "C", value: 20 },
  { name: "D", value: 27 },
  { name: "E", value: 18 },
  { name: "F", value: 23 },
  { name: "F", value: 23 },
  { name: "F", value: 23 },
  { name: "F", value: 23 },

];

const COLORS = ["#FF669E", "#73143C"];

const MiniChart: React.FC = () => (
  <div className="w-full min-w-0 min-h-[160px]">
    <ResponsiveContainer
      width="100%"
      height={160}
      minWidth={0}
      minHeight={160}
    >
      <BarChart data={data}>
        <XAxis dataKey="name" hide />
        <YAxis hide />
        <Tooltip />
        <Bar dataKey="value" radius={[2, 2, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// --- Main Section ---
export const StatsSection: React.FC = () => {
  const progressMetrics = [
    { label: "Time Saver", percentage: 92 },
    { label: "Efficiency", percentage: 96 },
    { label: "Satisfaction", percentage: 94 },
  ];

  const benefits = [
    {
      title: "Automated Data Updates",
      description:
        "Updates customer profiles with each interaction, keeping records accurate.",
    },
    {
      title: "Effortless Scalability",
      description:
        "Our platform manages data volume, keeping you ready for new customers and markets.",
    },
  ];

  return (
    <section
      className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto items-center lg:items-stretch gap-10 lg:gap-16 px-4 sm:px-6 lg:px-0 py-12"
      role="region"
      aria-labelledby="stats-heading"
    >
      {/* Left Dashboard Card */}
      <div className="flex min-w-0 flex-col w-full max-w-lg h-auto items-start px-6 sm:px-8 py-10 sm:py-14 relative bg-[#ee6e4d1a] rounded-lg">
        <div className="flex min-w-0 flex-col items-start gap-8 px-6 sm:px-8 py-8 sm:py-11 bg-white rounded-xl shadow-md w-full">
          {/* Header */}
          <div className="flex flex-col w-full gap-2">
            <p className="text-sm text-gray-500">Store Partner</p>
            <div className="flex items-center gap-3">
              <p className="text-2xl sm:text-3xl font-semibold text-gray-900">
                80.351
              </p>
              <div className="flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-pink-500" />
                <span className="text-xs font-medium text-pink-500">64%</span>
              </div>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="flex flex-col gap-4 w-full">
            {progressMetrics.map((metric, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between w-full"
              >
                <span className="text-xs text-gray-400">{metric.label}</span>
                <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-sm">
                  <div
                    className="h-full bg-[#EFF4F7] rounded-sm"
                    style={{ width: `${metric.percentage}%` }}
                  />
                </div>
                <span className="text-xs text-black">
                  {metric.percentage}%
                </span>
              </div>
            ))}
          </div>

          {/* Mini Chart */}
          <MiniChart />

          {/* Sub-Card */}
          <div className="absolute bottom-7 right-7 p-8 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <BarChart3 className="w-4 h-4 text-gray-600" />
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </div>
            <div className="flex justify-evenly items-center mb-2">
            <p className="text-xs text-gray-500 pr-3">Total Partners</p>
            <ArrowUpRight className="w-4 h-4 text-pink-500 bg-[#FFE0EC] rounded-full" />
              <span className="text-xs text-pink-500">12%</span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-lg sm:text-2xl font-bold text-gray-900">+1633</p>
            </div>
            <p className="text-[10px] text-gray-400">
              Higher Than Last Month
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex min-w-0 flex-col w-full max-w-lg gap-8 sm:gap-12">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs text-gray-500">
            <BarChart3 className="w-4 h-4 text-gray-500" />
            Benefits
          </span>
          <h2
            id="stats-heading"
            className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight"
          >
            Experience The Advantages Of A Centralized CRM
          </h2>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">
            Untitled is growing fast, and we are always looking for passionate,
            dynamic, and talented individuals to join our distributed team all
            around the world.
          </p>
        </div>

        {/* Benefits */}
        <div className="flex flex-col gap-6">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="flex w-10 h-10 sm:w-11 sm:h-11 items-center justify-center">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
