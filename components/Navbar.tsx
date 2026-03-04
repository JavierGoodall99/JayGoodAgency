import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const navLinks = [
  { name: 'Home', href: '/', id: '01', page: 'home' },
  { name: 'About', href: '/about', id: '02', page: 'about' },
  { name: 'Work', href: '/work', id: '03', page: 'work' },
  { name: 'Services', href: '/services', id: '04', page: 'services' },
  { name: 'Contact', href: '/contact', id: '05', page: 'contact' },
];

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/javiergoodall/' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/javiergoodall' },
  { name: 'GitHub', href: 'https://github.com/JavierGoodall99' },
  { name: 'Facebook', href: 'https://www.facebook.com/javier.goodall/' },
];

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState('');
  const [temperature, setTemperature] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 25 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const r = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-33.9249&longitude=18.4241&current_weather=true');
        const d = await r.json();
        if (d.current_weather) setTemperature(Math.round(d.current_weather.temperature));
      } catch { }
    };
    fetchWeather();
    const i = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const t = () => setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }));
    t();
    const i = setInterval(t, 1000);
    return () => clearInterval(i);
  }, []);

  const handleNavigation = (pageName: string) => {
    setIsOpen(false);
    setActiveIndex(null);
    setTimeout(() => onNavigate(pageName), 700);
  };

  // ─── VARIANTS ───
  const overlayVariants = {
    closed: {
      clipPath: 'circle(0% at 50% 3%)',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.15 }
    },
    open: {
      clipPath: 'circle(150% at 50% 3%)',
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const linkVariants = {
    closed: { y: '100%', rotateX: 90 },
    open: (i: number) => ({
      y: '0%',
      rotateX: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 + i * 0.07 }
    })
  };

  const fadeUp = {
    closed: { opacity: 0, y: 30 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.6 + i * 0.1 }
    })
  };

  return (
    <>
      {/* ─── FLOATING HEADER ─── */}
      <header className={`fixed top-0 left-0 right-0 z-[100] px-6 py-5 md:px-12 md:py-7 flex justify-between items-center pointer-events-none transition-colors duration-500 ${isOpen ? 'text-white' : 'text-white mix-blend-difference'}`}>

        {/* Left: Logo */}
        <div className="pointer-events-auto w-1/3">
          <button
            onClick={() => { if (isOpen) setIsOpen(false); else onNavigate('home'); }}
            className="font-display font-bold text-2xl tracking-tighter group hover:italic transition-all duration-300"
          >
            JAYGOOD<span className="text-brand-lime group-hover:opacity-50 transition-opacity">.</span>
          </button>
        </div>

        {/* Center: Menu Trigger */}
        <div className="pointer-events-auto w-1/3 flex justify-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group flex items-center gap-3 cursor-pointer py-2 px-4"
            aria-label="Toggle Menu"
          >
            <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] opacity-80 group-hover:opacity-100 transition-opacity">
              {isOpen ? 'Close' : 'Menu'}
            </span>
            <div className="relative w-6 h-6 flex items-center justify-center">
              <span className={`absolute w-6 h-[2px] bg-current transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'rotate-45' : '-translate-y-[4px]'}`} />
              <span className={`absolute w-6 h-[2px] bg-current transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? '-rotate-45' : 'translate-y-[4px]'}`} />
            </div>
          </button>
        </div>

        {/* Right: Time Widget */}
        <div className="pointer-events-auto w-1/3 flex justify-end">
          <div className="hidden md:flex items-center gap-3 font-mono text-xs tracking-widest opacity-70">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse shadow-[0_0_8px_rgba(204,255,0,0.5)]" />
            <span>CPT {temperature !== null ? `${temperature}°` : '—'} / {time}</span>
          </div>
        </div>
      </header>

      {/* ─── FULL-SCREEN MENU ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuContainerRef}
            className="fixed inset-0 z-[80] bg-[#050505] text-white overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            onMouseMove={handleMouseMove}
          >
            {/* ── Mouse-tracking ambient spotlight ── */}
            <motion.div
              className="absolute w-[60vw] h-[60vw] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0"
              style={{
                x: smoothX,
                y: smoothY,
                background: 'radial-gradient(circle, rgba(204,255,0,0.06) 0%, transparent 70%)',
              }}
            />

            {/* ── Film grain overlay ── */}
            <div
              className="absolute inset-0 pointer-events-none z-50 opacity-[0.035] mix-blend-overlay"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }}
            />

            {/* ── Floating marquee for hovered link ── */}
            <AnimatePresence>
              {activeIndex !== null && (
                <motion.div
                  key={activeIndex}
                  className="absolute inset-0 flex items-center pointer-events-none z-0 overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="flex whitespace-nowrap"
                    animate={{ x: [0, -2000] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  >
                    {[...Array(10)].map((_, i) => (
                      <span
                        key={i}
                        className="font-display font-bold text-[20vw] md:text-[18vw] leading-none uppercase tracking-tighter text-white/[0.03] mx-8 select-none"
                      >
                        {navLinks[activeIndex].name}
                      </span>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Content ── */}
            <div className="container mx-auto px-6 lg:px-12 w-full max-w-[1400px] h-full flex flex-col lg:flex-row pt-28 md:pt-32 pb-8 relative z-10">

              {/* LEFT: Nav Links */}
              <div className="w-full lg:w-7/12 flex flex-col justify-center" style={{ perspective: '1000px' }}>
                <nav>
                  {navLinks.map((link, idx) => (
                    <div
                      key={link.page}
                      className="overflow-hidden"
                      onMouseEnter={() => setActiveIndex(idx)}
                      onMouseLeave={() => setActiveIndex(null)}
                    >
                      <motion.div
                        custom={idx}
                        variants={linkVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        style={{ transformOrigin: 'bottom center' }}
                      >
                        <button
                          onClick={() => handleNavigation(link.page)}
                          className={`group w-full text-left flex items-center gap-4 md:gap-6 py-4 md:py-5 transition-all duration-500 relative ${activeIndex !== null && activeIndex !== idx ? 'opacity-15' : 'opacity-100'
                            }`}
                        >
                          {/* Animated progress line at bottom */}
                          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/[0.06]" />


                          {/* Counter */}
                          <span className="font-mono text-[10px] md:text-sm text-brand-lime/60 tracking-widest translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 min-w-[2.5rem]">
                            ({link.id})
                          </span>

                          {/* Link Name with clip reveal on hover */}
                          <span className="relative block">
                            <span className="font-display font-bold text-[11vw] sm:text-[9vw] md:text-[6vw] lg:text-[5.5rem] leading-[0.9] tracking-tighter text-white/80 group-hover:text-transparent transition-colors duration-500 block">
                              {link.name}
                            </span>
                            {/* Filled duplicate that wipes in */}
                            <span
                              className="absolute inset-0 font-display font-bold text-[11vw] sm:text-[9vw] md:text-[6vw] lg:text-[5.5rem] leading-[0.9] tracking-tighter text-brand-lime block overflow-hidden transition-all duration-700 ease-out"
                              style={{ clipPath: activeIndex === idx ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)' }}
                            >
                              {link.name}
                            </span>
                          </span>

                          {/* Arrow that slides in */}
                          <span className="ml-auto mr-4 opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-brand-lime">
                              <path d="M8 16H24M24 16L18 10M24 16L18 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </button>
                      </motion.div>
                    </div>
                  ))}
                </nav>
              </div>

              {/* RIGHT: Info Column */}
              <div className="w-full lg:w-5/12 flex flex-col justify-end lg:items-end lg:text-right mt-12 lg:mt-0 lg:pb-8">
                <div className="flex flex-row lg:flex-col gap-10 lg:gap-14">

                  <motion.div custom={0} variants={fadeUp} initial="closed" animate="open" exit="closed">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-3">Say hello</p>
                    <a
                      href="mailto:hello@jaygood.com"
                      className="group font-display text-lg md:text-2xl font-bold text-white hover:text-brand-lime transition-colors duration-300 leading-tight relative inline-block"
                    >
                      hello@jaygood
                      <br />
                      .com
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-lime group-hover:w-full transition-all duration-500 lg:left-auto lg:right-0" />
                    </a>
                  </motion.div>

                  <motion.div custom={1} variants={fadeUp} initial="closed" animate="open" exit="closed">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-3">Connect</p>
                    <ul className="flex flex-col gap-1">
                      {socialLinks.map((social) => (
                        <li key={social.name}>
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 font-mono text-xs md:text-sm text-gray-400 uppercase tracking-widest hover:text-brand-lime transition-all duration-300"
                          >
                            <span className="w-0 h-[1px] bg-brand-lime group-hover:w-4 transition-all duration-300" />
                            {social.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div custom={2} variants={fadeUp} initial="closed" animate="open" exit="closed">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-3">Based in</p>
                    <p className="font-mono text-sm text-white leading-relaxed">
                      Cape Town, ZA
                      <br />
                      <span className="text-gray-500">Available Worldwide</span>
                    </p>
                  </motion.div>
                </div>
              </div>

            </div>

            {/* ── Bottom Bar ── */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/[0.06]"
            >
              <div className="container mx-auto px-6 lg:px-12 w-full max-w-[1400px] py-5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="font-mono text-[10px] text-gray-600 uppercase tracking-widest">
                  &copy; {new Date().getFullYear()} JAYGOOD AGENCY
                </p>
                <div className="flex items-center gap-6">
                  <button onClick={() => handleNavigation('privacy')} className="font-mono text-[10px] text-gray-600 uppercase tracking-widest hover:text-brand-lime transition-colors">Privacy</button>
                  <button onClick={() => handleNavigation('terms')} className="font-mono text-[10px] text-gray-600 uppercase tracking-widest hover:text-brand-lime transition-colors">Terms</button>
                </div>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;