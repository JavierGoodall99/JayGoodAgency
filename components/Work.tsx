import React, { useRef, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '../types';

const projects: ProjectItem[] = [
  {
    id: '01',
    title: 'NEBULA FINANCE',
    category: 'WEB3 / FINTECH',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop'
  },
  {
    id: '02',
    title: 'AERO DYNAMICS',
    category: 'AUTOMOTIVE / 3D',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1559080463-5c745741211e?q=80&w=2565&auto=format&fit=crop'
  },
  {
    id: '03',
    title: 'SILK & STONE',
    category: 'FASHION / ECOMMERCE',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '04',
    title: 'ORBITAL AI',
    category: 'SAAS / PLATFORM',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: '05',
    title: 'VANTAGE',
    category: 'REAL ESTATE',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop'
  }
];

const Work: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      // Skip logic on mobile to avoid calculations for hidden elements
      if (window.innerWidth < 768) return;

      const element = sectionRef.current;
      const { top, height } = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll distance
      const scrollDist = height - viewportHeight;
      const scrollTop = -top;
      
      let progress = scrollTop / scrollDist;
      progress = Math.max(0, Math.min(1, progress));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="work" className="bg-brand-dark">
      
      {/* --- MOBILE LAYOUT (Vertical Stack) --- */}
      <div className="block md:hidden py-20 px-6">
        <div className="mb-12">
            <h2 className="font-display font-bold text-5xl text-white leading-none mb-4">
                SELECTED <span className="text-brand-lime">WORKS</span>
            </h2>
             <p className="font-mono text-sm uppercase tracking-widest text-gray-500">
                Case Studies
            </p>
        </div>

        <div className="flex flex-col gap-16">
            {projects.map((project) => (
                <div key={project.id} className="group">
                    <div className="relative aspect-[4/3] overflow-hidden mb-6 border border-white/10">
                         <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                         <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
                            <span className="font-mono text-[10px] text-white uppercase tracking-widest">{project.category}</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-brand-lime font-mono text-xs mb-1 block">/{project.id}</span>
                            <h3 className="font-display font-bold text-3xl text-white mb-2">{project.title}</h3>
                        </div>
                        <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                             <ArrowUpRight size={18} className="text-white" />
                        </a>
                    </div>
                </div>
            ))}
             <div className="pt-8 flex justify-center">
                 <a href="#contact" className="inline-flex items-center gap-2 font-mono text-sm text-brand-lime uppercase tracking-widest border-b border-brand-lime/30 pb-1">
                    View Archive <ArrowUpRight size={14} />
                 </a>
            </div>
        </div>
      </div>

      {/* --- DESKTOP LAYOUT (Horizontal Scroll) --- */}
      <section ref={sectionRef} className="hidden md:block relative h-[400vh]">
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
          
          {/* Static Header */}
          <div className="container mx-auto px-6 pt-24 md:pt-32 flex justify-between items-end shrink-0 relative z-20">
              <div>
                  <h2 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-white leading-none">
                      SELECTED <span className="text-brand-lime">WORKS</span>
                  </h2>
              </div>
              <div className="hidden md:block text-right">
                  <p className="font-mono text-sm uppercase tracking-widest text-gray-500 mb-2">
                      Case Studies
                  </p>
                  <div className="text-brand-lime font-mono text-xs">
                      ( Drag / Scroll )
                  </div>
              </div>
          </div>

          {/* Horizontal Track */}
          <div className="flex-grow flex items-center relative z-10 w-full">
              <div 
                  ref={trackRef}
                  className="flex gap-12 md:gap-24 pl-6 md:pl-32 items-center w-max will-change-transform"
                  style={{ 
                      transform: `translate3d(-${scrollProgress * 75}%, 0, 0)`,
                  }}
              >
                  {projects.map((project, index) => (
                      <div 
                          key={project.id}
                          className="relative group w-[85vw] md:w-[60vw] lg:w-[45vw] flex-shrink-0"
                      >
                          {/* Image Container */}
                          <div className="relative aspect-[4/3] overflow-hidden mb-8 border border-white/10 bg-brand-dark">
                              <div className="absolute inset-0 bg-brand-lime/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                              <img 
                                  src={project.image} 
                                  alt={project.title}
                                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-700 ease-out"
                              />
                              
                              {/* Floating Badge */}
                              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full z-20">
                                  <span className="font-mono text-xs text-white uppercase tracking-widest">{project.category}</span>
                              </div>
                          </div>

                          {/* Info */}
                          <div className="flex justify-between items-end border-b border-white/20 pb-6 group-hover:border-brand-lime transition-colors duration-500 cursor-interactive">
                              <div>
                                  <span className="block font-mono text-sm text-brand-lime mb-2">/{project.id}</span>
                                  <h3 className="font-display font-bold text-4xl md:text-6xl text-white group-hover:text-brand-lime transition-colors duration-300">
                                      {project.title}
                                  </h3>
                              </div>
                              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-brand-lime group-hover:border-brand-lime transition-all duration-300">
                                  <ArrowUpRight className="text-white group-hover:text-black transition-colors" />
                              </div>
                          </div>
                      </div>
                  ))}
                  
                  {/* View All / End Card */}
                  <div className="flex-shrink-0 w-[40vw] md:w-[30vw] flex items-center justify-center pr-24">
                      <a href="#contact" className="group flex flex-col items-center gap-6 cursor-interactive">
                          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:border-white transition-all duration-500">
                              <ArrowUpRight size={40} className="text-white group-hover:text-black" />
                          </div>
                          <span className="font-display font-bold text-2xl md:text-4xl text-white">VIEW ARCHIVE</span>
                      </a>
                  </div>
              </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-[1px] bg-white/10 relative z-20 mt-auto">
              <div 
                  className="h-full bg-brand-lime"
                  style={{ width: `${scrollProgress * 100}%` }}
              ></div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Work;