'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Profile, Stack, PortfolioWithStacks } from '@/types';
import PortfolioModal from '@/components/PortfolioModal';

interface PortfolioClientProps {
  profile: Profile | null;
  portfolios: PortfolioWithStacks[];
  stacks: Stack[];
}

export default function PortfolioClient({ profile, portfolios, stacks }: PortfolioClientProps) {
  const [activeTab, setActiveTab] = useState('PORTFOLIO');
  const [selectedProject, setSelectedProject] = useState<PortfolioWithStacks | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('');

  const focusList: string[] = profile?.focus 
    ? profile.focus.split(',').map((v) => v.trim()).filter(Boolean)
    : ['React / Next.js', 'TypeScript', 'System Design', 'UI/UX Engineering', 'Performance Optimization'];

  // Motion Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 25, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const floatingAnimation = (duration: number = 6, delay: number = 0) => ({
    y: [0, -12, 0],
    x: [0, 6, 0],
    transition: {
      duration,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
      delay
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusText('');

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatusText('Pesan berhasil terkirim!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatusText('Gagal mengirim pesan. Coba lagi nanti.');
      }
    } catch (err) {
      setStatusText('Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#030712] text-slate-100 min-h-screen selection:bg-blue-500 selection:text-white relative overflow-hidden font-sans">
      
      {/* CSS Animations Injector for Animated Gradient & Custom Styles */}
      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes subtlePulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.03); }
        }
        .animate-gradient-text {
          background: linear-gradient(-45deg, #1e40af, #3b82f6, #06b6d4, #6366f1, #1d4ed8);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 8s ease infinite;
        }
        .animate-breathing-glow {
          animation: subtlePulse 4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-gradient-text, .animate-breathing-glow {
            animation: none !important;
          }
        }
      `}</style>

      {/* Dynamic Background Ambient Glows & Moving Blobs */}
      <motion.div 
        animate={{ 
          x: [-20, 20, -20],
          y: [-10, 10, -10],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-br from-blue-700/20 via-cyan-500/10 to-indigo-900/10 blur-[150px] pointer-events-none -z-10 animate-breathing-glow" 
      />
      
      <motion.div 
        animate={{ 
          x: [20, -20, 20],
          y: [15, -15, 15]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-[-5%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-tl from-indigo-900/20 via-blue-600/10 to-transparent blur-[160px] pointer-events-none -z-10" 
      />

      {/* Subtle Floating Shapes */}
      <motion.div 
        animate={floatingAnimation(8, 0)}
        className="fixed top-1/4 left-[8%] w-12 h-12 rounded-full border border-blue-500/10 bg-blue-500/5 backdrop-blur-3xl pointer-events-none -z-10 hidden lg:block"
      />
      <motion.div 
        animate={floatingAnimation(10, 2)}
        className="fixed bottom-1/3 right-[7%] w-20 h-20 rounded-2xl border border-cyan-500/10 bg-cyan-500/5 rotate-12 backdrop-blur-3xl pointer-events-none -z-10 hidden lg:block"
      />

      {/* NAVBAR (Centered & Floating) */}
      <nav className="fixed top-4 left-0 right-0 z-50 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight text-white group">
            {profile?.name ? profile.name.split(' ')[0] : 'Ramzy Portfolio'}
            <span className="text-blue-500 group-hover:text-cyan-400 transition-colors duration-300">.</span>
          </Link>

          {/* Centered Floating Nav Bar */}
          <div className="hidden md:flex items-center gap-1 text-sm font-medium px-4 py-2 bg-[#080d1a]/80 border border-slate-800/80 rounded-full backdrop-blur-md shadow-xl shadow-black/40">
            <a 
              href="#home" 
              className="px-4 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/80 active:scale-95 transition-all duration-200"
            >
              Home
            </a>
            <a 
              href="#about" 
              className="px-4 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/80 active:scale-95 transition-all duration-200"
            >
              About
            </a>
            <a 
              href="#portfolio" 
              className="px-4 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/80 active:scale-95 transition-all duration-200"
            >
              Portfolio
            </a>
            <a 
              href="#contact" 
              className="px-4 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/80 active:scale-95 transition-all duration-200"
            >
              Contact
            </a>
          </div>

          <div className="hidden md:block w-16" />
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="pt-36 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex items-center relative scroll-mt-28">
        <div className="grid md:grid-cols-12 gap-12 items-center w-full">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="md:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-semibold backdrop-blur-sm shadow-[0_0_15px_rgba(37,99,235,0.15)]">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_#3b82f6]" />
              AVAILABLE FOR WORK
            </div>

            <div className="space-y-2">
              <h2 className="text-lg text-slate-400 font-medium">Hi, I&apos;m</h2>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight uppercase animate-gradient-text">
                {profile?.name || 'Ramzy Atchallah Putra'}
              </h1>
            </div>

            <div className="text-blue-400 font-mono font-bold text-xs tracking-widest uppercase">
              | {profile?.title || 'SOFTWARE ENGINEER / FRONTEND DEVELOPER'}
            </div>

            <p className="text-slate-400 text-base max-w-xl leading-relaxed">
              {profile?.introduction}
            </p>

            <div className="flex gap-4 pt-4">
              <a 
                href="#portfolio" 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-[0_0_25px_rgba(37,99,235,0.35)] hover:shadow-[0_0_35px_rgba(37,99,235,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                VIEW MY WORK
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 border border-slate-800 hover:border-blue-500/50 bg-slate-900/50 hover:bg-slate-800/60 active:scale-95 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                CONTACT ME
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="md:col-span-5 flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 opacity-60 blur-xl group-hover:opacity-90 group-hover:blur-2xl transition duration-500 animate-breathing-glow" />
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-blue-400/40 bg-slate-950 shadow-2xl">
                <img 
                  src={profile?.profileImage || '/images/profile/default.jpg'} 
                  alt={profile?.name || 'Profile'} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION ABOUT ME */}
      <motion.section 
        id="about" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeInUp}
        className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-800/40"
      >
        <div className="flex items-center gap-3 text-blue-500 font-mono text-xs font-bold tracking-widest uppercase mb-12">
          <span>02 / ABOUT</span>
          <div className="h-[1px] w-32 bg-blue-500/30" />
        </div>

        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <h2 className="text-6xl sm:text-7xl font-extrabold text-white tracking-tight leading-none">
              ABOUT<br />
              <span className="animate-gradient-text" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>ME</span>
            </h2>
          </div>

          <div className="md:col-span-7 space-y-10">
            <p className="text-slate-300 text-lg leading-relaxed font-normal">
              {profile?.about || "I'm a Software Engineer and Frontend Developer with 3+ years of experience building production-grade web and mobile applications. I specialize in the React ecosystem, modern TypeScript, and translating complex product requirements into clean, performant, and beautiful interfaces."}
            </p>

            <div className="border-t border-slate-800/80 pt-8 space-y-3">
              <h3 className="text-xs font-mono font-bold text-blue-500 uppercase tracking-widest">EDUCATION</h3>
              <div className="flex justify-between items-baseline">
                <p className="text-white font-bold text-base">
                  {profile?.education || 'Bachelor of Computer Science'}
                </p>
                <span className="text-slate-500 text-sm font-mono">2019 – 2023</span>
              </div>
              <p className="text-slate-400 text-sm">Universitas Indonesia</p>
            </div>

            <div className="border-t border-slate-800/80 pt-8 space-y-4">
              <h3 className="text-xs font-mono font-bold text-blue-500 uppercase tracking-widest">CURRENT FOCUS</h3>
              <div className="flex flex-wrap gap-2.5">
                {focusList.map((focus, index) => (
                  <span 
                    key={index} 
                    className="px-4 py-2 rounded bg-[#0b1329]/80 border border-slate-800/90 hover:border-blue-500/40 text-xs font-medium text-slate-300 transition-colors duration-200"
                  >
                    {focus}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* PORTFOLIO & STACK SECTION */}
      <motion.section 
        id="portfolio" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeInUp}
        className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-800/40"
      >
        <div className="flex items-center gap-3 text-blue-500 font-mono text-xs font-bold tracking-widest uppercase mb-12">
          <span>03 / PROJECT</span>
          <div className="h-[1px] w-32 bg-blue-500/30" />
        </div>

        <div className="space-y-8">
          <div className="flex border-b border-slate-800 gap-8">
            <button 
              onClick={() => setActiveTab('PORTFOLIO')}
              className={`pb-4 text-sm font-bold tracking-wider relative transition-colors duration-200 ${activeTab === 'PORTFOLIO' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              PORTFOLIO
              {activeTab === 'PORTFOLIO' && (
                <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
              )}
            </button>
            <button 
              onClick={() => setActiveTab('STACK')}
              className={`pb-4 text-sm font-bold tracking-wider relative transition-colors duration-200 ${activeTab === 'STACK' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              STACK
              {activeTab === 'STACK' && (
                <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
              )}
            </button>
          </div>

          {activeTab === 'PORTFOLIO' ? (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2"
            >
              {portfolios.map((project) => (
                <motion.div 
                  key={project.id} 
                  variants={fadeInUp}
                  onClick={() => setSelectedProject(project)}
                  className="group bg-[#0b1120]/60 border border-slate-800/80 hover:border-blue-500/60 rounded-xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] cursor-pointer relative flex flex-col justify-between transform hover:-translate-y-1.5"
                >
                  <div>
                    <div className="relative h-52 overflow-hidden bg-slate-950">
                      <img 
                        src={project.thumbnail} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                      />
                      <div className="absolute inset-0 bg-blue-950/75 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                        <span className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded shadow-lg uppercase tracking-wider transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          View Detail
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-1">
                      <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors duration-200">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {project.projectType || 'Personal Project'}
                      </p>
                    </div>
                  </div>

                  {project.stacks && project.stacks.length > 0 && (
                    <div className="px-5 pb-5 pt-1 flex flex-wrap gap-1.5">
                      {project.stacks.map((s, idx) => (
                        <span 
                          key={idx} 
                          className="px-2.5 py-0.5 bg-slate-900/90 border border-slate-800 text-[10px] font-mono font-medium text-slate-300 rounded"
                        >
                          {s.stack.name}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2"
            >
              {stacks.map((stack) => (
                <motion.div 
                  key={stack.id} 
                  variants={fadeInUp}
                  className="p-5 bg-[#0a101f]/80 border border-slate-800/70 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] rounded-xl flex flex-col justify-between space-y-4 transition-all duration-300 group transform hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0e172a] border border-slate-800 flex items-center justify-center p-2 group-hover:border-blue-500/50 transition-colors duration-200">
                    {stack.icon ? (
                      <img src={stack.icon} alt={stack.name} className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-blue-400 font-bold text-xs">{stack.name.slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-white font-bold text-sm tracking-wide group-hover:text-blue-300 transition-colors duration-200">{stack.name}</h4>
                    <p className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-wider">
                      {stack.category || 'FRONTEND'}
                    </p>
                    <p className="text-slate-400 text-xs pt-1 leading-snug">
                      {stack.description || 'Modern tool and framework for production applications.'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* SECTION CONTACT */}
      <motion.section 
        id="contact" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeInUp}
        className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-800/40"
      >
        <div className="flex items-center gap-3 text-blue-500 font-mono text-xs font-bold tracking-widest uppercase mb-12">
          <span>04 / CONTACT</span>
          <div className="h-[1px] w-32 bg-blue-500/30" />
        </div>

        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-6 space-y-8">
            <h2 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
              LET&apos;S WORK<br />
              <span className="animate-gradient-text">TOGETHER</span>
            </h2>

            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Have a project in mind or want to discuss an idea? I&apos;d love to hear from you.
            </p>

            <div className="space-y-4 border-t border-slate-800/60 pt-6 max-w-md font-mono text-xs">
              <div className="flex justify-between items-center py-2 border-b border-slate-800/40">
                <span className="text-slate-500 uppercase">EMAIL</span>
                <a href="mailto:ramzyathala@email.com" className="text-blue-400 hover:text-white transition-colors duration-200">ramzyathala@email.com</a>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800/40">
                <span className="text-slate-500 uppercase">LINKEDIN</span>
                <a href="https://www.linkedin.com/in/ramzy-atchallah-putra" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-white transition-colors duration-200">linkedin.com/in/ramzy-atchallah-putra</a>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800/40">
                <span className="text-slate-500 uppercase">GITHUB</span>
                <a href="https://github.com/Night634" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-white transition-colors duration-200">github.com/ramzy</a>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-500 uppercase">INSTAGRAM</span>
                <a href="https://www.instagram.com/ramzy_atc?stkn=YzY4bGJzMm10ZTgy&utm_source=qr" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-white transition-colors duration-200">@ramzy_atc</a>
              </div>
            </div>
          </div>

          <div className="md:col-span-6">
            <form onSubmit={handleSubmit} className="bg-[#070c18] border border-slate-800/80 p-8 rounded-2xl space-y-6 shadow-2xl relative overflow-hidden">
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">NAME</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name" 
                  className="w-full bg-[#030712] border border-slate-800 p-3.5 rounded-lg text-sm text-slate-200 outline-none focus:border-blue-500 transition-colors duration-200" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">EMAIL</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com" 
                  className="w-full bg-[#030712] border border-slate-800 p-3.5 rounded-lg text-sm text-slate-200 outline-none focus:border-blue-500 transition-colors duration-200" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">MESSAGE</label>
                <textarea 
                  rows={4} 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..." 
                  className="w-full bg-[#030712] border border-slate-800 p-3.5 rounded-lg text-sm text-slate-200 outline-none focus:border-blue-500 transition-colors duration-200 resize-none" 
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 active:scale-[0.99] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300"
              >
                {loading ? 'SENDING...' : 'SEND MESSAGE'}
              </button>

              {statusText && (
                <p className="text-xs font-mono text-center text-blue-400 pt-2">{statusText}</p>
              )}
            </form>
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 py-10 px-6 bg-[#02050e]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-base font-bold text-white tracking-wide">
              {profile?.name || 'Ramzy Atchallah Putra'}
            </h3>
            <p className="text-xs text-blue-400 font-medium">
              {profile?.title || 'Software Engineer / Frontend Developer'}
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400 font-medium">
            <a href="https://github.com/Night634" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors duration-200">GitHub</a>
            <a href="https://www.linkedin.com/in/ramzy-atchallah-putra" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors duration-200">LinkedIn</a>
            <a href="https://www.instagram.com/ramzy_atc?stkn=YzY4bGJzMm10ZTgy&utm_source=qr" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors duration-200">Instagram</a>
          </div>

          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} {profile?.name || 'Ramzy Atchallah Putra'}
          </div>
        </div>
      </footer>

      {/* MODAL DETAIL PORTFOLIO */}
      {selectedProject && (
        <PortfolioModal
          portfolio={{
            ...selectedProject,
            stacks: selectedProject.stacks.map((s) => s.stack.name),
          }}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}