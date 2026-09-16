'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPortfolio, getStacks } from '@/actions/admin';
import ImageUploader from '@/components/ImageUploader';
import { Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Stack } from '@/types';

export default function NewPortfolioPage() {
  const router = useRouter();
  const [availableStacks, setAvailableStacks] = useState<Stack[]>([]);
  const [loading, setLoading] = useState(false);

  // Form States
  const [title, setTitle] = useState('');
  const [role, setRole] = useState('');
  const [year, setYear] = useState('');
  const [projectType, setProjectType] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [description, setDescription] = useState(''); // Overview
  const [challenges, setChallenges] = useState('');
  const [solution, setSolution] = useState('');
  const [keyFeatures, setKeyFeatures] = useState(''); // Multi-line text
  const [result, setResult] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [selectedStackIds, setSelectedStackIds] = useState<string[]>([]);

  useEffect(() => {
    getStacks().then((stks) => setAvailableStacks(stks || []));
  }, []);

  const toggleStack = (id: string) => {
    setSelectedStackIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !thumbnail) return alert('Judul dan Thumbnail wajib diisi!');

    setLoading(true);
    await createPortfolio({
      title,
      role,
      year,
      projectType,
      thumbnail,
      description,
      challenges,
      solution,
      keyFeatures,
      result,
      liveUrl,
      githubUrl,
      stackIds: selectedStackIds,
    });

    setLoading(false);
    router.push('/admin/portfolio');
    router.refresh();
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/portfolio"
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-white">Create New Portfolio</h1>
          <p className="text-xs text-slate-400">Isi detail lengkap proyek portfolio kamu.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#080d1a] border border-slate-800/80 rounded-xl p-6 space-y-6">
        {/* Basic Info */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">PROJECT TITLE *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. E-Commerce Platform"
              className="w-full bg-[#030712] border border-slate-800 rounded p-2.5 text-xs text-slate-200 outline-none focus:border-blue-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">ROLE</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Full Stack Developer"
              className="w-full bg-[#030712] border border-slate-800 rounded p-2.5 text-xs text-slate-200 outline-none focus:border-blue-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">YEAR</label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="e.g. 2024"
              className="w-full bg-[#030712] border border-slate-800 rounded p-2.5 text-xs text-slate-200 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">PROJECT TYPE</label>
            <input
              type="text"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              placeholder="e.g. Personal Project"
              className="w-full bg-[#030712] border border-slate-800 rounded p-2.5 text-xs text-slate-200 outline-none focus:border-blue-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">LIVE URL</label>
            <input
              type="text"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-[#030712] border border-slate-800 rounded p-2.5 text-xs text-slate-200 outline-none focus:border-blue-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">GITHUB URL</label>
            <input
              type="text"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/..."
              className="w-full bg-[#030712] border border-slate-800 rounded p-2.5 text-xs text-slate-200 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Thumbnail */}
        <ImageUploader label="PROJECT THUMBNAIL *" value={thumbnail} onChange={(base64) => setThumbnail(base64)} />

        {/* Overview, Challenges, Solution */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">OVERVIEW</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A full-featured e-commerce platform..."
              className="w-full bg-[#030712] border border-slate-800 rounded p-2.5 text-xs text-slate-200 outline-none focus:border-blue-500 resize-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">CHALLENGES</label>
            <textarea
              rows={3}
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
              placeholder="Building a performant search system..."
              className="w-full bg-[#030712] border border-slate-800 rounded p-2.5 text-xs text-slate-200 outline-none focus:border-blue-500 resize-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">SOLUTION</label>
            <textarea
              rows={3}
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              placeholder="Used server-side filtering with PostgreSQL..."
              className="w-full bg-[#030712] border border-slate-800 rounded p-2.5 text-xs text-slate-200 outline-none focus:border-blue-500 resize-none"
            />
          </div>
        </div>

        {/* Key Features & Result */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">KEY FEATURES (1 Fitur per Baris)</label>
            <textarea
              rows={3}
              value={keyFeatures}
              onChange={(e) => setKeyFeatures(e.target.value)}
              placeholder={"Product catalog with filters\nCart & checkout flow\nOrder management"}
              className="w-full bg-[#030712] border border-slate-800 rounded p-2.5 text-xs text-slate-200 outline-none focus:border-blue-500 resize-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">RESULT</label>
            <textarea
              rows={3}
              value={result}
              onChange={(e) => setResult(e.target.value)}
              placeholder="Sub-100ms search responses. Handles 10k+ products."
              className="w-full bg-[#030712] border border-slate-800 rounded p-2.5 text-xs text-slate-200 outline-none focus:border-blue-500 resize-none"
            />
          </div>
        </div>

        {/* Stack Selection */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">TECHNOLOGY STACK</label>
          <div className="flex flex-wrap gap-2">
            {availableStacks.map((stk) => {
              const isSelected = selectedStackIds.includes(stk.id);
              return (
                <button
                  type="button"
                  key={stk.id}
                  onClick={() => toggleStack(stk.id)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold border transition-all ${
                    isSelected
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-[#030712] border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {stk.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
          <Link
            href="/admin/portfolio"
            className="px-5 py-2.5 bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold uppercase rounded-lg hover:bg-slate-800 transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all"
          >
            <Plus size={16} /> {loading ? 'SAVING...' : 'SAVE PORTFOLIO'}
          </button>
        </div>
      </form>
    </div>
  );
}