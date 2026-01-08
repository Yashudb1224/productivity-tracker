import Navbar from "./Navbar";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pb-24 relative overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      <main className="relative z-10 p-6 md:p-12 max-w-7xl mx-auto">
        {children}
      </main>

      <Navbar />
    </div>
  );
}
