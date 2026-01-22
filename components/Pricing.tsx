import React from 'react';
import { Sparkles, Zap, Smartphone, Globe, Shield, RefreshCw, PenTool, Layout } from 'lucide-react';

const features = [
  {
    title: "Custom Website Design",
    description: "We design and launch your custom website from scratch, with unlimited revisions.",
    icon: Layout
  },
  {
    title: "Domain & Hosting",
    description: "We handle domain registration and fast, secure hosting all included.",
    icon: Globe
  },
  {
    title: "Unlimited Edits & Updates",
    description: "Need to change text, photos, hours, or services? We make updates within 24 hours with no extra charges.",
    icon: RefreshCw
  },
  {
    title: "Mobile-Optimized Design",
    description: "Your site will look great and work smoothly on all devices.",
    icon: Smartphone
  },
  {
    title: "SEO & Performance Optimization",
    description: "We optimize your site for search engines and speed to maximize your online visibility.",
    icon: Zap
  },
  {
    title: "Ongoing Support & Maintenance",
    description: "We handle the tech stuff like backups, security, and performance so you don't have to.",
    icon: Shield
  },
  {
    title: "Lightning Fast Turnaround",
    description: "7-10 days guaranteed from concept to launch.",
    icon: Sparkles
  },
  {
    title: "Fully Done for You",
    description: "You just tell us your vision and we handle everything else.",
    icon: PenTool
  }
];

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-20 md:py-32 px-6 bg-brand-dark relative border-t border-white/5">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-20 text-center">
            <h2 className="font-display font-semibold text-4xl md:text-7xl mb-6">ONE SIMPLE PLAN</h2>
            <div className="h-1 w-20 bg-brand-lime mx-auto mb-8"></div>
            <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Stop worrying about hourly rates, plugin updates, or server crashes. We become your dedicated digital partner for a flat, transparent rate.
            </p>
        </div>

        <div className="relative border border-brand-lime bg-white/[0.02] p-6 md:p-16 overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-lime/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-12 mb-12 gap-8">
                <div className="text-center md:text-left">
                    <h3 className="font-display font-bold text-2xl md:text-4xl text-white mb-2">THE PARTNERSHIP</h3>
                    <p className="text-gray-400 text-sm md:text-base">Everything you need to dominate your market.</p>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                    <div className="text-center">
                         <span className="block text-xs md:text-sm text-gray-500 font-mono tracking-widest uppercase mb-1">Starting At</span>
                         <span className="text-4xl md:text-6xl font-display font-bold text-white">$1,000</span>
                    </div>
                    <div className="hidden md:block text-2xl text-brand-lime font-light">+</div>
                    <div className="text-center">
                        <span className="block text-xs md:text-sm text-gray-500 font-mono tracking-widest uppercase mb-1">Then Just</span>
                         <span className="text-4xl md:text-6xl font-display font-bold text-brand-lime">$100<span className="text-xl text-gray-400 ml-1">/mo</span></span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mb-16">
                {features.map((feature, idx) => (
                    <div key={idx} className="flex gap-5">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-lime/10 flex items-center justify-center text-brand-lime border border-brand-lime/20">
                            <feature.icon size={20} />
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-lg mb-2">{feature.title}</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center">
                <button className="w-full md:w-auto bg-brand-lime text-black font-display font-bold text-lg md:text-xl py-5 px-12 hover:scale-[1.02] transition-transform uppercase tracking-widest">
                    Start Your Build
                </button>
                <p className="mt-6 text-xs text-gray-500 font-mono uppercase tracking-widest">No long-term contracts. Cancel anytime.</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;