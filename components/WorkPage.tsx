import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { WorkItem } from '../types';
import SEO from './SEO';

const work: WorkItem[] = [
    {
        id: '01',
        title: 'CLOAKLY',
        category: 'APP / PRIVACY',
        image: '/work/devices/cloakly.png',
        link: 'https://www.getcloakly.com/'
    },
    {
        id: '02',
        title: 'NEW GEN MARKETING',
        category: 'DIGITAL MARKETING',
        image: '/work/devices/newgenmarketing.png',
        link: 'https://newgenmarketingzw.com/'
    },
    {
        id: '03',
        title: 'RETRO RISE',
        category: 'RETRO GAME / ARCADE',
        image: '/work/devices/retrorise.png',
        link: 'https://fliply-dba75.web.app/'
    },
    {
        id: '04',
        title: 'BEDDING & GOWNS',
        category: 'ECOMMERCE / FASHION',
        image: '/work/devices/beddingandgowns.png',
        link: 'https://bedding-and-gowns.vercel.app'
    },
    {
        id: '05',
        title: 'STUDIOS ELEVEN',
        category: 'AGENCY / CREATIVE',
        image: '/work/studioseleven.png',
        link: 'https://studioeleven.vercel.app/'
    },
    {
        id: '06',
        title: 'ZENITH',
        category: 'ECOMMERCE / FASHION',
        image: '/work/zenith.png',
        link: 'https://zenithboutique.vercel.app/'
    },
    {
        id: '07',
        title: 'RUIL MIJN WONING',
        category: 'REAL ESTATE / PLATFORM',
        image: '/work/ruilmijnwoning.png',
        link: 'https://www.ruilmijnwoning.nl/'
    },
    {
        id: '08',
        title: 'VELORA',
        category: 'AI MARKETING / SAAS',
        image: '/work/velora.png',
        link: 'https://messagemarketingai.vercel.app/'
    },
    {
        id: '09',
        title: 'JAVIER GOODALL',
        category: 'PORTFOLIO / PERSONAL',
        image: '/work/javiergoodallportfolio.png',
        link: 'https://javiergoodall.vercel.app/'
    }
];

type ViewMode = 'carousel' | 'two-col' | 'three-col';

/* ─── Layout Toggle Icons ─── */
const CarouselIcon = () => (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="0" width="14" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="0" y="3" width="2" height="10" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <rect x="18" y="3" width="2" height="10" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
);

const TwoColIcon = () => (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="9" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="0" width="9" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);

const ThreeColIcon = () => (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="6" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="8" y="0" width="6" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="16" y="0" width="6" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);

/* ─── Work Card (Grid View) ─── */
const GridCard: React.FC<{ work: WorkItem; index: number; viewMode: ViewMode }> = ({ work, index, viewMode }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: index * 0.03, ease: [0.16, 1, 0.3, 1], layout: { type: 'spring', stiffness: 300, damping: 30 } }}
            className="group relative"
        >
            <a
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="work"
                className="block"
            >
                {/* Image Container */}
                <div className="relative overflow-hidden bg-[#111] border border-white/5 aspect-[3/2]">
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-brand-lime/0 group-hover:bg-brand-lime/10 transition-colors duration-700 z-10 pointer-events-none mix-blend-overlay" />

                    <motion.img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    />

                    {/* Arrow reveal on hover */}
                    <div className="absolute top-4 right-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-lime flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500">
                        <ArrowUpRight className="text-black w-5 h-5" />
                    </div>

                    {/* Category badge */}
                    <div className="absolute bottom-4 left-4 z-20">
                        <span className="font-mono text-[10px] md:text-xs text-white/60 uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
                            {work.category}
                        </span>
                    </div>
                </div>

                {/* Info */}
                <div className="pt-3 pb-2 flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                            <span className="font-mono text-[10px] text-brand-lime">/{work.id}</span>
                        </div>
                        <h3 className={`font-display font-bold text-white uppercase tracking-tight leading-tight group-hover:text-brand-lime transition-colors duration-500 ${viewMode === 'three-col' ? 'text-sm md:text-base' : 'text-base md:text-lg lg:text-xl'}`}>
                            {work.title}
                        </h3>
                    </div>
                </div>
            </a>
        </motion.div>
    );
};

