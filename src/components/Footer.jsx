import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation } from 'react-router-dom';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const location = useLocation();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Set initial hidden state
      gsap.set('.footer-pattern', { opacity: 0, filter: 'blur(20px)' });
      gsap.set('.footer-logo', { opacity: 0 });

      ScrollTrigger.create({
        trigger: footerRef.current,
        start: 'top 95%',
        onEnter: () => {
          const footerTl = gsap.timeline();
          footerTl.to('.footer-pattern', {
            opacity: 0.3,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power2.out'
          })
          .to('.footer-logo', {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
          });
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, [location.pathname]); // Re-run when route changes to reset triggers

  return (
    <footer className="footer-section" ref={footerRef}>
      <div className="footer-inner container">
        <img 
          src="/images/Assets/FooterPattern.svg" 
          alt="" 
          className="footer-pattern" 
        />
        <img 
          src="/images/Logo/VittorioLogo.svg" 
          alt="Vittorio Studio" 
          className="footer-logo" 
        />
      </div>
    </footer>
  );
};

export default Footer;
