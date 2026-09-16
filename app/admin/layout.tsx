'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutGrid, FileText, FolderKanban, Layers, LogOut, ExternalLink } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Jika di halaman login admin (/admin), render tanpa sidebar & topbar
  if (pathname === '/admin') {
    return <>{children}</>;
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutGrid },
    { name: 'Home & About', href: '/admin/home-about', icon: FileText },
    { name: 'Portfolio', href: '/admin/portfolio', icon: FolderKanban },
    { name: 'Stack', href: '/admin/stack', icon: Layers },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      router.replace('/admin');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex font-sans w-full">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#080d1a] border-r border-slate-800/60 flex flex-col justify-between fixed inset-y-0 z-50">
        <div>
          <div className="h-16 flex items-center px-6 border-b border-slate-800/60">
            <span className="text-lg font-extrabold text-white tracking-tight">
              RAP<span className="text-blue-500">.</span> Admin
            </span>
          </div>

          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                  }`}
                >
                  <Icon size={16} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800/60 space-y-2">
          <Link 
            href="/" 
            target="_blank"
            className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-blue-400 hover:bg-blue-950/40 rounded-lg transition-colors border border-blue-900/30"
          >
            <ExternalLink size={14} />
            Lihat Web Utama
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-red-400 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        
        {/* TOP NAVBAR HEADER */}
        <header className="h-16 bg-[#080d1a] border-b border-slate-800/60 flex items-center justify-between px-8 sticky top-0 z-40 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Admin Panel / <span className="text-white font-bold">{navItems.find(i => i.href === pathname)?.name || 'Dashboard'}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors border border-slate-800 bg-[#030712] px-3 py-1.5 rounded-md"
            >
              <ExternalLink size={13} />
              View Live Site
            </Link>
            
            <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
              <span className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">RA</span>
              <span className="text-xs font-medium text-slate-300">Ramzy</span>
            </div>
          </div>
        </header>

        {/* PAGE BODY */}
        <main className="p-8 flex-1">
          {children}
        </main>
      </div>

    </div>
  );
}