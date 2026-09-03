"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const content = {
  quote: "God has always taken pleasure in using broken people, not to shame them, but to reveal His grace. Jeffrey’s life is another reminder that God is not looking for perfection—He is looking for yielded hearts.",
  author: "Prophet Gideon Danso",
  title: "Global Lead Pastor, Empowerment Worship Centre",
};

export default function Endorsement() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        once: true
      }
    });

    tl.fromTo(
      ".endorsement-icon",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
    ).fromTo(
      ".endorsement-text",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.5"
    ).fromTo(
      ".endorsement-author",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );
  }, { scope: container });

  return (
    <section ref={container} className="pt-20 pb-10 lg:py-32 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <div className="endorsement-icon text-[#ea580c] opacity-0 mb-8">
          <Quote size={48} strokeWidth={1} fill="currentColor" className="opacity-20" />
        </div>
        
        <h3 className="endorsement-text text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-zinc-900 leading-tight mb-10 opacity-0">
          &quot;{content.quote}&quot;
        </h3>
        
        <div className="endorsement-author flex flex-col items-center opacity-0">
          <div className="w-12 h-[2px] bg-[#ea580c] mb-6"></div>
          <p className="font-bold text-lg text-zinc-900 uppercase tracking-wider">{content.author}</p>
          <p className="text-zinc-500 mt-1">{content.title}</p>
        </div>
      </div>
    </section>
  );
}
