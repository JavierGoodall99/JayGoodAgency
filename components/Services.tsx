import React from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: '01',
    title: 'Digital Direction',
    description: 'Brand Strategy, Art Direction, Visual Identity, Motion Systems',
    tags: ['Strategy', 'Identity']
  },
  {
    id: '02',
    title: 'Interface Design',
    description: 'UI/UX Design, Design Systems, Prototyping, 3D Assets',
    tags: ['Figma', 'Blender']
  },
  {
    id: '03',
    title: 'Creative Dev',
    description: 'WebGL, Three.js, React, GSAP, Shader Programming',
    tags: ['Frontend', 'WebGL']
  },
  {
    id: '04',
    title: 'Architecture',
    description: 'Headless CMS, E-commerce, Backend Development, API Integration',
    tags: ['Full Stack', 'Cloud']
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="bg-brand-dark text-white py-20 md:py-32 border-t border-white/10">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24">
            <h2 className="font-display font-bold text-5xl md:text-7xl">
                CAPABILITIES
            </h2>
            <p className="font-mono text-gray-500 text-sm uppercase tracking-widest mt-4 md:mt-0">
                Full Cycle Production
            </p>
        </div>

        <div className="flex flex-col border-t border-white/10">
            {services.map((service) => (
                <div 
                    key={service.id} 
                    className="group relative border-b border-white/10 py-12 md:py-20 transition-all duration-500 hover:bg-white/[0.02] overflow-hidden cursor-interactive"
                >
                    {/* Hover Scanline Effect */}
                    <div className="absolute inset-0 bg-brand-lime/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-0 px-2 md:px-8">
                        
                        <div className="md:w-1/4">
                            <span className="font-mono text-brand-lime/50 group-hover:text-brand-lime transition-colors">
                                ( {service.id} )
                            </span>
                        </div>

                        <div className="md:w-1/2">
                            <h3 className="font-display font-bold text-4xl md:text-6xl mb-4 group-hover:translate-x-4 transition-transform duration-500">
                                {service.title}
                            </h3>
                            <div className="h-0 overflow-hidden group-hover:h-auto group-hover:overflow-visible transition-all duration-500">
                                <p className="text-gray-400 font-mono text-sm md:text-base pt-2">
                                    {service.description}
                                </p>
                            </div>
                        </div>

                        <div className="md:w-1/4 flex justify-end">
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-brand-lime group-hover:border-brand-lime group-hover:rotate-45 transition-all duration-500">
                                <ArrowUpRight className="text-white group-hover:text-black transition-colors" />
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
};

export default Services;