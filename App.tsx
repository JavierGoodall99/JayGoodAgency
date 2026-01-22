import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Services from './components/Services';
import Work from './components/Work';
import Footer from './components/Footer';
import TiredOf from './components/TiredOf';
import Loader from './components/Loader';
import Cursor from './components/Cursor';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Prevent scrolling while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [loading]);

  return (
    <div className="bg-brand-dark text-white font-sans selection:bg-brand-lime selection:text-black cursor-none">
      <Cursor />
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      <Navbar />
      <main>
        <Hero />
        <Work />
        <Services />
        <TiredOf />
        <Manifesto />
      </main>
      <Footer />
    </div>
  );
};

export default App;