import { NextResponse } from 'next/server';
import { PurchaseReceipt } from '@/emails/PurchaseReceipt';
import { render } from '@react-email/components';

export async function GET() {
  const html = await render(
    <PurchaseReceipt 
      customerName="John Doe" 
      orderReference="ORD_987654" 
      amount="180.00" 
      quantity={1} 
    />
  );
  
  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
