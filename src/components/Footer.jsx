import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
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
