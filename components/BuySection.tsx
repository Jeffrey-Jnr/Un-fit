"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function BuySection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".cta-container",
        start: "top 75%",
        once: true
      }
    });

    tl.fromTo(
      ".cta-content > *",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", clearProps: "transform" }
    );


  }, { scope: container });

  return (
    <section id="buy" ref={container} className="relative">
      
      {/* ─── CTA ZONE: White → Warm Beige gradient ─── */}
      <div 
        className="cta-container relative px-6 pt-32 pb-8 lg:pt-40 lg:pb-12 text-center"
        style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #fefcfb 40%, #faecd9 100%)' }}
      >
        <div className="cta-content w-full max-w-6xl mx-auto">
          {/* Headline */}
          <h2 className="text-[26px] min-[400px]:text-[28px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-gray-900 leading-[1.2] md:leading-[1.1] mb-4 opacity-0 will-change-transform">
            <span className="block whitespace-nowrap">God still uses broken people</span>
            <span className="block font-light mt-1 md:mt-2">to do big things.</span>
          </h2>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-gray-700/80 font-light mt-6 mb-12 opacity-0 will-change-transform">
            Get your copy of (un)Fit.
          </p>

          {/* Two Buttons */}
          {/* Two Buttons */}
          <div className="flex flex-row w-full max-w-[400px] sm:max-w-none mx-auto gap-3 sm:gap-4 justify-center items-center opacity-0 will-change-transform">
            <a 
              href="#" 
              className="flex-1 sm:flex-none px-2 sm:px-10 py-3 sm:py-4 bg-[#ea580c] text-white font-normal md:font-medium rounded-full text-[15px] sm:text-lg hover:bg-orange-700 hover:scale-105 transition-all duration-300 min-w-0 md:min-w-[220px] text-center shadow-lg"
            >
              Get the Book
            </a>
            <a 
              href="#" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-2 sm:px-10 py-3 sm:py-4 bg-white border border-gray-200 text-[#ea580c] font-normal md:font-medium rounded-full text-[15px] sm:text-lg hover:bg-gray-50 hover:scale-105 transition-all duration-300 min-w-0 md:min-w-[220px] text-center shadow-lg"
            >
              Get the E-Book
            </a>
          </div>
        </div>
      </div>

      {/* ─── CINEMATIC IMAGE ZONE ─── */}
      <div className="cinematic-container relative w-full h-[70vh] lg:h-[85vh] overflow-hidden">
        {/* Top gradient overlay: blends warm beige CTA into the photo's sky */}
        <div 
          className="absolute inset-x-0 top-0 h-16 lg:h-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, #faecd9, transparent)' }}
        />

        {/* Mobile portrait image */}
        <Image
          src="/mountain mobile.png"
          alt="Jeffrey sitting on grass holding his book (un)Fit"
          fill
          className="cinematic-image cinematic-image-mobile object-cover object-[center_75%] will-change-transform md:hidden"
          priority
          quality={100}
        />

        {/* Desktop landscape image */}
        <Image
          src="/landscape-hero.png"
          alt="Jeffrey sitting on grass holding his book (un)Fit"
          fill
          className="cinematic-image cinematic-image-desktop object-cover object-[center_60%] will-change-transform hidden md:block"
          priority
          quality={100}
        />
      </div>

    </section>
  );
}
