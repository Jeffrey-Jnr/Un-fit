"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Free Sample", href: "#sample" },
  { label: "Get Your Copy", href: "#buy", cta: true },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Responsive threshold: wait for headline blur on desktop (>=768px), standard threshold on mobile
    const handleScroll = () => {
      const threshold = window.innerWidth >= 768 ? 320 : 40;
      setScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent py-2"
      }`}
    >
      {/* Promo Bar (Expands smoothly on scroll) */}
      <div
        className={`w-full bg-[var(--color-primary)] text-white text-[10px] sm:text-xs font-bold text-center uppercase tracking-widest transition-all duration-300 overflow-hidden flex items-center justify-center ${
          scrolled ? "h-10 opacity-100" : "h-0 opacity-0"
        }`}
      >
        Read the first chapter instantly for free
      </div>

      {/* Inner Container */}
      <div
        className={`relative flex items-center justify-between h-16 transition-all duration-300 ${
          scrolled
            ? "px-4 sm:px-6 lg:px-8 max-w-full"
            : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("#")}
          className="gsap-nav-logo flex-shrink-0 cursor-pointer relative h-16 w-32 sm:w-40 block"
          style={{ visibility: 'hidden', opacity: 0 }}
          aria-label="Go to top"
        >
          <div className="w-full h-full relative" style={{ clipPath: 'inset(0 100% 0 0)' }} id="logo-mask">
            <Image
              src="/unfit-lg.png"
              alt="(Un)Fit Logo"
              width={300}
              height={300}
              className={`absolute top-1/2 -translate-y-1/2 max-w-none h-auto transition-all duration-300 brightness-0 ${
                scrolled
                  ? "w-[140px] sm:w-[160px] -left-2 sm:-left-3"
                  : "w-[115px] sm:w-[130px] -left-1 sm:-left-1.5"
              }`}
              priority
            />
          </div>
        </button>

        {/* Right Side Wrapper */}
        <div className="flex items-center">
          {/* Desktop Links (Animates between centered absolute and right-aligned flex) */}
          <div
            className={`hidden md:flex items-center transition-all duration-300 ${
              scrolled
                ? "gap-4 mr-4"
                : "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-6 md:gap-8"
            }`}
          >
            {navLinks.filter((link) => !link.cta).map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                style={{ visibility: 'hidden', opacity: 0 }}
                className={`gsap-nav-link px-3 py-2 cursor-pointer transition-all duration-300 ${
                  scrolled
                    ? "text-gray-600 hover:text-[var(--color-primary)] text-xs lg:text-sm font-medium uppercase tracking-widest"
                    : "text-[var(--color-dark)] hover:text-[var(--color-primary)] text-base font-normal"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA and Mobile Toggle */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex">
              {navLinks.filter((link) => link.cta).map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  style={{ visibility: 'hidden', opacity: 0 }}
                  className={`gsap-nav-cta cursor-pointer transition-all duration-300 ${
                    scrolled
                      ? "px-8 py-3 bg-[var(--color-dark)] text-white font-medium uppercase tracking-widest text-xs hover:bg-[var(--color-primary)]"
                      : "px-5 py-2.5 bg-[var(--color-primary)] text-white font-medium rounded-sm text-sm hover:bg-orange-600 hover:-translate-y-0.5"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 cursor-pointer text-[var(--color-dark)]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white text-[var(--color-dark)] border-t border-gray-100 ${
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 border-transparent"
        }`}
      >
        <div className="px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className={`block w-full text-left px-3 py-3 rounded-sm transition-colors duration-200 cursor-pointer ${
                link.cta
                  ? `mt-4 w-auto inline-block ${
                      scrolled
                        ? "px-8 py-3 bg-[var(--color-dark)] text-white font-medium uppercase tracking-widest text-xs"
                        : "px-5 py-2.5 bg-[var(--color-primary)] text-white font-medium rounded-sm text-sm"
                    }`
                  : "text-gray-600 font-normal text-base"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
