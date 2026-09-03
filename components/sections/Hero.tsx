"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Master timeline with initial delay
    const tl = gsap.timeline({ delay: 0.25 });
    
    // Slow down the entire cinematic sequence by 25% for a more dramatic feel
    tl.timeScale(0.75);

    // 1. Logo reveal
    tl.set(".gsap-nav-logo", { autoAlpha: 1 });
    tl.fromTo(
      ".gsap-nav-logo",
      { x: -15 },
      { x: 0, duration: 0.6, ease: "power4.out" }
    );
    tl.fromTo(
      "#logo-mask",
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 0.6, ease: "power4.out" },
      "<"
    );

    // 2. Navigation and CTA
    tl.fromTo(
      ".gsap-nav-link",
      { autoAlpha: 0, y: -15 },
      { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.5, ease: "power3.out" },
      "<0.1"
    );
    tl.fromTo(
      ".gsap-nav-cta",
      { autoAlpha: 0, scale: 0.94 },
      { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power3.out" },
      "<"
    );

    // 3. Main headline reveal
    tl.fromTo(
      ".hero-desktop .gsap-word",
      { autoAlpha: 0, yPercent: 120, filter: "blur(10px)" },
      { autoAlpha: 1, yPercent: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.08, ease: "power4.out" },
      "-=0.2"
    );
    tl.fromTo(
      ".hero-mobile .gsap-word",
      { autoAlpha: 0, yPercent: 120, filter: "blur(10px)" },
      { autoAlpha: 1, yPercent: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.08, ease: "power4.out" },
      "<"
    );

    // 4. Special “you?” reveal
    tl.fromTo(
      ".hero-desktop .gsap-you-letter",
      { autoAlpha: 0, yPercent: 130, rotateX: -70 },
      { autoAlpha: 1, yPercent: 0, rotateX: 0, duration: 0.65, stagger: 0.08, ease: "back.out(1.3)" },
      "-=0.6"
    );
    tl.fromTo(
      ".hero-mobile .gsap-you-letter",
      { autoAlpha: 0, yPercent: 130, rotateX: -70 },
      { autoAlpha: 1, yPercent: 0, rotateX: 0, duration: 0.65, stagger: 0.08, ease: "back.out(1.3)" },
      "<"
    );
    
    tl.fromTo(
      ".hero-desktop .gsap-qmark",
      { autoAlpha: 0, y: 35, rotate: 8, scale: 0.85 },
      { autoAlpha: 1, y: 0, rotate: 0, scale: 1, duration: 0.6, ease: "back.out(1.5)" },
      "-=0.45"
    );
    tl.fromTo(
      ".hero-mobile .gsap-qmark",
      { autoAlpha: 0, y: 35, rotate: 8, scale: 0.85 },
      { autoAlpha: 1, y: 0, rotate: 0, scale: 1, duration: 0.6, ease: "back.out(1.5)" },
      "<"
    );

    // 5. Supporting paragraph
    tl.fromTo(
      ".gsap-paragraph",
      { autoAlpha: 0, y: 20, filter: "blur(8px)", letterSpacing: "0.04em" },
      { autoAlpha: 1, y: 0, filter: "blur(0px)", letterSpacing: "normal", duration: 0.7, ease: "power3.out" },
      "-=0.55"
    );

    // 6. Book composition reveal
    tl.fromTo(
      ".gsap-book-center",
      { autoAlpha: 0, y: 220, scale: 0.88, rotateX: 10, filter: "blur(4px)" },
      { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)", duration: 1.2, ease: "expo.out" },
      "-=0.45"
    );

    tl.fromTo(
      [".gsap-book-left", ".gsap-book-right"],
      { autoAlpha: 0, y: 170 },
      { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power4.out" },
      "-=1.1"
    );
    
    // Bottom Buttons and Logos (not specified, but shouldn't flash)
    tl.fromTo(
      ".gsap-hero-bottom > *",
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", clearProps: "transform" },
      "-=0.7"
    );

    // 7. (Floating effect removed)

    // 8. Scroll effect: Pin heading and smoothly blur/fade it out as books rise (Desktop / Tablet only)
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          pin: ".hero-text",
          pinSpacing: false,
          scrub: 0.8, // Smooth damping inertia
        }
      });

      scrollTl
        .to(".hero-text", {
          opacity: 0,
          filter: "blur(24px)",
          scale: 0.92,
          y: -35,
          ease: "power1.out",
          duration: 0.35, // More gradual, comfortable transition
        })
        .set(".hero-text", {
          visibility: "hidden",
          pointerEvents: "none",
        })
        .to({}, { duration: 0.65 }); // Stays 100% hidden and pinned for the rest of the hero scroll
    });

  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={container} 
      className="relative min-h-screen flex flex-col items-center justify-center pt-40 md:pt-32 pb-4 md:pb-12 px-6 lg:px-12 overflow-hidden bg-white"
    >
      <div className="max-w-5xl mx-auto w-full z-10 flex flex-col items-center sm:mt-0">
        
        {/* Top: Headline & Subtext (z-10 so books can scroll on top of it) */}
        <div className="hero-text flex flex-col items-center text-center w-full z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif-hero text-[var(--color-dark)] tracking-tight mb-2 leading-[1.15]">
            {/* Desktop Layout */}
            <div className="hero-desktop hidden md:block">
              <div className="overflow-hidden py-1 flex justify-center">
                <span className="flex flex-wrap justify-center gap-x-[0.25em]">
                  {["Can", "God", "really", "use"].map((word, i) => (
                    <span key={`desk-w1-${i}`} className="gsap-word inline-block invisible opacity-0">{word}</span>
                  ))}
                </span>
              </div>
              
              <div className="overflow-hidden py-2 -my-2 flex justify-center items-center w-full">
                <span className="flex flex-wrap justify-center items-center gap-x-[0.25em] md:pl-6 lg:pl-10">
                  {["someone", "like"].map((word, i) => (
                    <span key={`desk-w2-${i}`} className="gsap-word inline-block invisible opacity-0">{word}</span>
                  ))}
                  
                  <span className="gsap-you text-[var(--color-primary)] inline-flex ml-[0.1em]" style={{ perspective: "400px" }}>
                    {["y", "o", "u"].map((letter, i) => (
                      <span key={`desk-l-${i}`} className="gsap-you-letter inline-block invisible opacity-0 origin-bottom">{letter}</span>
                    ))}
                  </span>
                  
                  <Image 
                    src="/question mark.png" 
                    alt="?" 
                    width={800} 
                    height={800}
                    style={{ filter: 'saturate(1.5) contrast(1.005) brightness(1.05)' }}
                    className="gsap-qmark inline-block h-[1.4em] w-[1.4em] -ml-2 sm:-ml-4 md:-ml-8 lg:-ml-12 -mt-2 align-middle object-contain invisible opacity-0" 
                  />
                </span>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="hero-mobile flex md:hidden flex-col items-center w-full">
              <div className="overflow-hidden py-1 flex justify-center w-full">
                <span className="flex justify-center gap-x-[0.25em]">
                  {["Can", "God", "really"].map((word, i) => (
                    <span key={`mob-w1-${i}`} className="gsap-word inline-block invisible opacity-0">{word}</span>
                  ))}
                </span>
              </div>

              <div className="overflow-hidden py-1 flex justify-center w-full">
                <span className="flex justify-center gap-x-[0.25em]">
                  {["use", "someone", "like"].map((word, i) => (
                    <span key={`mob-w2-${i}`} className="gsap-word inline-block invisible opacity-0">{word}</span>
                  ))}
                </span>
              </div>
              
              <div className="overflow-hidden py-2 -my-2 flex justify-center items-center w-full flex-wrap">
                <span className="flex justify-center items-center gap-x-[0.25em]">
                  
                  <span className="gsap-you text-[var(--color-primary)] inline-flex ml-[0.1em]" style={{ perspective: "400px" }}>
                    {["y", "o", "u"].map((letter, i) => (
                      <span key={`mob-l-${i}`} className="gsap-you-letter inline-block invisible opacity-0 origin-bottom">{letter}</span>
                    ))}
                  </span>
                  
                  <Image 
                    src="/question mark.png" 
                    alt="?" 
                    width={800} 
                    height={800}
                    style={{ filter: 'saturate(1.5) contrast(1.005) brightness(1.05)' }}
                    className="gsap-qmark inline-block h-[1.4em] w-[1.4em] -ml-6 sm:-ml-4 -mt-2 align-middle object-contain invisible opacity-0" 
                  />
                </span>
              </div>
            </div>
          </h1>
          <p className="gsap-paragraph text-[15.5px] sm:text-lg md:text-xl text-[var(--color-dark)]/80 max-w-2xl leading-relaxed font-normal invisible opacity-0 mt-3 md:mt-1 -mx-4 sm:mx-0">
            An honest conversation on brokenness, purpose, <br className="block sm:hidden" /> grace, and a God who uses imperfect people.
          </p>
        </div>

        {/* Middle: The Book Image (Split into 3 for animation, z-30 to scroll OVER the text) */}
        <div className="hero-books-container relative w-full max-w-[900px] aspect-square -mt-20 md:-mt-32 lg:-mt-64 mb-4 lg:mb-12 flex justify-center mx-auto pointer-events-none z-30" style={{ perspective: "1200px" }}>
          
          {/* Left Book Clip */}
          <div className="gsap-book-left absolute inset-0 z-10 invisible opacity-0" style={{ clipPath: 'inset(0 60% 0 0)' }}>
            <Image src="/three versions.png" alt="" fill className="object-contain" priority />
          </div>

          {/* Right Book Clip */}
          <div className="gsap-book-right absolute inset-0 z-10 invisible opacity-0" style={{ clipPath: 'inset(0 0 0 60%)' }}>
            <Image src="/three versions.png" alt="" fill className="object-contain" priority />
          </div>

          {/* Center Book Clip */}
          <div className="gsap-book-center absolute inset-0 z-20 invisible opacity-0" style={{ clipPath: 'inset(0 25% 0 25%)' }}>
            <Image src="/three versions.png" alt="(un)Fit Book Cover" fill className="object-contain" priority />
          </div>

        </div>

        {/* Bottom: Buttons (z-30) */}
        <div className="gsap-hero-bottom flex flex-col items-center text-center w-full z-30 mb-2 md:mb-8 lg:mb-12">
          <div className="flex flex-row gap-2 sm:gap-4 w-full sm:w-auto justify-center invisible opacity-0 px-1 sm:px-0">
            <button 
              onClick={() => scrollToSection('buy')}
              className="flex-1 sm:flex-none px-2 sm:px-8 py-3 sm:py-4 text-[13px] sm:text-base bg-[var(--color-primary)] text-white font-medium rounded-full hover:bg-orange-800 transition-all duration-300 hover:-translate-y-1 relative flex items-center justify-center text-center leading-snug"
            >
              Get Your Copy
            </button>
            <button 
              onClick={() => scrollToSection('sample')}
              className="flex-1 sm:flex-none px-2 sm:px-8 py-3 sm:py-4 text-[13px] sm:text-base bg-transparent text-[var(--color-dark)] border border-[var(--color-dark)] font-medium rounded-full hover:bg-[var(--color-dark)] hover:text-white transition-all duration-300 hover:-translate-y-1 relative flex items-center justify-center text-center leading-snug"
            >
              <span className="hidden sm:inline">Read the First Chapter Free</span>
              <span className="inline sm:hidden">Free Preview</span>
            </button>
          </div>
          
          <div className="flex flex-row items-center justify-between sm:justify-center gap-2 sm:gap-8 md:gap-12 mt-8 sm:mt-10 w-full max-w-[420px] sm:max-w-none mx-auto grayscale hover:grayscale-0 transition-all duration-500 opacity-80 invisible opacity-0 px-2 sm:px-0">
            <Image 
              src="/unfit-lg.png" 
              alt="(un)Fit" 
              width={800} height={400}
              className="object-contain w-[30%] h-auto sm:w-auto sm:h-20 md:h-36 lg:h-48" 
            />
            <img 
              src="/amazon.svg" 
              alt="Amazon" 
              className="object-contain w-[30%] h-auto sm:w-auto sm:h-20 md:h-36 lg:h-48" 
            />
            <Image 
              src="/sellar-lg.png" 
              alt="Selar" 
              width={800} height={400}
              className="object-contain w-[30%] h-auto sm:w-auto sm:h-20 md:h-36 lg:h-48" 
            />
          </div>
        </div>

      </div>
    </section>
  );
}
