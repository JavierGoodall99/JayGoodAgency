import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

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
        const STRING_COUNT = 15; // Number of strings
        const SPACING = width / (STRING_COUNT + 1);
        const TENSION = 0.05;    // Snap back speed
        const DAMPING = 0.90;    // Decay speed (lower = faster stop)
        const MOUSE_INFLUENCE = 100; // Radius of mouse influence

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
                const segments = 10;
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
                    // Calculate distance from mouse to this point line segment
                    const dy = Math.abs(mouse.y - p.y);

                    if (dy < MOUSE_INFLUENCE && Math.abs(mouse.x - p.x) < MOUSE_INFLUENCE) {
                        // Check if mouse crossed the string
                        // Simple distance based push for now
                        const dist = mouse.x - p.x;
                        const force = Math.max(0, (MOUSE_INFLUENCE - Math.abs(dist)) / MOUSE_INFLUENCE);

                        // Add mouse velocity influence for "strum" effect
                        if (Math.abs(mouse.vx) > 5) {
                            p.vx += mouse.vx * force * 0.1;
                            this.active = 1.0;
                        }
                    }

                    if (Math.abs(p.vx) > 0.01 || Math.abs(dx) > 0.1) {
                        stringMoved = true;
                    }
                });

                // Decay active color
                this.active *= 0.95;

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

                // Interpolate color: Grey to Lime
                // Simple approach: set strokeStyle based on active
                const r = Math.floor(20 + (204 - 20) * this.active);
                const g = Math.floor(20 + (255 - 20) * this.active);
                const b = Math.floor(20 + (0 - 20) * this.active);

                ctx.strokeStyle = `rgb(${r},${g},${b})`;
                ctx.lineWidth = 1 + (this.active * 1.5);
                ctx.stroke();
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

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full bg-[#030303] overflow-hidden flex flex-col items-center justify-center"
            aria-label="Hero section - Interactive guitar strings visualization"
        >

            {/* Background Typography (Behind Strings) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-0 select-none pointer-events-none" aria-hidden="true">

                <div className="flex flex-col items-center justify-center mix-blend-screen opacity-100">
                    <div className="overflow-hidden">
                        <h1 className="font-display font-bold text-[10vw] leading-[0.85] tracking-tighter text-[#1a1a1a] animate-fade-in-up whitespace-nowrap">
                            BUILDING THE
                        </h1>
                    </div>

                    <div className="flex items-center gap-8 overflow-hidden">
                        <span className="font-display font-bold text-[10vw] leading-[0.85] tracking-tighter text-white animate-fade-in-up stagger-1 blur-[0.5px] whitespace-nowrap">
                            MODERN WEB
                        </span>
                    </div>
                </div>

                <div className="mt-12 max-w-xl text-center px-6 animate-fade-in-up stagger-3">
                    <p className="font-mono text-gray-500 text-sm uppercase tracking-widest leading-loose">
                        Engineering digital gravity.<br />
                        <span className="text-brand-lime">Strum the chords of the web.</span>
                    </p>
                </div>

            </div>

            {/* Interactive Canvas Layer (The Strings) */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-10 w-full h-full cursor-none"
                data-cursor="drag"
                aria-label="Interactive guitar strings - move your mouse to play"
                role="img"
            />

            {/* Bottom CTA */}
            <div className="absolute bottom-12 z-20 animate-fade-in-up stagger-6 pointer-events-none">
                <a
                    href="#work"
                    className="pointer-events-auto group flex flex-col items-center gap-4 cursor-interactive magnetic-hover"
                    aria-label="Scroll down to see my work"
                >
                    <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/50 to-brand-lime group-hover:h-24 transition-all duration-500"></div>
                    <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-white uppercase tracking-widest group-hover:text-brand-lime transition-colors">Enter System</span>
                        <ArrowDown size={14} className="text-brand-lime animate-bounce" />
                    </div>
                </a>
            </div>

        </section>
    );
};

export default Hero;
