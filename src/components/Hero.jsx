import React from 'react';
import './Hero.css';

const Hero = ({ imageSrc, isFirst = false }) => {
  return (
    <div className="hero-section container">
      <div className={`hero-image-wrapper ${isFirst ? 'hero-first' : 'hero-scroll'}`}>
        <img 
          src={imageSrc} 
          alt="Interior Design Hero" 
          className="hero-image" 
        />
      </div>
    </div>
  );
};

export default Hero;
