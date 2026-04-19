import React, { useLayoutEffect, useRef, useState, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const appRef = useRef(null);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const location = useLocation();

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  useLayoutEffect(() => {
    if (!preloaderDone) return;

    // --- Lenis Smooth Scroll Initialization ---
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothMobile: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    // ------------------------------------------

    let ctx = gsap.context(() => {
      gsap.set(appRef.current, { opacity: 1 });

      // Header fade entrance animation
      gsap.set(['.nav-logo-wrapper', '.nav-menu-wrapper'], { opacity: 0 });
      gsap.to(['.nav-logo-wrapper', '.nav-menu-wrapper'], {
        opacity: 1,
        duration: 1.4,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.2
      });

    }, appRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [preloaderDone]);

  // Force scroll to top on refresh and route changes
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <>
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}
      <div className="app-wrapper" ref={appRef}>
        <Navbar />
        {preloaderDone && (
          <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
            <PageTransition key={location.pathname}>
              <div className="main-content">
                <Routes location={location}>
                  <Route path="/" element={<Home preloaderDone={preloaderDone} />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/project/:id" element={<ProjectDetail />} />
                </Routes>
              </div>
              <Footer />
            </PageTransition>
          </AnimatePresence>
        )}
      </div>
    </>
  );
}

export default App;
