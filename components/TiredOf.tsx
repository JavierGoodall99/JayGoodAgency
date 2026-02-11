import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const values = [
    { title: "RADICAL TRANSPARENCY", desc: "No hidden fees. No hourly billing. Just clear, flat pricing and direct access to your design team." },
    { title: "OBSESSIVE QUALITY", desc: "We aim for 100/100 Lighthouse scores and 60fps animations on every single build." },
    { title: "SPEED AS A FEATURE", desc: "We build on the edge. Your site loads instantly, anywhere in the world." }
];

const ValueItem: React.FC<{ item: typeof values[0]; index: number }> = ({ item, index }) => {
    const { ref } = useScrollReveal({ threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    return (
        <div
            ref={ref}
            className={`scroll-reveal scroll-stagger-${Math.min(index + 2, 6)}`}
        >
            <div className="group cursor-interactive border-b border-black/10 pb-12 hover:pl-8 transition-all duration-500">
                <h3 className="font-display font-bold text-4xl md:text-5xl lg:text-7xl mb-4 group-hover:italic transition-all">
                    {item.title}
                </h3>
                <p className="text-lg md:text-xl opacity-60 max-w-xl">
                    {item.desc}
                </p>
            </div>
        </div>
    );
};

const TiredOf: React.FC = () => {
    const { ref: introRef } = useScrollReveal({ threshold: 0.2 });

    return (
        <section className="py-20 md:py-32 bg-brand-lime text-black relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-white mix-blend-soft-light filter blur-[100px] opacity-50 rounded-full translate-x-1/2 -translate-y-1/2"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-16 md:gap-32">

                    <div className="md:w-1/3">
                        <div ref={introRef} className="scroll-reveal-left">
                            <span className="block font-mono text-sm uppercase tracking-widest mb-4 border-b border-black/20 pb-4">
                                // The Standard
                            </span>
                            <p className="font-display text-2xl leading-relaxed">
                                We reject the "good enough" culture of modern web development. We don't use templates. We don't cut corners.
                            </p>
                        </div>
                    </div>

                    <div className="md:w-2/3 flex flex-col gap-12 md:gap-16">
                        {values.map((item, idx) => (
                            <ValueItem key={idx} item={item} index={idx} />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default TiredOf;