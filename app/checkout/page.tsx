import CheckoutFlow from "@/components/CheckoutFlow";
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
      <main className="pb-24 lg:pb-12 bg-white">
        <CheckoutFlow />
      </main>
    </div>
  );
}
