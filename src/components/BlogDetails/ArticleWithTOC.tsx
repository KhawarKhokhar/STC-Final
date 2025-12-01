// app/components/ArticleWithTOC.tsx
// Updated layout to place Table of Content on the left and Article on the right side with proper spacing.
'use client'
import React, { useEffect, useState } from "react";

export type TocItem = { id: string; title: string };
export type Section = {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  bullets?: string[];
};

export type ArticleWithTOCProps = {
  tocTitle?: string;
  tocItems: TocItem[];
  sections: Section[];
};

export default function ArticleWithTOC({
  tocTitle = "Table Of Content",
  tocItems,
  sections,
}: ArticleWithTOCProps) {
  const [activeId, setActiveId] = useState<string>(sections?.[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 1] }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <section className="w-full text-neutral-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8 md:flex-row md:items-start">
        {/* Table of Content */}
        <aside className="md:sticky md:top-8 md:w-1/4 lg:w-1/5">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold text-neutral-800">
              {tocTitle}
            </h3>
            <nav className="space-y-1 divide-y divide-neutral-200">
              {tocItems.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(item.id)?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    className={`block py-2 text-sm transition-colors duration-200 ${
                      isActive
                        ? "text-neutral-900 font-medium"
                        : "text-neutral-500 hover:text-neutral-800"
                    }`}
                  >
                    {item.title}
                  </a>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Article Content */}
        <article className="md:w-3/4 lg:w-4/5 space-y-6 bg-white rounded-2xl">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="rounded-2xl p-6"
            >
              <h2 className="text-lg font-semibold text-neutral-900">
                {section.title}
              </h2>

              {section.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={section.imageUrl}
                  alt="section image"
                  className="mt-4 aspect-[16/9] w-full rounded-xl object-cover"
                />
              ) : index === 1 ? (
                <div className="mt-4 aspect-[16/9] w-full rounded-xl bg-neutral-200" />
              ) : null}

              {section.description && (
                <p className="mt-4 text-sm leading-6 text-neutral-600">
                  {section.description}
                </p>
              )}

              {section.bullets && (
                <ul className="mt-4 list-disc space-y-1 pl-6 text-sm text-neutral-600">
                  {section.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      </div>
    </section>
  );
}
