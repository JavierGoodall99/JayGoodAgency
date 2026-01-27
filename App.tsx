import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Work from './components/Work';
import Footer from './components/Footer';
import TiredOf from './components/TiredOf';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import About from './components/About';
import ServicesPage from './components/ServicesPage';
import ContactPage from './components/ContactPage';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  // Prevent scrolling while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [loading]);

  const handleNavigation = (page: string) => {
    if (page === currentPage) return;

    // Scroll to top
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  return (
    <div className="bg-brand-dark text-white font-sans selection:bg-brand-lime selection:text-black cursor-none min-h-screen flex flex-col">
      <Cursor />
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <Navbar onNavigate={handleNavigation} currentPage={currentPage} />

      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            <Hero />
            <Work />
            <TiredOf />
            <Manifesto />
          </>
        )}

        {currentPage === 'about' && (
          <About />
        )}

        {currentPage === 'services' && (
          <ServicesPage />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;