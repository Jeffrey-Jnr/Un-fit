"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Bell, LayoutDashboard, ShoppingCart, Users, Menu, X, PanelLeft, LogOut } from "lucide-react";

import { createClient } from "@/utils/supabase/client";
import { Order } from "@/components/admin/types";
import AdminStats from "@/components/admin/AdminStats";
import OrderDetailModal from "@/components/admin/OrderDetailModal";
import OrderTable from "@/components/admin/OrderTable";

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
    async function checkAuthAndFetch() {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/admin/login');
        return;
      }

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching orders:', error);
      } else if (data) {
        const formattedOrders = data.map((order: Record<string, unknown>) => {
          const customerName = String(order.customer_name || order.buyer_name || "Unknown");
          const customerEmail = String(order.customer_email || order.buyer_email || "N/A");
          const customerPhone = String(order.customer_phone || order.buyer_phone || "N/A");
          const totalAmount = Number(order.total_amount || order.amount || 0);

          return {
            ...order,
            customer_name: customerName,
            customer_email: customerEmail,
            customer_phone: customerPhone,
            total_amount: totalAmount,
            buyer_name: customerName,
            buyer_email: customerEmail,
            buyer_phone: customerPhone,
            amount: totalAmount,
            region: String(order.region || "N/A"),
            delivery_address: String(order.delivery_address || "N/A"),
            delivery_tier: String(order.delivery_tier || "N/A"),
            payment_status: String(order.payment_status || "pending"),
            fulfillment_status: String(order.fulfillment_status || "unfulfilled"),
          };
        }) as Order[];
        setOrders(formattedOrders);
      }
    }
    
    checkAuthAndFetch();
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

  const filteredOrders = orders.filter((order) => {
    const searchLower = searchQuery.toLowerCase();
    const customerName = order.customer_name || order.buyer_name || "";
    const customerEmail = order.customer_email || order.buyer_email || "";
    const region = order.region || "";

    const matchesSearch =
      customerName.toLowerCase().includes(searchLower) ||
      customerEmail.toLowerCase().includes(searchLower) ||
      region.toLowerCase().includes(searchLower);

    const matchesTab =
      activeTab === "all"
        ? true
        : activeTab === "pending"
        ? order.fulfillment_status === "unfulfilled"
        : activeTab === "delivered"
        ? order.fulfillment_status === "delivered"
        : true;

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
          {currentView === "dashboard" && <AdminStats orders={orders} />}

          {/* MAIN TABLE AREA */}
          {currentView !== "customers" && (
            <OrderTable
              totalOrdersCount={orders.length}
              filteredOrders={filteredOrders}
              paginatedOrders={paginatedOrders}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              openDropdownId={openDropdownId}
              setOpenDropdownId={setOpenDropdownId}
              onSelectOrder={setSelectedOrder}
              onStatusChange={handleStatusChange}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
            />
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
                   {Array.from(new Set(orders.map(o => o.customer_email || o.buyer_email))).map(email => {
                     const customerOrders = orders.filter(o => (o.customer_email || o.buyer_email) === email);
                     const c = customerOrders[0];
                     const name = c.customer_name || c.buyer_name || "Unknown";
                     const phone = c.customer_phone || c.buyer_phone || "N/A";
                     const totalSpent = customerOrders.reduce((sum, o) => sum + (o.total_amount || o.amount || 0), 0);
                     return (
                       <tr key={email} className="hover:bg-gray-50/50 transition-colors">
                         <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                             <div className="w-9 h-9 rounded-full border border-orange-200 flex items-center justify-center text-orange-600 font-bold shrink-0">
                               {name.charAt(0)}
                             </div>
                             <div className="font-medium text-gray-900">{name}</div>
                           </div>
                         </td>
                         <td className="px-6 py-4 text-gray-500">{email}</td>
                         <td className="px-6 py-4 text-gray-500">{phone}</td>
                         <td className="px-6 py-4 text-right font-medium text-gray-900">GHC {totalSpent.toFixed(2)}</td>
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
      <OrderDetailModal
        selectedOrder={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />

    </div>
  );
}

