"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ReceiptTicket() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams?.get("order") || "UNFIT-0000";
  const amount = searchParams?.get("amount");
  
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  return (
    <div className="min-h-screen bg-[#EAF0F6] flex items-center justify-center p-4 font-sans">
      <div className="relative w-full max-w-sm bg-white rounded-xl shadow-2xl shadow-blue-900/10 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
        
        {/* Top Section */}
        <div className="p-8 pt-10 text-center">
          <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-10 h-10 bg-[#4CAF50] rounded-full flex items-center justify-center shadow-sm">
              <Check size={24} className="text-white" strokeWidth={3} />
            </div>
          </div>
          
          <h1 className="text-xl font-bold text-gray-900 mb-1">Payment successful</h1>
          <p className="text-sm text-gray-500">Thank you! Your order is confirmed.</p>
          
          <div className="mt-8 space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Order Number:</span>
              <span className="font-medium text-gray-900">{orderNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Date and Time:</span>
              <span className="font-medium text-gray-900" suppressHydrationWarning>{date} {time}</span>
            </div>
          </div>
        </div>

        {/* Divider with Cutouts */}
        <div className="relative flex items-center justify-center h-8">
          <div className="absolute left-[-16px] w-8 h-8 bg-[#EAF0F6] rounded-full shadow-[inset_-4px_0_4px_rgba(0,0,0,0.02)]"></div>
          <div className="w-full border-t-2 border-dashed border-gray-200 mx-6"></div>
          <div className="absolute right-[-16px] w-8 h-8 bg-[#EAF0F6] rounded-full shadow-[inset_4px_0_4px_rgba(0,0,0,0.02)]"></div>
        </div>

        {/* Bottom Section */}
        <div className="p-8 pb-10 text-sm">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Product:</span>
              <span className="font-medium text-gray-900">(un)Fit Paperback</span>
            </div>
            {amount && (
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Amount Paid:</span>
                <span className="font-bold text-gray-900 text-sm">GH₵ {amount}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Payment Status:</span>
              <span className="font-bold text-green-600 text-sm">Paid</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="flex justify-center items-center gap-2 mb-8">
            <span className="text-sm text-gray-400 font-medium">Powered by</span>
            <img 
              src="/paystack-logo-png_seeklogo-409509.png" 
              alt="Paystack" 
              className="h-5 w-auto object-contain opacity-90 relative top-[-1px]" 
            />
          </div>

          <Link 
            href="/"
            className="flex items-center justify-center w-full py-4 bg-[#ea580c] text-white font-medium rounded-full hover:bg-orange-700 transition-colors shadow-md hover:-translate-y-0.5"
          >
            Return Home
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#EAF0F6] flex items-center justify-center"></div>}>
      <ReceiptTicket />
    </Suspense>
  );
}
