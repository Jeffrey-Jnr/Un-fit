import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  
  // Verify admin session
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  const { error } = await supabase
    .from('orders')
    .update({ fulfillment_status: 'shipped' })
    .eq('id', id);

  if (error) {
    console.error('Error updating order:', error);
  }

  return NextResponse.redirect(new URL('/admin', req.url), { status: 302 });
}
