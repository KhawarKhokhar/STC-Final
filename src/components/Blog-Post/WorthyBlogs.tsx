// app/components/WorthyBlogs.tsx
"use client";

import React from "react";
import { Eye, Share2, Heart, User2 } from "lucide-react";

type Post = {
  category: string;
  title: string;
  excerpt: string;
  views: string;
  shares: string;
  likes: string;
  author: string;
  image?: string;
};

const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(to right, rgba(61, 211, 206, 0.3) 1px, transparent 2px),
    linear-gradient(to bottom, rgba(6, 211, 206, 0.3) 1px, transparent 2px)
  `,
  backgroundSize: "60px 60px",
  backgroundColor: "#F3EFE8",
} as const;

const demo: Post = {
  category: "Technology",
  title:
    "Make sure to include in your wheel hire the best employee",
  excerpt:
    "Get all your ducks in a row: good optics close the loop and zeitgeist, so manage quarterly sales. Pipeline sales are at an all-time low—future-proof, or 60% to 30% is a lot of percent. Take five.",
  views: "5K Views",
  shares: "1K Shares",
  likes: "121 Likes",
  author: "Omar Aly",
};

const WorthyBlogs: React.FC<{ post?: Post }> = ({ post = demo }) => {
  return (
    <section
    style={gridBackgroundStyle} 
      className="relative isolate px-6 pt-10 sm:px-10 md:pt-20 mb-20"
    >
      

      {/* eyebrow + headline */}
      <div className="mx-auto max-w-7xl text-center">
        <p className="mb-1 text-[16px] font-bold tracking-[0.2em] text-[#c49aa1]">
          THINGS TO READ
        </p>
        <h2 id="worthy-blogs" className="text-3xl font-semibold tracking-tight text-slate-800 sm:text-5xl">
          We wrote you a worthy blogs
        </h2>
      </div>

      {/* content */}
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2">
        {/* left image card */}
        <div className="rounded-[22px] bg-white p-3 shadow-sm">
          <div
            className="h-64 w-full rounded-[18px] bg-[#7fded7] grid place-items-center text-white sm:h-72"
            style={
              post.image
                ? {
                    backgroundImage: `url(${post.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : undefined
            }
          >
            {!post.image && (
              <span className="rounded-md bg-white/60 px-2 py-1 text-[10px] text-slate-700">
                img
              </span>
            )}
          </div>
        </div>

        {/* right copy */}
        <div className="flex flex-col justify-center">
          <p className="text-[16px] font-bold tracking-[0.25em] text-[#cb9ea6]">
            {post.category.toUpperCase()}
          </p>
          <h3 className="mt-2 text-2xl font-semibold leading-snug text-slate-900 sm:text-3xl">
            {post.title}
          </h3>
          <p className="mt-3 max-w-[48ch] text-lg leading-relaxed text-slate-600">
            {post.excerpt}
          </p>

          {/* meta */}
          <div className="mt-5 flex flex-wrap items-center gap-5 text-lg text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              {post.views}
            </span>
            <span className="inline-flex items-center gap-1">
              <Share2 className="h-3.5 w-3.5" />
              {post.shares}
            </span>
            <span className="inline-flex items-center gap-1">
              <Heart className="h-3.5 w-3.5" />
              {post.likes}
            </span>
            <span className="inline-flex items-center gap-1">
              <User2 className="h-3.5 w-3.5" />
              {post.author}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorthyBlogs;
