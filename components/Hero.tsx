import React, { useEffect, useRef } from 'react';
import { MoveRight } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * 0.01;
      const moveY = (clientY - window.innerHeight / 2) * 0.01;
      
      heroRef.current.style.setProperty('--move-x', `${moveX}deg`);
      heroRef.current.style.setProperty('--move-y', `${moveY}deg`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex flex-col pt-32 pb-12 px-6 bg-brand-dark overflow-hidden perspective-1000"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-brand-lime/5 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-900/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute inset-0 bg-noise z-10 opacity-30"></div>
          
          {/* Grid */}
          <div 
            className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:6rem_6rem] z-0 transform transition-transform duration-100"
            style={{ transform: 'rotateX(var(--move-y)) rotateY(var(--move-x)) scale(1.1)' }}
          ></div>
      </div>

      <div className="container mx-auto relative z-20 flex-grow flex flex-col justify-center">
        
        {/* Main Title */}
        <div className="relative z-10 mix-blend-color-dodge">
            <h1 className="font-display font-bold text-[16vw] md:text-[13vw] leading-[0.85] md:leading-[0.8] tracking-tighter text-white">
                <div className="overflow-hidden flex flex-col md:flex-row md:items-center gap-2 md:gap-12">
                    <span className="block animate-fade-in-up text-brand-lime" style={{ animationDelay: '0.2s' }}>ALCHEMY</span>
                    <div className="h-[1px] md:h-[2vw] w-full md:w-auto md:flex-grow bg-white/10 animate-fade-in-up hidden md:block" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <div className="overflow-hidden">
                    <span className="block animate-fade-in-up hover:text-outline transition-all duration-500 cursor-interactive" style={{ animationDelay: '0.3s' }}>STUDIO</span>
                </div>
            </h1>
        </div>

        {/* Bottom Lockup */}
        <div className="mt-16 md:mt-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="max-w-xl">
                <p className="text-lg md:text-2xl text-gray-400 font-light leading-relaxed">
                    We don't just build websites. We engineer <span className="text-white font-medium">digital dominance</span>. 
                    Merging brutalist aesthetics with silky performance.
                </p>
            </div>

            <a href="#work" className="group flex items-center gap-6 cursor-interactive">
                <span className="font-mono text-sm uppercase tracking-widest text-brand-lime group-hover:text-white transition-colors">
                    Explore The Work
                </span>
                <div className="w-16 h-16 rounded-full border border-brand-lime/30 group-hover:border-brand-lime group-hover:bg-brand-lime flex items-center justify-center transition-all duration-500">
                    <MoveRight className="text-brand-lime group-hover:text-black transition-colors" />
                </div>
            </a>
        </div>

      </div>

      {/* Decorative Floating Elements */}
      <div className="absolute right-6 bottom-6 md:right-12 md:bottom-32 hidden lg:block font-mono text-[10px] text-gray-600 writing-vertical-rl animate-pulse">
          SCROLL_TO_INITIALIZE_SEQUENCE
      </div>
    </section>
  );
};

export default Hero;