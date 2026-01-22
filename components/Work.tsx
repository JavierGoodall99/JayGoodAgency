import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '../types';

const projects: ProjectItem[] = [
  {
    id: '01',
    title: 'NEBULA FINANCE',
    category: 'Web3 / Fintech Interface',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop'
  },
  {
    id: '02',
    title: 'AERO DYNAMICS',
    category: 'Aerospace / 3D Configurator',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1559080463-5c745741211e?q=80&w=2565&auto=format&fit=crop'
  },
  {
    id: '03',
    title: 'SILK & STONE',
    category: 'Fashion / Headless Commerce',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '04',
    title: 'ORBITAL',
    category: 'SaaS / AI Dashboard',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop'
  }
];

const Work: React.FC = () => {
  return (
    <section id="work" className="scroll-mt-20 py-20 md:py-32 px-6 bg-brand-dark relative border-t border-white/5">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 md:mb-32">
            <div>
                 <h2 className="font-display font-semibold text-5xl md:text-9xl leading-[0.8] tracking-tighter text-white mb-6">
                    SELECTED <br />
                    <span className="text-white/20">BUILDS</span>
                </h2>
            </div>
            <div className="flex flex-col items-start md:items-end w-full md:w-auto mt-8 md:mt-0">
                <p className="text-gray-400 max-w-sm md:text-right font-light text-lg mb-8 leading-relaxed">
                    Digital products defined by bold aesthetics and engineering precision. We push the browser to its absolute limit.
                </p>
                 <a href="#" className="text-sm font-bold uppercase tracking-widest border-b border-white/20 pb-1 hover:text-brand-lime hover:border-brand-lime transition-all">
                    View Full Archive
                </a>
            </div>
        </div>

        <div className="space-y-24 md:space-y-32">
          {projects.map((project, idx) => (
            <div 
              key={project.id} 
              className={`group flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-20 items-center`}
            >
              {/* Image Side */}
              <div className="w-full md:w-3/5 relative">
                <div className="relative overflow-hidden aspect-[4/3] md:aspect-[16/9] border border-white/10 group-hover:border-brand-lime/50 transition-colors duration-500">
                    <div className="absolute inset-0 bg-brand-lime/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                    <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
                    />
                    
                    {/* Tech Corners */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-lime opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-lime opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                </div>
              </div>

              {/* Text Side - Always left align on mobile, alternate on desktop */}
              <div className={`w-full md:w-2/5 flex flex-col items-start text-left ${idx % 2 === 0 ? '' : 'md:items-end md:text-right'}`}>
                <span className="text-brand-lime font-mono text-xs tracking-widest mb-4">0{idx + 1} / {project.year}</span>
                <h3 className="text-3xl md:text-6xl font-display font-bold mb-4 leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                    {project.title}
                </h3>
                <p className={`text-gray-400 text-lg mb-8 border-white/20 pl-4 border-l ${idx % 2 === 0 ? '' : 'md:border-l-0 md:border-r md:pr-4 md:pl-0'}`}>
                    {project.category}
                </p>
                <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white group-hover:text-brand-lime transition-colors">
                    View Live <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;