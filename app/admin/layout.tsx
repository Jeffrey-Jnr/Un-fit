import { redirect } from 'next/navigation';
// import { createClient } from '@/utils/supabase/server';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // const supabase = await createClient();
  // const { data: { session } } = await supabase.auth.getSession();
  const session = { user: { id: 'mock-user' } }; // Mock session

  // We handle redirection in the child pages to avoid layout redirection loops easily
  return (
    <div className="h-screen w-full bg-[#F7F8FA] overflow-hidden">
      {children}
    </div>
  );
}
