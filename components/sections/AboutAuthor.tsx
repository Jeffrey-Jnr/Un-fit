"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const content = {
  p1: "J.F. Hughes Jr. is an author, pastor, entrepreneur, and emerging voice passionate about helping people discover purpose beyond their imperfections. He serves as a Campus Pastor at Empowerment Worship Centre in Ghana and is a son of Gideon Danso, Global Lead Pastor of Empowerment Worship Centre. His ministry is centered on raising people, shaping destinies, and communicating the transforming power of God’s grace.",
  p2: "His debut book, (un)Fit, was born from a deeply personal conviction: that brokenness does not disqualify anyone from being used by God. Through his writing and ministry, Jeffrey challenges people to move beyond the pressure of perfection and embrace a life shaped by purpose, faith, and the faithfulness of God.",
  quote: "His message is simple: you don’t have to be perfect to be purposeful."
};

export default function AboutAuthor() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
        once: true
      }
    });

    tl.fromTo(
      ".author-image",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out", clearProps: "transform" }
    ).fromTo(
      ".author-text > *",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", clearProps: "transform" },
      "-=0.5"
    );
  }, { scope: container });

  return (
    <section ref={container} className="mt-12 lg:mt-20 bg-white relative overflow-hidden">
      {/* Top fade overlay to catch the gradient from the previous section if needed, though this section is white */}
      <div className="w-full flex flex-col-reverse md:flex-row items-stretch">
        
        {/* Left Side: Photo */}
        <div className="author-image w-full md:w-2/5 lg:w-[45%] aspect-square md:aspect-auto md:min-h-[500px] lg:min-h-[700px] relative flex items-end justify-center overflow-hidden opacity-0 will-change-transform bg-white">
          <Image 
            src="/Jeff.png" 
            alt="Jeffrey Hughes Jr." 
            fill
            className="object-cover object-bottom grayscale contrast-125 brightness-90"
          />
          
          {/* Seamless Horizontal Fade (Desktop) */}
          <div className="absolute top-0 right-0 h-full w-32 lg:w-48 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 hidden md:block" />
          
          {/* Seamless Vertical Fade (Mobile) */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-10 md:hidden" />
        </div>
        
        {/* Right Side: Text Content */}
        <div className="author-text w-full md:w-3/5 lg:w-[55%] flex flex-col justify-start pt-12 md:pt-16 lg:pt-24 px-8 md:px-12 lg:px-20 xl:px-28 pb-16 lg:pb-24 bg-white">
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-medium text-zinc-900 leading-[1.05] tracking-tight mb-12 whitespace-nowrap opacity-0 will-change-transform">
            About The Author
          </h2>
          
          <div className="space-y-6 text-[17px] lg:text-lg text-gray-700 max-w-2xl font-light leading-relaxed opacity-0 will-change-transform">
            <p>{content.p1}</p>
            <p>{content.p2}</p>
            
            <div className="mt-12 pl-6 md:pl-8 border-l-4 border-[#ea580c]">
              <p className="text-xl md:text-2xl font-bold text-black leading-snug">
                {content.quote}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
