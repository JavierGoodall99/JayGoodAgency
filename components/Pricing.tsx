import React from 'react';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-20 md:py-32 px-6 bg-brand-dark border-t border-white/10">
      <div className="container mx-auto">
        
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end">
            <h2 className="font-display font-bold text-6xl md:text-8xl leading-none">
                ENGAGEMENT <br/> 
                <span className="text-brand-lime">MODELS</span>
            </h2>
            <p className="text-gray-400 max-w-sm text-right mt-8 md:mt-0">
                We partner with ambitious brands. Choose the velocity that suits your growth trajectory.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
            
            {/* Model 1: Project Based */}
            <div className="bg-brand-dark p-8 md:p-16 hover:bg-white/[0.02] transition-colors duration-500 group relative">
                <div className="absolute top-8 right-8 text-brand-lime font-mono text-xs uppercase tracking-widest border border-brand-lime px-3 py-1 rounded-full">
                    Most Common
                </div>
                
                <h3 className="font-display font-bold text-4xl text-white mb-2">SPRINT</h3>
                <p className="text-gray-500 font-mono text-sm uppercase tracking-widest mb-12">One-Time Project</p>

                <div className="text-5xl font-display font-bold text-white mb-12">
                    <span className="text-2xl align-top text-gray-500 font-normal mr-2">from</span>
                    $15k
                </div>

                <ul className="space-y-6 mb-16">
                    {['Brand Identity System', 'Custom 3D/WebGL Website', 'CMS Integration', 'SEO Foundation', '4-6 Week Turnaround'].map(item => (
                        <li key={item} className="flex items-center gap-4 text-gray-300">
                            <div className="w-1 h-1 bg-brand-lime rounded-full"></div>
                            {item}
                        </li>
                    ))}
                </ul>

                <button className="w-full py-6 border border-white/20 text-white font-mono text-sm uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-interactive">
                    Initiate Sprint
                </button>
            </div>

            {/* Model 2: Retainer */}
            <div className="bg-brand-dark p-8 md:p-16 hover:bg-white/[0.02] transition-colors duration-500 group relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-lime to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <h3 className="font-display font-bold text-4xl text-white mb-2">PARTNER</h3>
                <p className="text-gray-500 font-mono text-sm uppercase tracking-widest mb-12">Ongoing Evolution</p>

                <div className="text-5xl font-display font-bold text-white mb-12">
                    <span className="text-2xl align-top text-gray-500 font-normal mr-2">from</span>
                    $5k
                    <span className="text-xl text-gray-500 font-normal ml-2">/mo</span>
                </div>

                <ul className="space-y-6 mb-16">
                    {['Dedicated Design Team', 'Unlimited Request Queue', 'Priority Support', 'Quarterly Strategy Sessions', 'Cancel Anytime'].map(item => (
                        <li key={item} className="flex items-center gap-4 text-gray-300">
                            <div className="w-1 h-1 bg-white rounded-full"></div>
                            {item}
                        </li>
                    ))}
                </ul>

                <button className="w-full py-6 bg-brand-lime border border-brand-lime text-black font-mono text-sm uppercase tracking-widest hover:bg-transparent hover:text-white transition-all duration-300 cursor-interactive">
                    Become a Partner
                </button>
            </div>

        </div>

        <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm font-mono uppercase tracking-widest">
                Need a custom enterprise solution? <a href="mailto:enterprise@jaygood.agency" className="text-white border-b border-white/20 hover:border-brand-lime transition-colors cursor-interactive">Contact Sales</a>
            </p>
        </div>

      </div>
    </section>
  );
};

export default Pricing;