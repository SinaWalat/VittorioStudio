import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/Hero';
import Description from '../components/Description';
import Carousel from '../components/Carousel';
import Divider from '../components/Divider';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const R2_BASE = 'https://pub-1222597b8bc545d9a3ce076f0aae3868.r2.dev/Interior';

const projects = [
  {
    heroImage: `${R2_BASE}/VIP%20VILLA%20DESIGN%20-%20LOCATION%20-%20ERBIL%20SPANISH%20VILLAGE/02.webp`,
    carouselImages: [
      `${R2_BASE}/VIP%20VILLA%20DESIGN%20-%20LOCATION%20-%20ERBIL%20SPANISH%20VILLAGE/01.webp`,
      `${R2_BASE}/VIP%20VILLA%20DESIGN%20-%20LOCATION%20-%20ERBIL%20SPANISH%20VILLAGE/03.webp`,
      `${R2_BASE}/VIP%20VILLA%20DESIGN%20-%20LOCATION%20-%20ERBIL%20SPANISH%20VILLAGE/04.webp`,
      `${R2_BASE}/VIP%20VILLA%20DESIGN%20-%20LOCATION%20-%20ERBIL%20SPANISH%20VILLAGE/05.webp`,
    ],
    title: "Salvatore",
    text: "Exclusive interior architecture dedicated to creating timeless, sophisticated environments. We blend minimalist aesthetics with premium materials to craft spaces that inspire and elevate everyday living. Our approach focuses on the seamless integration of light, form, and texture to deliver unparalleled luxury and comfort."
  },
  {
    heroImage: `${R2_BASE}/VILLA%20DESIGN%20-%20SLAVA%20CITY%20ERBIL/01.webp`,
    carouselImages: [
      `${R2_BASE}/VILLA%20DESIGN%20-%20SLAVA%20CITY%20ERBIL/02.webp`,
      `${R2_BASE}/VILLA%20DESIGN%20-%20SLAVA%20CITY%20ERBIL/03.webp`,
      `${R2_BASE}/VILLA%20DESIGN%20-%20SLAVA%20CITY%20ERBIL/04.webp`,
    ],
    title: "Lumina",
    text: "A radiant expression of modern luxury, where abundant natural light meets elegant architectural lines. This meticulously crafted interior leverages open spaces and refined textures to foster a serene, inviting atmosphere that quietly redefines contemporary living."
  },
  {
    heroImage: `${R2_BASE}/VILLA%20DESIGN%20-%20ERBIL%20ARAM%20GARDEN%20PROJECT/01.webp`,
    carouselImages: [
      `${R2_BASE}/VILLA%20DESIGN%20-%20ERBIL%20ARAM%20GARDEN%20PROJECT/02.webp`,
      `${R2_BASE}/VILLA%20DESIGN%20-%20ERBIL%20ARAM%20GARDEN%20PROJECT/03.webp`,
    ],
    title: "Oasis",
    text: "A tranquil sanctuary balancing modern refinement with natural harmony. This space utilizes rich, earthy tones and bespoke architectural elements to create an immersive, peaceful escape perfect for quiet contemplation and elevated living."
  }
];

const Home = ({ preloaderDone }) => {
  const pageRef = useRef(null);
  const hasAnimated = useRef(false);

  // Set initial hidden state immediately on mount (before any paint)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hide everything right away so nothing flashes
      gsap.set('.hero-image-wrapper', { opacity: 0 });
      gsap.set([
        '.description-title',
        '.description-text',
        '.carousel-section',
        '.divider-section'
      ], { opacity: 0 });
      gsap.set('.footer-pattern', { opacity: 0, filter: 'blur(20px)' });
      gsap.set('.footer-logo', { opacity: 0 });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Start animations only AFTER the preloader has finished
  useLayoutEffect(() => {
    if (!preloaderDone || hasAnimated.current) return;
    hasAnimated.current = true;

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
        '.divider-section'
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

      // --- Footer animation ---
      ScrollTrigger.create({
        trigger: '.footer-section',
        start: 'top 85%',
        onEnter: () => {
          const footerTl = gsap.timeline();
          footerTl.to('.footer-pattern', {
            opacity: 0.3,
            filter: 'blur(0px)',
            duration: 2,
            ease: 'power2.out'
          })
          .to('.footer-logo', {
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out'
          });
        }
      });

    }, pageRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [preloaderDone]);

  return (
    <div ref={pageRef}>
      {projects.map((proj, idx) => (
        <React.Fragment key={idx}>
          <Hero imageSrc={proj.heroImage} isFirst={idx === 0} />
          <Description title={proj.title} text={proj.text} />
          <Carousel images={proj.carouselImages} />
          {idx < projects.length - 1 ? <Divider /> : <div style={{height: '60px'}}></div>}
        </React.Fragment>
      ))}
      <Footer />
    </div>
  );
};

export default Home;
