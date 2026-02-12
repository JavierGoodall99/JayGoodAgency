import React, { useEffect, useRef, useState, useCallback } from 'react';

interface TextScrambleProps {
    text: string;
    className?: string;
    trigger?: 'hover' | 'visible' | 'both';
    speed?: number;
    scrambleChars?: string;
}

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const TextScramble: React.FC<TextScrambleProps> = ({
    text,
    className = '',
    trigger = 'both',
    speed = 30,
    scrambleChars = CHARS,
}) => {
    const [displayText, setDisplayText] = useState(text);
    const [isRevealed, setIsRevealed] = useState(false);
    const elementRef = useRef<HTMLSpanElement>(null);
    const frameRef = useRef<number>(0);
    const iterationRef = useRef(0);

    const scramble = useCallback(() => {
        iterationRef.current = 0;
        const totalIterations = text.length * 2;

        const tick = () => {
            iterationRef.current++;
            const progress = iterationRef.current / totalIterations;

            const result = text
                .split('')
                .map((char, index) => {
                    if (char === ' ') return ' ';
                    // Characters before progress boundary are revealed
                    if (index < text.length * progress) return char;
                    // Characters after are scrambled
                    return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                })
                .join('');

            setDisplayText(result);

            if (iterationRef.current < totalIterations) {
                frameRef.current = window.setTimeout(tick, speed);
            } else {
                setDisplayText(text);
                setIsRevealed(true);
            }
        };

        tick();
    }, [text, speed, scrambleChars]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (frameRef.current) window.clearTimeout(frameRef.current);
        };
    }, []);

    // Trigger on visibility (IntersectionObserver)
    useEffect(() => {
        if (trigger !== 'visible' && trigger !== 'both') return;
        if (isRevealed) return; // Don't re-initialize if already revealed

        const element = elementRef.current;
        if (!element) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            setDisplayText(text);
            setIsRevealed(true);
            return;
        }

        // Start with scrambled
        setDisplayText(
            text
                .split('')
                .map((c) => (c === ' ' ? ' ' : scrambleChars[Math.floor(Math.random() * scrambleChars.length)]))
                .join('')
        );

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    scramble();
                    observer.unobserve(element);
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(element);
        return () => observer.unobserve(element);
    }, [trigger, scramble, text, scrambleChars]); // removed isRevealed from deps

    const handleMouseEnter = () => {
        if (trigger === 'hover' || trigger === 'both') {
            if (frameRef.current) window.clearTimeout(frameRef.current);
            iterationRef.current = 0;
            setIsRevealed(false);
            scramble();
        }
    };

    return (
        <span
            ref={elementRef}
            className={className}
            onMouseEnter={handleMouseEnter}
            style={{ fontVariantNumeric: 'tabular-nums' }}
        >
            {displayText}
        </span>
    );
};

export default TextScramble;
