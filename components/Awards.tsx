import React, { useEffect, useRef, useState } from 'react';

interface Award {
    id: string;
    title: string;
    category: string;
    year: string;
    color: string;
    image: string;
}

const awards: Award[] = [
    {
        id: '01',
        title: 'BEST UI DESIGN',
        category: 'CSSDA Public Vote',
        year: '2025',
        color: '#ccff00',
        image: '/awards/cssda-best-ui-white.png'
    },
    {
        id: '02',
        title: 'BEST UX DESIGN',
        category: 'CSSDA Public Vote',
        year: '2025',
        color: '#ccff00',
        image: '/awards/cssda-best-ux-white.png'
    },
    {
        id: '03',
        title: 'BEST INNOVATION',
        category: 'CSSDA Public Vote',
        year: '2025',
        color: '#ccff00',
        image: '/awards/cssda-best-inn-white.png'
    },
    {
        id: '04',
        title: 'SPECIAL KUDOS',
        category: 'CSSDA Judges Award',
        year: '2025',
        color: '#ffffff',
        image: '/awards/cssda-special-kudos-white.png'
    }
];

const Awards: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const cursorRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    // Smooth cursor follow effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                // Calculate relative position within the section
                setMousePos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-brand-dark py-32 overflow-hidden cursor-none"
        >
            <div className="container mx-auto px-6 relative z-10">

                {/* Header - Massive & Brutalist */}
                <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-3 h-3 bg-brand-lime rounded-full animate-pulse" />
                            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400">Hall of Fame</span>
                        </div>
                        <h2 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl text-white leading-[0.85] tracking-tighter">
                            AWARDS
                            <span className="block text-brand-lime opacity-50 text-4xl md:text-6xl lg:text-7xl mt-2 ml-2">
                                & RECOGNITION
                            </span>
                        </h2>
                    </div>

                    <a
                        href="https://www.cssdesignawards.com/sites/jaygood-agency/48808"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 border border-white/20 px-8 py-4 rounded-full hover:bg-white/5 transition-all duration-500"
                    >
                        <div className="flex flex-col items-end">
                            <span className="font-display font-bold text-white text-xl group-hover:text-brand-lime transition-colors">CSSDA</span>
                            <span className="font-mono text-xs text-gray-500 uppercase tracking-wider">View Profile</span>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-500">
                            <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </a>
                </div>

                {/* Interactive List */}
                <div className="flex flex-col">
                    {awards.map((award, index) => (
                        <div
                            key={award.id}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="group relative border-t border-white/10 hover:border-brand-lime/50 transition-colors duration-500"
                        >
                            <div className="flex flex-col md:flex-row items-baseline md:items-center justify-between py-12 md:py-16 px-4 md:px-8 transition-all duration-500 group-hover:bg-white/[0.02]">

                                {/* ID & Category */}
                                <div className="flex items-center gap-8 md:w-1/4 mb-4 md:mb-0">
                                    <span className="font-mono text-sm text-gray-600 group-hover:text-brand-lime transition-colors duration-300">
                                        /{award.id}
                                    </span>
                                    <span className="font-mono text-xs text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                                        {award.category}
                                    </span>
                                </div>

                                {/* Title with Text Stroke Effect */}
                                <div className="md:w-1/2 relative">
                                    <h3 className="font-display font-black text-4xl md:text-6xl lg:text-7xl uppercase tracking-tighter transition-all duration-500 bg-clip-text text-transparent bg-white group-hover:text-brand-lime group-hover:pl-4">
                                        {award.title}
                                    </h3>
                                    {/* Pseudo-element for stroke effect backup if needed, but standard text transition is cleaner here for legibility */}
                                </div>

                                {/* Award Stamp (Replaces Year) */}
                                <div className="md:w-1/4 flex justify-end">
                                    <div className="relative w-16 h-16 md:w-20 md:h-20 group-hover:scale-110 transition-transform duration-500 ease-out">
                                        <div className="absolute inset-0 bg-brand-lime/20 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                                        <img
                                            src={award.image}
                                            alt={award.title}
                                            className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="border-t border-white/10" />
                </div>

            </div>
        </section>
    );
};

export default Awards;
