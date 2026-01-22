import React from 'react';

const Marquee: React.FC = () => {
  const words = [
    "PREMIUM DESIGN", 
    "HIGH PERFORMANCE", 
    "ECOMMERCE", 
    "SEO OPTIMIZED", 
    "MOBILE READY", 
    "USER EXPERIENCE", 
    "BRAND STRATEGY", 
    "GROWTH DRIVEN"
  ];
  
  return (
    <div className="w-full py-6 bg-brand-dark/80 backdrop-blur-sm border-t border-white/10 overflow-hidden flex relative z-20">
      <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
        {[...words, ...words, ...words, ...words].map((word, index) => (
          <div key={index} className="flex items-center gap-12">
            <span className="text-4xl md:text-5xl font-display font-bold text-transparent stroke-text opacity-50 hover:opacity-100 hover:text-brand-lime transition-all duration-300 cursor-default">
              {word}
            </span>
            <span className="w-2 h-2 bg-brand-lime/50 rounded-full"></span>
          </div>
        ))}
      </div>
      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
        }
        .stroke-text:hover {
          -webkit-text-stroke: 1px #ccff00;
        }
      `}</style>
    </div>
  );
};

export default Marquee;