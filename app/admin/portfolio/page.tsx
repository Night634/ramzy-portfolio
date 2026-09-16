'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { deletePortfolio } from '@/actions/admin';
import { getPortfolios } from '@/actions/portfolio';
import { Plus, Trash2, ExternalLink, CheckCircle2, Edit2 } from 'lucide-react';

export default function AdminPortfolioListPage() {
  const router = useRouter();
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    const data = await getPortfolios();
    setPortfolios(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus portfolio ini?')) return;

    const res = await deletePortfolio(id);
    if (res?.success) {
      setToast('Portfolio berhasil dihapus!');
      await loadData();
      router.refresh();
      setTimeout(() => setToast(null), 3000);
    } else {
      alert('Gagal menghapus portfolio.');
    }
  };

  return (
    <div className="space-y-6 max-w-6xl relative">
      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed top-20 right-8 z-50 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg flex items-center gap-3 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle2 size={18} />
          <span className="text-xs font-semibold">{toast}</span>
        </div>
      )}

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Portfolio Projects</h1>
          <p className="text-xs text-slate-400">{portfolios.length} total projects</p>
        </div>

        <Link
          href="/admin/portfolio/new"
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-md transition-all flex items-center gap-2"
        >
          <Plus size={16} /> ADD PORTFOLIO
        </Link>
      </div>

      {/* LIST PORTFOLIO */}
      {loading ? (
        <div className="text-xs text-slate-500 py-10 text-center">Loading portfolios...</div>
      ) : portfolios.length === 0 ? (
        <div className="bg-[#080d1a] border border-slate-800/80 rounded-lg p-10 text-center text-slate-400 text-xs">
          Belum ada data portfolio. Klik tombol + ADD PORTFOLIO untuk membuat baru.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((item) => (
            <div
              key={item.id}
              className="bg-[#080d1a] border border-slate-800/80 rounded-lg overflow-hidden flex flex-col justify-between group"
            >
              <div className="space-y-4 p-4">
                {/* THUMBNAIL PREVIEW */}
                <div className="w-full h-40 bg-[#030712] rounded border border-slate-800/80 overflow-hidden relative">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">
                      No Image
                    </div>
                  )}
                </div>

                {/* INFO */}
                <div>
                  <h3 className="text-sm font-bold text-white line-clamp-1">{item.title}</h3>
                  <p className="text-[10px] font-mono text-slate-400 mt-0.5">{item.projectType || 'Project'}</p>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-2">{item.description}</p>
                </div>

                {/* STACKS BADGE */}
                {item.stacks && item.stacks.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.stacks.map((s: any) => (
                      <span
                        key={s.id || s.stackId}
                        className="px-2 py-0.5 bg-[#030712] border border-slate-800 text-[10px] font-mono text-slate-300 rounded"
                      >
                        {s.name || s.stack?.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="p-4 pt-3 border-t border-slate-800/60 mt-4 flex items-center justify-between text-xs">
                {item.liveUrl ? (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:underline flex items-center gap-1 text-[11px]"
                  >
                    Demo <ExternalLink size={12} />
                  </a>
                ) : (
                  <span />
                )}

                <div className="flex items-center gap-3">
                  <Link
                    href={`/admin/portfolio/${item.id}`}
                    className="text-blue-400 hover:text-blue-300 font-semibold text-xs flex items-center gap-1 transition-colors"
                  >
                    <Edit2 size={13} /> Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="text-red-400 hover:text-red-300 font-semibold text-xs flex items-center gap-1 transition-colors"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}