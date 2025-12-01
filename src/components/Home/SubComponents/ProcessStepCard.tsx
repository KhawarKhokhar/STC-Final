// components/ProcessStepCard.tsx

import React from 'react';

interface ProcessStepCardProps {
  stepNumber: string;
  title: string;
  description: string;
  active?: boolean; // Optional prop to indicate if the card is active/highlighted
}

export const ProcessStepCard: React.FC<ProcessStepCardProps> = ({
  stepNumber,
  title,
  description,
  active = false, // Default to false if not provided
}) => {
  // Active/inactive card styles
  const cardState =
    active
      ? 'bg-white shadow-2xl lg:scale-105 lg:-translate-y-12'
      : 'bg-[#C7EDE5] shadow-md hover:shadow-lg lg:hover:scale-[1.02]';

  // Number color
  const numberText = active ? 'text-[#3DD3CE]' : 'text-[#616161]';

  return (
    <div
      className={`relative mt-10 rounded-3xl transition-all duration-300 ease-in-out overflow-hidden
        ${cardState}
        flex w-full max-w-sm flex-col justify-between p-6 sm:max-w-md lg:h-[395px]`}
    >
      {/* Step Number with Ring (clipped by parent overflow-hidden) */}
      <div className="pointer-events-none absolute left-6 top-6 lg:left-0 lg:top-2 lg:-translate-x-1/4 lg:-translate-y-1/4">
        <div
          className={`grid h-24 w-24 place-items-center rounded-full border-12 border-[#FFF2D0] bg-transparent font-bold text-4xl text-center sm:h-32 sm:w-32 sm:text-5xl lg:h-40 lg:w-40 lg:border-16
            ${numberText}`}
        >
          {stepNumber}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-24 pt-8 pr-2 sm:pr-5 lg:pt-10">
        <h3 className="mb-2 text-2xl font-bold text-[#616161] leading-tight sm:text-3xl">
          {title}
        </h3>
        <p className="text-md text-gray-700">
          {description}
        </p>
      </div>
    </div>
  );
};
