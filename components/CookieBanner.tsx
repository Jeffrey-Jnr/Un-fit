"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem("cookie_consent");
    if (!hasConsented) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(true);
      setTimeout(() => setIsVisible(true), 50);
    }
  }, []);

  const handleClose = (consent: string) => {
    localStorage.setItem("cookie_consent", consent);
    setIsVisible(false);
    setTimeout(() => {
      setShow(false);
    }, 500);
  };

  if (!show) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
      <div className="text-sm text-gray-700 max-w-4xl text-center md:text-left">
        We use cookies to improve your experience on our site, analyze site traffic, and assist in our marketing efforts. Read our{" "}
        <Link href="/privacy" className="text-[#ea580c] hover:underline font-medium">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/cookies" className="text-[#ea580c] hover:underline font-medium">
          Cookie Policy
        </Link>{" "}
        for more details.
      </div>
      <div className="flex gap-3 whitespace-nowrap flex-shrink-0">
        <button
          onClick={() => handleClose("true")}
          className="bg-black text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors"
        >
          Got it
        </button>
        <button
          onClick={() => handleClose("false")}
          className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors border border-gray-200"
        >
          Opt Out
        </button>
      </div>
    </div>
  );
}
