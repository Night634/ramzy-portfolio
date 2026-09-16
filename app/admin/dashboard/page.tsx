import { prisma } from '@/lib/prisma';
import type { Portfolio } from '@/types';

export const revalidate = 0;

export default async function DashboardPage() {
  const [projectCount, stackCount, recentProjects] = await Promise.all([
    prisma.portfolio.count(),
    prisma.stack.count(),
    prisma.portfolio.findMany({ take: 3, orderBy: { createdAt: 'desc' } }),
  ]);

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-white">Dashboard</h1>
        <p className="text-xs text-slate-400">Welcome back, Ramzy</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#080d1a] border border-slate-800/80 p-5 rounded-lg space-y-2">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">PROJECTS</span>
          <p className="text-3xl font-extrabold text-white">{projectCount}</p>
          <p className="text-[11px] text-slate-500">+2 this month</p>
        </div>

        <div className="bg-[#080d1a] border border-slate-800/80 p-5 rounded-lg space-y-2">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">STACK ITEMS</span>
          <p className="text-3xl font-extrabold text-white">{stackCount}</p>
          <p className="text-[11px] text-slate-500">+3 this month</p>
        </div>

        <div className="bg-[#080d1a] border border-slate-800/80 p-5 rounded-lg space-y-2">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">MESSAGES</span>
          <p className="text-3xl font-extrabold text-white">7</p>
          <p className="text-[11px] text-slate-500">2 unread</p>
        </div>

        <div className="bg-[#080d1a] border border-slate-800/80 p-5 rounded-lg space-y-2">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">PROFILE VIEWS</span>
          <p className="text-3xl font-extrabold text-white">1.4k</p>
          <p className="text-[11px] text-slate-500">+12% this week</p>
        </div>
      </div>

      {/* Recent Projects List */}
      <div className="bg-[#080d1a] border border-slate-800/80 rounded-lg p-6 space-y-4">
        <h2 className="text-sm font-bold text-white">Recent Projects</h2>
        <div className="divide-y divide-slate-800/60">
          {recentProjects.map((project: Portfolio) => (
            <div key={project.id} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
              <div>
                <h3 className="text-sm font-bold text-white">{project.title}</h3>
                <p className="text-xs text-slate-400">{project.projectType}</p>
              </div>
              <span className="px-2.5 py-1 text-[10px] font-mono font-bold rounded bg-emerald-950/40 text-emerald-400 border border-emerald-500/30">
                Published
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}