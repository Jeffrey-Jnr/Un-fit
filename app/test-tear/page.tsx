"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function TornPaperTest() {
  const containerRef = useRef<HTMLDivElement>(null);
  const solidCoverRef = useRef<HTMLDivElement>(null);
  const curlRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!solidCoverRef.current || !containerRef.current || !curlRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // Longer scroll distance for a smoother tear
          scrub: true,
          pin: true,
        }
      });

      // 1. Animate the solid cover clipping away from left to right
      tl.to(solidCoverRef.current, {
        clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        ease: "none",
        duration: 1
      }, 0); // The '0' position parameter ensures both animations start at exactly the same time

      // 2. Animate the separated curl moving across the screen
      // We start it off-screen to the left (-20vw) and move it off-screen to the right (100vw)
      tl.fromTo(curlRef.current, 
        { left: "-10%" }, // Start slightly offscreen to hide it initially
        { 
          left: "100%", // Travel all the way across the screen
          ease: "none",
          duration: 1
        }, 
        0
      );
    },
    { scope: containerRef }
  );

  return (
    <div className="bg-gray-900 min-h-screen">
      
      {/* Spacer */}
      <div className="h-screen flex items-center justify-center text-white flex-col">
        <h1 className="text-4xl mb-4">Scroll down to rip the paper</h1>
        <div className="animate-bounce text-2xl">↓</div>
      </div>

      {/* The main pinning container */}
      <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-white">
        
        {/* LAYER 1: The Background Text (Bottom-most) */}
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 text-white z-0">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-center max-w-4xl leading-none">
            A Broken World <br />
            <span className="text-orange-500">Big Things</span>
          </h2>
        </div>

        {/* LAYER 2: The Torn Paper Edge (Middle) */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
            <img 
              src="/torn paper.svg" 
              alt="Torn edge" 
              className="w-[120%] h-auto min-w-[1000px] object-cover scale-110" 
            />
        </div>

        {/* LAYER 3: The Solid Untorn Paper Cover (Top-most) */}
        <div 
          ref={solidCoverRef}
          className="absolute inset-0 bg-white z-20 pointer-events-none"
          style={{ 
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" 
          }}
        ></div>

        {/* LAYER 4: The Traveling Curl! (Above the solid cover) */}
        {/* It is positioned absolutely, and GSAP will move its 'left' property to drag it across */}
        <div 
          ref={curlRef}
          className="absolute top-0 bottom-0 z-30 pointer-events-none flex items-center"
          style={{ width: "20vw" /* Adjust width based on how big the curl graphic should be */ }}
        >
          {/* We use -translate-x-1/2 so the center of the curl lines up with the exact edge of the tear */}
          <img 
            src="/t-curl.svg" 
            alt="Rolling paper curl" 
            className="w-full h-auto drop-shadow-2xl -translate-x-1/2 scale-125"
          />
        </div>

      </div>

      {/* Spacer */}
      <div className="h-screen flex items-center justify-center text-white">
        <h2 className="text-3xl">Next Section Content</h2>
      </div>

    </div>
  );
}
