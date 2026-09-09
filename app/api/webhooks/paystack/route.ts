import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  try {
    // 1. Get the raw body as text for signature verification
    const bodyText = await req.text();
    
    // 2. Get the signature from headers
    const signature = req.headers.get('x-paystack-signature');
    const secret = process.env.PAYSTACK_SECRET_KEY;

    if (!secret || !signature) {
      return NextResponse.json({ error: 'Missing secret or signature' }, { status: 400 });
    }

    // 3. Verify the signature
    const hash = crypto.createHmac('sha512', secret).update(bodyText).digest('hex');
    if (hash !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // 4. Parse the verified payload
    const event = JSON.parse(bodyText);

    // 5. Handle successful payment
    if (event.event === 'charge.success') {
      const orderRef = event.data.reference;

      // Update the order in Supabase to 'paid'
      const { data: orderData, error } = await supabase
        .from('orders')
        .update({ status: 'paid' })
        .eq('paystack_reference', orderRef)
        .select('*')
        .single();

      if (error) {
        console.error('Supabase update error:', error);
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
      }

      console.log(`Successfully marked order ${orderRef} as paid!`);

      // 6. Send the Purchase Receipt email via Resend
      if (process.env.RESEND_API_KEY && orderData) {
        try {
          const { Resend } = await import('resend');
          const { PurchaseReceipt } = await import('@/emails/PurchaseReceipt');
          const { AdminNewOrder } = await import('@/emails/AdminNewOrder');
          
          const resend = new Resend(process.env.RESEND_API_KEY);
          
          // Send to Customer
          await resend.emails.send({
            from: 'Jeffrey Hughes <info@unfitbook.com>',
            to: orderData.customer_email || event.data.customer.email,
            subject: 'Thank you for purchasing (un)Fit!',
            react: PurchaseReceipt({
              customerName: orderData.customer_name || 'Valued Reader',
              orderReference: orderRef,
              amount: (event.data.amount / 100).toFixed(2),
              quantity: orderData.quantity || 1,
            }),
          });
          
          // Send Alert to Admin
          await resend.emails.send({
            from: 'System <info@unfitbook.com>',
            to: 'info@unfitbook.com',
            subject: `🎉 New Order: ${orderRef}`,
            react: AdminNewOrder({
              customerName: orderData.customer_name || 'Unknown',
              customerEmail: orderData.customer_email || event.data.customer.email,
              orderReference: orderRef,
              amount: (event.data.amount / 100).toFixed(2),
              quantity: orderData.quantity || 1,
            }),
          });
          
          console.log(`Emails sent successfully for order ${orderRef}`);
        } catch (emailError) {
          console.error('Failed to send email:', emailError);
          // Don't fail the webhook just because email failed
        }
      }
    }

    // Acknowledge receipt of the webhook
    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
