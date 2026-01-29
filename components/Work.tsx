import React, { useRef, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '../types';

const projects: ProjectItem[] = [
    {
        id: '01',
        title: 'CLOAKLY',
        category: 'APP / PRIVACY',
        image: '/projects/cloakly.png',
        link: 'https://www.getcloakly.com/'
    },
    {
        id: '02',
        title: 'NEW GEN MARKETING',
        category: 'DIGITAL MARKETING',
        image: '/projects/newgenmarketing.png',
        link: 'https://newgenmarketingzw.com/'
    },
    {
        id: '03',
        title: 'RETRO RISE',
        category: 'RETRO GAME / ARCADE',
        image: '/projects/retrorise.png',
        link: 'https://fliply-dba75.web.app/'

    },
    {
        id: '04',
        title: 'STUDIOS ELEVEN',
        category: 'AGENCY / CREATIVE',
        image: '/projects/studioseleven.png',
        link: 'https://studioeleven.vercel.app/'

    },
    {
        id: '05',
        title: 'ZENITH',
        category: 'ECOMMERCE / FASHION',
        image: '/projects/zenith.png',
        link: 'https://zenithboutique.vercel.app/'
    },
    {
        id: '06',
        title: 'RUIL MIJN WONING',
        category: 'REAL ESTATE / PLATFORM',
        image: '/projects/ruilmijnwoning.png',
        link: 'https://www.ruilmijnwoning.nl/'
    },
    {
        id: '07',
        title: 'VELORA',
        category: 'AI MARKETING / SAAS',
        image: '/projects/velora.png',
        link: 'https://messagemarketingai.vercel.app/'
    },
    {
        id: '08',
        title: 'JAVIER GOODALL',
        category: 'PORTFOLIO / PERSONAL',
        image: '/projects/javiergoodallportfolio.png',
        link: 'https://javiergoodall.vercel.app/'
    }
];

const Work: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            // Skip logic on mobile to avoid calculations for hidden elements
            if (window.innerWidth < 768) return;

            const element = sectionRef.current;
            const { top, height } = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Calculate scroll distance
            const scrollDist = height - viewportHeight;
            const scrollTop = -top;

            let progress = scrollTop / scrollDist;
            progress = Math.max(0, Math.min(1, progress));

            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div id="work" className="bg-brand-dark">

            {/* --- MOBILE LAYOUT (Vertical Stack) --- */}
            <div className="block md:hidden py-10 px-6">
                <div className="mb-12">
                    <h2 className="font-display font-bold text-5xl text-white leading-none mb-4">
                        LATEST <span className="text-brand-lime">WORK</span>
                    </h2>
                    <p className="font-mono text-sm uppercase tracking-widest text-gray-500">
                        Case Studies
                    </p>
                </div>

                <div className="flex flex-col gap-16">
                    {projects.map((project) => (
                        <a
                            key={project.id}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block"
                            data-cursor="project"
                        >
                            <div className="relative aspect-video overflow-hidden mb-6 border border-white/10">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
                                    <span className="font-mono text-[10px] text-white uppercase tracking-widest">{project.category}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-brand-lime font-mono text-xs mb-1 block">/{project.id}</span>
                                    <h3 className="font-display font-bold text-3xl text-white mb-2 min-h-[4rem] flex items-center">{project.title}</h3>
                                </div>
                                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                                    <ArrowUpRight size={18} className="text-white" />
                                </div>
                            </div>
                        </a>
                    ))}

                </div>
            </div>

            {/* --- DESKTOP LAYOUT (Horizontal Scroll) --- */}
            <section ref={sectionRef} className="hidden md:block relative h-[400vh]">
                <div className="sticky top-0 h-screen overflow-hidden flex flex-col z-30 bg-brand-dark">

                    {/* Static Header */}
                    <div className="container mx-auto px-6 pt-10 md:pt-20 flex justify-between items-end shrink-0 relative z-20">
                        <div>
                            <h2 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-white leading-none">
                                LATEST <span className="text-brand-lime">WORK</span>
                            </h2>
                        </div>
                        <div className="hidden md:block text-right">
                            <p className="font-mono text-sm uppercase tracking-widest text-gray-500 mb-2">
                                Projects
                            </p>
                            <div className="text-brand-lime font-mono text-xs">
                                ( Scroll )
                            </div>
                        </div>
                    </div>

                    {/* Horizontal Track */}
                    <div className="flex-grow flex items-center relative z-10 w-full">
                        <div
                            ref={trackRef}
                            className="flex gap-12 md:gap-24 pl-6 md:pl-32 items-center w-max will-change-transform"
                            style={{
                                transform: `translate3d(-${scrollProgress * 75}%, 0, 0)`,
                            }}
                        >
                            {projects.map((project, index) => (
                                <a
                                    key={project.id}
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative group w-[85vw] md:w-[60vw] lg:w-[50vw] flex-shrink-0 block"
                                    data-cursor="project"
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-video overflow-hidden mb-8 border border-white/10 bg-brand-dark">
                                        <div className="absolute inset-0 bg-brand-lime/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-700 ease-out"
                                        />

                                        {/* Floating Badge */}
                                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full z-20">
                                            <span className="font-mono text-xs text-white uppercase tracking-widest">{project.category}</span>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="flex justify-between items-end border-b border-white/20 pb-6 group-hover:border-brand-lime transition-colors duration-500 cursor-pointer">
                                        <div>
                                            <span className="block font-mono text-sm text-brand-lime mb-2">/{project.id}</span>
                                            <h3 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white group-hover:text-brand-lime transition-colors duration-300 min-h-[2.5em] md:min-h-[2em] flex items-end">
                                                {project.title}
                                            </h3>
                                        </div>
                                        <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-brand-lime group-hover:border-brand-lime transition-all duration-300">
                                            <ArrowUpRight className="text-white group-hover:text-black transition-colors" />
                                        </div>
                                    </div>
                                </a>
                            ))}


                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-[1px] bg-white/10 relative z-20 mt-auto">
                        <div
                            className="h-full bg-brand-lime"
                            style={{ width: `${scrollProgress * 100}%` }}
                        ></div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Work;