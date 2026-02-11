import React, { useState, useEffect, useCallback } from 'react';
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
import ScrollManager from './components/ScrollManager';
import Awards from './components/Awards';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';
import PrivacyPolicy from './components/PrivacyPolicy';
import Terms from './components/Terms';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayPage, setDisplayPage] = useState('home');

  // Prevent scrolling while loading
  useEffect(() => {
    if (loading || isTransitioning) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [loading, isTransitioning]);

  // Handle URL synchronization
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.substring(1) || 'home';
      if (['home', 'about', 'services', 'contact', 'privacy', 'terms'].includes(path)) {
        setDisplayPage(path);
        setCurrentPage(path);
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Initial check
    const initialPath = window.location.pathname.substring(1) || 'home';
    if (['home', 'about', 'services', 'contact', 'privacy', 'terms'].includes(initialPath)) {
      // Only set if not already default, though initial state is 'home'
      if (initialPath !== 'home') {
        setDisplayPage(initialPath);
        setCurrentPage(initialPath);
      }
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigation = useCallback((page: string) => {
    if (page === currentPage || isTransitioning) return;

    // Start transition
    setIsTransitioning(true);
    setCurrentPage(page);

    // Update URL
    const url = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({}, '', url);

    // After transition in, update content
    setTimeout(() => {
      setDisplayPage(page);
      window.scrollTo(0, 0);

      // After content swap, transition out
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 600);
  }, [currentPage, isTransitioning]);

  // Render page content based on displayPage (not currentPage) for smooth transitions
  const renderPageContent = () => {
    const pageClasses = `animate-fade-in-up`;

    switch (displayPage) {
      case 'home':
        return (
          <div className={pageClasses}>
            <Hero />
            <Awards />
            <Work />
            <TiredOf />
            <Manifesto />
          </div>
        );
      case 'about':
        return (
          <div className={pageClasses}>
            <About />
          </div>
        );
      case 'services':
        return (
          <div className={pageClasses}>
            <ServicesPage />
          </div>
        );
      case 'contact':
        return (
          <div className={pageClasses}>
            <ContactPage />
          </div>
        );
      case 'privacy':
        return (
          <div className={pageClasses}>
            <PrivacyPolicy />
          </div>
        );
      case 'terms':
        return (
          <div className={pageClasses}>
            <Terms />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <HelmetProvider>
      <>
        <SEO />
        <div className="bg-brand-dark text-white font-sans selection:bg-brand-lime selection:text-black cursor-none md:cursor-none min-h-screen flex flex-col">
          <Cursor />
          {!loading && <ScrollManager />}
          {loading && <Loader onComplete={() => setLoading(false)} />}

          {/* Page Transition Overlay */}
          <div
            className={`fixed inset-0 bg-brand-lime z-[90] pointer-events-none transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${isTransitioning ? 'translate-y-0' : '-translate-y-full'
              }`}
            aria-hidden="true"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display font-bold text-black text-4xl md:text-6xl tracking-tighter opacity-20">
                JAYGOOD
              </span>
            </div>
          </div>

          <Navbar onNavigate={handleNavigation} currentPage={currentPage} />

          <main id="main-content" className="flex-grow" role="main" tabIndex={-1}>
            {renderPageContent()}
          </main>

          <Footer onNavigate={handleNavigation} />
        </div>
      </>
    </HelmetProvider>
  );
};

export default App;