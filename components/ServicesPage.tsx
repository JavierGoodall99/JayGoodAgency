import React, { useState } from 'react';
import SEO from './SEO';
import { ArrowUpRight, CheckCircle2, Code, Layers, Palette, Zap } from 'lucide-react';

const services = [
    {
        id: '01',
        category: 'STRATEGY',
        icon: <Zap className="w-8 h-8" />,
        description: "We don't guess. We dissect your market, dismantle your competition, and rebuild your brand's purpose from the ground up.",
        items: ['Brand Audit & Positioning', 'Market Analysis', 'User Persona Development', 'Content Strategy', 'SEO Roadmap']
    },
    {
        id: '02',
        category: 'DESIGN',
        icon: <Palette className="w-8 h-8" />,
        description: "Aesthetics that arrest the eye. User experiences that feel inevitable. We design interfaces that are as functional as they are beautiful.",
        items: ['UI/UX Design', 'Visual Identity Systems', 'Motion Design', '3D & WebGL Assets', 'Design Systems']
    },
    {
        id: '03',
        category: 'DEVELOPMENT',
        icon: <Code className="w-8 h-8" />,
        description: "Clean code. Blazing speed. Bulletproof security. We build scalable architectures that power the next generation of the web.",
        items: ['Creative Frontend (React/Three.js)', 'Headless CMS Integration', 'E-commerce Solutions', 'Performance Optimization', 'API Development']
    },
    {
        id: '04',
        category: 'GROWTH',
        icon: <Layers className="w-8 h-8" />,
        description: "Launch is just the beginning. We provide the fuel to scale your digital presence and convert traffic into revenue.",
        items: ['Conversion Rate Optimization', 'Analytics & Reporting', 'A/B Testing', 'Technical Maintenance', 'Feature Iteration']
    }
];

const techStack = [
    "REACT", "TYPESCRIPT", "NEXT.JS", "WEBGL", "THREE.JS", "GSAP", "TAILWIND", "SUPABASE", "SHOPIFY", "SANITY"
];

