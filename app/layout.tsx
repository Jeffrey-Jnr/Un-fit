import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Lora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CookieBanner from "@/components/CookieBanner";

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"], 
  variable: "--font-serif" 
});

const lora = Lora({ 
  subsets: ["latin"], 
  variable: "--font-serif-hero" 
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://www.unfitbook.com'),
  title: "(un)Fit | Can God really use someone like you?",
  description: "(un)Fit is an honest conversation about brokenness, purpose, and grace, and the kind of God who has never been afraid to use imperfect people.",
  openGraph: {
    title: "(un)Fit | Can God really use someone like you?",
    description: "(un)Fit is an honest conversation about brokenness, purpose, and grace...",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${cormorant.variable} ${lora.variable} ${inter.variable}`}>
      <head>
        {/* JSON-LD Schema for Book */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Book",
              "name": "(un)Fit",
              "author": {
                "@type": "Person",
                "name": "Jeffrey Hughes Jr."
              },
              "url": "https://yoursite.com", // Replace later
              "bookFormat": "https://schema.org/Paperback"
            })
          }}
        />

        {/* Google Analytics Placeholder */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
        
        {/* Meta Pixel Placeholder */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
      </head>
      <body className="antialiased">
        <Navbar />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
