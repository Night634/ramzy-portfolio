'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProfile } from '@/actions/portfolio';
import { updateProfile } from '@/actions/admin';
import ImageUploader from '@/components/ImageUploader';
import { CheckCircle2 } from 'lucide-react';

export default function AdminHomeAboutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: '',
    title: '',
    introduction: '',
    profileImage: '',
    aboutDescription: '',
    education: '',
    currentFocus: '',
  });

  useEffect(() => {
    getProfile().then((data) => {
      if (data) {
        setForm({
          fullName: data.name || '',
          title: data.title || '',
          introduction: data.introduction || '',
          profileImage: data.profileImage || '',
          aboutDescription: data.about || '',
          education: data.education || '',
          currentFocus: data.focus || '',
        });
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: form.fullName,
      title: form.title,
      introduction: form.introduction,
      profileImage: form.profileImage,
      about: form.aboutDescription,
      education: form.education,
      focus: form.currentFocus,
    };

    const res = await updateProfile(payload);
    setLoading(false);

    if (res?.success) {
      setToast('Data Home & About berhasil diupdate!');
      router.refresh();
      setTimeout(() => setToast(null), 3000);
    } else {
      alert('Gagal menyimpan data.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl relative">
      {toast && (
        <div className="fixed top-20 right-8 z-50 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg flex items-center gap-3 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle2 size={18} />
          <span className="text-xs font-semibold">{toast}</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-white">Home & About Settings</h1>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded transition-all"
        >
          {loading ? 'SAVING...' : 'SAVE CHANGES'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#080d1a] border border-slate-800/80 rounded-lg p-6 space-y-6">
          <h2 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">HOME SECTION</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">FULL NAME</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full bg-[#030712] border border-slate-800 rounded p-3 text-xs text-slate-200 outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">PROFESSIONAL TITLE</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-[#030712] border border-slate-800 rounded p-3 text-xs text-slate-200 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">INTRODUCTION</label>
            <textarea
              rows={3}
              value={form.introduction}
              onChange={(e) => setForm({ ...form, introduction: e.target.value })}
              className="w-full bg-[#030712] border border-slate-800 rounded p-3 text-xs text-slate-200 outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <ImageUploader
            label="PROFILE IMAGE (UPLOAD FILE)"
            value={form.profileImage}
            onChange={(base64) => setForm({ ...form, profileImage: base64 })}
          />
        </div>

        <div className="bg-[#080d1a] border border-slate-800/80 rounded-lg p-6 space-y-6">
          <h2 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">ABOUT SECTION</h2>

          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">ABOUT DESCRIPTION</label>
            <textarea
              rows={4}
              value={form.aboutDescription}
              onChange={(e) => setForm({ ...form, aboutDescription: e.target.value })}
              className="w-full bg-[#030712] border border-slate-800 rounded p-3 text-xs text-slate-200 outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">EDUCATION</label>
              <input
                type="text"
                value={form.education}
                onChange={(e) => setForm({ ...form, education: e.target.value })}
                className="w-full bg-[#030712] border border-slate-800 rounded p-3 text-xs text-slate-200 outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">CURRENT FOCUS (PISAH DENGAN KOMA)</label>
              <input
                type="text"
                value={form.currentFocus}
                onChange={(e) => setForm({ ...form, currentFocus: e.target.value })}
                className="w-full bg-[#030712] border border-slate-800 rounded p-3 text-xs text-slate-200 outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}