const ServicesPage: React.FC = () => {
    const [activeService, setActiveService] = useState<number>(0);

    return (
        <div className="bg-brand-dark min-h-screen text-white pt-32 pb-20">
            <SEO
                title="Services"
                description="Our services include high-end web design, full-stack development, e-commerce solutions, and digital strategy. We build digital products that dominate."
                canonical="https://jaygood.com/services"
            />

            {/* HERO */}
            <section className="px-6 mb-20 md:mb-32">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-8 lg:mb-12 gap-8 lg:gap-0">
                        <h1 className="font-display font-bold text-[16vw] lg:text-[12vw] leading-[0.85] tracking-tighter mix-blend-difference">
                            DIGITAL <br className="hidden sm:block" />
                            <span className="text-brand-lime ml-0 sm:ml-[5vw]">ARSENAL</span>
                        </h1>
                        <div className="lg:text-right mb-4 border-l-2 lg:border-l-0 border-brand-lime pl-4 lg:pl-0">
                            <p className="font-mono text-[10px] lg:text-xs uppercase tracking-widest text-gray-400 lg:text-gray-500 mb-2">
                                // CAPABILITIES
                            </p>
                            <p className="max-w-xs text-gray-300 lg:text-gray-400 text-sm">
                                Comprehensive solutions for ambitious brands. From napkin sketch to global scale.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* INTERACTIVE SERVICE LIST */}
            <section className="px-6 mb-20 md:mb-32">
                <div className="container mx-auto flex flex-col lg:flex-row gap-16">

                    {/* Left: Navigation/List */}
                    <div className="w-full lg:w-1/2 flex flex-col">
                        {services.map((s, idx) => (
                            <div
                                key={s.id}
                                className={`
                                    border-t border-white/10 py-6 md:py-10 cursor-interactive group transition-all duration-500
                                    ${activeService === idx ? 'opacity-100' : 'opacity-40 hover:opacity-100'}
                                `}
                                onMouseEnter={() => setActiveService(idx)}
                                onClick={() => setActiveService(idx)}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-4 md:gap-6">
                                        <span className="font-mono text-sm md:text-base text-brand-lime">/{s.id}</span>
                                        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl">{s.category}</h2>
                                    </div>
                                    <ArrowUpRight className={`transition-transform duration-300 ${activeService === idx ? 'rotate-45 text-brand-lime' : 'text-white'}`} />
                                </div>
                                <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeService === idx ? 'max-h-[800px] opacity-100 mt-4 md:mt-0' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-sm md:max-w-md pl-0 md:pl-12">
                                        {s.description}
                                    </p>

                                    {/* Mobile Detail View embedded in accordion */}
                                    <div className="lg:hidden pl-0 md:pl-12 mt-6 mb-4">
                                        <div className="bg-white/[0.03] border border-white/10 p-5 md:p-6">
                                            <h3 className="font-mono text-xs md:text-sm uppercase tracking-widest text-brand-lime mb-4">Included in {s.category}</h3>
                                            <ul className="space-y-3">
                                                {s.items.map((item, i) => (
                                                    <li key={i} className="flex items-center gap-3 text-sm sm:text-base font-light">
                                                        <CheckCircle2 size={16} className="text-gray-500 flex-shrink-0" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="border-t border-white/10"></div>
                    </div>

                    {/* Right: Details/Preview */}
                    <div className="lg:w-1/2 relative min-h-[50vh] hidden lg:block">
                        {services.map((s, idx) => (
                            <div
                                key={s.id}
                                className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeService === idx ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95 pointer-events-none'}`}
                            >
                                <div className="bg-white/[0.03] border border-white/10 p-8 md:p-12 h-full flex flex-col justify-between backdrop-blur-sm">
                                    <div className="text-brand-lime mb-8">
                                        {s.icon}
                                    </div>

                                    <div>
                                        <h3 className="font-mono text-sm uppercase tracking-widest text-gray-500 mb-6">Deliverables</h3>
                                        <ul className="space-y-4">
                                            {s.items.map((item, i) => (
                                                <li key={i} className="flex items-center gap-3 text-xl md:text-2xl font-light">
                                                    <CheckCircle2 size={18} className="text-brand-lime flex-shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-12 pt-8 border-t border-white/10">
                                        <button className="text-white hover:text-brand-lime transition-colors font-mono text-sm uppercase tracking-widest flex items-center gap-2">
                                            View Related Case Studies <ArrowUpRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* TECH STACK MARQUEE */}
            <section className="py-12 md:py-20 border-y border-white/10 bg-brand-lime text-black overflow-hidden mb-20 md:mb-32">
                <div className="container mx-auto px-6 mb-6 md:mb-8">
                    <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest border-b border-black/20 pb-1">Our Toolbelt</span>
                </div>
                <div className="flex gap-8 md:gap-12 animate-marquee whitespace-nowrap items-center">
                    {[...techStack, ...techStack, ...techStack].map((tech, i) => (
                        <div key={i} className="flex items-center gap-8 md:gap-12">
                            <span className="font-display font-bold text-4xl md:text-6xl lg:text-8xl opacity-80">{tech}</span>
                            <div className="w-2 h-2 md:w-4 md:h-4 bg-black rounded-full"></div>
                        </div>
                    ))}
                </div>
            </section>

            {/* PROCESS */}
            <section className="px-6 mb-20 md:mb-32">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                        <div className="lg:w-1/3">
                            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl mb-4 lg:mb-6">HOW WE<br className="hidden lg:block" />WORK</h2>
                            <p className="text-gray-400 text-base md:text-lg max-w-md lg:max-w-none">
                                Chaos to clarity. Our process is a refined loop of exploration, definition, and execution.
                            </p>
                        </div>
                        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                            {[
                                { step: '01', title: 'DISCOVERY', text: 'Immersion workshops, stakeholder interviews, and data analysis to find the "why".' },
                                { step: '02', title: 'DEFINITION', text: 'Establishing the visual direction, technical architecture, and content strategy.' },
                                { step: '03', title: 'CREATION', text: 'Iterative design and development sprints. Frequent demos. Radical transparency.' },
                                { step: '04', title: 'DEPLOYMENT', text: 'QA testing, performance tuning, and the go-live sequence. We ensure a smooth lift-off.' }
                            ].map((p, i) => (
                                <div key={i} className="border border-white/10 p-6 md:p-8 hover:bg-white/[0.02] transition-colors group">
                                    <span className="block font-mono text-brand-lime text-sm md:text-xl mb-3 md:mb-4">/{p.step}</span>
                                    <h3 className="font-display font-bold text-xl md:text-2xl mb-3 md:mb-4 group-hover:translate-x-2 transition-transform">{p.title}</h3>
                                    <p className="text-gray-400 font-light text-sm md:text-base">{p.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ServicesPage;