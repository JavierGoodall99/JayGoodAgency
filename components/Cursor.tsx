import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const Cursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('VIEW');
  const [isPressed, setIsPressed] = useState(false);

  // Motion values for raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for main cursor (responsive)
  const cursorX = useSpring(mouseX, { damping: 25, stiffness: 300, mass: 0.5 });
  const cursorY = useSpring(mouseY, { damping: 25, stiffness: 300, mass: 0.5 });

  // Lazy spring physics for trail (fluid)
  const trailX = useSpring(mouseX, { damping: 40, stiffness: 200, mass: 1 });
  const trailY = useSpring(mouseY, { damping: 40, stiffness: 200, mass: 1 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

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
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Trail cursor (behind) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] -ml-1 -mt-1 hidden md:block"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <div className={`
              rounded-full transition-all duration-500 ease-out opacity-30
              ${isHovering ? 'w-20 h-20 bg-brand-lime' : 'w-3 h-3 bg-white'}
          `} />
      </motion.div>

      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] -ml-2 -mt-2 mix-blend-exclusion hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isPressed ? 0.8 : 1
        }}
      >
        {/* Dot */}
        <motion.div
          className="bg-white rounded-full flex items-center justify-center"
          animate={{
            width: isHovering ? 64 : 16,
            height: isHovering ? 64 : 16,
            opacity: 1
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
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