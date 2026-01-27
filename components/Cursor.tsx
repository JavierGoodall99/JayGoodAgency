import React, { useEffect, useRef, useState } from 'react';

const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('VIEW');
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let trailX = 0;
    let trailY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
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

    const animate = () => {
      // Main cursor - faster response
      const easeMain = 0.25;
      cursorX += (mouseX - cursorX) * easeMain;
      cursorY += (mouseY - cursorY) * easeMain;

      // Trail cursor - slower/smoother follow
      const easeTrail = 0.12;
      trailX += (mouseX - trailX) * easeTrail;
      trailY += (mouseY - trailY) * easeTrail;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) scale(${isPressed ? 0.85 : 1})`;
      }

      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trailX}px, ${trailY}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);
    const animFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animFrame);
    };
  }, [isVisible, isPressed]);

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