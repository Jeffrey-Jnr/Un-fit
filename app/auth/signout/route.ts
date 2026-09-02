import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  
  return NextResponse.redirect(new URL('/admin/login', req.url), {
    status: 302,
  });
}
