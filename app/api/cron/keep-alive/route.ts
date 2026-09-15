import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/utils/supabase/admin';

// Force dynamic execution for every request to avoid Next.js caching it
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    // Validate request based on environment to ensure it's securely triggered by Vercel Cron
    if (process.env.NODE_ENV === 'production') {
      if (!cronSecret) {
        console.error('CRON_SECRET environment variable is not set.');
        return new NextResponse('Internal Server Error', { status: 500 });
      }
      if (authHeader !== `Bearer ${cronSecret}`) {
        return new NextResponse('Unauthorized', { status: 401 });
      }
    }

    // Initialize the admin Supabase client
    const supabase = getSupabaseAdmin();

    // Ping the database to generate activity
    const { data, error } = await supabase
      .from('orders')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Database query error in keep-alive cron:', error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: 'Keep-alive ping executed successfully.',
      timestamp: new Date().toISOString(),
      rowsQueried: data ? data.length : 0,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Keep-alive cron execution error:', err);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
