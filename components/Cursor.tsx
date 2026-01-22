import React, { useEffect, useState, useRef } from 'react';

const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    // Track mouse coordinates
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Use event delegation for performance instead of attaching listeners to every element
    const onMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isInteractive = target.closest('a, button, input, textarea, .cursor-interactive');
        setIsHovering(!!isInteractive);
    };

    const animate = () => {
      // Smooth easing (Lerp)
      const ease = 0.15;
      const dotEase = 0.25;
      
      cursorX += (mouseX - cursorX) * ease;
      cursorY += (mouseY - cursorY) * ease;
      
      dotX += (mouseX - dotX) * dotEase;
      dotY += (mouseY - dotY) * dotEase;

      if (cursorRef.current && dotRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    
    const animFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <div className="hidden md:block">
      {/* Large Fluid Circle */}
      <div 
        ref={cursorRef}
        className={`fixed top-0 left-0 w-12 h-12 rounded-full border border-white pointer-events-none z-[9999] -ml-6 -mt-6 transition-all duration-300 ease-out mix-blend-difference ${isHovering ? 'scale-[2] bg-white border-transparent opacity-10' : 'scale-100 opacity-50'}`}
      ></div>
      
      {/* Sharp Center Dot */}
      <div 
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-brand-lime pointer-events-none z-[9999] -ml-1 -mt-1 mix-blend-normal transition-all duration-200 ${isHovering ? 'scale-[0.5]' : 'scale-100'}`}
      ></div>
    </div>
  );
};

export default Cursor;