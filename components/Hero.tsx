import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';

const Hero: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse position for gradient orb (with parallax offset)
    const mouseXOrb = useMotionValue(0.5);
    const mouseYOrb = useMotionValue(0.5);
    const orbX = useSpring(mouseXOrb, { damping: 30, stiffness: 80 });
    const orbY = useSpring(mouseYOrb, { damping: 30, stiffness: 80 });

    // Scroll-driven parallax fade-out using Framer Motion
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 800], [1, 0]);
    const y = useTransform(scrollY, [0, 800], [0, 300]);
    const blur = useTransform(scrollY, [0, 800], [0, 10]);

    // Spring physics for smooth parallax
    const smoothY = useSpring(y, { damping: 15, stiffness: 100 });
    const smoothBlur = useSpring(blur, { damping: 15, stiffness: 100 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let width = container.clientWidth;
        let height = container.clientHeight;

        // Configuration
        const STRING_COUNT = 20; // Increased string count for denser visual
        const SPACING = width / (STRING_COUNT + 1);
        const TENSION = 0.08;    // Slightly higher tension
        const DAMPING = 0.92;    // Less damping for longer sustain
        const MOUSE_INFLUENCE = 150; // Larger influence area

        // State
        const mouse = { x: -1000, y: -1000, vx: 0, vy: 0, prevX: 0, prevY: 0 };

        class HarmonicString {
            x: number;
            points: { x: number; y: number; vx: number; vy: number; baseX: number }[];
            color: string;
            active: number; // 0 to 1, for color interpolation

            constructor(x: number) {
                this.x = x;
                this.color = '#333333';
                this.active = 0;
                // Create control points along the string for smoother bending
                const segments = 12; // More segments for smoother curves
                this.points = [];
                for (let i = 0; i <= segments; i++) {
                    this.points.push({
                        x: x,
                        y: (height / segments) * i,
                        vx: 0,
                        vy: 0,
                        baseX: x
                    });
                }
            }

            update() {
                let stringMoved = false;

                this.points.forEach((p, i) => {
                    // skip top and bottom points (anchors)
                    if (i === 0 || i === this.points.length - 1) return;

                    // Physics: Hooke's Law + Damping
                    const dx = p.x - p.baseX;
                    const ax = -TENSION * dx;
                    p.vx += ax;
                    p.vx *= DAMPING;
                    p.x += p.vx;

                    // Mouse Interaction
                    const dy = Math.abs(mouse.y - p.y);

                    if (dy < MOUSE_INFLUENCE && Math.abs(mouse.x - p.x) < MOUSE_INFLUENCE) {
                        const dist = mouse.x - p.x;
                        const force = Math.max(0, (MOUSE_INFLUENCE - Math.abs(dist)) / MOUSE_INFLUENCE);

                        // Add mouse velocity influence for "strum" effect
                        if (Math.abs(mouse.vx) > 3) {
                            p.vx += mouse.vx * force * 0.05;
                            // Activate string based on impact
                            this.active = Math.min(this.active + Math.abs(mouse.vx) * 0.01, 1.0);
                        }
                    }

                    if (Math.abs(p.vx) > 0.01 || Math.abs(dx) > 0.1) {
                        stringMoved = true;
                    }
                });

                // Decay active color
                this.active *= 0.94;

                return stringMoved || this.active > 0.01;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath();

                // Draw smooth curve through points
                ctx.moveTo(this.points[0].x, this.points[0].y);

                for (let i = 0; i < this.points.length - 1; i++) {
                    const p0 = this.points[i];
                    const p1 = this.points[i + 1];
                    const midX = (p0.x + p1.x) / 2;
                    const midY = (p0.y + p1.y) / 2;

                    // Use quadratic curves for smooth string look
                    if (i === 0) {
                        ctx.lineTo(midX, midY);
                    } else {
                        ctx.quadraticCurveTo(p0.x, p0.y, midX, midY);
                    }
                }

                // Connect to last point
                const last = this.points[this.points.length - 1];
                ctx.lineTo(last.x, last.y);

                // Interpolate color: Grey to Brand Lime
                // Base: #1a1a1a, Active: #ccff00
                const r = Math.floor(26 + (204 - 26) * this.active);
                const g = Math.floor(26 + (255 - 26) * this.active);
                const b = Math.floor(26 + (0 - 26) * this.active);

                ctx.strokeStyle = `rgb(${r},${g},${b})`;
                // Dynamic line width based on activity
                ctx.lineWidth = 1 + (this.active * 3);

                // Add glow if active
                if (this.active > 0.1) {
                    ctx.shadowBlur = this.active * 15;
                    ctx.shadowColor = `rgba(204, 255, 0, ${this.active})`;
                } else {
                    ctx.shadowBlur = 0;
                }

                ctx.stroke();
                ctx.shadowBlur = 0; // Reset
            }
        }

        let strings: HarmonicString[] = [];

        const init = () => {
            width = container.clientWidth;
            height = container.clientHeight;
            canvas.width = width * window.devicePixelRatio;
            canvas.height = height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

            strings = [];
            const actualSpacing = width / (STRING_COUNT + 1);
            for (let i = 1; i <= STRING_COUNT; i++) {
                strings.push(new HarmonicString(i * actualSpacing));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Update mouse velocity
            mouse.vx = mouse.x - mouse.prevX;
            mouse.vy = mouse.y - mouse.prevY;
            mouse.prevX = mouse.x;
            mouse.prevY = mouse.y;

            strings.forEach(s => {
                s.update();
                s.draw(ctx);
            });

            animationId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        init();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    // Track mouse for gradient orb
    useEffect(() => {
        const handleOrbMove = (e: MouseEvent) => {
            mouseXOrb.set(e.clientX / window.innerWidth);
            mouseYOrb.set(e.clientY / window.innerHeight);
        };
        window.addEventListener('mousemove', handleOrbMove);
        return () => window.removeEventListener('mousemove', handleOrbMove);
    }, [mouseXOrb, mouseYOrb]);

    // Staggered Text Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 100, opacity: 0, rotateX: -40 },
        visible: {
            y: 0,
            opacity: 1,
            rotateX: 0,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
            },
        },
    };

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full bg-[#030303] overflow-hidden flex flex-col items-center justify-center p-0"
            aria-label="Hero section - Interactive guitar strings visualization"
        >

            {/* Background Typography (Behind Strings) — Parallax Fade-Out */}
            <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center z-0 select-none pointer-events-none"
                aria-hidden="true"
                style={{
                    opacity,
                    y: smoothY,
                    filter: useMotionTemplate`blur(${smoothBlur}px)`,
                }}
            >

                <div className="flex flex-col items-center justify-center mix-blend-screen opacity-100 z-0">
                    <motion.div
                        className="overflow-hidden perspective-text"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="font-display font-bold text-[10vw] leading-[0.85] tracking-tighter text-[#1a1a1a] whitespace-nowrap flex">
                            {"BUILDING THE".split('').map((char, index) => (
                                <motion.span key={index} variants={itemVariants} className="inline-block relative">
                                    {char === ' ' ? '\u00A0' : char}
                                </motion.span>
                            ))}
                        </h1>
                    </motion.div>

                    <motion.div
                        className="flex items-center gap-8 overflow-hidden perspective-text"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <span className="font-display font-bold text-[10vw] leading-[0.85] tracking-tighter text-white whitespace-nowrap flex">
                            {"MODERN WEB".split('').map((char, index) => (
                                <motion.span key={index} variants={itemVariants} className="inline-block relative">
                                    {char === ' ' ? '\u00A0' : char}
                                </motion.span>
                            ))}
                        </span>
                    </motion.div>
                </div>

                <motion.div
                    className="mt-12 max-w-xl text-center px-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    <p className="font-mono text-gray-500 text-sm uppercase tracking-widest leading-loose">
                        Engineering digital gravity.<br />
                        <span className="text-brand-lime">Strum the chords of the web.</span>
                    </p>
                </motion.div>

            </motion.div>

            {/* Animated Gradient Orb — follows mouse with parallax offset */}
            <motion.div
                className="absolute z-[5] pointer-events-none"
                style={{
                    left: useTransform(orbX, [0, 1], ['-10%', '70%']),
                    top: useTransform(orbY, [0, 1], ['0%', '60%']),
                    width: '40vmax',
                    height: '40vmax',
                }}
            >
                <div
                    className="w-full h-full rounded-full opacity-20"
                    style={{
                        background: 'radial-gradient(circle, rgba(204,255,0,0.4) 0%, rgba(204,255,0,0.1) 40%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                />
            </motion.div>

            {/* Floating Status Badges — glassmorphism */}
            <motion.div
                className="absolute top-24 right-8 md:top-32 md:right-16 z-20 flex flex-col gap-3 items-end"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                style={{ opacity }}
            >
                <motion.div
                    className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                >
                    <span className="font-mono text-[10px] text-brand-lime uppercase tracking-widest">● WEB DESIGN AGENCY</span>
                </motion.div>
                <motion.div
                    className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
                >
                    <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Cape Town, ZA</span>
                </motion.div>
            </motion.div>

            {/* Interactive Canvas Layer (The Strings) */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-10 w-full h-full cursor-none"
                data-cursor="drag"
                aria-label="Interactive guitar strings - move your mouse to play"
                role="img"
                style={{ opacity: 1 }}
            />

            {/* Bottom CTA */}
            <motion.div
                className="absolute bottom-12 z-20"
                style={{
                    opacity,
                    y: useTransform(scrollY, [0, 300], [0, 100])
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <a
                    href="#work"
                    className="pointer-events-auto group flex flex-col items-center gap-4 cursor-interactive"
                    aria-label="Scroll down to see my work"
                >
                    <motion.div
                        className="w-px h-16 bg-gradient-to-b from-transparent via-white/50 to-brand-lime"
                        whileHover={{ height: 100 }}
                        transition={{ duration: 0.3 }}
                    ></motion.div>
                    <motion.div
                        className="flex items-center gap-3"
                        whileHover={{ y: 5 }}
                    >
                        <span className="font-mono text-[10px] text-white uppercase tracking-widest group-hover:text-brand-lime transition-colors">Enter System</span>
                        <ArrowDown size={14} className="text-brand-lime animate-bounce" />
                    </motion.div>
                </a>
            </motion.div>

        </section>
    );
};

export default Hero;
