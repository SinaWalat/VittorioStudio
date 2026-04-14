import React, { useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import './Navbar.css';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/' },
  { label: 'About', to: '/' },
  { label: 'Services', to: '/' },
  { label: 'Contact', to: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);
  const linksRef = useRef([]);
  const isAnimating = useRef(false);
  const navigate = useNavigate();

  const openMenu = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setIsOpen(true);
    const overlay = overlayRef.current;

    gsap.killTweensOf(overlay);
    gsap.killTweensOf(linksRef.current);
    gsap.killTweensOf('.nav-close-btn');

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

  const closeMenu = useCallback((destination) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    const overlay = overlayRef.current;

    gsap.killTweensOf(overlay);
    gsap.killTweensOf(linksRef.current);
    gsap.killTweensOf('.nav-close-btn');

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(overlay, { visibility: 'hidden' });
        setIsOpen(false);
        isAnimating.current = false;
        // Navigate AFTER menu is fully closed
        if (destination) {
          navigate(destination);
        }
      }
    });

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
  }, [navigate]);

  const handleLinkClick = useCallback((e, to) => {
    e.preventDefault();
    closeMenu(to);
  }, [closeMenu]);

  return (
    <>
      <nav className="navbar container">
        <div className="nav-logo-wrapper">
          <Link to="/">
            <img
              src="/images/Logo/VittorioLogo.svg"
              alt="Vittorio Studio Logo"
              className="nav-logo"
            />
          </Link>
        </div>
        <div className="nav-menu-wrapper">
          <button className="nav-menu-btn" onClick={openMenu}>
            MENU
          </button>
        </div>
      </nav>

      {/* Fullscreen Nav Overlay */}
      <div className="nav-overlay" ref={overlayRef}>
        <div className="nav-overlay-top container">
          <div style={{ height: '48px' }}></div>
          <button className="nav-close-btn" onClick={() => closeMenu()} aria-label="Close menu">
            <img src="/images/Assets/X.svg" alt="Close" className="nav-close-icon" />
          </button>
        </div>

        <div className="nav-overlay-links container">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.to}
              className="nav-overlay-link"
              ref={(el) => (linksRef.current[i] = el)}
              onClick={(e) => handleLinkClick(e, link.to)}
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


