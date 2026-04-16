import React, { useLayoutEffect, useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/Hero';
import Description from '../components/Description';
import Carousel from '../components/Carousel';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const ProjectDetail = () => {
  const { id } = useParams();
  const pageRef = useRef(null);

  // Find project by name (case-insensitive)
  const project = projects.find(p => p.title.toLowerCase() === id.toLowerCase());

  useLayoutEffect(() => {
    if (!project) return;
    
    let ctx = gsap.context(() => {
      // Smooth timed fade-in for hero (already in viewport)
      gsap.to('.hero-image-wrapper', {
        opacity: 1,
        duration: 1.8,
        delay: 0.3,
        ease: 'power2.out',
      });

      // Scroll-triggered elements
      const scrollSelectors = [
        '.description-title',
        '.description-text',
        '.carousel-section'
      ].join(', ');

      ScrollTrigger.batch(scrollSelectors, {
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
  }, [project]);

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <div ref={pageRef}>
      <Hero imageSrc={project.heroImage} isFirst={true} />
      <Description title={project.title} text={project.text} />
      {project.carouselImages && project.carouselImages.length > 0 && (
        <Carousel images={project.carouselImages} />
      )}
      <div style={{ height: '60px' }}></div>
    </div>
  );
};

export default ProjectDetail;
