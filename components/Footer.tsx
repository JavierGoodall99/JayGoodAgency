import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const socialLinks = [
    { name: 'INSTAGRAM', href: 'https://www.instagram.com/javiergoodall/' },
    { name: 'LINKEDIN', href: 'https://linkedin.com/in/javiergoodall' },
    { name: 'GITHUB', href: 'https://github.com/JavierGoodall99' },
    { name: 'FACEBOOK', href: 'https://www.facebook.com/javier.goodall/' },
];

interface FooterProps {
    onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [time, setTime] = useState<string>('');

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    // Slight parallax on the entire inner container
    const yContent = useTransform(scrollYProgress, [0, 1], ["-10%", "0%"]);

    // Live Time Clock for Cape Town
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat('en-GB', {
                timeZone: 'Africa/Johannesburg',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            setTime(formatter.format(now));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer
            id="contact"
            ref={containerRef}
            className="relative bg-brand-lime text-black overflow-hidden rounded-t-[2rem] md:rounded-t-[4rem] -mt-8 md:-mt-12 z-50 h-[100vh] min-h-[600px] flex flex-col"
            role="contentinfo"
        >
            <motion.div
                style={{ y: yContent }}
                className="container mx-auto px-6 lg:px-12 w-full max-w-[1400px] flex-1 flex flex-col justify-between pt-16 md:pt-24 pb-6 md:pb-8 h-full"
            >

                {/* ─── Top Row: Title & Contact ─── */}
                <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12">

                    {/* Left: Giant Animated Typography */}
                    <div className="w-full md:w-7/12">
                        <motion.h2
                            className="font-display font-bold text-[12vw] sm:text-[10vw] md:text-[7vw] lg:text-[7rem] leading-[0.85] tracking-tighter uppercase"
                        >
                            <span className="block overflow-hidden">
                                <motion.span
                                    className="block"
                                    initial={{ y: "100%" }}
                                    whileInView={{ y: "0%" }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    viewport={{ once: true, margin: "-100px" }}
                                >
                                    LET'S BUILD
                                </motion.span>
                            </span>
                            <span className="block overflow-hidden">
                                <motion.span
                                    className="block text-transparent"
                                    style={{ WebkitTextStroke: 'max(1px, 0.15vw) black' }}
                                    initial={{ y: "100%" }}
                                    whileInView={{ y: "0%" }}
                                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    viewport={{ once: true, margin: "-100px" }}
                                >
                                    SOMETHING
                                </motion.span>
                            </span>
                            <span className="block overflow-hidden text-right pr-4 md:pr-12">
                                <motion.span
                                    className="block"
                                    initial={{ y: "100%" }}
                                    whileInView={{ y: "0%" }}
                                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                    viewport={{ once: true, margin: "-100px" }}
                                >
                                    EPIC<span className="text-transparent" style={{ WebkitTextStroke: 'max(1px, 0.15vw) black' }}>.</span>
                                </motion.span>
                            </span>
                        </motion.h2>

                        {/* Staggered Email Link */}
                        <div className="mt-8 md:mt-12 pl-2 md:pl-4 hidden md:block">
                            <a
                                href="mailto: hello@jaygood.com"
                                className="group inline-flex items-center gap-6 font-display font-bold text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter hover:italic transition-all duration-500"
                            >
                                <span className="relative overflow-hidden block">
                                    <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">
                                        hello<br />@jaygood.com
                                    </span>
                                    <span className="absolute inset-0 block transition-transform duration-500 translate-y-full group-hover:translate-y-0">
                                        hello<br />@jaygood.com
                                    </span>
                                </span>
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-black transition-colors duration-500">
                                    <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-black group-hover:text-brand-lime transition-colors duration-500 group-hover:-rotate-45" />
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Right: Info Columns Grid */}
                    <div className="w-full md:w-5/12 grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-8 md:gap-y-8 mt-4 md:mt-0">

                        <div className="col-span-2 md:hidden mb-4">
                            <a
                                href="mailto: hello@jaygood.com"
                                className="inline-flex items-center gap-4 font-display font-bold text-2xl uppercase tracking-tighter"
                            >
                                hello@jaygood.com
                                <ArrowRight className="w-6 h-6 text-black -rotate-45" />
                            </a>
                        </div>

                        <div>
                            <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold mb-3 opacity-40">Local Time (CPT)</p>
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
                                <p className="font-mono text-base md:text-lg font-bold tracking-widest uppercase">
                                    {time}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold mb-3 opacity-40">Socials</p>
                            <ul className="flex flex-col gap-1.5">
                                {socialLinks.map((social) => (
                                    <li key={social.name}>
                                        <a
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group relative inline-block font-mono text-xs md:text-sm font-bold uppercase tracking-widest overflow-hidden"
                                        >
                                            <span className="relative z-10 transition-transform duration-300 block group-hover:-translate-y-full">
                                                {social.name}
                                            </span>
                                            <span className="absolute inset-0 z-10 transition-transform duration-300 translate-y-full block group-hover:translate-y-0 text-white" style={{ WebkitTextStroke: '1px black' }}>
                                                {social.name}
                                            </span>
                                            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold mb-3 opacity-40">Navigation</p>
                            <ul className="flex flex-col gap-1.5">
                                {['Home', 'About', 'Work', 'Services'].map((page) => (
                                    <li key={page}>
                                        <button
                                            onClick={() => onNavigate(page.toLowerCase())}
                                            className="group relative inline-block font-mono text-xs md:text-sm font-bold uppercase tracking-widest hover:italic transition-all"
                                        >
                                            <span className="relative z-10">{page}</span>
                                            <span className="absolute left-0 bottom-0.5 w-full h-[4px] bg-black/10 -z-0 group-hover:bg-black/30 transition-colors duration-300" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>

                {/* ─── Middle: Spacer forcing items to edges ─── */}
                <div className="flex-1" />

                {/* ─── Bottom Banner: Giant Logo & Copyright ─── */}
                <div className="w-full flex justify-center overflow-hidden mb-6 md:mb-8">
                    <h1 className="font-display font-bold text-[19vw] leading-[0.75] tracking-tighter uppercase text-center w-full">
                        JAYGOOD<span className="text-white" style={{ WebkitTextStroke: 'max(2px, 0.5vw) black' }}>.</span>
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] px-2 md:px-0">
                    <p className="opacity-60 text-center md:text-left">&copy; {new Date().getFullYear()} JAYGOOD. ALL RIGHTS RESERVED</p>
                    <div className="flex gap-6">
                        <button onClick={() => onNavigate('privacy')} className="hover:opacity-50 transition-opacity">PRIVACY</button>
                        <button onClick={() => onNavigate('terms')} className="hover:opacity-50 transition-opacity">TERMS</button>
                    </div>
                </div>

            </motion.div>
        </footer>
    );
};

export default Footer;