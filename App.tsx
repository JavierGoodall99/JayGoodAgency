import React, { useState, useEffect, useCallback, useRef } from 'react';
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

// Cinematic page transition curtain variants
const curtainVariants = {
  initial: { scaleY: 0 },
  enter: {
    scaleY: [0, 1, 1, 0],
    transition: {
      duration: 1.2,
      ease: [0.76, 0, 0.24, 1],
      times: [0, 0.4, 0.6, 1],
    },
  },
};

const contentVariants = {
  initial: { opacity: 0, y: 80 },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.6,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.3,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pendingPageRef = useRef<string | null>(null);

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
    if (page === currentPage || isTransitioning) return;

    // Start the curtain transition
    setIsTransitioning(true);
    pendingPageRef.current = page;

    // Update URL immediately
    const url = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({}, '', url);

    // Swap content while curtain is covering the screen (at 40% of animation)
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }, 480); // 1200ms * 0.4 = 480ms

    // End transition after full animation
    setTimeout(() => {
      setIsTransitioning(false);
      pendingPageRef.current = null;
    }, 1200);
  }, [currentPage, isTransitioning]);

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

          {/* Cinematic Page Transition Curtain */}
          <AnimatePresence>
            {isTransitioning && (
              <motion.div
                key="curtain"
                className="fixed inset-0 z-[90] bg-brand-lime origin-top pointer-events-none"
                variants={curtainVariants}
                initial="initial"
                animate="enter"
                exit="initial"
              >
                {/* Centered page name during transition */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="font-display font-bold text-5xl md:text-8xl text-black uppercase tracking-tighter"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.15, duration: 0.3 } }}
                    exit={{ opacity: 0 }}
                  >
                    {pendingPageRef.current === 'home' ? 'JAYGOOD' : pendingPageRef.current?.toUpperCase()}
                  </motion.span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Navbar onNavigate={handleNavigation} currentPage={currentPage} />

          <main id="main-content" className="flex-grow relative" role="main" tabIndex={-1}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                variants={contentVariants}
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