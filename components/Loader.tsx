import React, { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

const bootText = [
  "INITIALIZING KERNEL...",
  "LOADING ASSETS...",
  "OPTIMIZING WEBGL...",
  "ESTABLISHING SECURE CONNECTION...",
  "RENDERING VIEWPORT...",
  "SYSTEM READY"
];

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Progress Timer
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Randomized increment for organic feel
        const jump = Math.floor(Math.random() * 10) + 1;
        return Math.min(prev + jump, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Cycle text based on progress chunks
    const index = Math.min(Math.floor((progress / 100) * bootText.length), bootText.length - 1);
    setTextIndex(index);

    if (progress === 100) {
      // Small delay at 100% before lifting the curtain
      const timeout = setTimeout(() => {
        setIsExiting(true);
        // Wait for animation to finish before unmounting in parent
        setTimeout(onComplete, 1000);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#050505] flex flex-col justify-between px-6 py-8 md:p-12 transition-transform duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${isExiting ? '-translate-y-full' : 'translate-y-0'
        }`}
    >
      {/* Top Bar */}
      <div className="flex justify-between items-start opacity-50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-brand-lime rounded-full animate-pulse"></div>
          <span className="font-mono text-xs text-brand-lime tracking-widest uppercase">JayGood.agency</span>
        </div>
        <div className="hidden md:block font-mono text-xs text-white uppercase tracking-widest text-right">
          <div>Mem: 64GB OK</div>
          <div>Gpu: DETECTED</div>
        </div>
      </div>

      {/* Center Percentage */}
      <div className="relative">
        <h1 className="font-display font-bold text-[20vw] md:text-[18rem] leading-none text-white mix-blend-difference select-none">
          {progress}%
        </h1>
        {/* Decorative Grid Line */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -z-10"></div>
      </div>

      {/* Bottom Info */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div className="w-full md:w-64">
          <div className="font-mono text-xs text-brand-lime mb-2 tracking-widest uppercase animate-pulse">
            {">"} {bootText[textIndex]}
          </div>
          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/10 overflow-hidden">
            <div
              className="h-full bg-brand-lime transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="font-mono text-xs text-gray-500 uppercase tracking-widest hidden md:block">
          v3.0.0 // AWWWARDS EDITION {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default Loader;