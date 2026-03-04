import React, { useState } from 'react';
import TextScramble from './TextScramble';

const TrustBar: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-20 px-6 bg-[#030303] overflow-hidden">
      <div className="container mx-auto bg-white/[0.03] border border-white/10 grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
        <div className="relative h-64 md:h-auto overflow-hidden group">
          <img
            src="/trustbar-founder.png"
            alt="JayGood Founder"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        </div>
        {[
          { label: 'AWARDS WON', val: '4' },
          { label: 'CLIENT SATISFACTION', val: '100%' },
          { label: 'ON-TIME DELIVERY', val: '100%' }
        ].map((stat, i) => (
          <div
            key={i}
            className="p-8 md:p-12 lg:p-16 min-h-[300px] flex flex-col justify-between items-start hover:bg-white/[0.03] transition-colors duration-500"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span className="font-display font-light text-6xl md:text-7xl lg:text-[7rem] leading-none text-white tracking-tighter">{stat.val}</span>
            <TextScramble
              text={stat.label}
              className="font-mono text-xs uppercase tracking-widest text-gray-500 mt-auto"
              trigger="both"
              forceHover={hoveredIndex === i}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBar;
