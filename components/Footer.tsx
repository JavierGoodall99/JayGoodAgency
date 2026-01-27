import React from 'react';
import { Twitter, Linkedin, Github, Dribbble, ArrowUpRight } from 'lucide-react';

const socialLinks = [
    { name: 'Twitter / X', icon: <Twitter size={20} />, href: 'https://twitter.com/javiergoodall' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, href: 'https://linkedin.com/in/javiergoodall' },
    { name: 'GitHub', icon: <Github size={20} />, href: 'https://github.com/JavierGoodall99' },
    { name: 'Dribbble', icon: <Dribbble size={20} />, href: 'https://dribbble.com/javiergoodall' },
];

const Footer: React.FC = () => {
    return (
        <footer id="contact" className="bg-brand-dark pt-20 md:pt-32 pb-12 px-6 border-t border-white/10 min-h-screen flex flex-col justify-between" role="contentinfo">
            <div className="container mx-auto flex-grow flex flex-col justify-center">

                <div className="mb-20">
                    <p className="text-brand-lime font-mono text-sm uppercase tracking-widest mb-8">
                        Ready to disrupt?
                    </p>

                    <a href="mailto:javiergoodall@outlook.com" className="group block relative cursor-interactive magnetic-hover" aria-label="Send email to JayGood">
                        <h2 className="font-display font-bold text-[13vw] md:text-[12vw] leading-[0.85] md:leading-[0.8] text-white group-hover:text-transparent group-hover:text-outline transition-all duration-500">
                            LET'S
                        </h2>
                        <h2 className="font-display font-bold text-[13vw] md:text-[12vw] leading-[0.85] md:leading-[0.8] text-white group-hover:text-brand-lime group-hover:italic transition-all duration-500 ml-[5vw] md:ml-[10vw]">
                            CREATE
                        </h2>
                        <h2 className="font-display font-bold text-[13vw] md:text-[12vw] leading-[0.85] md:leading-[0.8] text-transparent text-outline group-hover:text-white transition-all duration-500 text-right">
                            HISTORY
                        </h2>
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
                    <div>
                        <h4 className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-4">Contact</h4>
                        <a href="mailto:javiergoodall@outlook.com" className="block text-xl text-white hover:text-brand-lime transition-colors line-reveal">javiergoodall@outlook.com</a>
                        <a href="tel:+27671435160" className="block text-xl text-white hover:text-brand-lime transition-colors mt-2">+27 67 143 5160</a>
                    </div>
                    <div>
                        <h4 className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-4">Location</h4>
                        <p className="text-xl text-white">
                            Cape Town, South Africa<br />
                            Digital Everywhere
                        </p>
                    </div>
                    <div>
                        <h4 className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-4">Follow</h4>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Follow on ${social.name}`}
                                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-lime hover:border-brand-lime hover:text-black transition-all duration-300 hover:scale-110"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto mt-20 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="text-[12vw] md:text-[12rem] font-display font-bold text-white/5 leading-none -mb-[1rem] md:-mb-[4rem] pointer-events-none select-none" aria-hidden="true">
                    JAYGOOD
                </div>
                <div className="text-gray-600 font-mono text-xs uppercase tracking-widest mb-4 flex flex-col md:flex-row items-end gap-4">
                    <span>&copy; {new Date().getFullYear()} JayGood Agency</span>
                    <span className="hidden md:inline text-white/10">|</span>
                    <span className="text-gray-500">Crafted with obsession</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;