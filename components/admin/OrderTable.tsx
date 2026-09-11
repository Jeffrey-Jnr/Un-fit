import { Search, X, Filter, Download, Clock, Package, CircleCheck, ChevronDown } from "lucide-react";
import { Order } from "./types";

interface OrderTableProps {
  totalOrdersCount: number;
  filteredOrders: Order[];
  paginatedOrders: Order[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  openDropdownId: string | null;
  setOpenDropdownId: (id: string | null) => void;
  onSelectOrder: (order: Order) => void;
  onStatusChange: (id: string, status: string) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  itemsPerPage: number;
}

export default function OrderTable({
  totalOrdersCount,
  filteredOrders,
  paginatedOrders,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  openDropdownId,
  setOpenDropdownId,
  onSelectOrder,
  onStatusChange,
  currentPage,
  setCurrentPage,
  totalPages,
  itemsPerPage,
}: OrderTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden flex flex-col">
      {/* Table Header / Tabs */}
      <div className="p-4 lg:px-8 lg:py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
        {/* Mobile Search */}
        <label className="flex sm:hidden items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full cursor-text transition-all">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Start typing to search..."
            className="bg-transparent border-none outline-none text-sm w-full text-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setSearchQuery("");
              }}
              className="text-gray-400 hover:text-gray-700"
            >
              <X size={14} />
            </button>
          )}
        </label>

        <div className="flex gap-4 lg:gap-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("all")}
            className={`text-sm font-medium whitespace-nowrap pb-1 border-b-2 transition-colors ${
              activeTab === "all"
                ? "text-gray-900 border-gray-900"
                : "text-gray-400 border-transparent hover:text-gray-600"
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`text-sm font-medium whitespace-nowrap pb-1 border-b-2 transition-colors ${
              activeTab === "pending"
                ? "text-gray-900 border-gray-900"
                : "text-gray-400 border-transparent hover:text-gray-600"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setActiveTab("delivered")}
            className={`text-sm font-medium whitespace-nowrap pb-1 border-b-2 transition-colors ${
              activeTab === "delivered"
                ? "text-gray-900 border-gray-900"
                : "text-gray-400 border-transparent hover:text-gray-600"
            }`}
          >
            Delivered
          </button>
        </div>
        <div className="flex gap-2 lg:gap-3 shrink-0">
          <button className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full transition-colors">
            <Filter size={16} /> <span className="hidden sm:inline">Filter</span>
          </button>
          <button className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full transition-colors">
            <Download size={16} /> <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Table wrapper for horizontal scrolling */}
      <div className="overflow-x-auto min-h-[400px] pb-32">
        <table className="w-full text-sm text-left min-w-[800px]">
          <thead className="text-xs text-gray-400 uppercase bg-gray-50/50">
            <tr>
              <th className="px-6 lg:px-8 py-4 font-medium tracking-wider">Customer</th>
              <th className="px-4 lg:px-6 py-4 font-medium tracking-wider">Date</th>
              <th className="px-4 lg:px-6 py-4 font-medium tracking-wider">Delivery Details</th>
              <th className="px-4 lg:px-6 py-4 font-medium tracking-wider">Amount</th>
              <th className="px-4 lg:px-6 py-4 font-medium tracking-wider">Status</th>
              <th className="px-6 lg:px-8 py-4 font-medium tracking-wider">
                <div className="flex justify-end">
                  <div className="w-36 text-center">Action</div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-8 py-12 text-center text-gray-500">
                  {totalOrdersCount === 0 ? (
                    <div className="flex flex-col items-center gap-2">
                      <p>No orders found.</p>
                      <p className="text-xs text-gray-400 max-w-md">
                        (If you see orders in Supabase but not here, check your <strong>RLS Policies</strong>. 
                        The anonymous key can&apos;t read rows unless a policy allows it, or RLS is disabled.)
                      </p>
                    </div>
                  ) : (
                    "No orders found matching your filters."
                  )}
                </td>
              </tr>
            ) : (
              paginatedOrders.map((order) => {
                const customerName = order.customer_name || order.buyer_name || "Unknown";
                const customerPhone = order.customer_phone || order.buyer_phone || "N/A";
                const totalAmount = order.total_amount || order.amount || 0;

                return (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                    onClick={() => onSelectOrder(order)}
                  >
                    <td className="px-6 lg:px-8 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-orange-200 flex items-center justify-center text-orange-600 font-bold shrink-0">
                          {customerName.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 truncate">{customerName}</div>
                          <div className="text-gray-500 text-xs mt-0.5 truncate">{customerPhone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-gray-600 whitespace-nowrap">
                      {new Date(order.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <div className="font-medium text-gray-900">{order.region}</div>
                      <div className="text-gray-500 text-xs mt-0.5 truncate max-w-[150px]">
                        {order.delivery_address}
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      GHC {totalAmount.toFixed(2)}
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <div className="flex flex-col gap-1.5 items-start">
                        {order.fulfillment_status === "unfulfilled" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-yellow-600 border border-yellow-200 whitespace-nowrap">
                            <Clock size={10} /> Pending
                          </span>
                        )}
                        {order.fulfillment_status === "shipped" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-600 border border-blue-200 whitespace-nowrap">
                            <Package size={10} /> Shipped
                          </span>
                        )}
                        {order.fulfillment_status === "delivered" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-600 border border-gray-300 whitespace-nowrap">
                            <CircleCheck size={10} /> Delivered
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 lg:px-8 py-4 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <div className="relative inline-block w-36">
                          <button
                            className="w-full bg-white border border-gray-200 hover:border-gray-300 text-gray-700 text-xs font-medium rounded-lg flex items-center justify-between pl-3 pr-2.5 py-2 shadow-sm outline-none transition-all"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownId(openDropdownId === order.id ? null : order.id);
                            }}
                          >
                            <span>
                              {order.fulfillment_status === "unfulfilled"
                                ? "Mark Pending"
                                : order.fulfillment_status === "shipped"
                                ? "Mark Shipped"
                                : "Mark Delivered"}
                            </span>
                            <ChevronDown size={14} className="text-gray-400" />
                          </button>

                          {openDropdownId === order.id && (
                            <>
                              <div
                                className="fixed inset-0 z-40"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenDropdownId(null);
                                }}
                              />
                              <div className="absolute right-0 mt-1 w-full bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50 overflow-hidden transform origin-top-right transition-all">
                                <button
                                  className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onStatusChange(order.id, "unfulfilled");
                                    setOpenDropdownId(null);
                                  }}
                                >
                                  Mark Pending
                                </button>
                                <button
                                  className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onStatusChange(order.id, "shipped");
                                    setOpenDropdownId(null);
                                  }}
                                >
                                  Mark Shipped
                                </button>
                                <button
                                  className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onStatusChange(order.id, "delivered");
                                    setOpenDropdownId(null);
                                  }}
                                >
                                  Mark Delivered
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 lg:px-8 border-t border-gray-100 flex items-center justify-between bg-white mt-auto">
        <span className="text-xs text-gray-500 font-medium">
          Showing {filteredOrders.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
        </span>
        <div className="flex gap-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 text-sm hover:text-gray-700 disabled:opacity-50"
            aria-label="Previous page"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg border text-sm ${
                currentPage === i + 1
                  ? "border-orange-500 text-orange-600 font-medium bg-orange-50"
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 text-sm hover:bg-gray-50 disabled:opacity-50"
            aria-label="Next page"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
