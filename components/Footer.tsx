"use client";

export default function Footer() {
  return (
    <div className="relative w-full">
      {/* Grass background behind footer */}
      <div 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/grass-only.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'top center'
        }}
      />

      <footer className="footer-content relative bg-white rounded-t-[20px] md:rounded-t-[40px] px-6 pt-16 pb-8 mx-4 md:mx-8 lg:mx-auto w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-[1400px] -mt-24 z-10 text-[var(--color-dark)] shadow-2xl">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            {/* Left Column */}
            <div className="col-span-1 md:col-span-1 -mt-6">
              <img 
                src="/Un-fit.svg" 
                alt="(un)Fit Logo" 
                className="h-24 w-auto -mt-4 -mb-7 object-contain brightness-0 relative z-10"
              />
              <p className="text-gray-600 mb-4 text-sm relative z-20">
                An honest conversation on brokenness, purpose, and grace.
              </p>
              
              <div className="flex flex-col items-stretch gap-3 max-w-[220px]">
                <a href="#buy" className="py-3 px-6 bg-black text-white text-center rounded-lg font-normal hover:bg-[#ea580c] transition-colors">
                  Order Physical Copy
                </a>
                <a href="#buy" className="py-3 px-6 bg-black text-white text-center rounded-lg font-normal hover:bg-[#ea580c] transition-colors">
                  Get E-Book
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
