"use client";

import React from "react";
import Image from "next/image";

export default function WhyThisBook() {
  return (
    <section className="relative w-full min-h-screen bg-white text-black overflow-hidden flex flex-col items-center py-20 px-4 md:px-10">
      
      {/* BACKGROUND ELEMENTS */}
      
      {/* 1. The Book Cover (Top Right) */}
      {/* We rotate it and position it to peek in from the corner */}
      <div className="absolute -top-20 -right-24 md:-top-48 md:-right-32 w-[350px] md:w-[500px] pointer-events-none drop-shadow-2xl rotate-[25deg] z-10">
        <Image 
          src="/images/books/one-book.png" 
          alt="Book Cover" 
          width={600} 
          height={800} 
          className="object-contain"
        />
      </div>

      {/* 2. The Line Art Illustration (Bottom Right) */}
      <div className="absolute -bottom-10 md:-bottom-24 -right-16 md:-right-40 w-[400px] md:w-[600px] h-auto pointer-events-none z-0">
        <Image 
          src="/images/misc/illustration.svg" 
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
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white bg-[#1A1A1A] px-10 py-5 rounded-2xl md:rounded-full tracking-wide z-10 relative shadow-xl">
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
