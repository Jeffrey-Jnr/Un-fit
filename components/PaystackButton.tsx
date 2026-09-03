"use client";

import { usePaystackPayment } from "react-paystack";

interface PaystackButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess: (reference: any) => void;
  onClose: () => void;
  disabled?: boolean;
}

export default function PaystackButton({ config, onSuccess, onClose, disabled }: PaystackButtonProps) {
  const initializePayment = usePaystackPayment(config);

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!config.publicKey) {
      alert("Please configure Paystack public key in environment variables.");
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initializePayment({ onSuccess, onClose } as any);
  };

  return (
    <button 
      type="button" 
      onClick={handleClick}
      disabled={disabled}
      className="w-full py-4 bg-green-600 text-white font-medium rounded-sm shadow-md hover:bg-green-700 transition-colors flex justify-center items-center gap-2 mt-2 disabled:opacity-50"
    >
      Pay via Paystack
    </button>
  );
}
