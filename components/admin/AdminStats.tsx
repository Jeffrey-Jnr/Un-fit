import Image from "next/image";
import { TrendingUp, Clock } from "lucide-react";
import { Order } from "./types";

interface AdminStatsProps {
  orders: Order[];
}

export default function AdminStats({ orders }: AdminStatsProps) {
  const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.total_amount || order.amount) || 0), 0);
  const pendingDeliveries = orders.filter((o) => o.fulfillment_status === "unfulfilled").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
      {/* Revenue */}
      <div className="bg-white p-5 lg:p-6 rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-between group">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
            GHC {Math.floor(totalRevenue)}
            <span className="text-base lg:text-lg text-gray-400">
              .{(totalRevenue % 1).toFixed(2).substring(2)}
            </span>
          </h3>
          <p className="text-xs text-green-500 font-medium mt-2 flex items-center gap-1">
            <TrendingUp size={12} /> Based on all orders
          </p>
        </div>
        <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
          <Image src="/sales-amount-svgrepo-com.svg?v=2" alt="Revenue" width={28} height={28} className="w-6 h-6 lg:w-7 lg:h-7" />
        </div>
      </div>

      {/* Orders */}
      <div className="bg-white p-5 lg:p-6 rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-between group">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Total Orders</p>
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">{orders.length}</h3>
          <p className="text-xs text-green-500 font-medium mt-2 flex items-center gap-1">
            <TrendingUp size={12} /> +2 new today
          </p>
        </div>
        <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
          <Image src="/cart-shopping-svgrepo-com.svg?v=2" alt="Orders" width={28} height={28} className="w-6 h-6 lg:w-7 lg:h-7" />
        </div>
      </div>

      {/* Pending Deliveries */}
      <div className="bg-white p-5 lg:p-6 rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-between group sm:col-span-2 lg:col-span-1">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Pending Deliveries</p>
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">{pendingDeliveries}</h3>
          <p className="text-xs text-orange-500 font-medium mt-2 flex items-center gap-1">
            <Clock size={12} /> Requires action
          </p>
        </div>
        <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
          <Image src="/delivery-car-svgrepo-com.svg?v=2" alt="Pending Deliveries" width={28} height={28} className="w-6 h-6 lg:w-7 lg:h-7" />
        </div>
      </div>
    </div>
  );
}
