import React, { JSX } from "react";

export const BenefitsSection = (): JSX.Element => {
  const benefitsData = [
    {
      title: "Best Customer Satisfaction",
      description:
        "Understanding each customer's journey helps your team provide quick, relevant support, enhancing satisfaction and loyalty.",
      buttonStyle: "primary",
    },
    {
      title: "Secure Data Management",
      description:
        "Our platform ensures top data security and privacy, so your customer information is more safety and compliant.",
      buttonStyle: "secondary",
    },
    {
      title: "Unified Customer View",
      description:
        "Get a complete view of each customer, combining emails, purchases, support tickets, and notes.",
      buttonStyle: "secondary",
    },
  ];

  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1240px] mx-auto px-4"
      role="region"
      aria-label="Benefits"
    >
      {benefitsData.map((benefit, index) => (
        <article
          key={index}
          className="flex flex-col justify-between bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
        >
          {/* Title + Description */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-gray-800">
              {benefit.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {benefit.description}
            </p>
          </div>

          {/* Button */}
          <div className="mt-6 flex">
            <button
              className={`px-5 py-2.5 rounded-lg font-medium transition ${
                benefit.buttonStyle === "primary"
                  ? "bg-black text-white shadow hover:bg-gray-800"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Learn More
            </button>
          </div>
        </article>
      ))}
    </section>
  );
};
