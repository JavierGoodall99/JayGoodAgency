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
import TrustBar from './components/TrustBar';
import WorkPage from './components/WorkPage';
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

  // Lock scroll to top during loading — prevent any scroll offset
  useEffect(() => {
    if (loading) {
      window.scrollTo(0, 0);
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [loading]);

  // Handle URL synchronization
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.substring(1) || 'home';
      if (['home', 'about', 'work', 'services', 'contact', 'privacy', 'terms'].includes(path)) {
        setCurrentPage(path);
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Initial check
    const initialPath = window.location.pathname.substring(1) || 'home';
    if (['home', 'about', 'work', 'services', 'contact', 'privacy', 'terms'].includes(initialPath)) {
      if (initialPath !== 'home') {
        setCurrentPage(initialPath);
      }
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigation = useCallback((page: string) => {
    if (page === currentPage || isTransitioning) {
      if (page === currentPage && !isTransitioning) {
        window.dispatchEvent(new CustomEvent('scroll-to-top'));
      }
      return;
    }

    // Start the curtain transition
    setIsTransitioning(true);
    pendingPageRef.current = page;

    // Update URL immediately
    const url = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({}, '', url);

    // Swap content when columns fully cover the screen (at 680ms)
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }, 680);

    // End transition after full animation
    setTimeout(() => {
      setIsTransitioning(false);
      pendingPageRef.current = null;
    }, 1500);
  }, [currentPage, isTransitioning]);

  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <TrustBar />
            <Work onNavigate={handleNavigation} />
            <TiredOf />
            <Manifesto />
          </>
        );
      case 'about':
        return <About />;
      case 'work':
        return <WorkPage />;
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
            {loading && <Loader key="loader" onComplete={() => { window.scrollTo(0, 0); setLoading(false); }} />}
          </AnimatePresence>

          {/* Cinematic Page Transition Curtain */}
          <AnimatePresence>
            {isTransitioning && (
              <div className="fixed inset-0 z-[90] pointer-events-none overflow-hidden flex flex-col items-center justify-center">

                {/* 5 Staggered Columns Background */}
                <div className="absolute inset-0 flex">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-full bg-brand-lime flex-1"
                      initial={{ y: "100%" }}
                      animate={{ y: ["100%", "0%", "0%", "100%"] }}
                      transition={{
                        duration: 1.2,
                        ease: [0.76, 0, 0.24, 1],
                        times: [0, 0.4, 0.6, 1],
                        delay: i * 0.05
                      }}
                    />
                  ))}
                </div>

                {/* Corner markers */}
                <motion.div
                  className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-black/30"
                  animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
                  transition={{ duration: 1.2, times: [0, 0.4, 0.6, 1], delay: 0.1 }}
                />
                <motion.div
                  className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-black/30"
                  animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
                  transition={{ duration: 1.2, times: [0, 0.4, 0.6, 1], delay: 0.15 }}
                />
                <motion.div
                  className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-black/30"
                  animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
                  transition={{ duration: 1.2, times: [0, 0.4, 0.6, 1], delay: 0.15 }}
                />
                <motion.div
                  className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-black/30"
                  animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
                  transition={{ duration: 1.2, times: [0, 0.4, 0.6, 1], delay: 0.2 }}
                />

                {/* Centered content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {/* Page name */}
                  <div className="overflow-hidden">
                    <motion.div
                      className="flex items-center justify-center"
                      initial={{ y: '100%' }}
                      animate={{ y: ['100%', '0%', '0%', '100%'] }}
                      transition={{
                        duration: 1.2,
                        ease: [0.76, 0, 0.24, 1],
                        times: [0, 0.35, 0.65, 1],
                        delay: 0.1
                      }}
                    >
                      <span className="font-display font-bold text-6xl md:text-9xl text-black uppercase tracking-tighter inline-block px-4">
                        {pendingPageRef.current === 'home' ? 'JAYGOOD' : pendingPageRef.current === 'work' ? 'WORK' : pendingPageRef.current?.toUpperCase()}
                      </span>
                    </motion.div>
                  </div>

                  {/* Decorative subtitle */}
                  <div className="overflow-hidden mt-4">
                    <motion.span
                      className="block font-mono text-[10px] md:text-xs text-black/50 uppercase tracking-[0.3em]"
                      initial={{ y: '100%' }}
                      animate={{ y: ['100%', '0%', '0%', '100%'] }}
                      transition={{
                        duration: 1.2,
                        ease: [0.76, 0, 0.24, 1],
                        times: [0, 0.35, 0.65, 1],
                        delay: 0.15
                      }}
                    >
                      — {pendingPageRef.current === 'home' ? 'AGENCY' : 'LOADING'} —
                    </motion.span>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>

          {!loading && <Navbar onNavigate={handleNavigation} currentPage={currentPage} />}

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