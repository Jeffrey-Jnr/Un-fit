import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ message: 'Paystack secret not set' }, { status: 500 });
  }

  const signature = req.headers.get('x-paystack-signature');
  const bodyText = await req.text();

  const hash = crypto.createHmac('sha512', secret).update(bodyText).digest('hex');

  if (hash !== signature) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 400 });
  }

  const event = JSON.parse(bodyText);

  if (event.event === 'charge.success') {
    const data = event.data;
    
    // Get custom fields we passed from the frontend
    const customFields = data.metadata?.custom_fields || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getField = (name: string) => customFields.find((f: any) => f.variable_name === name)?.value || '';

    const buyer_name = getField('name');
    const buyer_phone = getField('phone');
    const delivery_address = getField('address');
    
    const supabase = await createClient();

    try {
      const { error } = await supabase.from('orders').insert({
        buyer_name: buyer_name,
        buyer_email: data.customer.email,
        buyer_phone: buyer_phone,
        delivery_address: delivery_address,
        amount: data.amount / 100, // Convert from pesewas
        payment_status: 'paid',
        fulfillment_status: 'unfulfilled',
        paystack_reference: data.reference,
      });

      if (error) {
        console.error('Error inserting order:', error);
        return NextResponse.json({ message: 'Error processing order' }, { status: 500 });
      }

      return NextResponse.json({ message: 'Order created successfully' }, { status: 200 });
    } catch (error: unknown) {
      console.error('Error inserting order:', error);
      return NextResponse.json({ message: 'Error processing order' }, { status: 500 });
    }
  }

  return NextResponse.json({ message: 'Event not handled' }, { status: 200 });
}
