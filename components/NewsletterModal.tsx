"use client";

import { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: "newsletter" | "waitlist";
}

export default function NewsletterModal({ isOpen, onClose, type = "newsletter" }: NewsletterModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/mailerlite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, type }),
      });

      if (!res.ok) throw new Error("Failed to subscribe");

      setStatus("success");
      // Close automatically after 3 seconds
      setTimeout(() => {
        onClose();
        setStatus("idle");
        setFirstName("");
        setLastName("");
        setEmail("");
      }, 3000);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X size={24} />
        </button>

        {status === "success" ? (
          <div className="p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
            <CheckCircle2 size={64} className="text-[#ea580c] mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Check your inbox!</h3>
            <p className="text-gray-600">
              {type === "waitlist" 
                ? "You're on the list! We'll notify you the moment (un)Fit is available."
                : "We just sent the free sample chapter to your email."}
            </p>
          </div>
        ) : (
          <div className="p-8 pt-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {type === "waitlist" ? "Join the Waitlist" : "Get the Free Sample"}
            </h3>
            <p className="text-gray-600 mb-8">
              {type === "waitlist"
                ? "Be the first to know when (un)Fit is available. Enter your details below."
                : "Enter your details below and we'll instantly email you the first chapter."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent text-gray-900"
                    placeholder="Jane"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent text-gray-900"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent text-gray-900"
                  placeholder="jane@example.com"
                />
              </div>

              {status === "error" && (
                <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 mt-4 bg-[#ea580c] text-white font-medium rounded-xl hover:bg-[#d94c1e] transition-colors shadow-sm disabled:opacity-70"
              >
                {status === "loading" ? "Sending..." : type === "waitlist" ? "Join the Waitlist" : "Send me the chapter!"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
