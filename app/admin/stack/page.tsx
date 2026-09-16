'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createStack, updateStack, deleteStack } from '@/actions/admin';
import { getStacks } from '@/actions/portfolio';
import { Stack } from '@/types';
import ImageUploader from '@/components/ImageUploader';
import { CheckCircle2, Edit2, Trash2, Plus, X } from 'lucide-react';

export default function AdminStackPage() {
  const router = useRouter();
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  
  const [form, setForm] = useState({
    name: '',
    icon: '',
    category: 'Frontend',
    description: '',
  });

  const loadStacks = async () => {
    const data = await getStacks();
    setStacks(data);
  };

  useEffect(() => {
    loadStacks();
  }, []);

  const resetForm = () => {
    setForm({ name: '', icon: '', category: 'Frontend', description: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleOpenAdd = () => {
    setForm({ name: '', icon: '', category: 'Frontend', description: '' });
    setEditingId(null);
    setShowForm(true);
  };

  const handleOpenEdit = (s: Stack) => {
    setEditingId(s.id);
    setForm({
      name: s.name || '',
      icon: s.icon || '',
      category: s.category || 'Frontend',
      description: s.description || '',
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.icon) {
      alert('Nama dan Gambar Icon Wajib Diisi!');
      return;
    }

    if (editingId) {
      // PROSES EDIT
      const res = await updateStack(editingId, form);
      if (res?.success) {
        setToast('Tech Stack berhasil diupdate!');
        resetForm();
        await loadStacks();
        router.refresh();
        setTimeout(() => setToast(null), 3000);
      } else {
        alert('Gagal mengupdate stack.');
      }
    } else {
      // PROSES TAMBAH BARU
      const res = await createStack(form);
      if (res?.success) {
        setToast('Tech Stack berhasil ditambahkan!');
        resetForm();
        await loadStacks();
        router.refresh();
        setTimeout(() => setToast(null), 3000);
      } else {
        alert('Gagal menambahkan stack.');
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Hapus stack ini?')) {
      await deleteStack(id);
      setToast('Tech Stack berhasil dihapus!');
      await loadStacks();
      router.refresh();
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl relative">
      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed top-20 right-8 z-50 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg flex items-center gap-3 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle2 size={18} />
          <span className="text-xs font-semibold">{toast}</span>
        </div>
      )}

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-white">Technology Stack</h1>
          <p className="text-xs text-slate-400">{stacks.length} technologies</p>
        </div>

        <button 
          onClick={showForm ? resetForm : handleOpenAdd} 
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-md transition-all flex items-center gap-2"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? 'CLOSE FORM' : 'ADD STACK'}
        </button>
      </div>

      {/* FORM INPUT / EDIT */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#080d1a] border border-slate-800/80 rounded-lg p-6 space-y-6">
          <h2 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
            {editingId ? 'Edit Technology Stack' : 'Add Technology Stack'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">NAME</label>
              <input 
                type="text" 
                placeholder="e.g. React" 
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-[#030712] border border-slate-800 rounded p-3 text-xs text-slate-200 outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">CATEGORY</label>
              <select 
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-[#030712] border border-slate-800 rounded p-3 text-xs text-slate-200 outline-none focus:border-blue-500"
              >
                <option value="Frontend">FRONTEND</option>
                <option value="Backend">BACKEND</option>
                <option value="Framework">FRAMEWORK</option>
                <option value="Language">LANGUAGE</option>
                <option value="Styling">STYLING</option>
                <option value="Database">DATABASE</option>
                <option value="Mobile">MOBILE</option>
                <option value="DevOps">DEVOPS</option>
                <option value="Design">DESIGN</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">DESCRIPTION</label>
            <input 
              type="text" 
              placeholder="e.g. UI library for building interfaces" 
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-[#030712] border border-slate-800 rounded p-3 text-xs text-slate-200 outline-none focus:border-blue-500"
            />
          </div>

          <ImageUploader 
            label="STACK ICON (PNG/SVG/JPG)"
            value={form.icon}
            onChange={(base64) => setForm({ ...form, icon: base64 })}
          />

          <div className="flex gap-3 pt-2">
            <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded">
              {editingId ? 'UPDATE STACK' : 'SAVE STACK'}
            </button>
            <button type="button" onClick={resetForm} className="px-6 py-2 border border-slate-800 text-slate-400 hover:text-white font-bold text-xs uppercase tracking-wider rounded">
              CANCEL
            </button>
          </div>
        </form>
      )}

      {/* GRID STACK LIST */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stacks.map((s) => (
          <div key={s.id} className="bg-[#080d1a] border border-slate-800/80 p-5 rounded-lg flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-[#030712] border border-slate-800 flex items-center justify-center p-2">
                {s.icon ? (
                  <img src={s.icon} alt={s.name} className="w-full h-full object-contain" />
                ) : (
                  <span className="text-blue-400 text-xs font-bold">{s.name.substring(0, 2)}</span>
                )}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">{s.name}</h3>
                <p className="text-[10px] font-mono font-bold text-blue-400 uppercase">{s.category || 'FRONTEND'}</p>
                {s.description && (
                  <p className="text-xs text-slate-400 line-clamp-2 pt-1">{s.description}</p>
                )}
              </div>
            </div>

            {/* ACTION BUTTONS (EDIT & HAPUS) */}
            <div className="flex justify-between items-center text-xs pt-3 border-t border-slate-800/60">
              <button 
                onClick={() => handleOpenEdit(s)} 
                className="text-blue-400 hover:text-blue-300 font-semibold text-[11px] flex items-center gap-1"
              >
                <Edit2 size={12} /> Edit
              </button>
              <button 
                onClick={() => handleDelete(s.id)} 
                className="text-red-400 hover:text-red-300 font-semibold text-[11px] flex items-center gap-1"
              >
                <Trash2 size={12} /> Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}