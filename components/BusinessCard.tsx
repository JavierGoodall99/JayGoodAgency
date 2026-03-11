import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BusinessCard: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full max-w-[400px] h-[250px] relative perspective-1000 group cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        className="w-full h-full relative preserve-3d transition-transform duration-700"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of Card */}
        <div className="absolute inset-0 backface-hidden bg-brand-dark border-[1px] border-brand-lime/20 rounded-2xl p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-lime/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-lime/5 blur-2xl rounded-full -translate-x-1/2 translate-y-1/2" />
          
          <div className="z-10 flex-grow flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-widest uppercase mb-2">JayGood</h2>
            <p className="font-mono text-[10px] text-brand-lime tracking-[0.4em] uppercase">Creative Agency</p>
          </div>
          
          <div className="z-10 mt-auto flex justify-center items-center">
            <p className="font-mono text-[8px] tracking-widest uppercase opacity-50 text-white">Tap to flip</p>
          </div>
        </div>

        {/* Back of Card */}
        <div 
          className="absolute inset-0 backface-hidden bg-brand-lime rounded-2xl p-8 flex flex-col justify-between overflow-hidden shadow-2xl items-center text-center"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="z-10 w-full mb-auto flex flex-col gap-4 text-black font-sans text-sm tracking-wide">
            <div className="flex items-center justify-center space-x-3 w-full border-b border-black/10 pb-3">
              <span className="opacity-60 font-mono text-[10px] uppercase">W</span>
              <span className="font-medium">jaygood.com</span>
            </div>
            <div className="flex items-center justify-center space-x-3 w-full border-b border-black/10 pb-3">
              <span className="opacity-60 font-mono text-[10px] uppercase">E</span>
              <span className="font-medium">hello@jaygood.com</span>
            </div>
            <div className="flex items-center justify-center space-x-3 w-full border-b border-black/10 pb-3">
              <span className="opacity-60 font-mono text-[10px] uppercase">P</span>
              <span className="font-medium">+27 671435160</span>
            </div>
          </div>
          
          <div className="mt-8 text-black/80">
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase font-bold">Tired of average?</p>
            <p className="font-mono text-[8px] tracking-widest uppercase mt-1 opacity-50">Tap to flip</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BusinessCard;
