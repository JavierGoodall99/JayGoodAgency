import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

const ScrollManager: React.FC = () => {
    const [lenis, setLenis] = useState<Lenis | null>(null);
    const scrollbarRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const [thumbHeight, setThumbHeight] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        });

        setLenis(lenisInstance);

        function raf(time: number) {
            lenisInstance.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenisInstance.destroy();
        };
    }, []);

    // Update Scrollbar Height and Position
    useEffect(() => {
        if (!lenis || !thumbRef.current || !scrollbarRef.current) return;

        const updateScrollbar = () => {
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;

            // Calculate thumb height ratio
            // Minimum height of 50px for usability
            const height = Math.max(
                (winHeight / docHeight) * winHeight,
                50
            );

            setThumbHeight(height);
        };

        const onScroll = ({ scroll, limit }: { scroll: number; limit: number }) => {
            if (!thumbRef.current) return;

            // Map scroll position to scrollbar position
            const progress = scroll / limit;
            const trackHeight = window.innerHeight;
            const availableTrack = trackHeight - thumbHeight;
            const thumbY = progress * availableTrack;

            thumbRef.current.style.transform = `translateY(${thumbY}px)`;
        };

        // Initial calc
        updateScrollbar();

        // Listeners
        window.addEventListener('resize', updateScrollbar);
        // Observe DOM changes to recalculate height
        const observer = new ResizeObserver(updateScrollbar);
        observer.observe(document.body);

        // Bind Lenis scroll
        lenis.on('scroll', onScroll);

        return () => {
            window.removeEventListener('resize', updateScrollbar);
            observer.disconnect();
            lenis.off('scroll', onScroll);
        };
    }, [lenis, thumbHeight]);

    // Drag Interactions
    useEffect(() => {
        if (!lenis || !thumbRef.current || !scrollbarRef.current) return;

        let startY = 0;
        let startScroll = 0;

        const onMouseDown = (e: MouseEvent) => {
            setIsDragging(true);
            startY = e.clientY;
            startScroll = lenis.scroll;
            document.body.style.userSelect = 'none'; // Prevent text selection
            document.body.style.cursor = 'grabbing';
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;

            const delta = e.clientY - startY;
            const trackHeight = window.innerHeight;
            const availableTrack = trackHeight - thumbHeight;

            // Convert pixel delta to scroll percentage
            const scrollRatio = delta / availableTrack;
            const scrollAmount = scrollRatio * lenis.limit;

            lenis.scrollTo(startScroll + scrollAmount, { immediate: true });
        };

        const onMouseUp = () => {
            setIsDragging(false);
            document.body.style.userSelect = 'unset';
            document.body.style.cursor = 'unset';
        };

        const thumb = thumbRef.current;
        thumb.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            thumb.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [lenis, isDragging, thumbHeight]);

    return (
        <div
            ref={scrollbarRef}
            className="fixed top-0 right-1 w-1.5 h-full z-[9999] mix-blend-difference pointer-events-none"
        >
            <div
                ref={thumbRef}
                className={`
            w-full bg-brand-lime rounded-full cursor-grab pointer-events-auto
            transition-opacity duration-300 active:cursor-grabbing
            ${isDragging ? 'opacity-100' : 'opacity-40 hover:opacity-100'}
        `}
                style={{ height: thumbHeight }}
            />
        </div>
    );
};

export default ScrollManager;
