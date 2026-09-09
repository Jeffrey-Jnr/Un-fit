import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { OrderStatusUpdate } from '@/emails/OrderStatusUpdate';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  
  // Verify admin session
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { status } = await req.json();

  if (!status || !['shipped', 'delivered', 'unfulfilled'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  // Update status in Supabase
  const { data: orderData, error } = await supabase
    .from('orders')
    .update({ fulfillment_status: status })
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
  }

  // Send email notification for shipped/delivered
  if (process.env.RESEND_API_KEY && orderData && (status === 'shipped' || status === 'delivered')) {
    try {
      const customerName = orderData.customer_name || 'Valued Reader';
      const firstName = customerName.split(' ')[0]; // Extract first name
      const orderRef = orderData.paystack_reference || orderData.id;

      // Map status to display-friendly label
      const displayStatus = status === 'shipped' ? 'Shipped' : 'Delivered';

      // Only include tracking info for shipped status
      const trackingInfo = status === 'shipped' 
        ? 'Your order is on its way! Expected delivery within 1–3 business days.'
        : '';

      await resend.emails.send({
        from: 'Jeffrey Hughes <info@unfitbook.com>',
        to: orderData.customer_email,
        subject: `Your (un)Fit order has been ${displayStatus.toLowerCase()}!`,
        react: OrderStatusUpdate({
          customerName: firstName,
          orderReference: orderRef,
          status: displayStatus,
          trackingInfo,
        }),
      });

      console.log(`${displayStatus} email sent to ${orderData.customer_email} for order ${id}`);
    } catch (emailError) {
      console.error('Failed to send status update email:', emailError);
      // Don't fail the API call just because email failed
    }
  }

  return NextResponse.json({ success: true, order: orderData });
}
