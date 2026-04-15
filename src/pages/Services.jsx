import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Interior Design',
    items: [
      'Concept development & creative direction',
      'Space planning & layout optimization',
      'Residential & commercial design',
      'Mood boards & visual storytelling',
    ],
    closing: 'We craft spaces that reflect your vision, lifestyle, and purpose.',
  },
  {
    title: '3D Visualization',
    items: [
      'High-quality, photorealistic renders',
      'Accurate materials, textures & lighting simulation',
      'Clear design presentations for confident decision-making',
    ],
    closing: 'Experience your space before it comes to life.',
  },
  {
    title: 'Material & Furniture Selection',
    items: [
      'Finishes, color palettes & textures',
      'Custom and curated furniture solutions',
      'Lighting design and specification',
    ],
    closing: 'Every element is thoughtfully selected to ensure harmony, quality, and timeless appeal.',
  },
  {
    title: 'Turnkey Projects',
    items: [
      'Complete project delivery from concept to completion',
      'On-site supervision & project coordination',
      'Collaboration with trusted contractors and suppliers',
    ],
    closing: 'We manage every detail—delivering a seamless, stress-free experience.',
  },
  {
    title: 'Consultation',
    items: [
      'Personalized one-on-one design sessions',
      'Space evaluation & improvement strategies',
      'Project planning and professional guidance',
    ],
    closing: 'Expert insight to elevate your space with clarity and confidence.',
  },
];

const Services = () => {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const targets = [
        '.services-heading',
        '.services-intro',
        '.service-block',
      ].join(', ');

      gsap.set(targets, { opacity: 0 });

      ScrollTrigger.batch(targets, {
        start: 'top 80%',
        onEnter: batch => {
          gsap.to(batch, {
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
      });

      // Footer animation
      gsap.set('.footer-pattern', { opacity: 0, filter: 'blur(20px)' });
      gsap.set('.footer-logo', { opacity: 0 });

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
  }, []);

  return (
    <div ref={pageRef}>
      <section className="services-section container">
        <div className="services-header">
          <h1 className="services-heading">Our Services</h1>
        </div>

        <div className="services-body">
          <p className="services-intro">
            We design interiors that seamlessly blend aesthetics, functionality, and identity, transforming spaces into refined, meaningful experiences.
          </p>

          {services.map((service, idx) => (
            <div className="service-block" key={idx}>
              <h2 className="service-title">{service.title}</h2>
              <ul className="service-list">
                {service.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="service-closing">{service.closing}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
