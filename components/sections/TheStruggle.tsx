"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TheStruggle() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".struggle-line",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="py-24 px-6 bg-[var(--color-dark)] text-white relative">
      <div className="max-w-3xl mx-auto text-center md:text-left">
        <div className="space-y-8 font-serif text-2xl md:text-4xl leading-relaxed font-light text-gray-200">
          <p className="struggle-line opacity-0">Maybe you've made mistakes.</p>
          <p className="struggle-line opacity-0 text-gray-400">Maybe life has left you with scars.</p>
          <p className="struggle-line opacity-0 leading-snug">
            Maybe you love God but still struggle with parts of yourself that make you feel <span className="text-[var(--color-primary)] italic">unqualified</span> for the life He has called you to.
          </p>
        </div>
      </div>
      
      <div className="cracked-divider absolute bottom-0 left-0"></div>
    </section>
  );
}
