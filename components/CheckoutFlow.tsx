"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, ShieldCheck, Truck, Award, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { Turnstile } from '@marsidev/react-turnstile';
import { supabase } from "@/lib/supabaseClient";

const PaystackButton = dynamic(() => import("./PaystackButton"), { ssr: false });

const REGIONS = [
  { name: "Greater Accra", tier: 1, cost: 30, type: "door-to-door" },
  { name: "Ashanti", tier: 2, cost: 45, type: "station" },
  { name: "Central", tier: 2, cost: 45, type: "station" },
  { name: "Eastern", tier: 2, cost: 45, type: "station" },
  { name: "Western", tier: 2, cost: 45, type: "station" },
  { name: "Volta", tier: 2, cost: 45, type: "station" },
  { name: "Northern", tier: 3, cost: 65, type: "station" },
  { name: "Upper East", tier: 3, cost: 65, type: "station" },
  { name: "Upper West", tier: 3, cost: 65, type: "station" },
  { name: "Bono", tier: 3, cost: 65, type: "station" },
  { name: "Free Pick-up", tier: 0, cost: 0, type: "pickup" },
];

interface CheckoutFlowProps {
  onBack?: () => void;
  onSuccess?: (reference: { reference: string }) => void;
}

export default function CheckoutFlow({ onBack, onSuccess }: CheckoutFlowProps) {
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [isMobileSummaryExpanded, setIsMobileSummaryExpanded] = useState(false);
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderRef, setOrderRef] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    region: "",
    city: "",
    address: "",
  });

  const selectedRegion = REGIONS.find((r) => r.name === formData.region);
  const baseBookPrice = 180;
  const bookTotal = baseBookPrice * quantity;
  const deliveryCost = selectedRegion ? selectedRegion.cost : 0;
  const total = bookTotal + deliveryCost;

  const handleNext = async () => {
    if (step === 1) {
      if (!formData.email || !formData.name || !formData.phone || !formData.region) {
        alert("Please fill in all required contact and delivery details.");
        return;
      }
      if (!formData.address && selectedRegion?.type !== "pickup") {
        alert("Please provide a delivery address or station.");
        return;
      }

      if (!turnstileToken) {
        alert("Please complete the security check.");
        return;
      }
      
      setIsSubmitting(true);
      
      try {
        const verifyRes = await fetch('/api/verify-turnstile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: turnstileToken })
        });
        const verifyData = await verifyRes.json();
        
        if (!verifyData.success) {
           throw new Error("Security check failed. Please refresh and try again.");
        }

        const newRef = `ORD_${new Date().getTime()}`;
        setOrderRef(newRef);

        const { error } = await supabase
          .from('orders')
          .insert([
            {
              customer_name: formData.name,
              customer_email: formData.email,
              customer_phone: `+233${formData.phone.replace(/[^0-9]/g, '')}`,
              region: formData.region,
              city: formData.city,
              delivery_address: formData.address,
              quantity: quantity,
              book_total: bookTotal,
              delivery_cost: deliveryCost,
              total_amount: total,
              paystack_reference: newRef,
              payment_status: 'pending'
            }
          ]);

        if (error) throw error;
        
        setStep(2);
      } catch (err) {
        console.error("Error creating order:", err);
        alert("There was an issue creating your order. Please check your connection and try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const paystackConfig = {
    reference: orderRef,
    email: formData.email,
    amount: total * 100, // in pesewas
    currency: 'GHS',
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_placeholder",
    metadata: {
      custom_fields: [
        { display_name: "Name", variable_name: "name", value: formData.name },
        { display_name: "Phone", variable_name: "phone", value: formData.phone },
        { display_name: "Region", variable_name: "region", value: formData.region },
        { display_name: "City", variable_name: "city", value: formData.city },
        { display_name: "Address", variable_name: "address", value: formData.address },
        { display_name: "Quantity", variable_name: "quantity", value: quantity.toString() },
      ]
    }
  };

  const defaultOnSuccess = (reference: { reference: string }) => {
    if (typeof window !== "undefined") {
       window.location.href = `/checkout/success?order=${reference.reference}&amount=${total.toFixed(2)}`;
    }
  };

  const finalOnSuccess = onSuccess || defaultOnSuccess;

  return (
    <div className="w-full">
      {/* Mobile Accordion */}
      <div className="lg:hidden bg-gray-50 border-b border-gray-200">
        <button 
          onClick={() => setIsMobileSummaryExpanded(!isMobileSummaryExpanded)} 
          className="w-full flex justify-between items-center p-4 sm:px-6"
        >
          <span className="text-gray-600 font-medium text-sm flex items-center">
            {isMobileSummaryExpanded ? "Hide order summary" : "Show order summary"}
            {isMobileSummaryExpanded ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
          </span>
          <span className="font-semibold text-lg">GH₵ {total.toFixed(2)}</span>
        </button>
        
        {isMobileSummaryExpanded && (
          <div className="p-4 sm:px-6 pt-0 border-t border-gray-200">
            <div className="flex items-start py-4 border-b border-gray-100">
               <div className="w-20 h-28 shrink-0 overflow-hidden relative flex items-center justify-center">
                 <Image src="/paperback.jpg" alt="(Un)Fit Paperback" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-center mix-blend-multiply" />
               </div>
               <div className="ml-4 flex-1">
                 <h4 className="font-medium text-gray-900">(Un)Fit</h4>
                 <p className="text-sm text-gray-500 mt-0.5">Paperback</p>
                 <div className="flex items-center mt-2 border border-gray-200 rounded-md w-fit bg-white">
                   <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-2 py-0.5 text-gray-500 hover:text-black transition-colors">-</button>
                   <span className="px-3 py-0.5 text-sm font-medium border-x border-gray-200">{quantity}</span>
                   <button onClick={() => setQuantity(quantity + 1)} className="px-2 py-0.5 text-gray-500 hover:text-black transition-colors">+</button>
                 </div>
               </div>
               <div className="font-medium text-gray-900">GH₵ {bookTotal.toFixed(2)}</div>
            </div>
            <div className="space-y-3 py-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">GH₵ {bookTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-gray-900">{selectedRegion ? `GH₵ ${deliveryCost.toFixed(2)}` : "--"}</span>
              </div>
            </div>
            <div className="flex justify-between pt-4 border-t border-gray-200 text-lg font-medium">
              <span>Total</span>
              <span className="text-orange-600">GH₵ {total.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8">
          
          {/* Left Column (Forms) */}
          <div className="lg:col-span-7">
            
            <h1 className="text-3xl sm:text-4xl font-serif text-gray-900 mb-8 hidden lg:block">Checkout</h1>
            
            {/* Stepper */}
            <div className="flex items-center mb-10 text-sm font-medium text-gray-500">
              <div className={`flex items-center ${step === 1 ? 'text-orange-600' : 'text-gray-900'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 text-white text-xs ${step === 1 ? 'bg-orange-600' : 'bg-gray-900'}`}>1</div>
                Shipping
              </div>
              <div className="flex-1 border-t border-gray-300 mx-4"></div>
              <div className={`flex items-center ${step === 2 ? 'text-orange-600' : (step > 2 ? 'text-gray-900' : 'text-gray-400')}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 text-white text-xs ${step === 2 ? 'bg-orange-600' : (step > 2 ? 'bg-gray-900' : 'bg-gray-300')}`}>2</div>
                Payment
              </div>
              <div className="flex-1 border-t border-gray-300 mx-4 hidden sm:block"></div>
              <div className="items-center text-gray-400 hidden sm:flex">
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center mr-2 text-white text-xs">3</div>
                Review
              </div>
            </div>

            {/* Step 1: Contact & Delivery */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in duration-300">
                {/* Contact Info */}
                <section>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                      <input 
                        type="text" 
                        className="w-full p-3.5 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" 
                        placeholder="John Doe" 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                      <input 
                        type="email" 
                        className="w-full p-3.5 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" 
                        placeholder="youremail@example.com" 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                      <div className="flex bg-white border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-orange-500 focus-within:border-orange-500 transition-all overflow-hidden">
                        <div className="flex items-center justify-center px-4 bg-gray-50 border-r border-gray-300 select-none">
                          <img src="https://flagcdn.com/w20/gh.png" alt="Ghana" className="w-5 h-auto mr-2 shadow-sm rounded-sm" />
                          <span className="text-gray-600 font-medium">+233</span>
                        </div>
                        <input 
                          type="tel" 
                          className="flex-1 p-3.5 outline-none bg-transparent w-full" 
                          placeholder="24 123 4567" 
                          value={formData.phone} 
                          onChange={e => setFormData({...formData, phone: e.target.value})} 
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Shipping Address */}
                <section>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Shipping Address</h2>
                  
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-md mb-6 text-sm text-gray-600">
                    <p className="font-medium text-gray-900 mb-1.5">Delivery Information:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><span className="font-medium text-gray-800">Greater Accra (GH₵ 30):</span> Door-to-door delivery to your address.</li>
                      <li><span className="font-medium text-gray-800">Other Regions (GH₵ 45 - 65):</span> VIP / Station pick-up. We will contact you with station details.</li>
                      <li><span className="font-medium text-gray-800">Free Pick-up:</span> Available at designated locations. We will reach out to coordinate.</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedRegion?.type !== "pickup" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                          <input 
                            type="text" 
                            className="w-full p-3.5 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" 
                            placeholder="E.g. Kumasi" 
                            value={formData.city} 
                            onChange={e => setFormData({...formData, city: e.target.value})} 
                          />
                        </div>
                      )}
                      
                      <div className={selectedRegion?.type === "pickup" ? "sm:col-span-2 relative" : "relative"}>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Region / State</label>
                        <div 
                          className="relative" 
                          tabIndex={0} 
                          onBlur={(e) => { 
                            if (!e.currentTarget.contains(e.relatedTarget)) setIsRegionDropdownOpen(false); 
                          }}
                        >
                          <div 
                            className={`w-full p-3.5 bg-white border rounded-md flex items-center justify-between cursor-pointer transition-all ${isRegionDropdownOpen ? 'border-orange-500 ring-1 ring-orange-500' : 'border-gray-300'}`}
                            onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
                          >
                            <span className={formData.region ? "text-gray-900" : "text-gray-400"}>
                              {formData.region ? `${formData.region} ${selectedRegion && selectedRegion.cost > 0 ? `- GH₵ ${selectedRegion.cost}` : '- Free'}` : "Select region..."}
                            </span>
                            <ChevronDown className={`text-gray-400 transition-transform ${isRegionDropdownOpen ? 'rotate-180' : ''}`} size={16} />
                          </div>
                          
                          {isRegionDropdownOpen && (
                            <div className="absolute z-10 w-full mt-1.5 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-auto animate-in fade-in zoom-in-95 duration-100">
                              {REGIONS.map(r => (
                                <div 
                                  key={r.name}
                                  className="px-4 py-3 hover:bg-orange-50 cursor-pointer text-sm text-gray-700 flex justify-between items-center border-b border-gray-100 last:border-0"
                                  onClick={() => {
                                    setFormData({...formData, region: r.name});
                                    setIsRegionDropdownOpen(false);
                                  }}
                                >
                                  <span className="font-medium text-gray-800">{r.name}</span>
                                  <span className="text-gray-500 text-xs">{r.cost > 0 ? `GH₵ ${r.cost}` : 'Free'}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {selectedRegion?.type !== "pickup" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {selectedRegion?.type === 'station' ? 'Preferred VIP / Bus Station' : 'Delivery Address'}
                        </label>
                        <input 
                          type="text" 
                          className="w-full p-3.5 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" 
                          placeholder={selectedRegion?.type === 'station' ? 'e.g. VIP Station, Asafo' : 'House number and street name'}
                          value={formData.address} 
                          onChange={e => setFormData({...formData, address: e.target.value})} 
                        />
                      </div>
                    )}
                    
                    {selectedRegion?.type === "pickup" && (
                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-600 mt-2">
                        Free Pick-up selected. You will be contacted with pick-up location details.
                      </div>
                    )}
                    
                    </div> {/* Close space-y-4 */}
                    
                    {/* Cloudflare Turnstile */}
                    <div className="mt-8 flex justify-center">
                      <Turnstile
                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
                        onSuccess={(token) => setTurnstileToken(token)}
                      />
                    </div>
                  </section>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
               <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Payment</h2>
                  <div className="bg-white border border-gray-200 p-4 rounded-md text-sm text-black">
                    You will be redirected to Paystack to complete your purchase securely. You can pay via Mobile Money or Card.
                  </div>
                  
                  <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                    <h3 className="font-medium mb-2 text-gray-900">Billing to:</h3>
                    <p className="text-gray-600 text-sm">{formData.name}</p>
                    <p className="text-gray-600 text-sm">{formData.email}</p>
                    <p className="text-gray-600 text-sm">{formData.phone}</p>
                  </div>
               </div>
            )}

            {/* Sticky Mobile CTA / Standard Desktop CTA */}
            <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-gray-200 z-50 lg:static lg:p-0 lg:border-none lg:bg-transparent lg:z-auto lg:mt-10">
              {step === 1 ? (
                <button 
                  onClick={handleNext} 
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center py-4 bg-[#ea580c] text-white font-medium rounded-md hover:bg-orange-700 transition-colors shadow-lg lg:shadow-none disabled:opacity-70"
                >
                  {isSubmitting ? "Processing..." : "Continue to Payment"}
                  {!isSubmitting && <ArrowRight size={18} className="ml-2" />}
                </button>
              ) : (
                <div className="w-full shadow-lg lg:shadow-none">
                   <PaystackButton 
                      config={paystackConfig} 
                      onSuccess={finalOnSuccess} 
                      onClose={() => console.log("Paystack closed")} 
                   />
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column (Order Summary - Desktop) */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="sticky top-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Order Summary</h2>
              
              <div className="flex items-start pb-6 border-b border-gray-100">
                <div className="w-28 h-36 overflow-hidden relative flex items-center justify-center">
                  <Image src="/paperback.jpg" alt="(Un)Fit Paperback" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-center mix-blend-multiply" />
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-medium text-gray-900 text-lg">(un)Fit</h4>
                  <p className="text-sm text-gray-500 mt-1">Paperback</p>
                  <div className="flex items-center mt-3 border border-gray-200 rounded-md w-fit bg-white">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 text-gray-500 hover:text-black transition-colors">-</button>
                    <span className="px-4 py-1 text-sm font-medium border-x border-gray-200">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 text-gray-500 hover:text-black transition-colors">+</button>
                  </div>
                </div>
                <div className="font-medium text-gray-900 text-lg">GH₵ {bookTotal.toFixed(2)}</div>
              </div>

              <div className="space-y-4 py-6 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">GH₵ {bookTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-900">{selectedRegion ? `GH₵ ${deliveryCost.toFixed(2)}` : "--"}</span>
                </div>
              </div>
              
              <div className="flex justify-between pt-6 border-t border-gray-200 text-xl font-medium">
                <span>Total</span>
                <span className="text-orange-600">GH₵ {total.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                <div className="flex flex-col items-center text-center gap-1.5">
                  <ShieldCheck size={24} className="text-orange-500" />
                  <span className="text-xs text-gray-500 font-medium">Secure<br/>Checkout</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5">
                  <Truck size={24} className="text-orange-500" />
                  <span className="text-xs text-gray-500 font-medium">Reliable<br/>Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5">
                  <Award size={24} className="text-orange-500" />
                  <span className="text-xs text-gray-500 font-medium">Premium<br/>Quality</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}