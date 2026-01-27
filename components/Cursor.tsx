import React, { useEffect, useRef, useState } from 'react';

const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('VIEW');
  const [isPressed, setIsPressed] = useState(false);

  // Use refs for mutable values to persist across re-renders
  const pos = useRef({
    mouseX: 0,
    mouseY: 0,
    cursorX: 0,
    cursorY: 0,
    trailX: 0,
    trailY: 0
  });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      pos.current.mouseX = e.clientX;
      pos.current.mouseY = e.clientY;
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
  }, []); // Run events setup once

  // Separate animation loop
  useEffect(() => {
    let animFrame: number;

    const animate = () => {
      // Main cursor - faster response
      const easeMain = 0.25;
      pos.current.cursorX += (pos.current.mouseX - pos.current.cursorX) * easeMain;
      pos.current.cursorY += (pos.current.mouseY - pos.current.cursorY) * easeMain;

      // Trail cursor - slower/smoother follow
      const easeTrail = 0.12;
      pos.current.trailX += (pos.current.mouseX - pos.current.trailX) * easeTrail;
      pos.current.trailY += (pos.current.mouseY - pos.current.trailY) * easeTrail;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.cursorX}px, ${pos.current.cursorY}px, 0) scale(${isPressed ? 0.85 : 1})`;
      }

      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${pos.current.trailX}px, ${pos.current.trailY}px, 0)`;
      }

      animFrame = requestAnimationFrame(animate);
    };

    animFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, [isPressed]); // Re-run animation loop if pressed state changes (to update scale)

  if (!isVisible) return null;

  return (
    <>
      {/* Trail cursor (behind) */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] -ml-1 -mt-1 hidden md:block"
        aria-hidden="true"
      >
        <div className={`
              rounded-full transition-all duration-500 ease-out opacity-30
              ${isHovering ? 'w-20 h-20 -ml-8 -mt-8 bg-brand-lime' : 'w-3 h-3 bg-white'}
          `} />
      </div>

      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -ml-2 -mt-2 mix-blend-exclusion hidden md:block"
        aria-hidden="true"
      >
        {/* Dot */}
        <div className={`
              bg-white rounded-full transition-all duration-300 ease-out
              ${isHovering ? 'w-16 h-16 -ml-6 -mt-6 opacity-100' : 'w-4 h-4 opacity-100'}
          `} />

        {/* Text inside cursor when hovering */}
        <div className={`
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              text-black font-mono text-[10px] font-bold tracking-widest uppercase
              transition-all duration-300
              ${isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
          `}>
          {cursorText}
        </div>
      </div>
    </>
  );
};

export default Cursor;