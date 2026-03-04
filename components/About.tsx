import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowDownRight, Award, Zap, Globe, Sparkles } from 'lucide-react';
import SEO from './SEO';
import Awards from './Awards';

// Reusable fade-in wrapper for smooth reveals
const FadeIn: React.FC<{ children: React.ReactNode, delay?: number, className?: string }> = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const About: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const rotateGlobe = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div className="bg-brand-dark min-h-screen text-white pt-40 pb-20 overflow-hidden" ref={containerRef}>
      <SEO
        title="About Us | Web Design Agency | JayGood"
        description="JayGood is an independent web design agency focused on crafting premium, high-performance web experiences that elevate brands."
        canonical="https://jaygood.com/about"
      />

      {/* HERO SECTION */}
      <section className="px-6 mb-40 lg:mb-64">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 md:mb-24"
          >
            <p className="font-mono text-sm md:text-base text-brand-lime uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-brand-lime"></span>
              Independent Digital Agency
            </p>
            <h1 className="font-display font-bold text-[14vw] sm:text-[12vw] leading-[0.8] tracking-[-0.04em] uppercase">
              We Shape <br />
              <span className="text-white/40 italic">Digital</span> Legacy
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 border-t border-white/10 pt-12 relative">
            <FadeIn className="lg:col-span-4" delay={0.2}>
              <div className="flex items-start gap-4 text-gray-400">
                <Sparkles className="text-brand-lime mt-1 flex-shrink-0" size={20} />
                <p className="font-mono text-xs uppercase tracking-widest leading-relaxed">
                  Founded on the belief that the web should be an experience, not just a utility. We exist to push boundaries.
                </p>
              </div>
            </FadeIn>
            <FadeIn className="lg:col-span-7 lg:col-start-6" delay={0.4}>
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[1.3] text-gray-200 tracking-[-0.02em]">
                JayGood is a premium studio fusing <span className="text-white font-medium">high-end aesthetics</span> with <span className="italic text-brand-lime">precision engineering</span> to create websites that are truly unforgettable.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>




      {/* AWARDS INTEGRATION */}
      <div className="relative z-10 bg-brand-dark">
        <FadeIn>
          <Awards />
        </FadeIn>
      </div>

      {/* PARALLAX STATS LAYER */}
      <section className="relative py-32 border-t border-white/10 bg-[#050505] mt-32">
        {/* Background noise/grain for premium feel */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {[
              { label: 'AWARDS WON', val: '4' },
              { label: 'CLIENT SATISFACTION', val: '100%' },
              { label: 'ON-TIME DELIVERY', val: '100%' }
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.15} className="flex flex-col items-center justify-center py-12 md:py-8 group">
                <motion.span
                  className="font-display font-bold text-7xl lg:text-8xl mb-4 group-hover:text-brand-lime group-hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  {stat.val}
                </motion.span>
                <span className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-gray-500 overflow-hidden relative">
                  <span className="block group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">{stat.label}</span>
                  <span className="absolute inset-0 block translate-y-full group-hover:translate-y-0 text-brand-lime transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">{stat.label}</span>
                </span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;