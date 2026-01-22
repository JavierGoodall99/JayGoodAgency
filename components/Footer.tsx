import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-black pt-20 md:pt-40 pb-12 px-6 border-t border-white/10">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center text-center mb-32">
          <h2 className="font-display font-bold text-6xl md:text-[10rem] leading-[0.85] tracking-tighter text-white mb-10 select-none">
            LET'S <br /> 
            <span className="text-outline text-outline-hover transition-all duration-500 hover:text-brand-lime">CREATE.</span>
          </h2>
          
          <div className="flex flex-col items-center gap-6">
            <a 
              href="mailto:hello@jaygood.agency" 
              className="text-2xl md:text-4xl font-light text-gray-400 hover:text-brand-lime transition-colors border-b border-gray-800 hover:border-brand-lime pb-2"
            >
              hello@jaygood.agency
            </a>
            <p className="text-sm md:text-base text-gray-600 uppercase tracking-widest font-mono">
              Available for select projects in 2024
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-gray-600 uppercase tracking-widest">
          <p className="mb-4 md:mb-0">&copy; 2024 JayGood Agency. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;