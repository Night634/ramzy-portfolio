import { getPortfolioBySlug } from '@/actions/portfolio';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, GitFork } from 'lucide-react';
import type { PortfolioWithStacks } from '@/types';

export const revalidate = 0;

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getPortfolioBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-[#030712] text-slate-100 min-h-screen py-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <Link href="/#portfolio" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors">
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>

        {/* Title */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-blue-500 uppercase">{project.projectType}</span>
          <h1 className="text-4xl font-extrabold text-white">{project.title}</h1>
        </div>

        {/* Main Image */}
        <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900 h-96">
          <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
        </div>

        {/* Details Section */}
        <div className="grid md:grid-cols-3 gap-8 pt-4">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-sm font-mono text-blue-400 uppercase mb-2">Description</h3>
              <p className="text-slate-300 leading-relaxed">{project.description}</p>
            </div>

            {project.keyFeatures && (
              <div>
                <h3 className="text-sm font-mono text-blue-400 uppercase mb-2">Key Features</h3>
                <p className="text-slate-300 leading-relaxed whitespace-pre-line">{project.keyFeatures}</p>
              </div>
            )}
          </div>

          <div className="space-y-6 bg-[#0b1120]/60 p-6 border border-slate-800 rounded-xl">
            {project.role && (
              <div>
                <h4 className="text-xs font-mono text-slate-500 uppercase">Role</h4>
                <p className="text-sm font-medium text-white">{project.role}</p>
              </div>
            )}

            <div>
              <h4 className="text-xs font-mono text-slate-500 uppercase mb-2">Technologies Used</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.stacks.map((entry: PortfolioWithStacks['stacks'][number]) => (
                  <span key={entry.stack.id} className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-xs rounded text-slate-300">
                    {entry.stack.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded flex items-center justify-center gap-2">
                  Live Demo <ExternalLink size={14} />
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" className="w-full py-2 border border-slate-800 hover:bg-slate-900 text-slate-300 font-medium text-xs rounded flex items-center justify-center gap-2">
                  Repository <GitFork size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}