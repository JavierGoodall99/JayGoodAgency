import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const cards = [
  {
    id: '01',
    title: 'THE DISCOVERY',
    description: 'We dig deep. We unearth the raw DNA of your brand before we write a single line of code.',
    bg: 'bg-[#0a0a0a]',
    color: 'text-white'
  },
  {
    id: '02',
    title: 'THE ARCHITECTURE',
    description: 'We build headless. We build scalable. We build for a future that hasn\'t happened yet.',
    bg: 'bg-[#111111]',
    color: 'text-brand-lime'
  },
  {
    id: '03',
    title: 'THE EXECUTION',
    description: 'Pixel perfection is the baseline. We aim for emotional resonance. Motion that feels like magic.',
    bg: 'bg-white',
    color: 'text-black'
  },
  {
    id: '04',
    title: 'THE LAUNCH',
    description: 'Not just a deploy. A cultural moment. We orchestrate the reveal for maximum impact.',
    bg: 'bg-brand-lime',
    color: 'text-black'
  }
];

const ManifestoCard: React.FC<{ card: typeof cards[0]; index: number }> = ({ card, index }) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15, rootMargin: '0px 0px -20px 0px' });

  return (
    <div
      ref={ref}
      className="sticky top-24 md:top-32 mb-12 md:mb-24 last:mb-0"
      style={{ zIndex: index + 1 }}
    >
      <div
        className={`${card.bg} border border-white/10 p-6 md:p-20 min-h-[50vh] md:min-h-[70vh] flex flex-col justify-between shadow-2xl transition-all duration-700 hover:-translate-y-4 ${isVisible ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-[0.95] blur-[4px]'}`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="flex justify-between items-start">
          <span className={`font-mono text-xs md:text-sm uppercase tracking-widest border px-3 py-1 rounded-full ${card.bg === 'bg-white' || card.bg === 'bg-brand-lime' ? 'border-black/20 text-black' : 'border-white/20 text-white'}`}>
            Phase /{card.id}
          </span>
          <div className="hidden md:block">
            <div className={`w-3 h-3 rounded-full animate-pulse ${card.bg === 'bg-white' || card.bg === 'bg-brand-lime' ? 'bg-black' : 'bg-brand-lime'}`}></div>
          </div>
        </div>

        <div>
          <h3 className={`font-display font-bold text-4xl md:text-5xl lg:text-8xl mb-8 leading-[0.9] tracking-tighter ${card.color}`}>
            {card.title}
          </h3>
          <p className={`text-lg md:text-xl lg:text-3xl max-w-3xl font-light leading-relaxed ${card.bg === 'bg-white' || card.bg === 'bg-brand-lime' ? 'text-black/70' : 'text-gray-400'}`}>
            {card.description}
          </p>
        </div>

        <div className={`w-full h-px ${card.bg === 'bg-white' || card.bg === 'bg-brand-lime' ? 'bg-black/10' : 'bg-white/10'}`}></div>
      </div>
    </div>
  );
};

const Manifesto: React.FC = () => {
  const { ref: headerRef } = useScrollReveal({ threshold: 0.2 });
  const { ref: lineRef } = useScrollReveal({ threshold: 0.3 });

  return (
    <section className="bg-brand-dark relative pt-20 md:pt-32 pb-32">
      <div className="container mx-auto px-6 mb-16 md:mb-24">
        <div ref={headerRef} className="scroll-reveal">
          <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-8xl text-white mb-6">THE PROTOCOL</h2>
        </div>
        <div ref={lineRef} className="scroll-line-draw w-full h-px bg-white/10"></div>
      </div>

      <div className="container mx-auto px-6">
        {cards.map((card, index) => (
          <ManifestoCard key={card.id} card={card} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Manifesto;