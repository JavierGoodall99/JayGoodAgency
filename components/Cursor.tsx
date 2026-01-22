import React, { useEffect, useRef, useState } from 'react';

const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isInteractive = target.closest('a, button, input, textarea, .cursor-interactive');
        setIsHovering(!!isInteractive);
    };

    const animate = () => {
      const ease = 0.2;
      
      cursorX += (mouseX - cursorX) * ease;
      cursorY += (mouseY - cursorY) * ease;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
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
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -ml-2 -mt-2 mix-blend-exclusion"
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
            transition-opacity duration-300
            ${isHovering ? 'opacity-100' : 'opacity-0'}
        `}>
            VIEW
        </div>
    </div>
  );
};

export default Cursor;