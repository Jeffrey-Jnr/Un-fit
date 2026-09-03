"use client";

import React, { useRef, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { ArrowRight, Play } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function VideoEmbed() {
  const container = useRef<HTMLElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
        once: true
      }
    });

    tl.fromTo(
      ".video-text > *, .video-mobile-btn",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", clearProps: "transform" }
    ).fromTo(
      ".video-player-container",
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out", clearProps: "transform" },
      "-=0.6"
    );
  }, { scope: container });

  const handleCustomPlay = () => {
    const player = playerRef.current;
    if (player) {
      player.play();
      setHasPlayed(true);
    }
  };

  return (
    <section ref={container} className="bg-white py-24 lg:py-32 px-6 lg:px-12 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-12 lg:gap-20 items-center">
        
        {/* Left Column: Content */}
        <div className="video-text w-full flex flex-col items-center lg:items-start lg:pr-10">
          
          <h2 className="text-center lg:text-left text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-5 leading-[1.1] opacity-0 will-change-transform">
            Hear it in his own words.
          </h2>
          
          <p className="text-center lg:text-left text-[17px] md:text-xl text-gray-600 font-light leading-relaxed mb-8 max-w-lg opacity-0 will-change-transform">
            Take a minute to hear exactly why Jeffrey wrote this book. A personal message to anyone who has ever felt too broken, too late, or too far gone.
          </p>

          <button className="hidden lg:block bg-[#ea580c] hover:bg-orange-700 text-white px-8 py-4 rounded-full font-medium transition-transform hover:scale-105 opacity-0 will-change-transform">
            Get your copy
          </button>
        </div>

        {/* Right Column: Video */}
        <div className="w-full flex flex-col items-center">
          <div className="video-player-container w-full relative aspect-video bg-zinc-900 rounded-2xl md:rounded-[2rem] overflow-hidden opacity-0 will-change-transform">
            <style>{`
              .custom-player {
                --controls-backdrop-color: transparent;
                --center-play-button: none;
                --seek-backward-button: none;
                --seek-forward-button: none;
                --captions-button: none;
                --pip-button: none;
                --playback-rate-button: none;
                --airplay-button: none;
                --cast-button: none;
                --rendition-menu-button: none;
              }
              .custom-player::part(bottom) {
                transform: scale(0.9);
                transform-origin: bottom center;
                margin-bottom: 24px;
                width: 90%;
                margin-inline: auto;
                border-radius: 100px;
                background-color: rgba(0, 0, 0, 0.7);
                padding: 0 16px;
                backdrop-filter: blur(10px);
              }
              .is-unplayed::part(bottom) {
                display: none;
              }
            `}</style>

            {/* Thumbnail Overlay (visible before play) */}
            <div className={`absolute inset-0 z-10 flex flex-col justify-between p-4 md:p-8 transition-opacity duration-500 ${hasPlayed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/10 pointer-events-none"></div>
              
              {/* Top Area (empty but keeps flex-between working) */}
              <div></div>

              {/* Custom Frosted Glass Play Button (centered) */}
              <button
                onClick={handleCustomPlay}
                aria-label="Play video"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-xl text-white cursor-pointer transition-all duration-200 hover:bg-white/30 hover:scale-105"
              >
                <Play className="w-5 h-5 md:w-8 md:h-8 fill-white ml-1 md:ml-0" />
              </button>

              {/* Bottom Content */}
              <div className="relative z-20 text-white max-w-[90%] md:max-w-[70%]">
                <p className="font-bold text-base md:text-xl leading-snug mb-0.5 md:mb-1">Jeffrey Frank Hughes Jr.</p>
                <p className="text-white/70 text-xs md:text-base">Author of (un)Fit</p>
              </div>
            </div>

            <MuxPlayer
              ref={playerRef}
              className={`custom-player w-full h-full absolute inset-0 ${!hasPlayed ? 'is-unplayed' : ''}`}
              onPlay={() => setHasPlayed(true)}
              playbackId="kADoFyO7V00ycOK01Ea800EaR3bBnCLhyQw2VuazDgi1DM"
              metadata={{ video_title: "A personal invitation from Jeffrey" }}
              poster="/Thumbnail.png"
              accentColor="#ea580c"
              style={{ 
                '--media-object-fit': 'cover',
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              } as any}
            />
          </div>

          {/* Mobile Button (Hidden on Desktop) */}
          <button className="video-mobile-btn lg:hidden mt-8 bg-[#ea580c] hover:bg-orange-700 text-white px-8 py-4 w-auto rounded-full font-normal md:font-medium text-[17px] transition-transform hover:scale-105 opacity-0 will-change-transform">
            Get your copy
          </button>
        </div>

      </div>
    </section>
  );
}
