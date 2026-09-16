'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.message || 'Username atau password salah');
      }
    } catch (err) {
      setError('Terjadi kesalahan pada server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#030712] text-slate-100 min-h-screen selection:bg-blue-500 selection:text-white relative overflow-hidden font-sans flex items-center justify-center p-6">
      
      {/* Background Ambient Glows (Sama seperti Landing Page) */}
      <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-gradient-to-tl from-indigo-600/15 via-blue-600/10 to-transparent blur-[160px] pointer-events-none -z-10" />

      {/* Tombol Back to Home (Kiri Atas) */}
      <Link 
        href="/" 
        className="fixed top-6 left-6 inline-flex items-center gap-2 px-4 py-2 bg-[#080d1a]/80 border border-slate-800/80 rounded-full text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-slate-800/60 transition-all duration-300 backdrop-blur-md text-xs font-mono"
      >
        <span className="text-blue-500">←</span> BACK TO HOME
      </Link>

      {/* Form Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-[#070c18] border border-slate-800/80 p-8 sm:p-10 rounded-2xl shadow-2xl relative overflow-hidden backdrop-blur-md">
          {/* Header Login */}
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-[10px] font-mono tracking-widest uppercase">
              ADMIN DASHBOARD
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              WELCOME <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">BACK</span>
            </h1>
            <p className="text-slate-400 text-xs">
              Masukkan akun admin untuk mengelola portofolio
            </p>
          </div>

          {/* Alert Error */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-red-950/40 border border-red-500/40 rounded-lg text-red-400 text-xs text-center font-medium"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                USERNAME / EMAIL
              </label>
              <input 
                type="text" 
                required
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="" 
                className="w-full bg-[#030712] border border-slate-800 p-3.5 rounded-lg text-sm text-slate-200 outline-none focus:border-blue-500 transition-colors duration-200 placeholder:text-slate-600" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                PASSWORD
              </label>
              <input 
                type="password" 
                required
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="" 
                className="w-full bg-[#030712] border border-slate-800 p-3.5 rounded-lg text-sm text-slate-200 outline-none focus:border-blue-500 transition-colors duration-200 placeholder:text-slate-600" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 active:scale-[0.99] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300"
            >
              {loading ? 'LOGGING IN...' : 'SIGN IN TO DASHBOARD'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}