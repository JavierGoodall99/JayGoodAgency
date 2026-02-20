import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const Cursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('VIEW');
  const [isPressed, setIsPressed] = useState(false);
  const [isSticking, setIsSticking] = useState(false);
  const velocityRef = useRef({ x: 0, y: 0 });
  const prevPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  // Motion values for raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for main cursor (responsive)
  const cursorX = useSpring(mouseX, { damping: 25, stiffness: 300, mass: 0.5 });
  const cursorY = useSpring(mouseY, { damping: 25, stiffness: 300, mass: 0.5 });

  // Lazy spring physics for trail (fluid)
  const trailX = useSpring(mouseX, { damping: 40, stiffness: 200, mass: 1 });
  const trailY = useSpring(mouseY, { damping: 40, stiffness: 200, mass: 1 });

  // Velocity-based trail scale
  const [trailScale, setTrailScale] = useState(1);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const stickTarget = target.closest('[data-cursor-stick]');

      if (stickTarget) {
        // Stick effect: snap cursor to element center
        const rect = stickTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(centerX);
        mouseY.set(centerY);
        setIsSticking(true);
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        setIsSticking(false);
      }

      if (!isVisible) setIsVisible(true);

      // Track velocity for trail stretch
      velocityRef.current = {
        x: e.clientX - prevPos.current.x,
        y: e.clientY - prevPos.current.y,
      };
      prevPos.current = { x: e.clientX, y: e.clientY };
    };

    // Velocity decay loop
    const decayLoop = () => {
      const speed = Math.sqrt(
        velocityRef.current.x ** 2 + velocityRef.current.y ** 2
      );
      const scale = 1 + Math.min(speed * 0.015, 1.5);
      setTrailScale((prev) => prev * 0.9 + scale * 0.1);
      velocityRef.current.x *= 0.92;
      velocityRef.current.y *= 0.92;
      rafRef.current = requestAnimationFrame(decayLoop);
    };
    rafRef.current = requestAnimationFrame(decayLoop);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, textarea, .cursor-interactive');
      const isProject = target.closest('[data-cursor="project"]');
      const isDrag = target.closest('[data-cursor="drag"]');
      const isEmail = target.closest('[href^="mailto:"]');

      setIsHovering(!!isInteractive);

      if (isProject) {
        setCursorText('VIEW');
      } else if (isDrag) {
        setCursorText('DRAG');
      } else if (isEmail) {
        setCursorText('SEND');
      } else {
        setCursorText('VIEW');
      }
    };

    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  // Calculate trail rotation from velocity
  const angle = Math.atan2(velocityRef.current.y, velocityRef.current.x) * (180 / Math.PI);

  return (
    <>
      {/* Trail cursor (behind) — stretches with velocity */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div
          className={`rounded-full transition-all duration-500 ease-out ${isHovering ? 'w-20 h-20 bg-brand-lime opacity-20' : 'w-4 h-4 bg-white opacity-20'
            }`}
          style={{
            transform: !isHovering
              ? `scaleX(${trailScale}) rotate(${angle}deg)`
              : undefined,
            transition: 'width 0.5s, height 0.5s, opacity 0.5s, background-color 0.5s',
          }}
        />
      </motion.div>

      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-exclusion hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isPressed ? 0.8 : isSticking ? 1.3 : 1,
        }}
      >
        {/* Dot */}
        <motion.div
          className="bg-white rounded-full flex items-center justify-center"
          animate={{
            width: isHovering ? 64 : isSticking ? 48 : 16,
            height: isHovering ? 64 : isSticking ? 48 : 16,
            opacity: 1,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Text inside cursor when hovering */}
          <AnimatePresence>
            {isHovering && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-black font-mono text-[10px] font-bold tracking-widest uppercase"
              >
                {cursorText}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Cursor;