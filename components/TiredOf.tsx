import React from 'react';
import { XCircle, Clock, DollarSign, Layers } from 'lucide-react';

const frustrations = [
  {
    icon: Layers,
    title: "Cookie-Cutter Templates",
    description: "Your brand shouldn't look like a generic template used by thousands of other businesses."
  },
  {
    icon: Clock,
    title: "Ghosting Freelancers",
    description: "Tired of developers who vanish mid-project? We are a dedicated team that actually picks up the phone."
  },
  {
    icon: DollarSign,
    title: "Surprise Invoices",
    description: "No hidden fees, no hourly padding. Just one transparent price for everything you need."
  },
  {
    icon: XCircle,
    title: "Slow Loading Speeds",
    description: "A slow site kills conversions. We engineer for speed, aiming for 100/100 performance scores."
  }
];

const TiredOf: React.FC = () => {
  return (
    <section className="py-20 md:py-32 px-6 bg-brand-dark relative border-t border-white/5 overflow-hidden">
      
      {/* Background Marquee - Softened */}
      <div className="absolute -left-10 top-20 -rotate-3 w-[120%] h-24 bg-white/[0.02] flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <div className="flex gap-8 animate-marquee opacity-10">
             {Array(20).fill("BREAK THE CYCLE //").map((t, i) => (
                 <span key={i} className="text-4xl font-display font-bold text-transparent" style={{ WebkitTextStroke: '1px #555' }}>{t}</span>
             ))}
        </div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24">
            <div className="max-w-2xl">
                <h2 className="font-display font-bold text-4xl md:text-7xl leading-none text-white mb-6">
                    TIRED OF THE <br />
                    <span className="text-white/20 relative">
                        STATUS QUO?
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-brand-lime/20"></span>
                    </span>
                </h2>
            </div>
            <p className="text-gray-400 max-w-sm md:text-right font-light text-lg leading-relaxed mt-8 md:mt-0">
                The agency model is broken. We fixed it by removing the friction, the fluff, and the hidden fees.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {frustrations.map((item, idx) => (
                <div key={idx} className="bg-brand-dark p-6 md:p-8 group hover:bg-white/[0.02] transition-colors duration-300 relative overflow-hidden">
                    {/* Hover Corner Accent */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-brand-lime border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="mb-8 relative">
                        <div className="w-12 h-12 rounded bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-brand-lime group-hover:bg-brand-lime/10 transition-colors duration-300">
                            <item.icon size={24} />
                        </div>
                    </div>
                    
                    <h3 className="text-xl font-display font-bold text-white mb-4 group-hover:text-gray-200 transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                        {item.description}
                    </p>

                    {/* Scanline Effect on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-lime/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none"></div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default TiredOf;