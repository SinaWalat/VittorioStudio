import React, { useLayoutEffect, useRef, useState, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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

      // Navbar fade-in
      gsap.set(['.nav-logo-wrapper', '.nav-menu-wrapper'], { opacity: 0 });
      gsap.to(['.nav-logo-wrapper', '.nav-menu-wrapper'], {
        opacity: 1,
        duration: 1.5,
        stagger: 0.4,
        ease: 'power2.out'
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
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}
      <div className="app-wrapper" ref={appRef}>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home preloaderDone={preloaderDone} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
