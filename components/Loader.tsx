import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

// ── Character Scramble Helper ────────────────────────────────────
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const useScrambleText = (target: string, trigger: number) => {
  const [text, setText] = useState('');
  const frameRef = useRef<number>(0);

  useEffect(() => {
    let iteration = 0;
    const maxIterations = target.length * 3;

    const animate = () => {
      iteration++;
      const result = target
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (iteration / 3 > i) return char;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');

      setText(result);

      if (iteration < maxIterations) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, trigger]);

  return text;
};

// ── Main Loader ──────────────────────────────────────────────────
const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);
  const [phase, setPhase] = useState<'boot' | 'loading' | 'ready'>('boot');

  const rawProgress = useMotionValue(0);
  const springProgress = useSpring(rawProgress, { damping: 50, stiffness: 200, mass: 0.5 });

  // Phase-based status text
  const statusLabel =
    phase === 'boot' ? 'INITIALIZING' :
      phase === 'ready' ? 'READY' : 'LOADING';

  const scrambledStatus = useScrambleText(statusLabel, phase === 'boot' ? 0 : phase === 'loading' ? 1 : 2);

  // Subscribe to spring progress
  useEffect(() => {
    const unsub = springProgress.on('change', (v) => {
      const val = Math.round(v);
      setDisplayValue(val);
      if (val > 5 && phase === 'boot') setPhase('loading');
      if (val >= 100) setPhase('ready');
    });
    return () => unsub();
  }, [springProgress, phase]);

  // Drive the progress
  useEffect(() => {
    let frame: number;
    let current = 0;

    const tick = () => {
      if (current >= 100) {
        rawProgress.set(100);
        const t = setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 1000);
        }, 500);
        return () => clearTimeout(t);
      }

      const n = current / 100;
      let speed: number;
      if (n < 0.2) speed = 0.4 + Math.random() * 0.6;
      else if (n < 0.6) speed = 1.5 + Math.random() * 2.0;
      else if (n < 0.85) speed = 2.0 + Math.random() * 2.5;
      else speed = 0.3 + Math.random() * 0.5;

      current = Math.min(current + speed, 100);
      rawProgress.set(current);
      frame = requestAnimationFrame(tick);
    };

    const delay = setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, 400);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(delay);
    };
  }, [onComplete, rawProgress]);

  // Format digits
  const digits = String(displayValue).padStart(3, ' ');

  return (
    <motion.div
      className={`fixed inset-0 z-[100] flex flex-col transition-transform duration-[900ms]`}
      style={{
        background: '#050505',
        transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
        transform: isExiting ? 'translateY(-100%)' : 'translateY(0%)',
      }}
      role="progressbar"
      aria-valuenow={displayValue}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* ─── Subtle vignette ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* ─── Full-width top line ─── */}
      <motion.div
        className="absolute top-0 left-0 h-px"
        style={{
          width: `${displayValue}%`,
          background: '#ccff00',
          boxShadow: '0 0 20px rgba(204,255,0,0.3)',
          transition: 'width 0.15s ease-out',
        }}
      />

      {/* ─── Top Section ─── */}
      <motion.div
        className="relative z-10 flex justify-between items-start px-6 pt-6 md:px-10 md:pt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-[6px] h-[6px] rounded-full"
            style={{
              background: '#ccff00',
              boxShadow: '0 0 6px rgba(204,255,0,0.5)',
            }}
          />
          <span className="font-mono text-[10px] text-white/60 tracking-[0.3em] uppercase">
            JayGood
          </span>
        </div>

        <span className="font-mono text-[10px] text-white/30 tracking-[0.2em] uppercase hidden md:block">
          ©{new Date().getFullYear()}
        </span>
      </motion.div>

      {/* ─── Center: The Number ─── */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-6">
        <div className="relative">
          {/* Main number */}
          <div className="overflow-hidden">
            <motion.h1
              className="font-display font-bold leading-[0.85] select-none tabular-nums text-center"
              style={{
                fontSize: 'clamp(8rem, 28vw, 22rem)',
                color: '#ffffff',
                letterSpacing: '-0.04em',
              }}
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              {digits}
            </motion.h1>
          </div>

          {/* Accent line under the number */}
          <motion.div
            className="mx-auto mt-4 md:mt-6"
            style={{
              height: '1px',
              width: `${Math.max(displayValue, 2)}%`,
              background: 'linear-gradient(90deg, transparent, rgba(204,255,0,0.4), transparent)',
              transition: 'width 0.2s ease-out',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
        </div>
      </div>

      {/* ─── Bottom Section ─── */}
      <motion.div
        className="relative z-10 px-6 pb-6 md:px-10 md:pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <div className="flex justify-between items-end">
          {/* Left: Status */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <motion.span
                className="font-mono text-[10px] tracking-[0.3em] uppercase"
                style={{ color: 'rgba(204,255,0,0.6)' }}
                animate={{ opacity: displayValue < 100 ? [1, 0.3, 1] : 1 }}
                transition={{ duration: 1.2, repeat: displayValue < 100 ? Infinity : 0 }}
              >
                {scrambledStatus}
              </motion.span>
            </div>

            {/* Progress bar */}
            <div className="relative overflow-hidden" style={{ width: '160px', height: '1px' }}>
              <div className="absolute inset-0 bg-white/[0.06]" />
              <motion.div
                className="absolute inset-y-0 left-0"
                style={{
                  width: `${displayValue}%`,
                  background: '#ccff00',
                  transition: 'width 0.15s ease-out',
                }}
              />
            </div>
          </div>

          {/* Right: Meta */}
          <span className="font-mono text-[10px] text-white/20 tracking-[0.2em] uppercase hidden md:block">
            Digital Experience Agency
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Loader;