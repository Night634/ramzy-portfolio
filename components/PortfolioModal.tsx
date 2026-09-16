'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, GitFork } from 'lucide-react';
import type { Portfolio } from '@/types';

type PortfolioModalData = Portfolio & {
  keyFeatures?: string | null;
  stacks?: string[];
};

interface PortfolioModalProps {
  portfolio: PortfolioModalData | null;
  onClose: () => void;
}

export default function PortfolioModal({ portfolio, onClose }: PortfolioModalProps) {
  if (!portfolio) return null;

  const keyFeatures = portfolio.keyFeatures
    ? portfolio.keyFeatures.split(/[\n,]/).map((feature) => feature.trim()).filter(Boolean)
    : [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-black/80 backdrop-blur-md">
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#080d1a] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl z-10 my-auto max-h-[90vh] flex flex-col"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>

          <div className="overflow-y-auto custom-scrollbar">
            {/* HERO BANNER OVERLAY */}
            <div className="relative h-64 sm:h-80 w-full bg-slate-950 overflow-hidden">
              <img
                src={portfolio.thumbnail}
                alt={portfolio.title}
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#080d1a] via-[#080d1a]/60 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-blue-400 uppercase bg-blue-950/80 border border-blue-500/30 px-2.5 py-1 rounded">
                  {portfolio.projectType || 'PERSONAL PROJECT'}
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {portfolio.title}
                </h2>
              </div>
            </div>

            {/* CONTENT BODY */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* META INFO ROW */}
              <div className="grid grid-cols-3 gap-4 pb-6 border-b border-slate-800/80 text-xs">
                <div>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">ROLE</p>
                  <p className="font-bold text-slate-200 mt-1">{portfolio.role || 'Full Stack Developer'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">YEAR</p>
                  <p className="font-bold text-slate-200 mt-1">{portfolio.year || '2024'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">TYPE</p>
                  <p className="font-bold text-slate-200 mt-1">{portfolio.projectType || 'Personal Project'}</p>
                </div>
              </div>

              {/* 2-COLUMN MAIN CONTENT */}
              <div className="grid md:grid-cols-12 gap-8">
                {/* Left Column: Overview, Challenges, Solution */}
                <div className="md:col-span-7 space-y-6">
                  {portfolio.description && (
                    <div className="space-y-2">
                      <h3 className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">OVERVIEW</h3>
                      <p className="text-sm text-slate-300 leading-relaxed font-light">{portfolio.description}</p>
                    </div>
                  )}

                  {portfolio.challenges && (
                    <div className="space-y-2">
                      <h3 className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">CHALLENGES</h3>
                      <p className="text-sm text-slate-300 leading-relaxed font-light">{portfolio.challenges}</p>
                    </div>
                  )}

                  {portfolio.solution && (
                    <div className="space-y-2">
                      <h3 className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">SOLUTION</h3>
                      <p className="text-sm text-slate-300 leading-relaxed font-light">{portfolio.solution}</p>
                    </div>
                  )}
                </div>

                {/* Right Column: Key Features & Result Card */}
                <div className="md:col-span-5 space-y-6">
                  {keyFeatures.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">KEY FEATURES</h3>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {keyFeatures.map((feat: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-blue-500 font-bold">•</span>
                            <span>{feat.trim().replace(/^•\s*/, '')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {portfolio.result && (
                    <div className="p-4 bg-blue-950/30 border border-blue-900/40 rounded-xl space-y-2">
                      <h3 className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">RESULT</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{portfolio.result}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* TECH STACK BADGES */}
              {portfolio.stacks && portfolio.stacks.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-800/80">
                  <h3 className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">TECHNOLOGY STACK</h3>
                  <div className="flex flex-wrap gap-2">
                    {portfolio.stacks.map((stackName: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 rounded-md">
                        {stackName}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap gap-4 pt-2">
                {portfolio.liveUrl && (
                  <a
                    href={portfolio.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all"
                  >
                    <ExternalLink size={14} /> Live Website
                  </a>
                )}
                {portfolio.githubUrl && (
                  <a
                    href={portfolio.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-2 transition-all"
                  >
                    <GitFork size={14} /> Github
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}