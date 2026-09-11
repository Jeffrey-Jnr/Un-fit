"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { X, MapPin, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import NewsletterModal from "@/components/NewsletterModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function BuySection() {
  const container = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isPrelaunch = process.env.NEXT_PUBLIC_IS_PRELAUNCH === 'true';

  useEffect(() => {
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
    window.addEventListener('openBuyModal', handleOpenModal);
    return () => window.removeEventListener('openBuyModal', handleOpenModal);
  }, []);

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
    <section id="buy" ref={container} className="relative z-10">
      
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
            {isPrelaunch ? "Be the first to get your copy of (un)Fit." : "Get your copy of (un)Fit."}
          </p>

          {/* Two Buttons */}
          <div className="flex flex-row w-full max-w-[400px] sm:max-w-none mx-auto gap-3 sm:gap-4 justify-center items-center opacity-0 will-change-transform">
            <button 
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }} 
              className="flex-1 sm:flex-none px-2 sm:px-10 py-3 sm:py-4 bg-[#ea580c] text-white font-normal md:font-medium rounded-full text-[15px] sm:text-lg hover:bg-orange-700 hover:scale-105 transition-all duration-300 min-w-0 md:min-w-[220px] text-center shadow-lg"
            >
              {isPrelaunch ? "Join the Waitlist" : "Get the Book"}
            </button>
            {isPrelaunch ? (
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setIsModalOpen(true);
                }}
                className="flex-1 sm:flex-none px-2 sm:px-10 py-3 sm:py-4 bg-white border border-gray-200 text-[#ea580c] font-normal md:font-medium rounded-full text-[15px] sm:text-lg hover:bg-gray-50 hover:scale-105 transition-all duration-300 min-w-0 md:min-w-[220px] text-center shadow-lg"
              >
                Get Notified
              </button>
            ) : (
              <a 
                href="#" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-2 sm:px-10 py-3 sm:py-4 bg-white border border-gray-200 text-[#ea580c] font-normal md:font-medium rounded-full text-[15px] sm:text-lg hover:bg-gray-50 hover:scale-105 transition-all duration-300 min-w-0 md:min-w-[220px] text-center shadow-lg"
              >
                Get the E-Book
              </a>
            )}
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

        {/* Responsive cinematic image with full raw PNG fidelity */}
        <picture>
          <source media="(min-width: 768px)" srcSet="/landscape-hero.png" />
          <source media="(max-width: 767px)" srcSet="/mountain-mobile.png" />
          <img
            src="/landscape-hero.png"
            alt="Jeffrey sitting on grass holding his book (un)Fit"
            className="cinematic-image absolute inset-0 w-full h-full object-cover object-[center_75%] md:object-[center_60%]"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>

      {isPrelaunch ? (
        <NewsletterModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          type="waitlist"
        />
      ) : (
        isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setIsModalOpen(false)}
            />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all p-6 sm:p-8 animate-in fade-in zoom-in duration-300">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 hover:bg-gray-100 rounded-full cursor-pointer"
              >
                <X size={20} />
              </button>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-serif text-gray-900 mb-2">Choose your location</h3>
                <p className="text-gray-500 text-sm">Where would you like your paperback delivered?</p>
              </div>
              <div className="flex flex-col gap-4">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/checkout");
                  }}
                  className="w-full text-left group flex items-center p-4 border border-gray-200 rounded-xl hover:border-black active:border-black hover:bg-gray-50 active:bg-gray-50 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-transparent text-black border border-black rounded-full flex items-center justify-center mr-4 group-hover:bg-black group-hover:text-white group-active:bg-black group-active:text-white transition-colors">
                    <MapPin size={24} />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium text-gray-900 text-lg">Ghana</div>
                    <div className="text-gray-500 text-sm">Local delivery & pickup</div>
                  </div>
                </button>
                <a 
                  href="#amazon-global" 
                  onClick={() => setIsModalOpen(false)}
                  className="group flex items-center p-4 border border-gray-200 rounded-xl hover:border-black active:border-black hover:bg-gray-50 active:bg-gray-50 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-transparent text-black border border-black rounded-full flex items-center justify-center mr-4 group-hover:bg-black group-hover:text-white group-active:bg-black group-active:text-white transition-colors">
                    <Globe size={24} />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium text-gray-900 text-lg">International</div>
                    <div className="text-gray-500 text-sm">Order via Amazon</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )
      )}
    </section>
  );
}
