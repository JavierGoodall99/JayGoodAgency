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
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  // Handle URL synchronization
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.substring(1) || 'home';
      if (['home', 'about', 'services', 'contact', 'privacy', 'terms'].includes(path)) {
        setCurrentPage(path);
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Initial check
    const initialPath = window.location.pathname.substring(1) || 'home';
    if (['home', 'about', 'services', 'contact', 'privacy', 'terms'].includes(initialPath)) {
      if (initialPath !== 'home') {
        setCurrentPage(initialPath);
      }
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigation = useCallback((page: string) => {
    if (page === currentPage) return;
    setCurrentPage(page);
    window.scrollTo(0, 0);

    // Update URL
    const url = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({}, '', url);
  }, [currentPage]);

  // Page Variants for Entrance/Exit
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <Awards />
            <Work />
            <TiredOf />
            <Manifesto />
          </>
        );
      case 'about':
        return <About />;
      case 'services':
        return <ServicesPage />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'terms':
        return <Terms />;
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
          <AnimatePresence mode="wait">
            {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
          </AnimatePresence>

          <Navbar onNavigate={handleNavigation} currentPage={currentPage} />

          <main id="main-content" className="flex-grow relative" role="main" tabIndex={-1}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                variants={pageVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                className="w-full"
              >
                {renderPageContent()}
              </motion.div>
            </AnimatePresence>
          </main>

          <Footer onNavigate={handleNavigation} />
        </div>
      </>
    </HelmetProvider>
  );
};

export default App;