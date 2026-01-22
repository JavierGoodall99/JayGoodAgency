import React, { useState } from 'react';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { generateBrandConcept } from '../services/gemini';
import { BrandConcept } from '../types';

const BrandAlchemist: React.FC = () => {
  const [industry, setIndustry] = useState('');
  const [vibe, setVibe] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BrandConcept | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!industry || !vibe) return;

    setLoading(true);
    setResult(null);
    try {
      const concept = await generateBrandConcept(industry, vibe);
      setResult(concept);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="alchemist" className="py-20 md:py-32 px-6 bg-black relative border-y border-white/5">
      <div className="absolute top-0 right-0 p-32 opacity-20 pointer-events-none">
        <div className="w-64 h-64 rounded-full bg-brand-lime blur-[128px]"></div>
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-lime/30 bg-brand-lime/5 text-brand-lime text-xs font-bold tracking-widest uppercase mb-6">
            <Sparkles size={14} />
            <span>AI Powered</span>
          </div>
          <h2 className="font-display font-semibold text-5xl md:text-6xl mb-6">
            BRAND <span className="text-brand-lime">ALCHEMIST</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-lg">
            Not sure where to start? Let our Gemini-powered creative engine generate a unique brand essence, tagline, and visual direction for your next project.
          </p>

          <form onSubmit={handleGenerate} className="space-y-6 max-w-md">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Industry / Niche</label>
              <input 
                type="text" 
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Sustainable Coffee, Cyberpunk Fashion"
                className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-lime transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Desired Vibe</label>
              <input 
                type="text" 
                value={vibe}
                onChange={(e) => setVibe(e.target.value)}
                placeholder="e.g. Minimalist, Chaotic, Luxury"
                className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-lime transition-colors"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading || !industry || !vibe}
              className="w-full bg-white text-black font-display font-bold text-lg py-4 hover:bg-brand-lime hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> GENERATING...
                </>
              ) : (
                <>
                  IGNITE CONCEPTS <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="bg-brand-gray border border-white/10 p-8 min-h-[500px] flex flex-col relative overflow-hidden">
          {!result && !loading && (
             <div className="flex-1 flex flex-col items-center justify-center text-gray-600 text-center">
               <Sparkles className="w-12 h-12 mb-4 opacity-20" />
               <p className="font-mono text-sm">Waiting for input data...</p>
             </div>
          )}

          {loading && (
             <div className="flex-1 flex flex-col items-center justify-center text-brand-lime">
               <div className="w-16 h-16 border-4 border-brand-lime border-t-transparent rounded-full animate-spin mb-6"></div>
               <p className="font-mono text-sm animate-pulse">Synthesizing Creative Direction...</p>
             </div>
          )}

          {result && (
            <div className="animate-fade-in-up">
              <div className="mb-8">
                <span className="text-xs text-gray-500 uppercase tracking-widest block mb-2">Tagline</span>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
                  "{result.tagline}"
                </h3>
              </div>

              <div className="mb-8">
                <span className="text-xs text-gray-500 uppercase tracking-widest block mb-2">Manifesto</span>
                <p className="text-gray-300 font-serif italic text-lg leading-relaxed border-l-2 border-brand-lime pl-4">
                  {result.manifesto}
                </p>
              </div>

              <div className="mb-8">
                <span className="text-xs text-gray-500 uppercase tracking-widest block mb-2">Visual Direction</span>
                <p className="text-gray-400 text-sm">
                  {result.visualDirection}
                </p>
              </div>

              <div>
                <span className="text-xs text-gray-500 uppercase tracking-widest block mb-3">Palette</span>
                <div className="flex gap-4">
                  {result.colorPalette.map((color, idx) => (
                    <div key={idx} className="group relative">
                        <div 
                        className="w-12 h-12 rounded-full border border-white/10 shadow-lg"
                        style={{ backgroundColor: color }}
                        ></div>
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BrandAlchemist;