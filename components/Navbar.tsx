import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLinkIndex, setHoveredLinkIndex] = useState<number | null>(null);
  const [time, setTime] = useState<string>('');

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  // Live Time Clock
  useEffect(() => {
    const updateTime = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-GB', { hour12: false });
        setTime(timeString);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    setIsOpen(false);
  };

  const navLinks = [
    { 
      name: 'Work', 
      href: '#work', 
      id: '01',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'
    },
  ];

  return (
    <>
      {/* --- FLOATING HEADER (Mix Blend Difference) --- */}
      <header className="fixed top-0 left-0 right-0 z-[60] px-6 py-6 md:px-12 md:py-8 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
        
        {/* Left Side: Logo + Hamburger Group */}
        <div className="flex items-center gap-16 pointer-events-auto">
            {/* Logo */}
            <a 
              href="#" 
              onClick={(e) => scrollToSection(e, '#')} 
              className="font-display font-bold text-2xl tracking-tighter group"
            >
              JAYGOOD<span className="text-brand-lime transition-opacity duration-300 group-hover:opacity-50">.</span>
            </a>

            {/* Hamburger Trigger - Icon Only (Original Style) */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="group flex items-center justify-center cursor-pointer"
                aria-label="Toggle Menu"
            >
                <div className="relative w-8 h-8 flex flex-col justify-center items-end gap-1.5 overflow-hidden">
                    <span className={`w-full h-[2px] bg-current transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`w-2/3 h-[2px] bg-current transform transition-all duration-300 ${isOpen ? '-translate-x-full opacity-0' : 'group-hover:w-full'}`} />
                    <span className={`w-full h-[2px] bg-current transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
            </button>
        </div>

        {/* Right Side: CPT Time Widget */}
        <div className="flex items-center gap-3 pointer-events-auto font-mono text-xs md:text-sm tracking-widest text-gray-200">
             {/* Status Dot */}
             <div className="w-2 h-2 rounded-full bg-brand-lime animate-pulse shadow-[0_0_8px_rgba(204,255,0,0.6)]"></div>
             <span>CPT 22° / {time}</span>
        </div>

      </header>

      {/* --- FULL SCREEN OVERLAY --- */}
      <div 
        className={`fixed inset-0 z-50 bg-[#050505] transition-all duration-[1000ms] ease-[cubic-bezier(0.87,0,0.13,1)] ${
          isOpen ? 'clip-path-open pointer-events-auto' : 'clip-path-closed pointer-events-none'
        }`}
      >
        <style>{`
          .clip-path-open { clip-path: inset(0% 0% 0% 0%); }
          .clip-path-closed { clip-path: inset(0% 0% 100% 0%); }
        `}</style>

        {/* Dynamic Background Image Reveal */}
        <div className="absolute inset-0 z-0">
           {navLinks.map((link, idx) => (
             <div 
                key={`bg-${link.id}`}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${hoveredLinkIndex === idx ? 'opacity-40 scale-105' : 'opacity-0 scale-100'}`}
                style={{ backgroundImage: `url(${link.image})` }}
             />
           ))}
           <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
           {/* Grid overlay */}
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
        </div>

        {/* Content Container - Centered Layout */}
        <div className="container mx-auto h-full relative z-10 flex flex-col justify-center items-center">
            
            {/* Main Navigation Links */}
            <nav className="flex flex-col items-center space-y-2">
                {navLinks.map((link, idx) => (
                    <div 
                        key={link.name} 
                        className="relative group text-center"
                        onMouseEnter={() => setHoveredLinkIndex(idx)}
                        onMouseLeave={() => setHoveredLinkIndex(null)}
                    >
                        <a 
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className={`
                                block font-display font-bold text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] leading-[0.85] tracking-tighter
                                transition-all duration-500 ease-out flex items-center gap-4 md:gap-8 justify-center
                                ${hoveredLinkIndex !== null && hoveredLinkIndex !== idx ? 'opacity-20 blur-[2px]' : 'opacity-100'}
                                ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
                            `}
                            style={{ 
                                transitionDelay: `${100 + idx * 50}ms`
                            }}
                        >
                            {/* Animated Number */}
                            <span className="hidden md:block text-2xl font-mono tracking-widest text-brand-lime opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 absolute -left-16 top-1/2 -translate-y-1/2">
                                /{link.id}
                            </span>
                            
                            {/* Text */}
                            <span className={`relative z-10 ${hoveredLinkIndex === idx ? 'text-white scale-105' : 'text-transparent text-outline'} transition-transform duration-500`}>
                                {link.name}
                            </span>
                        </a>
                    </div>
                ))}
            </nav>

        </div>
      </div>
    </>
  );
};

export default Navbar;