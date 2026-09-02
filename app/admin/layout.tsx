import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  // We handle redirection in the child pages to avoid layout redirection loops easily
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">(un)Fit Admin</h1>
          {session && (
            <form action="/auth/signout" method="post">
              <button className="text-sm text-gray-500 hover:text-gray-900">Sign Out</button>
            </form>
          )}
        </div>
      </nav>
      <main className="max-w-6xl mx-auto py-8 px-6">
        {children}
      </main>
    </div>
  );
}
