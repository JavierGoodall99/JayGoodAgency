import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    as?: 'button' | 'a';
    href?: string;
    target?: string;
    rel?: string;
    onClick?: (e: React.MouseEvent) => void;
    strength?: number;
    'aria-label'?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
    children,
    className = '',
    as = 'button',
    href,
    target,
    rel,
    onClick,
    strength = 0.35,
    ...props
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { damping: 15, stiffness: 150, mass: 0.1 });
    const springY = useSpring(y, { damping: 15, stiffness: 150, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;
        x.set(deltaX);
        y.set(deltaY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const Component = as === 'a' ? motion.a : motion.button;

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            className="relative inline-block"
            style={{ x: springX, y: springY }}
        >
            <Component
                href={href}
                target={target}
                rel={rel}
                onClick={onClick}
                className={className}
                whileTap={{ scale: 0.95 }}
                aria-label={props['aria-label']}
            >
                {children}
            </Component>
        </motion.div>
    );
};

export default MagneticButton;
