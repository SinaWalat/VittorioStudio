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
      // --- First project section: strict timed sequence ---
      const allHeroes = gsap.utils.toArray('.hero-image-wrapper');
      const allTitles = gsap.utils.toArray('.description-title');
      const allTexts = gsap.utils.toArray('.description-text');
      const allCarousels = gsap.utils.toArray('.carousel-section');
      const allDividers = gsap.utils.toArray('.divider-section');

      const tl = gsap.timeline({ delay: 0.3 });

      // First hero image
      if (allHeroes[0]) {
        tl.to(allHeroes[0], {
          opacity: 1,
          duration: 1.8,
          ease: 'power2.out',
        });
      }

      // First title
      if (allTitles[0]) {
        tl.to(allTitles[0], {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }, '-=1.0');
      }

      // First description text
      if (allTexts[0]) {
        tl.to(allTexts[0], {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.5');
      }

      // First carousel
      if (allCarousels[0]) {
        tl.to(allCarousels[0], {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.4');
      }

      // --- Remaining elements: scroll-triggered ---
      const remainingEls = [
        ...allHeroes.slice(1),
        ...allTitles.slice(1),
        ...allTexts.slice(1),
        ...allCarousels.slice(1),
        ...allDividers,
        ...gsap.utils.toArray('.view-projects-link'),
      ];

      ScrollTrigger.batch(remainingEls, {
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
