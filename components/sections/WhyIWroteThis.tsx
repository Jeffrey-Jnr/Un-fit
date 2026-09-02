"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const data = [
  { num: '01', title: 'The Struggle', desc: "Maybe you've made mistakes. Maybe life has left you with scars. Maybe you love God but still struggle with parts of yourself that make you feel unqualified." },
  { num: '02', title: 'The Purpose', desc: "I wrote this book because I know that feeling. (un)Fit is an honest conversation about brokenness, grace, and a God who uses the very things we try to hide." },
  { num: '03', title: 'The Promise', desc: "Your weaknesses don't automatically cancel your calling. Your worst chapters can become the very place purpose begins." }
];

export default function WhyIWroteThis() {
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
      ".why-header > *",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", clearProps: "transform" }
    ).fromTo(
      ".glass-card", 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out", clearProps: "transform" },
      "-=0.4"
    );
  }, { scope: container });

  return (
    <section ref={container} id="why-this-book" className="mt-0 md:mt-12 lg:mt-16 py-10 md:py-20 lg:py-24 px-6 lg:px-12 min-h-screen flex flex-col justify-center relative overflow-hidden">
      
      {/* Abstract Background Image */}
      <Image
        src="/Canvas%20Background%20Design.png"
        alt="Abstract Canvas Texture"
        fill
        className="object-cover object-center opacity-70 z-0"
        priority
        unoptimized
      />
      
      {/* Seamless blend gradient */}
      <div className="absolute top-0 left-0 w-full h-48 lg:h-64 bg-gradient-to-b from-white to-transparent z-[1] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-48 lg:h-64 bg-gradient-to-t from-white to-transparent z-[1] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="why-header text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-serif text-zinc-900 mb-6 opacity-0 will-change-transform">Why This Book?</h2>
          <p className="text-[17px] md:text-xl text-zinc-500 max-w-2xl mx-auto font-light opacity-0 will-change-transform">A Journey of Healing, Imperfection, and Inner Strength.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((item, i) => (
            <div key={i} className="glass-card opacity-0 relative bg-white/40 backdrop-blur-xl border border-white/60 p-10 lg:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-500 group overflow-hidden will-change-transform">
              <h3 className="text-2xl font-bold text-zinc-900 mb-6">{item.title}</h3>
              <p className="text-zinc-600 leading-relaxed relative z-10">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
