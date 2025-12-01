"use client";

import React, { JSX } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Extended FAQ Data with +8 dummy entries
const faqData = [
  {
    id: 1,
    question: "Is Salore suitable for small businesses and large enterprises?",
    answer:
      "Yes, Salore is designed to cater to businesses of all sizes. It offers scalability and customization to meet the unique needs of small businesses, startups, and large enterprises. You can choose the pricing plan that best suits your organization.",
    isHighlighted: false,
  },
  {
    id: 2,
    question: "What is Salore and how does it work?",
    answer:
      "Salore is a SaaS platform designed for sales management. It helps businesses streamline their sales processes by providing a centralized hub for managing leads, sales pipelines, and customer interactions.",
    isHighlighted: true,
  },
  {
    id: 3,
    question: "What features does Salore offer for sales teams?",
    answer:
      "Salore offers lead tracking, contact management, pipeline visualization, automated email marketing, reporting tools, and integrations with popular CRM systems.",
    isHighlighted: false,
  },
  {
    id: 4,
    question: "How can Salore's landing pages help my business?",
    answer:
      "Salore's landing pages enable businesses to create customized, high-converting pages with templates, A/B testing, and analytics for better performance.",
    isHighlighted: false,
  },
  // ✅ Dummy Extra FAQs
  {
    id: 5,
    question: "Does Salore support multiple languages?",
    answer:
      "Salore is a SaaS platform designed for sales management. It helps businesses streamline their sales processes by providing a centralized hub for managing leads, sales pipelines, and customer interactions.",
    isHighlighted: false,
  },
  {
    id: 6,
    question: "Can I integrate Salore with my CRM?",
    answer:
      "Salore is a SaaS platform designed for sales management. It helps businesses streamline their sales processes by providing a centralized hub for managing leads, sales pipelines, and customer interactions.",
    isHighlighted: false,
  },
  {
    id: 7,
    question: "Is there a free trial available?",
    answer:
      "Salore is a SaaS platform designed for sales management. It helps businesses streamline their sales processes by providing a centralized hub for managing leads, sales pipelines, and customer interactions.",
    isHighlighted: true,
  },
  {
    id: 8,
    question: "Can I manage customer data securely?",
    answer:
      "Salore is a SaaS platform designed for sales management. It helps businesses streamline their sales processes by providing a centralized hub for managing leads, sales pipelines, and customer interactions.",
    isHighlighted: false,
  },
  {
    id: 9,
    question: "Does Salore provide analytics?",
    answer:
      "Salore is a SaaS platform designed for sales management. It helps businesses streamline their sales processes by providing a centralized hub for managing leads, sales pipelines, and customer interactions.",
    isHighlighted: false,
  },
  {
    id: 10,
    question: "How does pricing work?",
    answer:
      "Salore is a SaaS platform designed for sales management. It helps businesses streamline their sales processes by providing a centralized hub for managing leads, sales pipelines, and customer interactions.",
    isHighlighted: false,
  },
  {
    id: 11,
    question: "Is customer support available?",
   answer:
      "Salore is a SaaS platform designed for sales management. It helps businesses streamline their sales processes by providing a centralized hub for managing leads, sales pipelines, and customer interactions.",
    isHighlighted: false,
  },
  {
    id: 12,
    question: "Does Salore work on mobile?",
   answer:
      "Salore is a SaaS platform designed for sales management. It helps businesses streamline their sales processes by providing a centralized hub for managing leads, sales pipelines, and customer interactions.",
    isHighlighted: false,
  },
];

const CommonQuestion = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center justify-center gap-5 p-5 relative bg-[#F3EFE8] overflow-hidden">
      {/* Header */}
      <header className="flex-col max-w-[900px] px-0 py-[50px] flex items-center justify-center gap-5">
        <h1 className="text-[#2a2a2a] text-[48px] md:text-[56px] font-normal text-center leading-snug">
          Common Questions to Know
        </h1>
        <p className="text-[#2a2a2a] text-lg md:text-xl text-center">
          Discover how unified data and trusted AI help you connect with
          customers in a whole new way.
        </p>
      </header>

      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="w-full max-w-[1400px]"
      >
        {faqData.map((faq) => (
          <SwiperSlide key={faq.id}>
            <article
              className="flex flex-col w-full h-80 items-start gap-6 p-[30px] relative rounded-[20px] overflow-hidden bg-[#e4e2df] text-[#2a2a2a] transition-all duration-500"
            >
              <h2 className="text-2xl font-medium leading-[30px] text-left">
                {faq.question}
              </h2>
              <p className="text-base text-left">{faq.answer}</p>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Active Card Styling */}
      <style jsx global>{`
        .swiper-slide-active article {
          background: #000 !important;
          color: #fff !important;
        }
        .swiper-slide-active h2,
        .swiper-slide-active p {
          color: #fff !important;
        }
      `}</style>
    </section>
  );
};

export default CommonQuestion;
