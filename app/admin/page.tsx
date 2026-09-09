"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Bell, LayoutDashboard, ShoppingCart, Users, Settings, Filter, Download, CircleCheck, Clock, TrendingUp, Package, Menu, X, PanelLeft, ChevronDown, LogOut } from "lucide-react";

import { createClient } from "@/utils/supabase/client";

interface Order {
  id: string;
  created_at: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  total_amount?: number;
  region?: string;
  delivery_address?: string;
  delivery_tier?: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string;
  amount: number;
  fulfillment_status: string;
  payment_status: string;
  paystack_reference?: string;
  delivery_cost?: number;
}

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<"dashboard" | "orders" | "customers">("dashboard");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  useEffect(() => {
    async function fetchOrders() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching orders:', error);
      } else if (data) {
        const formattedOrders = data.map((order: Record<string, unknown>) => ({
          ...order,
          buyer_name: order.customer_name || "Unknown",
          buyer_email: order.customer_email || "N/A",
          buyer_phone: order.customer_phone || "N/A",
          amount: order.total_amount || 0,
          region: order.region || "N/A",
          delivery_address: order.delivery_address || "N/A",
          delivery_tier: order.delivery_tier || "N/A"
        })) as Order[];
        setOrders(formattedOrders);
      }
    }
    
    fetchOrders();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    // Optimistic update
    setOrders(orders.map(o => o.id === id ? { ...o, fulfillment_status: newStatus } : o));
    
    // Call the API route which updates Supabase AND sends the email
    try {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!res.ok) {
        console.error('Error updating status');
        // Revert optimistic update on failure
        setOrders(prev => prev.map(o => o.id === id ? { ...o, fulfillment_status: o.fulfillment_status } : o));
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const filteredOrders = orders.filter(order => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      (order.buyer_name?.toLowerCase().includes(searchLower)) || 
      (order.buyer_email?.toLowerCase().includes(searchLower)) ||
      (order.region?.toLowerCase().includes(searchLower));
    
    const matchesTab = activeTab === "all" ? true :
                       activeTab === "pending" ? order.fulfillment_status === "unfulfilled" :
                       activeTab === "delivered" ? order.fulfillment_status === "delivered" : true;
    
    return matchesSearch && matchesTab;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex h-screen bg-[#F7F8FA] text-gray-900 font-sans overflow-hidden">
      
      {/* MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-100 flex flex-col transition-all duration-300 lg:relative ${isSidebarCollapsed ? "lg:w-20 w-64" : "w-64"} ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className={`p-6 flex items-center ${isSidebarCollapsed ? "lg:justify-center lg:px-0 justify-between" : "justify-between"}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold font-serif shrink-0">U</div>
            <span className={`text-xl font-bold tracking-tight whitespace-nowrap ${isSidebarCollapsed ? "lg:hidden block" : "block"}`}>(Un)Fit Admin</span>
          </div>
          <button className="lg:hidden p-2 -mr-2 text-gray-500" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>
        
        <div className="px-4 py-2 flex-1 overflow-y-auto overflow-x-hidden">
          <nav className="space-y-1">
            <button onClick={() => setCurrentView("dashboard")} className={`w-full flex items-center gap-3 py-2.5 rounded-xl font-medium transition-colors ${currentView === "dashboard" ? "text-orange-600" : "text-gray-600 hover:bg-gray-50"} ${isSidebarCollapsed ? "lg:justify-center lg:px-0 px-3" : "px-3"}`}>
              <LayoutDashboard size={18} className="shrink-0" />
              <span className={`whitespace-nowrap ${isSidebarCollapsed ? "lg:hidden block" : "block"}`}>Dashboard</span>
            </button>
            <button onClick={() => setCurrentView("orders")} className={`w-full flex items-center gap-3 py-2.5 rounded-xl font-medium transition-colors ${currentView === "orders" ? "text-orange-600" : "text-gray-600 hover:bg-gray-50"} ${isSidebarCollapsed ? "lg:justify-center lg:px-0 px-3" : "px-3"}`}>
              <ShoppingCart size={18} className="shrink-0" />
              <span className={`whitespace-nowrap ${isSidebarCollapsed ? "lg:hidden block" : "block"}`}>Orders</span>
              {!isSidebarCollapsed && <span className={`ml-auto text-xs py-0.5 px-2 rounded-full ${currentView === "orders" ? "text-orange-600" : "text-gray-600"}`}>{orders.length}</span>}
              {isSidebarCollapsed && <span className={`ml-auto text-xs py-0.5 px-2 rounded-full lg:hidden ${currentView === "orders" ? "text-orange-600" : "text-gray-600"}`}>{orders.length}</span>}
            </button>
            <button onClick={() => setCurrentView("customers")} className={`w-full flex items-center gap-3 py-2.5 rounded-xl font-medium transition-colors ${currentView === "customers" ? "text-orange-600" : "text-gray-600 hover:bg-gray-50"} ${isSidebarCollapsed ? "lg:justify-center lg:px-0 px-3" : "px-3"}`}>
              <Users size={18} className="shrink-0" />
              <span className={`whitespace-nowrap ${isSidebarCollapsed ? "lg:hidden block" : "block"}`}>Customers</span>
            </button>
          </nav>
        </div>
        
        <div className={`mt-auto p-4 border-t border-gray-100 ${isSidebarCollapsed ? "lg:px-2" : ""}`}>
          <div className="space-y-1 mb-4">
            <button onClick={handleSignOut} className={`w-full flex items-center gap-3 py-2 text-red-600 hover:bg-gray-50 rounded-xl font-medium transition-colors ${isSidebarCollapsed ? "lg:justify-center lg:px-0 px-3" : "px-3"}`}>
              <LogOut size={18} className="shrink-0" />
              <span className={`whitespace-nowrap ${isSidebarCollapsed ? "lg:hidden block" : "block"}`}>Sign Out</span>
            </button>
          </div>
          <div className={`flex items-center gap-3 pt-4 border-t border-gray-100 ${isSidebarCollapsed ? "lg:justify-center lg:px-0 px-2" : "px-2"}`}>
            <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden flex-shrink-0 relative">
              <Image src="/Jeffrey.jpg" alt="Jeffrey Hughes" fill className="object-cover no-invert" />
            </div>
            <div className={`overflow-hidden ${isSidebarCollapsed ? "lg:hidden block" : "block"}`}>
              <p className="text-sm font-semibold truncate">Jeffrey Hughes</p>
              <p className="text-xs text-gray-500 truncate">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* TOP NAV */}
        <header className="h-16 lg:h-20 bg-white/50 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 z-10 shrink-0">
          <div className="flex items-center gap-3 flex-1">
            <button className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={20} />
            </button>
            <button 
              className="hidden lg:flex p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors" 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              title="Toggle sidebar"
            >
              <PanelLeft size={20} />
            </button>
            <label className="hidden sm:flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm w-full max-w-sm cursor-text transition-all">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Start typing to search..." 
                className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder-gray-400" 
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
          </div>
          <div className="flex items-center gap-2 lg:gap-4 ml-4 shrink-0">
            <button className="relative p-2 text-gray-500 hover:bg-white hover:shadow-sm rounded-full transition-all">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          
          {/* STATS ROW */}
          {currentView === "dashboard" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
              <div className="bg-white p-5 lg:p-6 rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-between group">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  GHC {Math.floor(orders.reduce((sum, order) => sum + (Number(order.amount) || 0), 0))}
                  <span className="text-base lg:text-lg text-gray-400">
                    .{(orders.reduce((sum, order) => sum + (Number(order.amount) || 0), 0) % 1).toFixed(2).substring(2)}
                  </span>
                </h3>
                <p className="text-xs text-green-500 font-medium mt-2 flex items-center gap-1"><TrendingUp size={12}/> Based on all orders</p>
              </div>
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <Image src="/sales-amount-svgrepo-com.svg?v=2" alt="Revenue" width={28} height={28} className="w-6 h-6 lg:w-7 lg:h-7" />
              </div>
            </div>
            
            <div className="bg-white p-5 lg:p-6 rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-between group">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Orders</p>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">{orders.length}</h3>
                <p className="text-xs text-green-500 font-medium mt-2 flex items-center gap-1"><TrendingUp size={12}/> +2 new today</p>
              </div>
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <Image src="/cart-shopping-svgrepo-com.svg?v=2" alt="Orders" width={28} height={28} className="w-6 h-6 lg:w-7 lg:h-7" />
              </div>
            </div>
            
            <div className="bg-white p-5 lg:p-6 rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-between group sm:col-span-2 lg:col-span-1">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Pending Deliveries</p>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">{orders.filter(o => o.fulfillment_status === "unfulfilled").length}</h3>
                <p className="text-xs text-orange-500 font-medium mt-2 flex items-center gap-1"><Clock size={12}/> Requires action</p>
              </div>
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <Image src="/delivery-car-svgrepo-com.svg?v=2" alt="Pending Deliveries" width={28} height={28} className="w-6 h-6 lg:w-7 lg:h-7" />
              </div>
            </div>
          </div>
          )}

          {/* MAIN TABLE AREA */}
          {currentView !== "customers" && (
            <div className="bg-white rounded-xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden flex flex-col">
            {/* Table Header / Tabs */}
            <div className="p-4 lg:px-8 lg:py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
              
              {/* Mobile Search - Only visible on small screens */}
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
                  className={`text-sm font-medium whitespace-nowrap pb-1 border-b-2 transition-colors ${activeTab === "all" ? "text-gray-900 border-gray-900" : "text-gray-400 border-transparent hover:text-gray-600"}`}
                >
                  All Orders
                </button>
                <button 
                  onClick={() => setActiveTab("pending")}
                  className={`text-sm font-medium whitespace-nowrap pb-1 border-b-2 transition-colors ${activeTab === "pending" ? "text-gray-900 border-gray-900" : "text-gray-400 border-transparent hover:text-gray-600"}`}
                >
                  Pending
                </button>
                <button 
                  onClick={() => setActiveTab("delivered")}
                  className={`text-sm font-medium whitespace-nowrap pb-1 border-b-2 transition-colors ${activeTab === "delivered" ? "text-gray-900 border-gray-900" : "text-gray-400 border-transparent hover:text-gray-600"}`}
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
                        {orders.length === 0 ? (
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
                  ) : paginatedOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => setSelectedOrder(order)}>
                      <td className="px-6 lg:px-8 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-orange-200 flex items-center justify-center text-orange-600 font-bold shrink-0">
                            {order.buyer_name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-gray-900 truncate">{order.buyer_name}</div>
                            <div className="text-gray-500 text-xs mt-0.5 truncate">{order.buyer_phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-gray-600 whitespace-nowrap">
                        {new Date(order.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <div className="font-medium text-gray-900">{order.region}</div>
                        <div className="text-gray-500 text-xs mt-0.5 truncate max-w-[150px]">{order.delivery_address}</div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        GHC {order.amount.toFixed(2)}
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
                              onClick={(e) => { e.stopPropagation(); setOpenDropdownId(openDropdownId === order.id ? null : order.id); }}
                            >
                              <span>
                                {order.fulfillment_status === "unfulfilled" ? "Mark Pending" : order.fulfillment_status === "shipped" ? "Mark Shipped" : "Mark Delivered"}
                              </span>
                              <ChevronDown size={14} className="text-gray-400" />
                            </button>
                            
                            {openDropdownId === order.id && (
                              <>
                                <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); }} />
                                <div className="absolute right-0 mt-1 w-full bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50 overflow-hidden transform origin-top-right transition-all">
                                <button 
                                  className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                  onClick={(e) => { e.stopPropagation(); handleStatusChange(order.id, "unfulfilled"); setOpenDropdownId(null); }}
                                >
                                  Mark Pending
                                </button>
                                <button 
                                  className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                  onClick={(e) => { e.stopPropagation(); handleStatusChange(order.id, "shipped"); setOpenDropdownId(null); }}
                                >
                                  Mark Shipped
                                </button>
                                <button 
                                  className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                  onClick={(e) => { e.stopPropagation(); handleStatusChange(order.id, "delivered"); setOpenDropdownId(null); }}
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
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 lg:px-8 lg:py-4 border-t border-gray-100 bg-gray-50/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-gray-500 font-medium">Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders</span>
              <div className="flex gap-1">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 text-sm hover:text-gray-700 disabled:opacity-50"
                >&lt;</button>
                {Array.from({length: totalPages}).map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg border text-sm ${currentPage === i + 1 ? 'border-orange-500 text-orange-600 font-medium bg-orange-50' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}
                  >{i + 1}</button>
                ))}
                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 text-sm hover:bg-gray-50 disabled:opacity-50"
                >&gt;</button>
              </div>
            </div>
          </div>
          )}

          {currentView === "customers" && (
            <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
               <table className="w-full text-sm text-left">
                 <thead className="bg-gray-50/50 text-xs text-gray-400 uppercase tracking-wider">
                   <tr>
                     <th className="px-6 py-4 font-medium">Customer Name</th>
                     <th className="px-6 py-4 font-medium">Email</th>
                     <th className="px-6 py-4 font-medium">Phone</th>
                     <th className="px-6 py-4 font-medium text-right">Total Spent</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                   {Array.from(new Set(orders.map(o => o.buyer_email))).map(email => {
                     const customerOrders = orders.filter(o => o.buyer_email === email);
                     const c = customerOrders[0];
                     return (
                       <tr key={email} className="hover:bg-gray-50/50 transition-colors">
                         <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                             <div className="w-9 h-9 rounded-full border border-orange-200 flex items-center justify-center text-orange-600 font-bold shrink-0">
                               {c.buyer_name.charAt(0)}
                             </div>
                             <div className="font-medium text-gray-900">{c.buyer_name}</div>
                           </div>
                         </td>
                         <td className="px-6 py-4 text-gray-500">{c.buyer_email}</td>
                         <td className="px-6 py-4 text-gray-500">{c.buyer_phone}</td>
                         <td className="px-6 py-4 text-right font-medium text-gray-900">GHC {customerOrders.reduce((sum, o) => sum + o.amount, 0).toFixed(2)}</td>
                       </tr>
                     );
                   })}
                 </tbody>
               </table>
            </div>
          )}

        </div>
      </main>

      {/* SLIDE-OVER PANEL */}
      <div className={`fixed inset-0 bg-black/20 z-[60] transition-opacity duration-300 ${selectedOrder ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setSelectedOrder(null)}>
        <div 
          className={`absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${selectedOrder ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {selectedOrder && (
            <>
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setSelectedOrder(null)}>
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Customer Info</h3>
                  <div className="space-y-3">
                    <p className="flex justify-between"><span className="text-gray-500">Name</span> <span className="font-medium text-gray-900">{selectedOrder.buyer_name}</span></p>
                    <p className="flex justify-between"><span className="text-gray-500">Email</span> <span className="font-medium text-gray-900">{selectedOrder.buyer_email}</span></p>
                    <p className="flex justify-between"><span className="text-gray-500">Phone</span> <span className="font-medium text-gray-900">{selectedOrder.buyer_phone}</span></p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Delivery Details</h3>
                  <div className="space-y-3">
                    <p className="flex justify-between"><span className="text-gray-500">Tier</span> <span className="font-medium text-gray-900">{selectedOrder.delivery_tier}</span></p>
                    <p className="flex justify-between"><span className="text-gray-500">Region</span> <span className="font-medium text-gray-900">{selectedOrder.region}</span></p>
                    <p className="flex justify-between items-start gap-4"><span className="text-gray-500 shrink-0">Address</span> <span className="font-medium text-gray-900 text-right">{selectedOrder.delivery_address}</span></p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Order Info</h3>
                  <div className="space-y-3">
                    <p className="flex justify-between"><span className="text-gray-500">Date</span> <span className="font-medium text-gray-900">{new Date(selectedOrder.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span></p>
                    <p className="flex justify-between"><span className="text-gray-500">Delivery Fee</span> <span className="font-medium text-gray-900">GHC {Number(selectedOrder.delivery_cost || 0).toFixed(2)}</span></p>
                    <p className="flex justify-between"><span className="text-gray-500">Total Amount</span> <span className="font-bold text-gray-900">GHC {selectedOrder.amount.toFixed(2)}</span></p>
                    <p className="flex justify-between"><span className="text-gray-500">Payment Status</span> <span className="font-medium capitalize text-gray-900">{selectedOrder.payment_status}</span></p>
                    <p className="flex justify-between"><span className="text-gray-500">Fulfillment</span> <span className="font-medium capitalize text-gray-900">{selectedOrder.fulfillment_status}</span></p>
                    <p className="flex justify-between items-start gap-4"><span className="text-gray-500 shrink-0">Paystack Ref</span> <span className="font-mono text-gray-900 text-right text-xs bg-gray-50 px-2 py-1 rounded border border-gray-100 break-all">{selectedOrder.paystack_reference}</span></p>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                <button className="w-full py-3 bg-gray-900 hover:bg-black text-white font-medium rounded-xl shadow-sm transition-colors" onClick={() => setSelectedOrder(null)}>
                  Close Details
                </button>
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  );
}

