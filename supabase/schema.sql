-- Create the orders table
CREATE TABLE public.orders (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    buyer_name text NOT NULL,
    buyer_email text NOT NULL,
    buyer_phone text,
    delivery_address text,
    amount numeric NOT NULL,
    payment_status text DEFAULT 'pending'::text NOT NULL,
    fulfillment_status text DEFAULT 'unfulfilled'::text NOT NULL,
    paystack_reference text UNIQUE
);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (webhook) but limit reads to authenticated users
CREATE POLICY "Allow public insert" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow auth read" ON public.orders FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow auth update" ON public.orders FOR UPDATE TO authenticated USING (true);
