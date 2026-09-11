import { X } from "lucide-react";
import { Order } from "./types";

interface OrderDetailModalProps {
  selectedOrder: Order | null;
  onClose: () => void;
}

export default function OrderDetailModal({ selectedOrder, onClose }: OrderDetailModalProps) {
  return (
    <div
      className={`fixed inset-0 bg-black/20 z-[60] transition-opacity duration-300 ${
        selectedOrder ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          selectedOrder ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {selectedOrder && (
          <>
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
              <button
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={onClose}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Customer Info</h3>
                <div className="space-y-3">
                  <p className="flex justify-between">
                    <span className="text-gray-500">Name</span>{" "}
                    <span className="font-medium text-gray-900">
                      {selectedOrder.customer_name || selectedOrder.buyer_name}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-500">Email</span>{" "}
                    <span className="font-medium text-gray-900">
                      {selectedOrder.customer_email || selectedOrder.buyer_email}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-500">Phone</span>{" "}
                    <span className="font-medium text-gray-900">
                      {selectedOrder.customer_phone || selectedOrder.buyer_phone}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Delivery Details</h3>
                <div className="space-y-3">
                  <p className="flex justify-between">
                    <span className="text-gray-500">Region</span>{" "}
                    <span className="font-medium text-gray-900">{selectedOrder.region}</span>
                  </p>
                  {selectedOrder.city && (
                    <p className="flex justify-between">
                      <span className="text-gray-500">City</span>{" "}
                      <span className="font-medium text-gray-900">{selectedOrder.city}</span>
                    </p>
                  )}
                  <p className="flex justify-between items-start gap-4">
                    <span className="text-gray-500 shrink-0">Address</span>{" "}
                    <span className="font-medium text-gray-900 text-right">{selectedOrder.delivery_address}</span>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Order Info</h3>
                <div className="space-y-3">
                  <p className="flex justify-between">
                    <span className="text-gray-500">Date</span>{" "}
                    <span className="font-medium text-gray-900">
                      {new Date(selectedOrder.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-500">Delivery Fee</span>{" "}
                    <span className="font-medium text-gray-900">
                      GHC {Number(selectedOrder.delivery_cost || 0).toFixed(2)}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-500">Total Amount</span>{" "}
                    <span className="font-bold text-gray-900">
                      GHC {(selectedOrder.total_amount || selectedOrder.amount).toFixed(2)}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-500">Payment Status</span>{" "}
                    <span className="font-medium capitalize text-gray-900">{selectedOrder.payment_status}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-500">Fulfillment</span>{" "}
                    <span className="font-medium capitalize text-gray-900">{selectedOrder.fulfillment_status}</span>
                  </p>
                  <p className="flex justify-between items-start gap-4">
                    <span className="text-gray-500 shrink-0">Paystack Ref</span>{" "}
                    <span className="font-mono text-gray-900 text-right text-xs bg-gray-50 px-2 py-1 rounded border border-gray-100 break-all">
                      {selectedOrder.paystack_reference}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50/50">
              <button
                className="w-full py-3 bg-gray-900 hover:bg-black text-white font-medium rounded-xl shadow-sm transition-colors"
                onClick={onClose}
              >
                Close Details
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
