import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

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
  const [textIndex, setTextIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Spring-animated progress value
  const rawProgress = useMotionValue(0);
  const springProgress = useSpring(rawProgress, { damping: 30, stiffness: 100, mass: 0.8 });
  const displayProgress = useTransform(springProgress, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  // Subscribe to display value changes
  useEffect(() => {
    const unsubscribe = displayProgress.on('change', (v) => {
      setDisplayValue(v);

      // Update text based on progress
      const index = Math.min(Math.floor((v / 100) * bootText.length), bootText.length - 1);
      setTextIndex(index);
    });
    return () => unsubscribe();
  }, [displayProgress]);

  // Drive progress smoothly
  useEffect(() => {
    let frame: number;
    let current = 0;

    const tick = () => {
      if (current >= 100) {
        rawProgress.set(100);
        // Complete sequence
        const timeout = setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 1000);
        }, 500);
        return () => clearTimeout(timeout);
      }

      // Organic acceleration: slow start, ramp up, slow finish
      const normalizedProgress = current / 100;
      const speed = normalizedProgress < 0.3
        ? 0.8 + Math.random() * 1.2
        : normalizedProgress < 0.8
          ? 1.5 + Math.random() * 2.5
          : 0.5 + Math.random() * 0.8;

      current = Math.min(current + speed, 100);
      rawProgress.set(current);

      frame = requestAnimationFrame(tick);
    };

    // Small delay before starting for dramatic effect
    const startDelay = setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, 300);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(startDelay);
    };
  }, [onComplete, rawProgress]);

  return (
    <motion.div
      className={`fixed inset-0 z-[100] bg-[#050505] flex flex-col justify-between px-6 py-8 md:p-12 transition-transform duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${isExiting ? '-translate-y-full' : 'translate-y-0'
        }`}
    >
      {/* Animated grid background */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none"
        style={{
          maskImage: `radial-gradient(circle at 50% 50%, black ${displayValue}%, transparent ${displayValue + 20}%)`,
          WebkitMaskImage: `radial-gradient(circle at 50% 50%, black ${displayValue}%, transparent ${displayValue + 20}%)`,
        }}
      />

      {/* Horizontal sweep line */}
      <motion.div
        className="absolute left-0 h-px bg-brand-lime z-10"
        style={{
          top: `${100 - displayValue}%`,
          width: '100%',
          opacity: displayValue < 100 ? 0.6 : 0,
          boxShadow: '0 0 20px rgba(204, 255, 0, 0.4)',
        }}
      />

      {/* Top Bar */}
      <div className="flex justify-between items-start opacity-50 relative z-20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-brand-lime rounded-full animate-pulse"></div>
          <span className="font-mono text-xs text-brand-lime tracking-widest uppercase">JayGood.agency</span>
        </div>
        <div className="hidden md:block font-mono text-xs text-white uppercase tracking-widest text-right">
          <div>Mem: 64GB OK</div>
          <div>Gpu: DETECTED</div>
        </div>
      </div>

      {/* Center Percentage — Spring Animated */}
      <div className="relative z-20">
        <h1 className="font-display font-bold text-[20vw] md:text-[18rem] leading-none text-white mix-blend-difference select-none tabular-nums">
          {displayValue}%
        </h1>
        {/* Decorative Grid Line */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -z-10"></div>
      </div>

      {/* Bottom Info */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 relative z-20">
        <div className="w-full md:w-64">
          <div className="font-mono text-xs text-brand-lime mb-2 tracking-widest uppercase animate-pulse">
            {">"} {bootText[textIndex]}
          </div>
          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-brand-lime"
              style={{ width: springProgress.get() + '%' }}
            />
          </div>
        </div>

        <div className="font-mono text-xs text-gray-500 uppercase tracking-widest hidden md:block">
          v3.0.0 // AWWWARDS EDITION {new Date().getFullYear()}
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;