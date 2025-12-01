// app/components/InnovationHero.tsx
"use client";

import { Play } from "lucide-react";
import React from "react";

type Props = {
  title?: string;
  subtitle?: string;
  onPlay?: () => void; // optional: open modal / video
};

const InnovationHero: React.FC<Props> = ({
  title = "Innovation Insight\nBreakthroughs And Developments",
  subtitle = `On the other hand, we denounce with righteous indignation and dislike men
who are so beguiled and demoralized by the charms of pleasure of the moment,
so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue;
and equal blame belongs to those`,
  onPlay,
}) => {
  return (
    <section className="relative isolate my-20">
      {/* page-wide background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(270deg,#3dd3ce,#c4c4c4)]" />

      {/* content band */}
      <div className="mx-auto max-w-7xl px-4 py-30">
        <div className="rounded-md bg-[linear-gradient(90deg,#3dd3ce,#c4c4c4)] px-6 py-8 text-center sm:px-10 sm:py-20">
          {/* Title */}
          <h1 className="whitespace-pre-line text-2xl font-bold leading-tight text-white sm:text-3xl md:text-6xl">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-3 max-w-3xl text-xs leading-relaxed text-white/85 sm:text-xl">
            {subtitle}
          </p>

          {/* Play button */}
          <button
            type="button"
            onClick={onPlay}
            aria-label="Play video"
            className="group mx-auto mt-6 grid h-12 w-12 place-items-center rounded-full  backdrop-blur transition hover:scale-105"
          >
            <span className="grid h-24 w-24 place-items-center rounded-full bg-linear-to-r from-[#3DD3CE] to-[#FFFFFF] text-white shadow-md">
              {/* play triangle */}
              <Play className="fill-white h-12 w-12"/>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default InnovationHero;
