import React from 'react';
import { ArrowDownRight, Award, Zap, Globe } from 'lucide-react';
import SEO from './SEO';
import Awards from './Awards';

const team = [
  { name: 'JAVIER GOODALL', role: 'FOUNDER / DEVELOPER', image: '/me.png' }
];



const About: React.FC = () => {
  return (
    <div className="bg-brand-dark min-h-screen text-white pt-32 pb-20">
      <SEO
        title="About"
        description="JayGood is a digital agency built on the belief that the web should be an experience, not just a utility. We combine brutalist aesthetics with hyper-performance engineering."
        canonical="https://jaygood.com/about"
      />

      {/* HERO */}
      <section className="px-6 mb-32">
        <div className="container mx-auto">
          <h1 className="font-display font-bold text-[12vw] leading-[0.85] tracking-tighter mb-12 mix-blend-difference">
            I AM THE <br />
            <span className="text-brand-lime ml-[10vw]">GLITCH</span> IN <br />
            THE MATRIX.
          </h1>

          <div className="flex flex-col md:flex-row justify-between items-start border-t border-white/20 pt-8">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-lime">
                 // INDEPENDENT AGENCY
              </span>
            </div>
            <div className="md:w-1/2">
              <p className="text-xl md:text-3xl font-light leading-relaxed text-gray-300">
                JayGood isn't just an agency. It's a rebellion against the template economy. I fuse brutalist aesthetics with hyper-performance engineering to create digital experiences that don't just load—they detonate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {[
            { label: 'HOUR SPRINTS', val: '16+' },
            { label: 'PIXEL PERFECT', val: '100%' },
            { label: 'DEDICATION', val: '∞' }
          ].map((stat, i) => (
            <div key={i} className="p-8 md:p-16 flex flex-col items-center justify-center hover:bg-white/5 transition-colors duration-500">
              <span className="font-display font-bold text-5xl md:text-7xl mb-2">{stat.val}</span>
              <span className="font-mono text-xs uppercase tracking-widest text-gray-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-32 px-6">
        <div className="container mx-auto flex flex-col md:flex-row gap-20">
          <div className="md:w-1/3 sticky top-32 h-min">
            <h2 className="font-display font-bold text-6xl mb-6">DNA</h2>
            <p className="font-mono text-sm text-gray-500 uppercase tracking-widest mb-8">
              My Operating System
            </p>
            <Globe className="w-16 h-16 text-brand-lime animate-spin-slow opacity-50" strokeWidth={1} />
          </div>
          <div className="md:w-2/3 flex flex-col gap-24">
            {[
              { icon: <Zap size={32} />, title: 'SPEED IS A RELIGION', text: 'I measure performance in milliseconds. If it blinks, it’s too slow. I optimize every pixel, every shader, every line of code.' },
              { icon: <Award size={32} />, title: 'AESTHETIC ANARCHY', text: 'Safe design is invisible. I create work that demands attention, challenges conventions, and sometimes makes people uncomfortable. Good.' },
              { icon: <ArrowDownRight size={32} />, title: 'RESULTS OR NOTHING', text: 'Art without function is decoration. I build systems that convert, scale, and define categories.' }
            ].map((item, idx) => (
              <div key={idx} className="group">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-6 text-brand-lime group-hover:bg-brand-lime group-hover:text-black transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="font-display font-bold text-4xl md:text-5xl mb-4">{item.title}</h3>
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS */}
      <Awards />



    </div>
  );
};

export default About;