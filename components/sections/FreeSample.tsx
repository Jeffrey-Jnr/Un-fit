"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NewsletterModal from "@/components/NewsletterModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function FreeSample() {
  const container = useRef<HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
        once: true
      }
    });

    tl.fromTo(
      ".sample-image",
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out", clearProps: "transform" }
    ).fromTo(
      ".sample-text > *",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", clearProps: "transform" },
      "-=0.6"
    );
  }, { scope: container });

  return (
    <>
      <section ref={container} id="sample" className="bg-white relative overflow-hidden flex flex-col">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-8 lg:gap-24 items-center pt-10 lg:pt-8 pb-8 lg:pb-12 px-6 lg:px-12 relative z-10">
          
          {/* Left: Book Composition */}
          <div className="sample-image order-2 lg:order-1 w-full flex flex-col items-center justify-center -mt-8 md:mt-0 opacity-0">
             <div className="relative h-[280px] sm:h-[360px] md:h-[440px] lg:h-[540px] w-full flex items-center justify-center mb-8 lg:mb-0">
               <Image 
                 src="/books-trimmed.png" 
                 alt="UnFit Books" 
                 fill
                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                 className="object-contain object-center"
                 priority
                 unoptimized
               />
             </div>
             
             {/* Mobile Button (Hidden on Desktop) */}
             <button onClick={() => setIsModalOpen(true)} className="inline-flex lg:hidden items-center justify-center gap-3 bg-[#ea580c] hover:bg-orange-700 text-white px-8 py-4 w-auto rounded-full font-normal md:font-medium text-[17px] md:text-lg hover:scale-105 transition-transform duration-300">
               <Download size={20} />
               Download First Chapter
             </button>
          </div>

          {/* Right: Text & Button */}
          <div className="sample-text order-1 lg:order-2 flex flex-col items-center lg:items-start lg:pl-8 xl:pl-16">
            
            <h2 className="text-center lg:text-left text-4xl md:text-6xl lg:text-7xl font-serif text-gray-900 leading-[1.05] mb-6 opacity-0 will-change-transform">
              Start with the <br/>
              first chapter.
            </h2>

            <p className="text-center lg:text-left text-[17px] md:text-xl text-gray-600 font-light leading-relaxed mb-0 md:mb-10 max-w-lg opacity-0 will-change-transform">
              Get a taste of what (un)Fit is all about. Download the first chapter and see if it speaks to you.
            </p>

            {/* Desktop Button (Hidden on Mobile) */}
            <button onClick={() => setIsModalOpen(true)} className="hidden lg:inline-flex items-center gap-3 bg-[#ea580c] hover:bg-orange-700 text-white px-8 py-4 rounded-full font-medium text-lg hover:scale-105 transition-transform duration-300 opacity-0 will-change-transform">
              <Download size={20} />
              Download First Chapter
            </button>
          </div>
        </div>
      </section>

      <NewsletterModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
