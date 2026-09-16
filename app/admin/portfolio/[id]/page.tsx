'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { updatePortfolio } from '@/actions/admin';
import { getPortfolioById, getStacks } from '@/actions/portfolio';
import { Stack } from '@/types';
import ImageUploader from '@/components/ImageUploader';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [availableStacks, setAvailableStacks] = useState<Stack[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    projectType: '',
    description: '',
    thumbnail: '',
    githubUrl: '',
    liveUrl: '',
    selectedStacks: [] as string[],
  });

  useEffect(() => {
    async function loadData() {
      setFetching(true);
      const [portfolioData, stacksData] = await Promise.all([
        getPortfolioById(id),
        getStacks(),
      ]);

      setAvailableStacks(stacksData || []);

      if (portfolioData) {
        setForm({
          title: portfolioData.title || '',
          projectType: portfolioData.projectType || '',
          description: portfolioData.description || '',
          thumbnail: portfolioData.thumbnail || '',
          githubUrl: portfolioData.githubUrl || '',
          liveUrl: portfolioData.liveUrl || '',
          selectedStacks: portfolioData.stacks
            ? portfolioData.stacks.map((s: any) => s.stackId || s.stack?.id)
            : [],
        });
      }
      setFetching(false);
    }

    loadData();
  }, [id]);

  const toggleStack = (stackId: string) => {
    setForm((prev) => {
      const exists = prev.selectedStacks.includes(stackId);
      return {
        ...prev,
        selectedStacks: exists
          ? prev.selectedStacks.filter((s) => s !== stackId)
          : [...prev.selectedStacks, stackId],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.thumbnail) {
      alert('Judul dan Gambar Thumbnail wajib diisi!');
      return;
    }

    setLoading(true);
    const res = await updatePortfolio(id, form);
    setLoading(false);

    if (res?.success) {
      setToast('Portfolio berhasil diperbarui!');
      setTimeout(() => {
        router.push('/admin/portfolio');
        router.refresh();
      }, 1500);
    } else {
      alert('Gagal mengupdate portfolio.');
    }
  };

  if (fetching) {
    return <div className="text-xs text-slate-500 py-10 text-center">Memuat data portfolio...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl relative">
      {toast && (
        <div className="fixed top-20 right-8 z-50 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg flex items-center gap-3 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle2 size={18} />
          <span className="text-xs font-semibold">{toast}</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/portfolio"
            className="p-2 bg-[#080d1a] border border-slate-800 rounded text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <h1 className="text-2xl font-extrabold text-white">Edit Portfolio</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#080d1a] border border-slate-800/80 rounded-lg p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">PROJECT TITLE</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-[#030712] border border-slate-800 rounded p-3 text-xs text-slate-200 outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">PROJECT TYPE</label>
            <input
              type="text"
              placeholder="e.g. Fullstack Web App"
              value={form.projectType}
              onChange={(e) => setForm({ ...form, projectType: e.target.value })}
              className="w-full bg-[#030712] border border-slate-800 rounded p-3 text-xs text-slate-200 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">DESCRIPTION</label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full bg-[#030712] border border-slate-800 rounded p-3 text-xs text-slate-200 outline-none focus:border-blue-500 resize-none"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">GITHUB URL</label>
            <input
              type="text"
              value={form.githubUrl}
              onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
              className="w-full bg-[#030712] border border-slate-800 rounded p-3 text-xs text-slate-200 outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">LIVE DEMO URL</label>
            <input
              type="text"
              value={form.liveUrl}
              onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
              className="w-full bg-[#030712] border border-slate-800 rounded p-3 text-xs text-slate-200 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">SELECT TECH STACKS</label>
          <div className="flex flex-wrap gap-2">
            {availableStacks.map((s) => {
              const isSelected = form.selectedStacks.includes(s.id);
              return (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => toggleStack(s.id)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold border transition-all ${
                    isSelected
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-[#030712] border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {s.name}
                </button>
              );
            })}
          </div>
        </div>

        <ImageUploader
          label="PROJECT THUMBNAIL"
          value={form.thumbnail}
          onChange={(base64) => setForm({ ...form, thumbnail: base64 })}
        />

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded transition-all"
          >
            {loading ? 'SAVING...' : 'UPDATE PORTFOLIO'}
          </button>
          <Link
            href="/admin/portfolio"
            className="px-6 py-2.5 border border-slate-800 text-slate-400 hover:text-white font-bold text-xs uppercase tracking-wider rounded transition-all"
          >
            CANCEL
          </Link>
        </div>
      </form>
    </div>
  );
}