"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function PageFlipTest() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const pages = pagesRef.current;
      if (!pages || pages.length === 0) return;

      // We pin the container so it stays in view while we scroll
      // and we animate the pages within it.
      
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%", // Scroll for 300% of viewport height to see all animations
          scrub: 1, // Smooth scrubbing
          pin: true,
          // markers: true, // Uncomment to see scroll triggers for debugging
        },
      });

      // Animate each page except the last one
      pages.forEach((page, index) => {
        if (index === pages.length - 1) return; // Last page doesn't flip away

        // We set initial 3d perspective on the parent, but we do it via css below.
        
        // Flip the current page sideways like a book
        tl.to(page, {
          rotateY: -100, // Flip it to the left
          opacity: 0,
          scale: 0.95, // slight scale down to add depth
          transformOrigin: "left center", // anchor the flip to the left edge
          duration: 1,
          ease: "power1.inOut",
        }, index); // index acts as the position parameter, so they happen sequentially

      });
    },
    { scope: containerRef }
  );

  const pagesData = [
    { id: 1, title: "Section 1", bgColor: "bg-blue-600", content: "Keep scrolling down to see the page flip up." },
    { id: 2, title: "Section 2", bgColor: "bg-emerald-600", content: "The previous page flipped away like a notepad!" },
    { id: 3, title: "Section 3", bgColor: "bg-purple-600", content: "This is all driven by your scroll position." },
    { id: 4, title: "Section 4", bgColor: "bg-rose-600", content: "Last section. You can scroll back up to reverse the flip." },
  ];

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      {/* Intro section before the flip area */}
      <div className="h-screen flex items-center justify-center bg-gray-900 flex-col px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Scroll-Driven Flip Effect</h1>
        <p className="text-xl text-gray-400">Scroll down to enter the book.</p>
        <div className="mt-12 animate-bounce">
          ↓
        </div>
      </div>

      {/* The pinned container area */}
      <div 
        ref={containerRef} 
        className="h-screen w-full relative" 
        style={{ perspective: "1500px" }} // Adds 3D depth to the flip
      >
        {pagesData.map((page, i) => (
          <div
            key={page.id}
            ref={(el) => {
              if (el) pagesRef.current[i] = el;
            }}
            className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-8 ${page.bgColor}`}
            style={{ 
              zIndex: pagesData.length - i, // Top page has highest z-index
              backfaceVisibility: "hidden" 
            }}
          >
            <div className="max-w-2xl text-center bg-black/20 p-12 rounded-3xl backdrop-blur-sm border border-white/10 shadow-2xl">
              <h2 className="text-5xl md:text-7xl font-bold mb-6">{page.title}</h2>
              <p className="text-xl md:text-2xl font-light leading-relaxed">{page.content}</p>
            </div>
            
            {/* Page number indicator */}
            <div className="absolute bottom-12 text-white/50 font-mono text-lg">
              Page {i + 1} of {pagesData.length}
            </div>
          </div>
        ))}
      </div>

      {/* Outro section after the flip area */}
      <div className="h-screen flex items-center justify-center bg-gray-900 flex-col px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">End of the flipbook</h2>
        <p className="text-xl text-gray-400">You can continue with standard sections here.</p>
      </div>
    </div>
  );
}
