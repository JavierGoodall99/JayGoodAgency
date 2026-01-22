import React from 'react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: '01',
    title: 'Creative Development',
    description: 'We turn designs into functional reality. Award-winning animations, WebGL interactions, and immersive front-end experiences.',
    tags: ['WebGL', 'Three.js', 'GSAP']
  },
  {
    id: '02',
    title: 'Modern Architecture',
    description: 'Scalable, secure, and lightning-fast. We build using the latest frameworks to ensure your site performs under pressure.',
    tags: ['Next.js', 'React', 'Headless CMS']
  },
  {
    id: '03',
    title: 'E-Commerce Engineering',
    description: 'Custom storefronts that convert. From high-performance headless implementations to bespoke cart solutions, we handle the complex logic.',
    tags: ['Headless', 'Stripe', 'Custom Checkout']
  },
  {
    id: '04',
    title: 'Performance & SEO',
    description: 'Code optimized for search engines and speed. We target 100/100 Core Web Vitals for maximum visibility.',
    tags: ['Technical SEO', 'Optimization', 'Accessibility']
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 md:py-32 px-6 bg-brand-dark relative">
      <div className="container mx-auto">
        <div className="mb-12 md:mb-20">
          <h2 className="font-display font-semibold text-4xl md:text-7xl mb-6">DEV EXPERTISE</h2>
          <div className="h-1 w-20 bg-brand-lime"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16">
          {services.map((service) => (
            <div key={service.id} className="group border-t border-white/10 pt-8 hover:border-brand-lime/50 transition-colors duration-500">
              <div className="flex justify-between items-start mb-6">
                <span className="text-brand-lime font-mono text-sm tracking-widest">/{service.id}</span>
                <div className="flex flex-wrap gap-2 justify-end">
                    {service.tags.map(tag => (
                        <span key={tag} className="text-[10px] md:text-xs border border-white/10 px-2 py-1 rounded text-gray-400 group-hover:text-white transition-colors">{tag}</span>
                    ))}
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-medium mb-4 group-hover:text-brand-lime transition-colors">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed max-w-md group-hover:text-gray-200 transition-colors text-sm md:text-base">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;