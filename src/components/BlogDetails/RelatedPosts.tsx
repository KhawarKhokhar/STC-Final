// app/components/RelatedPosts.tsx
// Next.js + TypeScript + Tailwind – single, reusable component matching the screenshot

import React from "react";

export type RelatedPost = {
  id: string;
  title: string;
  summary: string;
  href?: string;
  imageUrl?: string; // optional; placeholder shown when missing
};

export type RelatedPostsProps = {
  tag?: string;
  heading?: string;
  subheading?: string;
  posts: RelatedPost[]; // ideally 3 items for the layout, but responsive to any length
};

export default function RelatedPosts({
  tag = "Related Blog",
  heading = "Find More Property Tips and Insights",
  subheading = "Visit our blog for guides and strategies to make smart property investments.",
  posts,
}: RelatedPostsProps) {
  return (
    <section className="w-full bg-white py-12 text-neutral-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Tag */}
        <div className="mx-auto mb-4 w-fit select-none rounded-xl border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600 shadow-sm">
          {tag}
        </div>

        {/* Heading */}
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-neutral-600 sm:text-base">
          {subheading}
        </p>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group rounded-2xl border border-neutral-200 bg-white p-4 transition hover:shadow-md"
            >
              {/* Image / placeholder */}
              <div className="overflow-hidden rounded-sm border border-neutral-200 bg-neutral-200/80">
                {post.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="aspect-[16/9] h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="aspect-[16/9] w-full" />
                )}
              </div>

              {/* Text */}
              <div className="mt-4">
                <h3 className="text-sm font-semibold leading-6 text-neutral-900">
                  {post.href ? (
                    <a href={post.href} className="hover:underline">
                      {post.title}
                    </a>
                  ) : (
                    post.title
                  )}
                </h3>
                <p className="mt-2 text-xs leading-6 text-neutral-600">
                  {post.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
