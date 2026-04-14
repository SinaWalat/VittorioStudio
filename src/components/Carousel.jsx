import React, { useState, useLayoutEffect, useEffect } from 'react';
import './Carousel.css';

const Carousel = ({ images }) => {
  const [itemsVisible, setItemsVisible] = useState(2);
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useLayoutEffect(() => {
    const checkWidth = () => {
      const visible = window.innerWidth <= 1000 ? 1 : 2;
      setItemsVisible(visible);
      setCurrentIndex(visible); // reset to first real image avoiding bound errors
      setIsTransitioning(false); // prevent animating the layout switch
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // Create clone arrays strictly to manage the seamless infinite loop
  const preClones = images.slice(-itemsVisible);
  const postClones = images.slice(0, itemsVisible);
  const extendedImages = [...preClones, ...images, ...postClones];

  const handleTransitionEnd = () => {
    setIsAnimating(false); // Unblock clicks instantly when transition completes

    if (currentIndex >= images.length + itemsVisible) {
      // Reached the end clones, secretly snap back avoiding transition
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - images.length);
    } else if (currentIndex < itemsVisible) {
      // Reached the front clones, secretly snap forward avoiding transition
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + images.length);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      // Use double requestAnimationFrame to ensure the browser strictly paints
      // the "no-transition" state jump before we re-activate sliding css
      let raf1 = requestAnimationFrame(() => {
        let raf2 = requestAnimationFrame(() => setIsTransitioning(true));
      });
      return () => cancelAnimationFrame(raf1);
    }
  }, [isTransitioning]);

  const nextSlide = () => {
    if (!isTransitioning || isAnimating) return; // Block spam clicks from breaking boundaries
    setIsAnimating(true);
    setCurrentIndex(prev => prev + 1);
  };

  const prevSlide = () => {
    if (!isTransitioning || isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev - 1);
  };

  return (
    <div className="carousel-section container">
      <div className="carousel-container">
        {/* Absolute positioning bound precisely to the image track boundary */}
        <button className="carousel-btn carousel-btn-left" onClick={prevSlide} aria-label="Previous">
          <img src="/images/Assets/LeftArrow.svg" alt="Left" />
        </button>

        <div
          className={`carousel-track ${!isTransitioning ? 'no-transition' : ''}`}
          onTransitionEnd={handleTransitionEnd}
          style={{ '--current-index': currentIndex }}
        >
          {extendedImages.map((src, index) => (
            <div className="carousel-slide" key={index}>
              <img src={src} alt={`Slide ${index}`} className="carousel-image" />
            </div>
          ))}
        </div>

        <button className="carousel-btn carousel-btn-right" onClick={nextSlide} aria-label="Next">
          <img src="/images/Assets/RightArrow.svg" alt="Right" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
