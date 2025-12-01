import React, { ReactNode } from "react";

/** FloatingCard Props */
interface FloatingCardProps {
  title: string;
  subtitle: string;
  children?: ReactNode;
  className?: string;
  layout?: "stack" | "split";
  contentLeft?: boolean;
}

/** FloatingCard component */
const FloatingCard: React.FC<FloatingCardProps> = ({
  title,
  subtitle,
  children,
  className = "",
  layout = "stack",
  contentLeft = false,
}) => (
  <div
    className={`z-10 rounded-xl bg-white p-3 shadow-xl transition-transform duration-500 ease-out hover:scale-[1.03] sm:p-4 ${className}`}
  >
    {layout === "stack" ? (
      <>
        <div className="mb-1 text-[10px] font-semibold text-gray-800 sm:text-xs">
          {title}
        </div>
        <div className="text-xs text-gray-500 sm:text-sm">{subtitle}</div>
        {children}
      </>
    ) : (
      <div
        className={`flex flex-col gap-3 md:gap-4 md:items-center ${
          contentLeft ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        {/* Content */}
        <div className="md:flex-1">{children}</div>

        {/* Text */}
        <div className="md:flex-1">
          <div className="mb-1 text-[10px] font-semibold text-gray-800 sm:text-xs">
            {title}
          </div>
          <div className="text-xs text-gray-500 sm:text-sm">{subtitle}</div>
        </div>
      </div>
    )}
  </div>
);

/** CardDefinition type */
type CardDefinition = {
  title: string;
  subtitle: string;
  desktopClassName: string;
  content: ReactNode;
  layout?: "stack" | "split";
  contentLeft?: boolean;
};

/** Card data */
const cardDefinitions: CardDefinition[] = [
  {
    title: "Sales Tracking",
    subtitle: "Sales vs Target",
    desktopClassName: "lg:absolute lg:right-0 lg:top-0 lg:w-[260px]",
    content: (
      <div className="mt-2 flex w-full flex-col justify-end">
        <div className="mb-1 text-[10px] font-bold text-red-500 sm:text-xs">
          Actual Sales
        </div>
        <div className="h-20 border-b border-gray-200 sm:h-24">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 250 80"
            preserveAspectRatio="none"
          >
            <polyline
              fill="none"
              stroke="#F87171"
              strokeWidth="2"
              points="0,70 50,20 100,50 150,10 200,60 250,30"
            />
          </svg>
        </div>
      </div>
    ),
  },
  {
    title: "Data Driven",
    subtitle: "Insights",
    desktopClassName: "lg:absolute lg:left-0 lg:top-20 lg:w-[220px]",
    content: (
      <div className="mt-3 flex items-center justify-center">
        <svg viewBox="0 0 36 36" className="h-16 w-16">
          <circle cx="18" cy="18" r="16" fill="#EC4899" />
          <path d="M18 18 L34 18 A16 16 0 0 1 18 34 Z" fill="#F9A8D4" />
        </svg>
      </div>
    ),
  },
  {
    title: "Centralized Customer Data",
    subtitle: "From 8,273 Stores",
    desktopClassName: "lg:absolute lg:left-[25%] lg:top-[40%] lg:w-[220px]",
    layout: "split",
    contentLeft: true,
    content: (
      <div className="mt-2 flex items-center gap-2">
        <span className="text-xl text-blue-500 sm:text-xl">Sales Force</span>
      </div>
    ),
  },
  {
    title: "Automated Workflow",
    subtitle: "376 Templates",
    desktopClassName: "lg:absolute lg:right-5 lg:top-[40%] lg:w-[180px]",
    layout: "split",
    contentLeft: true,
    content: (
      <div className="mt-2 flex items-center gap-2">
        <span className="h-15 w-15 pt-4 pl-2 text-md text-white rounded-full bg-orange-500 sm:text-md">
          Zapier
        </span>
      </div>
    ),
  },
  {
    title: "Revenue Growth",
    subtitle: "Daily",
    desktopClassName: "lg:absolute lg:bottom-10 lg:right-0 lg:w-[200px]",
    content: (
      <div className="mt-2 flex h-12 items-end gap-1 p-1 sm:h-16 sm:gap-2">
        {[
          "50%",
          "100%",
          "40%",
          "70%",
          "20%",
          "90%",
        ].map((height, i) => (
          <div
            key={i}
            className={`w-1/6 rounded-t-sm ${
              i % 2 === 0 ? "bg-pink-500" : "bg-[#80002F]"
            }`}
            style={{ height }}
          ></div>
        ))}
      </div>
    ),
  },
  {
    title: "Total Team",
    subtitle: "",
    desktopClassName: "lg:absolute lg:bottom-[15%] lg:left-25 lg:w-[160px]",
    content: (
      <div className="mt-1 text-xl font-medium text-gray-900 sm:text-2xl">
        800+
      </div>
    ),
  },
];

/** SolutionsSection component */
const SolutionForEach: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#F5F1ED] py-16 font-sans md:py-24 lg:py-32">
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8">
        {/* Left Column */}
        <div className="z-20 max-w-xl text-center lg:pt-20 lg:text-left">
          <div className="mb-6 flex items-center justify-center text-sm font-medium text-gray-700 lg:justify-start">
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Solutions
          </div>

          <h2 className="mb-6 text-3xl tracking-tight text-gray-900 leading-tight sm:text-4xl md:text-5xl lg:mb-8 lg:text-6xl">
            Solutions For Each Stage Of The Customer Journey
          </h2>

          <p className="mb-8 text-base text-gray-600 sm:text-lg md:mb-10">
            Untitled is growing fast, and we are always looking for passionate,
            dynamic, and talented individuals to join our distributed team all
            around the world.
          </p>

          <a
            href="#"
            className="inline-block transform rounded-xl bg-gray-800 px-6 py-3 text-base font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:bg-gray-700 active:scale-[0.98] sm:px-8 sm:text-lg"
          >
            Get Started
          </a>
        </div>

        {/* Right Column */}
        <div className="relative mt-12 flex w-full flex-col gap-6 lg:mt-0 lg:h-[600px] lg:max-w-none">
          {/* Mobile fallback cards */}
          <div className="grid gap-6 lg:hidden">
            {cardDefinitions.map(({ title, subtitle, content, layout, contentLeft }) => (
              <FloatingCard
                key={title}
                title={title}
                subtitle={subtitle}
                className="w-full"
                layout={layout}
                contentLeft={contentLeft}
              >
                {content}
              </FloatingCard>
            ))}
          </div>

          {/* Floating Cards for large screens */}
          <div
            className="relative hidden h-[400px] sm:h-[500px] lg:block lg:h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/images/pattern-image.png')" }}
          >
            {cardDefinitions.map(
              ({ title, subtitle, desktopClassName, content, layout, contentLeft }) => (
                <FloatingCard
                  key={title}
                  title={title}
                  subtitle={subtitle}
                  className={`${desktopClassName} w-full`}
                  layout={layout}
                  contentLeft={contentLeft}
                >
                  {content}
                </FloatingCard>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionForEach;
