import Image from "next/image";
import { ShieldCheck, Truck, Award } from "lucide-react";

interface OrderSummaryCardProps {
  quantity: number;
  setQuantity: (q: number) => void;
  bookTotal: number;
  deliveryCost: number;
  total: number;
  hasSelectedRegion: boolean;
  variant?: "desktop" | "mobile";
}

export default function OrderSummaryCard({
  quantity,
  setQuantity,
  bookTotal,
  deliveryCost,
  total,
  hasSelectedRegion,
  variant = "desktop",
}: OrderSummaryCardProps) {
  const isDesktop = variant === "desktop";

  return (
    <div className={isDesktop ? "sticky top-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm" : ""}>
      {isDesktop && (
        <h2 className="text-xl font-medium text-gray-900 mb-6">Order Summary</h2>
      )}

      {/* Book Item Row */}
      <div className={`flex items-start ${isDesktop ? "pb-6" : "py-4"} border-b border-gray-100`}>
        <div
          className={`${
            isDesktop ? "w-28 h-36" : "w-20 h-28"
          } shrink-0 overflow-hidden relative flex items-center justify-center`}
        >
          <Image
            src="/paperback.jpg"
            alt="(Un)Fit Paperback"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center mix-blend-multiply"
          />
        </div>
        <div className="ml-4 flex-1">
          <h4 className={`font-medium text-gray-900 ${isDesktop ? "text-lg" : ""}`}>(un)Fit</h4>
          <p className={`text-gray-500 ${isDesktop ? "text-sm mt-1" : "text-sm mt-0.5"}`}>Paperback</p>
          <div
            className={`flex items-center ${
              isDesktop ? "mt-3" : "mt-2"
            } border border-gray-200 rounded-md w-fit bg-white`}
          >
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className={`${isDesktop ? "px-3 py-1" : "px-2 py-0.5"} text-gray-500 hover:text-black transition-colors`}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span
              className={`${
                isDesktop ? "px-4 py-1" : "px-3 py-0.5"
              } text-sm font-medium border-x border-gray-200`}
            >
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className={`${isDesktop ? "px-3 py-1" : "px-2 py-0.5"} text-gray-500 hover:text-black transition-colors`}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
        <div className={`font-medium text-gray-900 ${isDesktop ? "text-lg" : ""}`}>
          GH₵ {bookTotal.toFixed(2)}
        </div>
      </div>

      {/* Subtotals */}
      <div className={`space-y-${isDesktop ? "4" : "3"} py-${isDesktop ? "6" : "4"} text-sm`}>
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">GH₵ {bookTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-medium text-gray-900">
            {hasSelectedRegion ? `GH₵ ${deliveryCost.toFixed(2)}` : "--"}
          </span>
        </div>
      </div>

      {/* Total */}
      <div
        className={`flex justify-between ${
          isDesktop ? "pt-6 text-xl" : "pt-4 text-lg"
        } border-t border-gray-200 font-medium`}
      >
        <span>Total</span>
        <span className="text-orange-600">GH₵ {total.toFixed(2)}</span>
      </div>

      {/* Trust Badges (Desktop Only) */}
      {isDesktop && (
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <div className="flex flex-col items-center text-center gap-1.5">
            <ShieldCheck size={24} className="text-orange-500" />
            <span className="text-xs text-gray-500 font-medium">Secure<br />Checkout</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1.5">
            <Truck size={24} className="text-orange-500" />
            <span className="text-xs text-gray-500 font-medium">Reliable<br />Shipping</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1.5">
            <Award size={24} className="text-orange-500" />
            <span className="text-xs text-gray-500 font-medium">Premium<br />Quality</span>
          </div>
        </div>
      )}
    </div>
  );
}
