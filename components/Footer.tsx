import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer id="contact" className="bg-brand-dark pt-20 md:pt-32 pb-12 px-6 border-t border-white/10 min-h-screen flex flex-col justify-between">
            <div className="container mx-auto flex-grow flex flex-col justify-center">

                <div className="mb-20">
                    <p className="text-brand-lime font-mono text-sm uppercase tracking-widest mb-8">
                        Ready to disrupt?
                    </p>

                    <a href="mailto:javiergoodall@outlook.com" className="group block relative cursor-interactive">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-12">
                    <div>
                        <h4 className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-4">Contact</h4>
                        <a href="mailto:javiergoodall@outlook.com" className="block text-xl text-white hover:text-brand-lime transition-colors">javiergoodall@outlook.com</a>
                        <p className="text-xl text-white mt-2">+27 67 143 5160</p>
                    </div>
                    <div>
                        <h4 className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-4">Location</h4>
                        <p className="text-xl text-white">
                            Cape Town, South Africa<br />
                            Digital Everywhere
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto mt-20 flex justify-between items-end">
                <div className="text-[12vw] md:text-[12rem] font-display font-bold text-white/5 leading-none -mb-[1rem] md:-mb-[4rem] pointer-events-none select-none">
                    JAYGOOD
                </div>
                <div className="text-gray-600 font-mono text-xs uppercase tracking-widest mb-4">
                    &copy; {new Date().getFullYear()}
                </div>
            </div>
        </footer>
    );
};

export default Footer;