/* ─── Carousel View ─── */
const CarouselView: React.FC<{ work: WorkItem[] }> = ({ work: items }) => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);

    const paginate = useCallback((newDirection: number) => {
        setDirection(newDirection);
        setCurrent((prev) => {
            let next = prev + newDirection;
            if (next < 0) next = items.length - 1;
            if (next >= items.length) next = 0;
            return next;
        });
    }, [items.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') paginate(-1);
            if (e.key === 'ArrowRight') paginate(1);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [paginate]);

    const work = items[current];

    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.95,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        },
        exit: (dir: number) => ({
            x: dir > 0 ? '-50%' : '50%',
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
        }),
    };

    return (
        <div className="relative">
            {/* Main Slide */}
            <div className="relative overflow-hidden bg-[#0a0a0a] border border-white/5 h-[50vh] md:h-[60vh]">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.a
                        key={current}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="work"
                        className="absolute inset-0 block group"
                    >
                        {/* Image */}
                        <img
                            src={work.image}
                            alt={work.title}
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                        {/* Hover tint */}
                        <div className="absolute inset-0 bg-brand-lime/0 group-hover:bg-brand-lime/5 transition-colors duration-700 z-10 pointer-events-none" />

                        {/* Arrow */}
                        <div className="absolute top-6 right-6 md:top-8 md:right-8 w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center z-20 group-hover:bg-brand-lime group-hover:border-brand-lime transition-all duration-500">
                            <ArrowUpRight className="text-white group-hover:text-black transition-colors w-6 h-6" />
                        </div>

                        {/* Bottom info */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20">
                            <div className="flex items-end justify-between gap-8">
                                <div>
                                    <span className="font-mono text-xs text-brand-lime mb-3 block tracking-widest">/{work.id}</span>
                                    <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-7xl text-white uppercase tracking-tighter leading-[0.9] group-hover:text-brand-lime transition-colors duration-500">
                                        {work.title}
                                    </h2>
                                    <p className="font-mono text-xs md:text-sm text-white/50 mt-3 uppercase tracking-widest">
                                        {work.category}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.a>
                </AnimatePresence>
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between mt-6 md:mt-8">
                {/* Counter */}
                <div className="font-mono text-sm text-gray-400 tracking-widest">
                    <span className="text-white text-lg font-display font-bold">{String(current + 1).padStart(2, '0')}</span>
                    <span className="mx-2 text-white/20">/</span>
                    <span>{String(items.length).padStart(2, '0')}</span>
                </div>

                {/* Progress dots */}
                <div className="hidden md:flex items-center gap-2">
                    {items.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setDirection(idx > current ? 1 : -1);
                                setCurrent(idx);
                            }}
                            className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${idx === current ? 'w-8 bg-brand-lime' : 'w-3 bg-white/20 hover:bg-white/40'
                                }`}
                            aria-label={`Go to work ${idx + 1}`}
                        />
                    ))}
                </div>

                {/* Arrow nav */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => paginate(-1)}
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-lime hover:border-brand-lime hover:text-black transition-all duration-300 text-white cursor-pointer group"
                        aria-label="Previous work"
                    >
                        <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                        onClick={() => paginate(1)}
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-lime hover:border-brand-lime hover:text-black transition-all duration-300 text-white cursor-pointer group"
                        aria-label="Next work"
                    >
                        <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Thumbnail strip */}
            <div className="mt-6 md:mt-8 flex overflow-x-auto snap-x md:grid md:grid-cols-6 lg:grid-cols-9 gap-2 pb-4 md:pb-0 scrollbar-hide">
                {items.map((item, idx) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            setDirection(idx > current ? 1 : -1);
                            setCurrent(idx);
                        }}
                        className={`relative w-24 md:w-auto flex-shrink-0 snap-start aspect-[4/3] overflow-hidden border transition-all duration-500 cursor-pointer ${idx === current
                            ? 'border-brand-lime ring-1 ring-brand-lime/30'
                            : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/30'
                            }`}
                        aria-label={`View ${item.title}`}
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                        />
                        {idx === current && (
                            <motion.div
                                layoutId="thumb-indicator"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-lime"
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};


/* ─── Main Page ─── */
const WorkPage: React.FC = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('carousel');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const viewModes: { mode: ViewMode; icon: React.ReactNode; label: string }[] = [
        { mode: 'carousel', icon: <CarouselIcon />, label: 'Carousel' },
        { mode: 'two-col', icon: <TwoColIcon />, label: '2 Columns' },
        { mode: 'three-col', icon: <ThreeColIcon />, label: '3 Columns' },
    ];

    return (
        <div className="bg-brand-dark min-h-screen text-white pt-32 md:pt-48 pb-20 px-6">
            <SEO
                title="Work | Web Design Agency | JayGood"
                description="View the portfolio of JayGood, a top Web Design Agency creating award-winning websites and web experiences."
                canonical="https://jaygood.com/work"
            />
            <div className="container mx-auto max-w-7xl">

                {/* ── Header Row ── */}
                <div className="mb-16 md:mb-24">
                    {/* Title */}
                    <div className="mb-10 md:mb-16">
                        <div className="overflow-hidden mb-2">
                            <motion.h1
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="font-display font-bold text-5xl md:text-7xl lg:text-[8rem] text-white uppercase leading-[0.85] tracking-tighter"
                            >
                                OUR
                            </motion.h1>
                        </div>
                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="font-display font-bold text-5xl md:text-7xl lg:text-[8rem] text-brand-lime uppercase leading-[0.85] tracking-tighter"
                            >
                                CRAFT
                            </motion.h1>
                        </div>
                    </div>

                    {/* Toolbar row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center justify-between border-t border-b border-white/10 py-4"
                    >
                        {/* Left: Work count */}
                        <div className="flex items-center gap-6">
                            <p className="font-mono text-xs md:text-sm text-gray-400 uppercase tracking-widest">
                                {work.length} work
                            </p>
                        </div>

                        {/* Right: View toggles */}
                        <div className="flex items-center gap-1">
                            {viewModes.map(({ mode, icon, label }) => (
                                <button
                                    key={mode}
                                    onClick={() => setViewMode(mode)}
                                    className={`p-2.5 md:p-3 transition-all duration-300 cursor-pointer relative ${mode === 'three-col' ? 'hidden md:block' : ''
                                        } ${viewMode === mode
                                            ? 'text-brand-lime'
                                            : 'text-gray-500 hover:text-white'
                                        }`}
                                    aria-label={`Switch to ${label} view`}
                                    title={label}
                                >
                                    {icon}
                                    {viewMode === mode && (
                                        <motion.div
                                            layoutId="view-indicator"
                                            className="absolute -bottom-1 inset-x-0 mx-auto w-5 h-0.5 bg-brand-lime rounded-full"
                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </button>
                            ))}

                            {/* Divider */}
                            <div className="w-px h-5 bg-white/10 mx-2" />

                            {/* Carousel left/right arrows (visible only in non-carousel modes for aesthetic balance) */}
                            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest hidden md:block">
                                {viewMode === 'carousel' ? 'Use ← → keys' : `${viewMode === 'two-col' ? '2' : '3'} per row`}
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* ── Content Area ── */}
                <LayoutGroup>
                    <AnimatePresence mode="wait">
                        {viewMode === 'carousel' ? (
                            <motion.div
                                key="carousel"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <CarouselView work={work} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`grid gap-5 md:gap-6 transition-all duration-500 ${viewMode === 'two-col'
                                    ? 'grid-cols-1 md:grid-cols-2'
                                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                                    }`}
                            >
                                {work.map((work, index) => (
                                    <GridCard key={work.id} work={work} index={index} viewMode={viewMode} />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </LayoutGroup>
            </div>
        </div>
    );
};

export default WorkPage;
