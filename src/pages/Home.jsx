import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/Hero';
import Description from '../components/Description';
import Carousel from '../components/Carousel';
import Divider from '../components/Divider';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

import { projects } from '../data/projects';

const Home = ({ preloaderDone }) => {
  const pageRef = useRef(null);
  // Start animations only AFTER the preloader has finished
  useLayoutEffect(() => {
    if (!preloaderDone) return;

    const ctx = gsap.context(() => {
      // --- First hero: smooth timed fade-in (it's already in viewport) ---
      const allHeroes = gsap.utils.toArray('.hero-image-wrapper');
      const firstHero = allHeroes[0];
      const remainingHeroes = allHeroes.slice(1);

      if (firstHero) {
        gsap.to(firstHero, {
          opacity: 1,
          duration: 1.8,
          delay: 0.3,
          ease: 'power2.out',
        });
      }

      // --- Scroll-triggered elements ---
      const scrollSelectors = [
        '.description-title',
        '.description-text',
        '.carousel-section',
        '.divider-section',
        '.view-projects-link'
      ].join(', ');

      const allScrollEls = [
        ...remainingHeroes,
        ...gsap.utils.toArray(scrollSelectors),
      ];

      ScrollTrigger.batch(allScrollEls, {
        start: 'top 80%',
        onEnter: batch => {
          gsap.to(batch, {
            opacity: 1,
            duration: 1.5,
            stagger: 0.4,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
      });

    }, pageRef);

    return () => {
      ctx.revert();
    };
  }, [preloaderDone]);

  return (
    <div ref={pageRef}>
      {projects.map((proj, idx) => (
        <React.Fragment key={idx}>
          <Hero imageSrc={proj.heroImage} isFirst={idx === 0} />
          <Description title={proj.title} text={proj.text} />
          <Carousel images={proj.carouselImages} />
          {idx < projects.length - 1 ? <Divider /> : <div style={{ height: '60px' }}></div>}
        </React.Fragment>
      ))}
      <div className="view-projects-wrapper container">
        <Link to="/projects" className="view-projects-link">
          <span>View Projects</span>
          <img src="/images/Assets/ViewArrow.svg" alt="" className="view-projects-arrow" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
