"use client";

import React, { useState, useEffect, useRef } from "react";

const testimonialData = [
  {
    id: 1,
    name: "WILLIAM AZUWEB",
    title: "Global Consulting",
    avatar: "https://randomuser.me/api/portraits/men/88.jpg",
    testimonial:
      "I cannot recommend this AI text to video converter enough. As a small business owner, I was hesitant to spend a lot of money on video production, but this platform makes it affordable. The quality is exceptional and the ease of use is a game-changer.",
  },
  {
    id: 2,
    name: "DANIEL LEWIS",
    title: "Digital Designer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    testimonial:
      "We have built a training academy for our SaaS product with STC Amazing platform! I was able to create a professional-quality video in just a few minutes AI We managed to produce.",
  },
  {
    id: 3,
    name: "EMILY JOHNSON",
    title: "Podcast Host",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    testimonial:
      "This AI text to video converter has saved me so much effort when creating my business. With just a few clicks, I am able to create engaging videos that effectively convey my message.",
  },
  {
    id: 4,
    name: "CHARLES HENRY",
    title: "Project Manager",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    testimonial:
      "We're using STC to create explainer videos. It's just easier, faster, and more cost-effective to use STC than to record an actual person doing the explanation.",
  },
  {
    id: 5,
    name: "WILLIAM AZUWEB",
    title: "Global Consulting",
    avatar: "https://randomuser.me/api/portraits/men/88.jpg",
    testimonial:
      "I cannot recommend this AI text to video converter enough. As a small business owner, I was hesitant to spend a lot of money on video production, but this platform makes it affordable. The quality is exceptional and the ease of use is a game-changer.",
  },
  {
    id: 6,
    name: "DANIEL LEWIS",
    title: "Digital Designer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    testimonial:
      "We have built a training academy for our SaaS product with STC Amazing platform! I was able to create a professional-quality video in just a few minutes AI We managed to produce.",
  },
  {
    id: 7,
    name: "EMILY JOHNSON",
    title: "Podcast Host",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    testimonial:
      "This AI text to video converter has saved me so much effort when creating my business. With just a few clicks, I am able to create engaging videos that effectively convey my message.",
  },
  {
    id: 8,
    name: "CHARLES HENRY",
    title: "Project Manager",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    testimonial:
      "We're using STC to create explainer videos. It's just easier, faster, and more cost-effective to use STC than to record an actual person doing the explanation.",
  },
];

const Reviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [cardWidth, setCardWidth] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // 1. Update cardsToShow based on screen width AND calculate the card width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newCardsToShow;

      if (width < 640) newCardsToShow = 1; // mobile
      else if (width < 1024) newCardsToShow = 2; // tablet
      else newCardsToShow = 3; // desktop

      setCardsToShow(newCardsToShow);

      // Measure the width of the main container and calculate the card width
      if (sliderRef.current) {
        // The container width minus any outer padding in the `max-w-[1400px]` div
        const containerWidth = sliderRef.current.offsetWidth;
        // Divide by the number of cards shown, then subtract any horizontal padding/margin of the inner card.
        // The inner card has `px-2` (0.5rem * 2 = 16px).
        const calculatedCardWidth = containerWidth / newCardsToShow;
        setCardWidth(calculatedCardWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Run only on mount and unmount

  // 2. Define the slide functions based on card width
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : maxIndex));
  };

  // Prevent sliding beyond the available content
  const totalSlides = testimonialData.length;
  const maxIndex = totalSlides > cardsToShow ? totalSlides - cardsToShow : 0;

  // 3. Define the transformation in pixels/rems
  const transformX = currentIndex * cardWidth;

  // 4. Use `ref` on the slider wrapper to measure its width
  return (
    <section className="flex flex-col items-center justify-center py-16 relative bg-[#F3EFE8] overflow-hidden px-4 sm:px-6">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-normal text-[#2a2a2a]">
          Trusted By
        </h1>
        <h2 className="text-3xl sm:text-4xl md:text-5xl italic font-semibold text-[#4A245C]">
          Professionals
        </h2>
      </header>

      {/* Slider */}
      {/* Add ref to the wrapper to measure width */}
      <div
        ref={sliderRef}
        className="relative w-full max-w-[1400px] flex items-center"
      >
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          // Only show arrow if there are more items to scroll and on screens wider than mobile
          disabled={currentIndex === 0}
          aria-label="Previous testimonial"
          className={`absolute -left-15 z-20 bg-white p-3 rounded-full shadow hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed ${
            totalSlides > cardsToShow ? "hidden md:flex" : "hidden"
          }`}
        >
          &#8592;
        </button>

        {/* Cards Container */}
        <div className="overflow-hidden w-full py-9">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              // Apply transformation using calculated pixel/rem value
              transform: `translateX(-${transformX}px)`,
              // This width can be dynamic/large since we are controlling card width
              width: `${totalSlides * cardWidth}px`, 
            }}
          >
            {testimonialData.map((t) => (
              <div
                key={t.id}
                className={`shrink-0 px-2`}
                // Apply the calculated card width directly
                style={{ width: `${cardWidth}px` }}
              >
                <article className="h-full bg-[#F9F7F5] rounded-[25px] shadow-lg p-6 sm:p-8 flex flex-col gap-4 border border-[#eee]">
                  <div className="flex items-center gap-4">
                    {t.avatar && (
                      <img
                        src={t.avatar}
                        alt={`${t.name} avatar`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div className="flex flex-col">
                      <h3 className="text-base font-bold text-[#4A245C]">
                        {t.name}
                      </h3>
                      <p className="text-sm text-gray-500">{t.title}</p>
                    </div>
                  </div>
                  <blockquote className="text-base text-gray-700 leading-relaxed mt-2 grow">
                    {t.testimonial}
                  </blockquote>
                  <div className="flex gap-1 mt-3 text-xl">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[#C9C4BF]">
                        ★
                      </span> // Changed to a solid star for better visibility
                    ))}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          // Only show arrow if there are more items to scroll and on screens wider than mobile
          disabled={currentIndex === maxIndex}
          aria-label="Next testimonial"
          className={`absolute -right-15 z-20 bg-white p-3 rounded-full shadow hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed ${
            totalSlides > cardsToShow ? "hidden md:flex" : "hidden"
          }`}
        >
          &#8594;
        </button>

        {/* Mobile Paging Controls (Dots) */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
          {Array.from({
            length: totalSlides > cardsToShow ? totalSlides - cardsToShow + 1 : 0,
          }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full transition-colors ${
                i === currentIndex ? "bg-[#4A245C]" : "bg-gray-400"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
