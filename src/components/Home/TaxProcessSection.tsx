// components/TaxProcessSection.tsx
"use client";

import React, { useEffect, useState } from "react";
import { CircleX, Play } from "lucide-react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

/* ------------------------------------------------------
 * Types
 * ---------------------------------------------------- */
interface ProcessStepCardProps {
  stepNumber: string;
  title: string;
  description: string;
  videoUrl?: string;
}

interface VideoModalProps {
  onClose: () => void;
  videoUrl: string;
}

/* ------------------------------------------------------
 * Video Modal (Portal + Framer Motion)
 * ---------------------------------------------------- */
const VideoModal: React.FC<VideoModalProps> = ({ onClose, videoUrl }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Normalize YouTube URL -> embed + autoplay
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const id = url.match(/[?&]v=([^&]+)/)?.[1] || url.split("/").pop();
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
    }
    return url;
  };

  // ESC to close
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  // Lock scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-9998 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Close button (outside frame, top-right) */}
      <motion.button
        onClick={onClose}
        aria-label="Close video"
        className="fixed top-6 right-8 z-10000 grid h-12 w-12 place-items-center rounded-full bg-white/40 text-black hover:bg-white/60"
        initial={{ opacity: 0, scale: 0.9, y: -6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -6 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <CircleX size={28} />
      </motion.button>

      {/* Dialog */}
      <motion.div
        className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6"
        aria-modal
        role="dialog"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <iframe
            className="h-full w-full rounded-2xl"
            src={getEmbedUrl(videoUrl)}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            title="Process Video"
          />
        </motion.div>
      </motion.div>
    </>,
    document.body
  );
};

/* ------------------------------------------------------
 * Card Component
 * ---------------------------------------------------- */
const ProcessStepCard: React.FC<ProcessStepCardProps> = ({
  stepNumber,
  title,
  description,
  videoUrl,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const numberText =
    "text-[#616161] group-hover:text-[#3DD3CE] transition-colors duration-300";

  return (
    <div
      className={`
        group relative mt-10 overflow-hidden rounded-3xl cursor-pointer
        bg-[#C7EDE5] shadow-md transition-all duration-300 ease-in-out
        hover:bg-white hover:shadow-2xl hover:lg:scale-105 hover:lg:-translate-y-12
        flex w-full max-w-sm flex-col justify-between p-6 sm:max-w-md lg:h-[395px]
        `}
    >
      {/* Play Button */}
      {videoUrl && (
        <div className="absolute right-4 top-4 z-20 flex flex-col items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            aria-label="Play video"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C7EDE5] shadow-lg transition-colors hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          >
            <Play />
          </button>
          <span className="mt-1 whitespace-nowrap text-xs font-medium text-gray-700">
            Play Video
          </span>
        </div>
      )}

      {/* Step Number */}
      <div className="pointer-events-none absolute left-6 top-6 lg:left-0 lg:top-2 lg:-translate-x-1/4 lg:-translate-y-1/4">
        <div
          className={`grid h-24 w-24 place-items-center rounded-full border-12 border-[#FFF2D0]
            bg-transparent text-center font-bold text-4xl sm:h-32 sm:w-32 sm:text-5xl lg:h-40 lg:w-40 lg:border-16 ${numberText}`}
        >
          {stepNumber}
        </div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 mt-24 pt-8 pr-2 sm:pr-5 lg:pt-10">
        <h3 className="mb-2 text-2xl font-bold leading-tight text-[#616161] sm:text-3xl">
          {title}
        </h3>
        <p className="text-md text-gray-700">{description}</p>
      </div>

      {/* Full-Screen Video Modal with animation */}
      <AnimatePresence>
        {isOpen && videoUrl && (
          <VideoModal onClose={() => setIsOpen(false)} videoUrl={videoUrl} />
        )}
      </AnimatePresence>
    </div>
  );
};

/* ------------------------------------------------------
 * Demo Data
 * ---------------------------------------------------- */
const steps = [
  {
    stepNumber: "01",
    title: "Completed your Profile",
    description:
      "Complete your profile so that recruiters can see information of you",
    videoUrl: "https://youtu.be/B9VRvOKKwfs",
  },
  {
    stepNumber: "02",
    title: "Directly CV Upload",
    description:
      "You can upload your resume or CV, and Recruiters will reviewed",
    videoUrl: "https://youtu.be/B9VRvOKKwfs",
  },
  {
    stepNumber: "03",
    title: "Scheduling Interview",
    description: "You can schedule your interview with the Recruiters",
    videoUrl: "https://youtu.be/B9VRvOKKwfs",
  },
  {
    stepNumber: "04",
    title: "Selected Candidate",
    description:
      "Selected candidate can entry the company for interview with recruiter",
    videoUrl: "https://youtu.be/B9VRvOKKwfs",
  },
];

/* ------------------------------------------------------
 * Section Wrapper
 * ---------------------------------------------------- */
export const TaxProcessSection: React.FC = () => {
  return (
    <section className="bg-[#F5F1ED] px-6 py-12 sm:px-10 md:py-16 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:mb-20">
          <h2 className="max-w-2xl text-4xl font-medium leading-tight text-black md:text-5xl lg:text-6xl">
            Get your <span className="font-bold text-[#F2A445]">Taxes</span> in
            Order
            <br />
            and on Time
          </h2>

          <p className="text-lg text-gray-600 lg:self-start lg:text-right">
            Click a Card to show a video.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <ProcessStepCard
              key={index}
              stepNumber={step.stepNumber}
              title={step.title}
              description={step.description}
              videoUrl={step.videoUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TaxProcessSection;
