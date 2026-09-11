export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Authentication redirection is handled within individual child views
  return (
    <div className="h-screen w-full bg-[#F7F8FA] overflow-hidden">
      {children}
    </div>
  );
}
