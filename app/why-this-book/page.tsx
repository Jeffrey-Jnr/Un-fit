"use client";

import React from "react";
import Image from "next/image";

export default function WhyThisBook() {
  return (
    <section className="relative w-full min-h-screen bg-white text-black overflow-hidden flex flex-col items-center py-20 px-4 md:px-10">
      
      {/* BACKGROUND ELEMENTS */}
      
      {/* 1. The Crack (Left Side) */}
      <div className="absolute top-[20%] -left-10 md:-left-20 w-[400px] md:w-[700px] h-auto pointer-events-none opacity-80">
        <Image 
          src="/crack (1).png" 
          alt="Crack texture" 
          width={800} 
          height={1200} 
          className="object-contain"
        />
      </div>

      {/* 2. The Book Cover (Top Right) */}
      {/* We rotate it and position it to peek in from the corner */}
      <div className="absolute -top-20 -right-24 md:-top-48 md:-right-32 w-[350px] md:w-[500px] pointer-events-none drop-shadow-2xl rotate-[25deg] z-10">
        <Image 
          src="/one book.png" 
          alt="Book Cover" 
          width={600} 
          height={800} 
          className="object-contain"
        />
      </div>

      {/* 3. The Line Art Illustration (Bottom Right) */}
      <div className="absolute -bottom-10 md:-bottom-24 -right-16 md:-right-40 w-[400px] md:w-[600px] h-auto pointer-events-none z-0">
        <Image 
          src="/illustration.svg" 
          alt="Despairing line art figure" 
          width={800} 
          height={800} 
          className="object-contain opacity-90"
        />
      </div>

      {/* CONTENT CONTAINER */}
      <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center mt-10 md:mt-20">
        
        {/* Title with Brush Stroke Effect */}
        <div className="relative mb-16 inline-flex items-center justify-center">
          
          {/* The actual brush image as background */}
          {/* We use massive fixed dimensions and scaling to guarantee the "ink" spans the text regardless of transparent padding in the SVG */}
          <div className="absolute w-[800px] h-[400px] md:w-[1200px] md:h-[600px] -z-10 flex items-center justify-center">
            <Image 
              src="/brush.svg"
              alt="Brush stroke"
              fill
              className="object-contain opacity-95 scale-125 md:scale-150"
            />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white px-8 py-4 tracking-wide z-10 relative">
            Why This Book?
          </h2>
        </div>

        {/* Paragraph Text */}
        <div className="text-center text-lg md:text-2xl font-medium space-y-6 max-w-3xl leading-relaxed text-gray-900 mt-8">
          <p>
            Maybe you&apos;ve made mistakes.<br/>
            Maybe life has left you with scars.<br/>
            Maybe you love God but still struggle with parts of yourself that make you feel unqualified for the life He has called you to.
          </p>
          <p>
            I wrote this book because I know that feeling.
          </p>
          <p>
            (un)Fit is an honest conversation about brokenness, purpose, grace, and the kind of God who has never been afraid to use imperfect people.
          </p>
          <p>
            Your weaknesses don&apos;t automatically cancel your calling. Your worst moments don&apos;t get to write the ending of your story.
          </p>
        </div>

      </div>
    </section>
  );
}
