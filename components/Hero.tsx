import React, { useEffect, useRef } from 'react';
import { ArrowDown, MoveRight } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const moveX = clientX - window.innerWidth / 2;
      const moveY = clientY - window.innerHeight / 2;
      
      const offset = 0.02;
      heroRef.current.style.setProperty('--mouse-x', `${moveX * offset}px`);
      heroRef.current.style.setProperty('--mouse-y', `${moveY * offset}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center px-4 md:px-6 pt-20 overflow-hidden bg-brand-dark"
      style={{
        '--mouse-x': '0px',
        '--mouse-y': '0px'
      } as React.CSSProperties}
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
         <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-lime/20 rounded-full blur-[120px] mix-blend-screen animate-blob"
              style={{ transform: 'translate(var(--mouse-x), var(--mouse-y))' }}></div>
         <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-900/30 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000"
              style={{ transform: 'translate(calc(var(--mouse-x) * -1), calc(var(--mouse-y) * -1))' }}></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none z-10"></div>
      
      {/* Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:6rem_6rem]"></div>

      <div className="container mx-auto z-20 relative">
        <div className="flex flex-col items-center md:items-start">
            
            {/* Massive Typography */}
            <div className="relative group mt-8 md:mt-0">
                <h1 className="font-display font-bold leading-[0.85] tracking-tighter text-center md:text-left select-none">
                    <div className="text-[13vw] md:text-[11rem] text-outline text-outline-hover transition-all duration-500 transform translate-x-0 group-hover:translate-x-2">
                        WE BUILD
                    </div>
                    <div className="text-[13vw] md:text-[11rem] text-white mix-blend-normal relative z-10">
                        THE MODERN
                    </div>
                    <div className="text-[13vw] md:text-[11rem] text-brand-lime flex flex-col md:flex-row items-center md:gap-8 transform translate-x-0 group-hover:-translate-x-2 transition-transform duration-500">
                        WEB
                        <div className="hidden md:flex h-[120px] w-[120px] rounded-full border border-brand-lime/30 items-center justify-center animate-spin-slow">
                            <ArrowDown size={40} className="text-brand-lime" />
                        </div>
                    </div>
                </h1>
            </div>

            {/* Content & CTA */}
            <div className="mt-12 md:mt-16 w-full flex flex-col md:flex-row justify-between items-end gap-8">
                <p className="text-gray-400 max-w-md text-lg md:text-xl leading-relaxed font-light backdrop-blur-sm text-center md:text-left">
                    We are JayGood. Digital architects crafting <span className="text-white font-medium">award-winning experiences</span> where engineering meets emotion.
                </p>
                
                <div className="flex flex-col gap-4 w-full md:w-auto">
                    <a href="#pricing" className="relative px-8 py-4 bg-white text-black font-display font-bold text-lg uppercase tracking-widest hover:bg-brand-lime transition-colors flex items-center justify-between gap-8 group overflow-hidden">
                        <span className="relative z-10">Start Your Project</span>
                        <MoveRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-brand-lime transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
                    </a>
                    <div className="flex justify-between items-center px-1">
                        <span className="text-[10px] font-mono text-gray-500 uppercase">Scroll to explore</span>
                        <span className="text-[10px] font-mono text-gray-500 uppercase">v2.0.4</span>
                    </div>
                </div>
            </div>

        </div>
      </div>
      
      {/* Decorative Side Elements */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 z-20">
          <div className="w-1 h-20 bg-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-brand-lime animate-pulse"></div>
          </div>
          <div className="font-mono text-[10px] text-brand-lime rotate-90 origin-center translate-y-8 w-4">
              SCROLL
          </div>
      </div>
    </section>
  );
};

export default Hero;