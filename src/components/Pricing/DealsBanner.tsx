import React from "react";
import { Sparkles, ShoppingBag, Hand, Star } from "lucide-react";

const ratingStars = Array.from({ length: 5 }, (_, index) => index);

const DealsBanner: React.FC = () => {
  return (
    <section className="px-4 md:px-8 py-20 md:py-32">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-white/70 shadow-md backdrop-blur">
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-slate-50 via-emerald-50 to-amber-50" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_120%_at_0%_0%,rgba(59,130,246,0.06),transparent_60%),radial-gradient(80%_140%_at_80%_20%,rgba(16,185,129,0.2),transparent_60%),radial-gradient(100%_120%_at_60%_80%,rgba(251,191,36,0.25),transparent_60%)]" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6 md:p-10">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-md font-semibold text-emerald-700">
              <Sparkles className="h-4 w-4" />
              AI Optimized
            </div>

            <h1 className="mt-4 text-3xl md:text-5xl font-medium leading-tight tracking-tight text-slate-900">
              Discover Top Products
              <br />& Deals in here
            </h1>

            <p className="mt-4 text-slate-600 max-w-md">
              Browse the best offers from trusted sellers
            </p>

            <div className="mt-6">
              <a
                href="#get-started"
                className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow hover:shadow-md active:scale-[0.99]"
              >
                Get started now
              </a>
            </div>
          </div>

          <div className="relative flex h-[260px] sm:h-[300px] md:h-[340px] items-center justify-center">
            <div className="absolute -top-1 left-1/2 z-10 -translate-x-1/2 md:left-auto md:right-48 md:translate-x-0 rounded-full bg-emerald-400 p-3 text-white shadow-xl ring-8 ring-emerald-100/60">
              <ShoppingBag className="h-8 w-8" />
            </div>

            <div className="relative flex h-full w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px] items-end justify-center">
              <div className="hidden md:block absolute inset-y-8 right-10 h-[260px] w-[220px] rounded-2xl border border-emerald-100 bg-white/50 shadow-md" />
              <div className="hidden sm:block absolute inset-y-10 -right-4 h-80 w-[220px] rounded-2xl border border-emerald-200 bg-white/70 shadow-lg" />
              <div className="relative w-full -rotate-1 sm:-rotate-2 md:-rotate-3 rounded-2xl border border-emerald-300 bg-white shadow-xl">
                <div className="p-4 sm:p-6 text-slate-700">
                  <div className="rounded-2xl border border-slate-200 p-3 sm:p-4">
                    <div className="text-[10px] font-semibold text-slate-500">
                      Order #1121-00021-12901
                      <div>04 May 2025, 08:21 AM PST</div>
                      <hr className="mt-2 border-slate-200" />
                    </div>

                    <div className="mt-4 flex gap-3">
                      <div className="h-12 w-12 rounded-md bg-slate-200" />
                      <div>
                        <div className="font-semibold text-slate-800">Nintendo Switch 2</div>
                        <div className="text-xs text-slate-500">How is the overall quality of this product?</div>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2 text-amber-400">
                      {ratingStars.map((star) => (
                        <Star key={star} className="h-4 w-4" fill="currentColor" strokeWidth={1.5} />
                      ))}
                      <span className="text-xs text-slate-500">Very Good</span>
                    </div>

                    <div className="mt-4 rounded-xl border border-slate-200 p-3 text-xs text-slate-400 min-h-[72px]">
                      Write your description about this product
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-2 sm:-right-4 bottom-6 sm:bottom-10 grid place-items-center">
                <Hand className="h-10 w-10 text-slate-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsBanner;
