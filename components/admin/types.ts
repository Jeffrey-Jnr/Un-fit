export interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total_amount: number;
  region: string;
  city?: string;
  delivery_address: string;
  quantity?: number;
  delivery_cost?: number;
  payment_status: string;
  fulfillment_status: string;
  paystack_reference?: string;
  delivery_tier?: string;

  // Backward-compatible aliases
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string;
  amount: number;
}
