// app/components/BlogPageHeader.tsx
"use client";

import React from "react";

type Props = {
  title?: string;
  subtitle?: string;
  className?: string;
};

const BlogPageHeader: React.FC<Props> = ({
  title = "Blog",
  subtitle = `Welcome to the Smaile Dental Clinic Blog! Discover tips for a bright smile, the latest in dental care, and expert advice. Stay informed and inspired with our quick reads on all things dental.`,
  className,
}) => {
  return (
    <section className={`${className ?? ""}`}>
      <div className="mx-auto max-w-5xl px-6 py-14 sm:py-16 lg:py-20 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-[#616161] sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-10 max-w-3xl text-base leading-relaxed text-[#616161] sm:text-lg">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default BlogPageHeader;
