import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '../types';

const projects: ProjectItem[] = [
    {
        id: '01',
        title: 'CLOAKLY',
        category: 'APP / PRIVACY',
        image: '/projects/devices/cloakly.png',
        link: 'https://www.getcloakly.com/'
    },
    {
        id: '02',
        title: 'NEW GEN MARKETING',
        category: 'DIGITAL MARKETING',
        image: '/projects/devices/newgenmarketing.png',
        link: 'https://newgenmarketingzw.com/'
    },
    {
        id: '03',
        title: 'RETRO RISE',
        category: 'RETRO GAME / ARCADE',
        image: '/projects/devices/retrorise.png',
        link: 'https://fliply-dba75.web.app/'
    },
    {
        id: '04',
        title: 'BEDDING & GOWNS',
        category: 'ECOMMERCE / FASHION',
        image: '/projects/devices/beddingandgowns.png',
        link: 'https://bedding-and-gowns.vercel.app'
    },
    {
        id: '05',
        title: 'STUDIOS ELEVEN',
        category: 'AGENCY / CREATIVE',
        image: '/projects/studioseleven.png',
        link: 'https://studioeleven.vercel.app/'
    },
    {
        id: '06',
        title: 'ZENITH',
        category: 'ECOMMERCE / FASHION',
        image: '/projects/zenith.png',
        link: 'https://zenithboutique.vercel.app/'
    },
    {
        id: '07',
        title: 'RUIL MIJN WONING',
        category: 'REAL ESTATE / PLATFORM',
        image: '/projects/ruilmijnwoning.png',
        link: 'https://www.ruilmijnwoning.nl/'
    },
    {
        id: '08',
        title: 'VELORA',
        category: 'AI MARKETING / SAAS',
        image: '/projects/velora.png',
        link: 'https://messagemarketingai.vercel.app/'
    },
    {
        id: '09',
        title: 'JAVIER GOODALL',
        category: 'PORTFOLIO / PERSONAL',
        image: '/projects/javiergoodallportfolio.png',
        link: 'https://javiergoodall.vercel.app/'
    }
];

const ProjectCard: React.FC<{ project: ProjectItem; index: number }> = ({ project, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const yText = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
    const yImage = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    const isEven = index % 2 === 0;

    return (
        <div ref={ref} className="relative flex flex-col md:flex-row items-center gap-10 md:gap-24 py-16 md:py-32 border-t border-white/10 group">
            {/* Text Block */}
            <motion.div
                style={{ y: yText }}
                className={`w-full md:w-5/12 flex flex-col ${isEven ? 'md:order-1 items-start' : 'md:order-2 md:items-start'} z-10 relative`}
            >
                <div className="overflow-hidden mb-4">
                    <motion.span
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="block text-brand-lime font-mono text-sm"
                    >
                        /{project.id}
                    </motion.span>
                </div>

                <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-6 uppercase leading-[0.9] tracking-tighter group-hover:text-brand-lime transition-colors duration-700">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" data-cursor="project">
                        {project.title}
                    </a>
                </h2>

                <div className="overflow-hidden mb-10 md:mb-12">
                    <motion.p
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-mono text-xs md:text-sm text-gray-400 tracking-widest uppercase"
                    >
                        {project.category}
                    </motion.p>
                </div>

                <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 group/btn w-fit"
                    data-cursor="project"
                >
                    <span className="font-mono text-sm uppercase tracking-widest text-white group-hover/btn:text-brand-lime transition-colors duration-300">
                        View Project
                    </span>
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-brand-lime group-hover/btn:border-brand-lime transition-all duration-500 hover:scale-110">
                        <ArrowUpRight className="text-white group-hover/btn:text-black transition-colors w-5 h-5 md:w-6 md:h-6" />
                    </div>
                </motion.a>
            </motion.div>

            {/* Image Block */}
            <motion.div
                className={`w-full md:w-7/12 overflow-hidden bg-brand-dark border border-white/10 aspect-[4/3] md:aspect-[4/3] relative ${isEven ? 'md:order-2' : 'md:order-1'}`}
            >
                <div className="absolute inset-0 bg-brand-lime/0 group-hover:bg-brand-lime/10 transition-colors duration-700 z-10 pointer-events-none mix-blend-overlay" />
                <a href={project.link} target="_blank" rel="noopener noreferrer" data-cursor="project" className="block w-full h-full relative overflow-hidden">
                    <motion.img
                        style={{ y: yImage, scale: 1.15 }}
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover origin-center"
                        whileHover={{ scale: 1.25, rotate: isEven ? 1 : -1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    />
                </a>
            </motion.div>
        </div>
    );
};

const ProjectsPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-brand-dark min-h-screen text-white pt-32 md:pt-48 pb-20 px-6">
            <div className="container mx-auto max-w-7xl">
                {/* Hero section */}
                <div className="mb-24 md:mb-40">
                    <div className="overflow-hidden mb-4">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="font-display font-bold text-6xl md:text-8xl lg:text-[10rem] text-white uppercase leading-[0.85] tracking-tighter"
                        >
                            SELECTED
                        </motion.h1>
                    </div>
                    <div className="overflow-hidden mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-0">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="font-display font-bold text-6xl md:text-8xl lg:text-[10rem] text-brand-lime uppercase leading-[0.85] tracking-tighter"
                        >
                            WORKS
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className="md:pb-4 max-w-xs"
                        >
                            <p className="font-mono text-xs md:text-sm text-gray-400 uppercase tracking-widest leading-relaxed">
                                A curated collection of digital experiences designed and developed to elevate brands to the next level.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="flex flex-col">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;
