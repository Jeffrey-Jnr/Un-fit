import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Free Sample Chapter - (un)Fit',
  description: 'Read the first chapter of (un)Fit by Jeffrey Hughes Jr.',
};

export default function SamplePage() {
  return (
    <div className="min-h-screen bg-[#FAF7F3] flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10 text-center mt-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Your Free Sample Chapter</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Thank you for joining the community! You can read the sample of <strong>(un)Fit</strong> directly below, or download it to your device to read later.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <a
            href="/sample.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#F05522] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#d94c1e] transition-colors"
          >
            Open in Full Screen
          </a>
          <a
            href="/sample.pdf"
            download
            className="bg-gray-100 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
          >
            Download PDF
          </a>
        </div>

        {/* Embedded PDF Viewer */}
        <div className="w-full aspect-[3/4] sm:aspect-auto sm:h-[800px] bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-inner">
          <iframe 
            src="/sample.pdf#toolbar=0" 
            className="w-full h-full"
            title="(un)Fit Sample Chapter"
          />
        </div>
        
        <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Finished the sample?</h3>
          <p className="text-gray-600 mb-4">Get the full book today and continue the journey.</p>
          <Link
            href="/checkout"
            className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors inline-block"
          >
            Buy the Full Book
          </Link>
        </div>
      </div>
      
      <div className="mt-8 mb-12">
        <Link href="/" className="text-gray-500 hover:text-gray-900 font-medium">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}
