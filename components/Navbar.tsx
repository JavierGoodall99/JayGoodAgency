import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 80; // Approximate height of the fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      // Update URL hash without jumping
      window.history.pushState(null, '', href);
    } else if (href === '#') {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
    
    if (isOpen) setIsOpen(false);
  };

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-brand-dark/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <a 
            href="#" 
            onClick={(e) => scrollToSection(e, '#')} 
            className="font-display font-bold text-2xl tracking-tighter hover:text-brand-lime transition-colors relative z-50"
          >
            JAYGOOD<span className="text-brand-lime">.</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm font-medium tracking-wide text-gray-300 hover:text-white relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-lime transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, '#contact')}
              className="px-5 py-2 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white relative z-50 p-2 -mr-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-brand-dark z-40 flex flex-col justify-center px-6 transition-all duration-500 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className={`flex flex-col space-y-8 transition-all duration-700 delay-100 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-5xl font-display font-bold text-transparent text-outline hover:text-brand-lime hover:text-outline-none transition-all"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-8 border-t border-white/10 mt-8">
             <a 
                href="#contact" 
                className="inline-block text-xl text-brand-lime font-mono uppercase tracking-widest mb-4"
                onClick={(e) => scrollToSection(e, '#contact')}
             >
                Start a Project ->
             </a>
             <div className="text-gray-500 text-sm font-mono">
                SAN FRANCISCO, CA <br/>
                EST. 2024
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;