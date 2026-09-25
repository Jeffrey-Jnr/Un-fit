import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative z-50 flex items-center justify-between p-4 sm:px-6 lg:px-8 border-b border-gray-200 bg-white">
        <Link href="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors cursor-pointer relative z-50">
          <ArrowLeft size={20} className="mr-2" />
          <span className="hidden sm:inline">Back to Home</span>
          <span className="sm:hidden">Back</span>
        </Link>
        <div className="flex items-center text-gray-500 text-sm">
          <Lock size={16} className="mr-1.5" />
          Secure Checkout
        </div>
      </header>
      
      {/* Main Content Area */}
      <main className="pb-24 lg:pb-12 bg-gray-50 flex-1 flex flex-col items-center justify-center p-6 min-h-[80vh]">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100">
          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 30 30">
              <path d="M19.5 10c.277 0 .5.223.5.5v3c0 .277-.223.5-.5.5s-.5-.223-.5-.5v-3c0-.277.223-.5.5-.5zm-9 0c.277 0 .5.223.5.5v3c0 .277-.223.5-.5.5s-.5-.223-.5-.5v-3c0-.277.223-.5.5-.5zM15 20c-2.104 0-4.186.756-5.798 2.104-.542.4.148 1.223.638.76C11.268 21.67 13.137 21 15 21s3.732.67 5.16 1.864c.478.45 1.176-.364.638-.76C19.186 20.756 17.104 20 15 20zm0-20C6.722 0 0 6.722 0 15c0 8.278 6.722 15 15 15 8.278 0 15-6.722 15-15 0-8.278-6.722-15-15-15zm0 1c7.738 0 14 6.262 14 14s-6.262 14-14 14S1 22.738 1 15 7.262 1 15 1z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-serif text-gray-900 mb-4">Checkout Temporarily Paused</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Due to an overwhelming surge in orders, we have temporarily paused checkout while we process the current batch. Please check back shortly!
          </p>
          <Link 
            href="/"
            className="inline-block w-full px-6 py-4 bg-[#ea580c] text-white font-medium rounded-xl text-lg hover:bg-orange-700 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </main>
    </div>
  );
}
