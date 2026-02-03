import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface Award {
    id: string;
    title: string;
    category: string;
    project: string;
    image: string;
}

const awards: Award[] = [
    {
        id: '01',
        title: 'BEST UI DESIGN',
        category: 'CSS Design Awards',
        project: 'JayGood Agency',
        image: '/awards/cssda-best-ui-white.png'
    },
    {
        id: '02',
        title: 'BEST UX DESIGN',
        category: 'CSS Design Awards',
        project: 'JayGood Agency',
        image: '/awards/cssda-best-ux-white.png'
    },
    {
        id: '03',
        title: 'BEST INNOVATION',
        category: 'CSS Design Awards',
        project: 'JayGood Agency',
        image: '/awards/cssda-best-inn-white.png'
    },
    {
        id: '04',
        title: 'SPECIAL KUDOS',
        category: 'CSS Design Awards',
        project: 'JayGood Agency',
        image: '/awards/cssda-special-kudos-white.png'
    }
];

const Awards: React.FC = () => {
    return (
        <section
            className="relative bg-brand-dark text-white py-32 md:py-48 overflow-hidden cursor-none"
        >
            {/* Background Marquee */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full opacity-[0.03] pointer-events-none select-none overflow-hidden">
                <div className="whitespace-nowrap animate-marquee-slow font-display font-black text-[15vw] leading-none">
                    HALL OF FAME — RECOGNITION — EXCELLENCE — HALL OF FAME — RECOGNITION — EXCELLENCE —
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-24 pb-8 border-b border-white/10">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-2 h-2 bg-brand-lime rounded-full animate-pulse" />
                            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500">
                                Curated Recognition
                            </span>
                        </div>
                        <h2 className="font-display font-bold text-6xl md:text-8xl tracking-tighter leading-none">
                            AWARDS
                            <span className="text-brand-lime">.</span>
                        </h2>
                    </div>
                    <div className="mt-8 md:mt-0 text-right">
                        <p className="font-mono text-xs md:text-sm text-gray-400 max-w-xs uppercase tracking-wider leading-relaxed">
                            International recognition for design excellence and engineering precision.
                        </p>
                    </div>
                </div>

                {/* Awards List */}
                <div className="flex flex-col">
                    {awards.map((award, index) => (
                        <div
                            key={award.id}
                            className="group relative border-b border-white/10 py-12 transition-all duration-300 hover:border-brand-lime/50"
                        >
                            <div className="flex flex-col md:flex-row items-baseline md:items-center justify-between gap-6 md:gap-0 relative z-20">

                                {/* Left: Year & Category */}
                                <div className="md:w-1/4 flex gap-4 md:gap-8 items-center">
                                    <span className="font-mono text-sm text-brand-lime">
                                        /{award.id}
                                    </span>
                                    <span className="font-mono text-xs text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                                        {award.category}
                                    </span>
                                </div>

                                {/* Center: Title */}
                                <div className="md:w-2/4">
                                    <h3 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight transition-all duration-300 group-hover:text-brand-lime group-hover:translate-x-4">
                                        {award.title}
                                    </h3>
                                </div>

                                {/* Right: Award Badge */}
                                <div className="md:w-1/4 flex justify-end">
                                    <img
                                        src={award.image}
                                        alt={award.title}
                                        className="w-20 h-20 md:w-28 md:h-28 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>



                {/* Link to all awards */}
                <div className="mt-24 flex justify-center">
                    <a
                        href="https://www.cssdesignawards.com/sites/jaygood-agency/48808"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative px-8 py-4 overflow-hidden border border-white/20 rounded-full hover:border-brand-lime transition-colors duration-300"
                    >
                        <div className="absolute inset-0 bg-brand-lime translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        <div className="relative z-10 flex items-center gap-2">
                            <span className="font-mono text-xs uppercase tracking-widest group-hover:text-black transition-colors duration-300">
                                View All Recognition
                            </span>
                            <ArrowUpRight className="w-4 h-4 group-hover:text-black transition-colors duration-300" />
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Awards;
