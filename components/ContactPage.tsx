import React from 'react';
import { ArrowUpRight, Mail, Phone, Globe, MessageCircle } from 'lucide-react';
import SEO from './SEO';
import BusinessCard from './BusinessCard';

const ContactPage: React.FC = () => {
    const contactMethods = [
        {
            id: '01',
            label: 'EMAIL',
            value: ' hello@jaygood.com',
            href: 'mailto: hello@jaygood.com',
            icon: <Mail className="w-8 h-8 md:w-12 md:h-12" />,
            subtext: 'For inquiries, pitches, and love letters.'
        },
        {
            id: '02',
            label: 'WHATSAPP',
            value: '+27 84 2909 844',
            href: 'https://wa.me/27671435160',
            icon: <MessageCircle className="w-8 h-8 md:w-12 md:h-12" />,
            subtext: 'Quick comms. Encrypted end-to-end.'
        },
        {
            id: '03',
            label: 'PHONE',
            value: '+27 67 143 5160',
            href: 'tel:+27671435160',
            icon: <Phone className="w-8 h-8 md:w-12 md:h-12" />,
            subtext: 'Emergency / Direct Line.'
        }
    ];

    return (
        <div className="bg-brand-dark min-h-screen text-white pt-32 pb-20 flex flex-col">
            <SEO
                title="Contact | Web Design Agency | JayGood"
                description="Ready to disrupt? Contact JayGood, the premier Web Design Agency, for your next web work. Direct lines only, no forms."
                canonical="https://jaygood.com/contact"
            />

            <section className="px-6 mb-16 md:mb-24">
                <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                    <div className="w-full lg:w-1/2">
                        <h1 className="font-display font-bold text-[12vw] lg:text-[8vw] leading-[0.8] tracking-tighter mix-blend-difference mb-8">
                            CONTACT <br />
                            <span className="text-brand-lime ml-[5vw] lg:ml-0">UPLINK</span>
                        </h1>
                        <p className="font-mono text-gray-500 text-sm md:text-base uppercase tracking-widest max-w-xl">
                            We don't do forms. We do direct connections. <br />
                            Choose your frequency.
                        </p>
                    </div>

                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end perspective-1000">
                        <BusinessCard />
                    </div>
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

        </div>
    );
};

export default ContactPage;