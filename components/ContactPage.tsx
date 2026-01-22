import React from 'react';
import { ArrowUpRight, Mail, Phone, Globe, MessageCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
    const contactMethods = [
        {
            id: '01',
            label: 'EMAIL',
            value: 'hello@jaygood.agency',
            href: 'mailto:hello@jaygood.agency',
            icon: <Mail className="w-8 h-8 md:w-12 md:h-12" />,
            subtext: 'For inquiries, pitches, and love letters.'
        },
        {
            id: '02',
            label: 'WHATSAPP',
            value: '+1 (555) 019-2834',
            href: 'https://wa.me/15550192834',
            icon: <MessageCircle className="w-8 h-8 md:w-12 md:h-12" />,
            subtext: 'Quick comms. Encrypted end-to-end.'
        },
        {
            id: '03',
            label: 'PHONE',
            value: '+1 (555) 019-2834',
            href: 'tel:+15550192834',
            icon: <Phone className="w-8 h-8 md:w-12 md:h-12" />,
            subtext: 'Emergency / Direct Line.'
        }
    ];

    return (
        <div className="bg-brand-dark min-h-screen text-white pt-32 pb-20 flex flex-col">
            
            <section className="px-6 mb-16 md:mb-24">
                <div className="container mx-auto">
                    <h1 className="font-display font-bold text-[12vw] leading-[0.8] tracking-tighter mix-blend-difference mb-8">
                        CONTACT <br/>
                        <span className="text-brand-lime ml-[10vw]">UPLINK</span>
                    </h1>
                    <p className="font-mono text-gray-500 text-sm md:text-base uppercase tracking-widest max-w-xl">
                        We don't do forms. We do direct connections. <br/>
                        Choose your frequency.
                    </p>
                </div>
            </section>

            <section className="px-6 flex-grow">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 gap-px bg-white/10 border-t border-white/10">
                        {contactMethods.map((method) => (
                            <a 
                                key={method.id}
                                href={method.href}
                                target={method.label === 'WHATSAPP' ? '_blank' : undefined}
                                rel={method.label === 'WHATSAPP' ? 'noopener noreferrer' : undefined}
                                className="group relative bg-brand-dark p-8 md:p-16 hover:bg-white/[0.02] transition-all duration-500 overflow-hidden cursor-interactive border-b border-white/10"
                            >
                                {/* Background Hover Reveal */}
                                <div className="absolute inset-0 bg-brand-lime/5 translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)]"></div>

                                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                    <div className="md:w-1/4">
                                        <div className="text-gray-500 group-hover:text-brand-lime transition-colors mb-4 md:mb-0">
                                            {method.icon}
                                        </div>
                                    </div>

                                    <div className="md:w-1/2">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="font-mono text-xs text-brand-lime">/{method.id}</span>
                                            <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">{method.label}</span>
                                        </div>
                                        <h3 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl group-hover:text-brand-lime transition-colors duration-300">
                                            {method.value}
                                        </h3>
                                        <p className="mt-4 text-gray-400 font-light opacity-60 group-hover:opacity-100 transition-opacity">
                                            {method.subtext}
                                        </p>
                                    </div>

                                    <div className="md:w-1/4 flex justify-end">
                                        <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-brand-lime group-hover:border-brand-lime group-hover:rotate-45 transition-all duration-500">
                                            <ArrowUpRight className="text-white group-hover:text-black transition-colors" size={24} />
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 mt-20">
                <div className="container mx-auto">
                    <div className="border border-white/10 p-8 md:p-12 bg-white/[0.01] flex flex-col md:flex-row items-center gap-8 md:gap-16">
                        <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
                            <div className="absolute inset-0 bg-brand-lime/20 rounded-full blur-xl animate-pulse"></div>
                            <Globe className="text-white relative z-10 animate-spin-slow" size={48} strokeWidth={1} />
                        </div>
                        
                        <div className="text-center md:text-left">
                            <h3 className="font-mono text-xs uppercase tracking-widest text-brand-lime mb-2">Physical Coordinates</h3>
                            <p className="font-display text-2xl md:text-3xl text-white mb-2">
                                1200 Digital Blvd, Suite 404 <span className="text-gray-500 mx-2">//</span> Los Angeles, CA
                            </p>
                            <p className="text-gray-500 font-mono text-sm">
                                34.0522° N, 118.2437° W
                            </p>
                        </div>

                        <div className="md:ml-auto">
                             <div className="px-4 py-2 border border-brand-lime/30 bg-brand-lime/10 rounded-full flex items-center gap-3">
                                 <div className="w-2 h-2 rounded-full bg-brand-lime animate-pulse"></div>
                                 <span className="font-mono text-xs text-brand-lime tracking-widest uppercase">Open Now</span>
                             </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ContactPage;