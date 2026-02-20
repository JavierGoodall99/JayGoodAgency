import React, { useState } from 'react';
import { Instagram, Linkedin, Github, Facebook, ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import MagneticButton from './MagneticButton';

const socialLinks = [
    { name: 'Instagram', icon: <Instagram size={20} />, href: 'https://www.instagram.com/javiergoodall/' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, href: 'https://linkedin.com/in/javiergoodall' },
    { name: 'GitHub', icon: <Github size={20} />, href: 'https://github.com/JavierGoodall99' },
    { name: 'Facebook', icon: <Facebook size={20} />, href: 'https://www.facebook.com/javier.goodall/' },
];

// Character-level wave animation for the CTA headline
const AnimatedWord: React.FC<{ word: string }> = ({ word }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <span
            className="inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {word.split('').map((char, i) => (
                <span
                    key={i}
                    className="inline-block transition-transform duration-500"
                    style={{
                        transform: isHovered
                            ? `translateY(${Math.sin(i * 0.8) * -12}px)`
                            : 'translateY(0)',
                        transitionDelay: `${i * 30}ms`,
                        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    );
};

interface FooterProps {
    onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    const { ref: ctaRef } = useScrollReveal({ threshold: 0.15 });
    const { ref: col1Ref } = useScrollReveal({ threshold: 0.2 });
    const { ref: col2Ref } = useScrollReveal({ threshold: 0.2 });
    const { ref: col3Ref } = useScrollReveal({ threshold: 0.2 });
    const { ref: bigTextRef } = useScrollReveal({ threshold: 0.1 });

    return (
        <footer id="contact" className="bg-brand-dark pt-20 md:pt-32 pb-12 px-6 border-t border-white/10 min-h-screen flex flex-col justify-between" role="contentinfo">
            <div className="container mx-auto flex-grow flex flex-col justify-center">

                <div className="mb-20">
                    <div ref={ctaRef} className="scroll-reveal">
                        <p className="text-brand-lime font-mono text-sm uppercase tracking-widest mb-8">
                            Ready to disrupt?
                        </p>
                    </div>

                    <a href="mailto:javiergoodall@outlook.com" className="group block relative cursor-interactive" aria-label="Send email to JayGood">
                        <div ref={ctaRef}>
                            <div className="overflow-hidden">
                                <h2 className="font-display font-bold text-[13vw] md:text-[12vw] leading-[0.85] md:leading-[0.8] text-white group-hover:text-transparent group-hover:text-outline transition-all duration-500">
                                    <AnimatedWord word="LET'S" />
                                </h2>
                            </div>
                            <div className="overflow-hidden">
                                <h2 className="font-display font-bold text-[13vw] md:text-[12vw] leading-[0.85] md:leading-[0.8] text-white group-hover:text-brand-lime group-hover:italic transition-all duration-500 ml-[5vw] md:ml-[10vw]">
                                    <AnimatedWord word="CREATE" />
                                </h2>
                            </div>
                            <div className="overflow-hidden">
                                <h2 className="font-display font-bold text-[13vw] md:text-[12vw] leading-[0.85] md:leading-[0.8] text-transparent text-outline group-hover:text-white transition-all duration-500 text-right">
                                    <AnimatedWord word="HISTORY" />
                                </h2>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
                    <div ref={col1Ref} className="scroll-reveal scroll-stagger-1">
                        <h4 className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-4">Contact</h4>
                        <a href="mailto:javiergoodall@outlook.com" className="block text-xl text-white hover:text-brand-lime transition-colors line-reveal">javiergoodall@outlook.com</a>
                        <a href="tel:+27671435160" className="block text-xl text-white hover:text-brand-lime transition-colors mt-2">+27 67 143 5160</a>
                    </div>
                    <div ref={col2Ref} className="scroll-reveal scroll-stagger-3">
                        <h4 className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-4">Location</h4>
                        <p className="text-xl text-white">
                            Cape Town, South Africa<br />
                            Digital Everywhere
                        </p>
                    </div>
                    <div ref={col3Ref} className="scroll-reveal scroll-stagger-5">
                        <h4 className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-4">Follow</h4>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <MagneticButton
                                    key={social.name}
                                    as="a"
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Follow on ${social.name}`}
                                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-lime hover:border-brand-lime hover:text-black transition-all duration-300 hover:scale-110"
                                    strength={0.5}
                                >
                                    {social.icon}
                                </MagneticButton>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto mt-20 flex flex-col md:flex-row justify-between items-end gap-8">
                <div
                    ref={bigTextRef}
                    className="text-[12vw] md:text-[12rem] font-display font-bold text-white/5 leading-none -mb-[1rem] md:-mb-[4rem] pointer-events-none select-none scroll-reveal-scale"
                    aria-hidden="true"
                >
                    JAYGOOD
                </div>
                <div className="text-gray-600 font-mono text-xs uppercase tracking-widest mb-4 flex flex-col md:flex-row items-end gap-4">
                    <span>&copy; {new Date().getFullYear()} JayGood Agency</span>
                    <span className="hidden md:inline text-white/10">|</span>
                    <button onClick={() => onNavigate('privacy')} className="hover:text-brand-lime transition-colors">Privacy Policy</button>
                    <span className="hidden md:inline text-white/10">|</span>
                    <button onClick={() => onNavigate('terms')} className="hover:text-brand-lime transition-colors">Terms of Service</button>
                    <span className="hidden md:inline text-white/10">|</span>
                    <span className="text-gray-500">Crafted with obsession</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;