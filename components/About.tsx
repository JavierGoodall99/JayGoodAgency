import React from 'react';
import { ArrowDownRight, Award, Zap, Globe } from 'lucide-react';

const team = [
  { name: 'JAY GOOD', role: 'FOUNDER / VISION', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop' },
  { name: 'ELARA VOSS', role: 'DESIGN DIRECTOR', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop' },
  { name: 'KAI ODA', role: 'TECH LEAD', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop' },
  { name: 'MIRA SIO', role: 'STRATEGY', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2550&auto=format&fit=crop' }
];

const awards = [
  { year: '2024', org: 'AWWWARDS', title: 'Site of the Day', project: 'Nebula Finance' },
  { year: '2024', org: 'FWA', title: 'FWA of the Month', project: 'Vantage' },
  { year: '2023', org: 'CSS DESIGN', title: 'Best UI/UX', project: 'JayGood v1' },
  { year: '2023', org: 'AWWWARDS', title: 'Developer Award', project: 'Silk & Stone' },
];

const About: React.FC = () => {
  return (
    <div className="bg-brand-dark min-h-screen text-white pt-32 pb-20">
      
      {/* HERO */}
      <section className="px-6 mb-32">
        <div className="container mx-auto">
          <h1 className="font-display font-bold text-[12vw] leading-[0.85] tracking-tighter mb-12 mix-blend-difference">
            WE ARE THE <br/>
            <span className="text-brand-lime ml-[10vw]">GLITCH</span> IN <br/>
            THE MATRIX.
          </h1>
          
          <div className="flex flex-col md:flex-row justify-between items-start border-t border-white/20 pt-8">
            <div className="md:w-1/3 mb-8 md:mb-0">
               <span className="font-mono text-xs uppercase tracking-widest text-brand-lime">
                 // EST. 2022
               </span>
            </div>
            <div className="md:w-1/2">
              <p className="text-xl md:text-3xl font-light leading-relaxed text-gray-300">
                JayGood isn't just an agency. It's a rebellion against the template economy. We fuse brutalist aesthetics with hyper-performance engineering to create digital experiences that don't just load—they detonate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
                { label: 'PROJECTS', val: '42+' },
                { label: 'AWARDS', val: '18' },
                { label: 'GLOBAL CLIENTS', val: '12' },
                { label: 'COFFEE', val: '∞' }
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
                      Our Operating System
                  </p>
                  <Globe className="w-16 h-16 text-brand-lime animate-spin-slow opacity-50" strokeWidth={1} />
              </div>
              <div className="md:w-2/3 flex flex-col gap-24">
                  {[
                      { icon: <Zap size={32}/>, title: 'SPEED IS A RELIGION', text: 'We measure performance in milliseconds. If it blinks, it’s too slow. We optimize every pixel, every shader, every line of code.' },
                      { icon: <Award size={32}/>, title: 'AESTHETIC ANARCHY', text: 'Safe design is invisible. We create work that demands attention, challenges conventions, and sometimes makes people uncomfortable. Good.' },
                      { icon: <ArrowDownRight size={32}/>, title: 'RESULTS OR NOTHING', text: 'Art without function is decoration. We build systems that convert, scale, and define categories.' }
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

      {/* TEAM */}
      <section className="py-32 px-6 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <div className="container mx-auto relative z-10">
              <div className="mb-20">
                <h2 className="font-display font-bold text-6xl md:text-8xl">THE <span className="text-brand-lime">SQUAD</span></h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {team.map((member, i) => (
                      <div key={i} className="group relative aspect-[3/4] overflow-hidden bg-brand-gray border border-white/10 cursor-interactive">
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-all duration-700" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60"></div>
                          <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                              <h3 className="font-display font-bold text-2xl text-white mb-1">{member.name}</h3>
                              <p className="font-mono text-xs text-brand-lime uppercase tracking-widest">{member.role}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* RECOGNITION */}
      <section className="py-32 px-6">
          <div className="container mx-auto max-w-4xl">
              <h2 className="font-display font-bold text-4xl mb-12 text-center">TROPHY CABINET</h2>
              <div className="flex flex-col">
                  {awards.map((award, i) => (
                      <div key={i} className="flex flex-col md:flex-row justify-between items-center py-8 border-b border-white/10 hover:border-brand-lime transition-colors group cursor-interactive">
                          <div className="flex items-center gap-8 md:w-1/3">
                              <span className="font-mono text-gray-500">{award.year}</span>
                              <span className="font-bold text-xl">{award.org}</span>
                          </div>
                          <div className="md:w-1/3 text-center text-gray-400 group-hover:text-white transition-colors">
                              {award.title}
                          </div>
                          <div className="md:w-1/3 text-right font-mono text-sm text-brand-lime opacity-0 group-hover:opacity-100 transition-opacity">
                              PROJECT: {award.project}
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

    </div>
  );
};

export default About;