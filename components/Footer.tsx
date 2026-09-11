"use client";

import { useState } from "react";
import Image from "next/image";

export default function Footer() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/mailerlite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email }),
      });

      if (res.ok) {
        setStatus("success");
        setFirstName("");
        setLastName("");
        setEmail("");
        setTimeout(() => {
          setStatus("idle");
        }, 4000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative w-full">
      {/* Mobile Grass background behind footer */}
      <div 
        className="absolute inset-x-0 bottom-0 -top-10 w-full z-0 pointer-events-none md:hidden"
        style={{
          backgroundImage: 'url(/grass-mobile.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      />

      {/* Desktop Grass background behind footer */}
      <div 
        className="absolute inset-x-0 bottom-0 -top-32 w-full z-0 pointer-events-none hidden md:block"
        style={{
          backgroundImage: 'url(/grass-only.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      />

      <footer className="footer-content relative bg-white rounded-t-[20px] md:rounded-t-[40px] px-6 pt-16 pb-8 mx-4 md:mx-8 lg:mx-auto w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-[1400px] -mt-24 z-10 text-[var(--color-dark)] shadow-2xl">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            {/* Left Column */}
            <div className="col-span-1 md:col-span-1 -mt-6">
              <Image 
                src="/unfit-lg.png" 
                alt="(un)Fit Logo" 
                width={800} height={400}
                className="h-24 w-auto -mt-4 -mb-7 object-contain brightness-0 relative z-10"
              />
              <p className="text-gray-600 mb-4 text-sm relative z-20">
                An honest conversation on brokenness, purpose, and grace.
              </p>
              
              <div className="flex flex-col items-stretch gap-3 max-w-[220px]">
                <a href="#buy" className="py-3 px-6 bg-black text-white text-center rounded-lg font-normal hover:bg-[#ea580c] transition-colors">
                  {process.env.NEXT_PUBLIC_IS_PRELAUNCH === 'true' ? "Join the Waitlist" : "Order Physical Copy"}
                </a>
                <a href="#buy" className="py-3 px-6 bg-black text-white text-center rounded-lg font-normal hover:bg-[#ea580c] transition-colors">
                  {process.env.NEXT_PUBLIC_IS_PRELAUNCH === 'true' ? "Get Notified" : "Get E-Book"}
                </a>
              </div>
            </div>
            
            {/* Links Columns */}
            <div className="col-span-1 md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-[#ea580c] font-semibold text-xs tracking-wider mb-6 uppercase">Explore</h3>
                <ul className="space-y-4 text-sm font-medium">
                  <li><a href="#" className="hover:text-[#ea580c] transition-colors">Home</a></li>
                  <li><a href="#" className="hover:text-[#ea580c] transition-colors">About the Author</a></li>
                  <li><a href="#" className="hover:text-[#ea580c] transition-colors">Free Sample</a></li>
                  <li><a href="#buy" className="hover:text-[#ea580c] transition-colors">Buy the Book</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-[#ea580c] font-semibold text-xs tracking-wider mb-6 uppercase">Connect</h3>
                <ul className="space-y-4 text-sm font-medium">
                  <li><a href="https://www.instagram.com/jeffreyhughes.jr/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ea580c] transition-colors">Instagram</a></li>
                  <li><a href="https://www.threads.com/@Jeffreyhughes.jr" target="_blank" rel="noopener noreferrer" className="hover:text-[#ea580c] transition-colors">Threads</a></li>
                  <li><a href="https://x.com/__jeffreys?s=11" target="_blank" rel="noopener noreferrer" className="hover:text-[#ea580c] transition-colors">Twitter (X)</a></li>
                  <li><a href="https://www.tiktok.com/@jeffreyhughesjr1?_r=1&_t=ZS-99NP0V2pekf" target="_blank" rel="noopener noreferrer" className="hover:text-[#ea580c] transition-colors">TikTok</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-[#ea580c] font-semibold text-xs tracking-wider mb-6 uppercase">Legal</h3>
                <ul className="space-y-4 text-sm font-medium">
                  <li><a href="/terms" className="hover:text-[#ea580c] transition-colors">Terms of Service</a></li>
                  <li><a href="/privacy" className="hover:text-[#ea580c] transition-colors">Privacy Policy</a></li>
                  <li><a href="/cookies" className="hover:text-[#ea580c] transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
            
          </div>
          
          {/* Newsletter Section */}
          <div className="mb-12 pt-12 border-t border-gray-100 flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Join the Community</h3>
              <p className="text-gray-600 max-w-md">
                Get the free sample chapter instantly and join me for honest conversations on brokenness, purpose, and grace.
              </p>
            </div>
            <form 
              className="flex flex-col w-full lg:w-auto gap-3"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" 
                  name="firstName"
                  placeholder="First name" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent w-full sm:w-1/2 text-gray-900"
                  required
                />
                <input 
                  type="text" 
                  name="lastName"
                  placeholder="Last name" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent w-full sm:w-1/2 text-gray-900"
                  required
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent w-full sm:w-[260px] text-gray-900"
                  required
                />
                <button 
                  type="submit"
                  disabled={status === "loading"}
                  className={`px-8 py-3 text-white font-medium rounded-xl transition-colors shadow-sm whitespace-nowrap flex-grow sm:flex-grow-0 disabled:opacity-70 ${
                    status === "success" 
                      ? "bg-green-600 hover:bg-green-700" 
                      : "bg-[#ea580c] hover:bg-[#d94c1e]"
                  }`}
                >
                  {status === "loading" && "Sending..."}
                  {status === "success" && "Check your inbox!"}
                  {status === "error" && "Error. Try again."}
                  {status === "idle" && "Get Free Sample"}
                </button>
              </div>
            </form>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 text-sm text-gray-500 gap-4">
            <div className="flex items-center gap-6">
              <a href="https://www.instagram.com/jeffreyhughes.jr/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform block">
                <img src="/instagram.svg" alt="Instagram" className="w-8 h-8 object-contain scale-125" style={{ width: 32, height: 32 }} />
              </a>
              <a href="https://x.com/__jeffreys?s=11" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform block">
                <img src="/twitter (X).svg" alt="Twitter (X)" className="w-8 h-8 object-contain scale-125" style={{ width: 32, height: 32 }} />
              </a>
              <a href="https://www.threads.com/@Jeffreyhughes.jr" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform block">
                <img src="/threads.svg" alt="Threads" className="w-8 h-8 object-contain scale-125" style={{ width: 32, height: 32 }} />
              </a>
              <a href="https://www.tiktok.com/@jeffreyhughesjr1?_r=1&_t=ZS-99NP0V2pekf" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform block">
                <img src="/tiktok.svg" alt="TikTok" className="w-8 h-8 object-contain scale-125" style={{ width: 32, height: 32 }} />
              </a>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="/terms" className="hover:text-gray-900 transition-colors">Terms of service</a>
              <a href="/privacy" className="hover:text-gray-900 transition-colors">Privacy</a>
            </div>
            
            <div>
              Copyright © {new Date().getFullYear()}
            </div>
          </div>
          
        </div>
      </footer>
    </div>
  );
}
