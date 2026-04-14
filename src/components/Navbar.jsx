import React, { useState, useRef, useCallback } from 'react';
import gsap from 'gsap';
import './Navbar.css';

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Projects', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Services', href: '#' },
  { label: 'Contact', href: '#' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);
  const linksRef = useRef([]);

  const isAnimating = useRef(false);

  const openMenu = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setIsOpen(true);
    const overlay = overlayRef.current;

    // Kill any running tweens to prevent glitches
    gsap.killTweensOf(overlay);
    gsap.killTweensOf(linksRef.current);
    gsap.killTweensOf('.nav-close-btn');

    // Make overlay visible and animate it down
    gsap.set(overlay, { visibility: 'visible', y: '-100%' });
    gsap.set(linksRef.current, { opacity: 0, filter: 'blur(8px)', willChange: 'filter, opacity' });
    gsap.set('.nav-close-btn', { opacity: 0, filter: 'blur(4px)' });

    const tl = gsap.timeline({
      onComplete: () => { isAnimating.current = false; }
    });

    tl.to(overlay, {
      y: '0%',
      duration: 1,
      ease: 'power3.inOut',
    })
    .to('.nav-close-btn', {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.4')
    .to(linksRef.current, {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.08,
    }, '-=0.5');
  }, []);

  const closeMenu = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    const overlay = overlayRef.current;

    // Kill any running tweens
    gsap.killTweensOf(overlay);
    gsap.killTweensOf(linksRef.current);
    gsap.killTweensOf('.nav-close-btn');

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(overlay, { visibility: 'hidden' });
        setIsOpen(false);
        isAnimating.current = false;
      }
    });

    // Blur out links with stagger — last to first
    tl.to(linksRef.current, {
      opacity: 0,
      filter: 'blur(12px)',
      duration: 0.5,
      ease: 'power2.in',
      stagger: { each: 0.04, from: 'end' },
    })
    .to('.nav-close-btn', {
      opacity: 0,
      filter: 'blur(4px)',
      duration: 0.3,
      ease: 'power2.in',
    }, '-=0.3')
    .to(overlay, {
      y: '-100%',
      duration: 0.8,
      ease: 'power3.inOut',
    }, '-=0.2');
  }, []);

  return (
    <>
      <nav className="navbar container">
        <div className="nav-logo-wrapper">
          <img
            src="/images/Logo/VittorioLogo.svg"
            alt="Vittorio Studio Logo"
            className="nav-logo"
          />
        </div>
        <div className="nav-menu-wrapper">
          <button className="nav-menu-btn" onClick={openMenu}>
            MENU
          </button>
        </div>
      </nav>

      {/* Fullscreen Nav Overlay */}
      <div className="nav-overlay" ref={overlayRef}>
        {/* Header matches navbar structure exactly */}
        <div className="nav-overlay-top container">
          <div style={{ height: '48px' }}></div>
          <button className="nav-close-btn" onClick={closeMenu} aria-label="Close menu">
            <img src="/images/Assets/X.svg" alt="Close" className="nav-close-icon" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="nav-overlay-links container">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-overlay-link"
              ref={(el) => (linksRef.current[i] = el)}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
