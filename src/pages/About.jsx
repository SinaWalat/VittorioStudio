import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Footer hidden state
      gsap.set('.footer-pattern', { opacity: 0, filter: 'blur(20px)' });
      gsap.set('.footer-logo', { opacity: 0 });

      // Smooth timed fade-in for heading
      gsap.to('.about-heading', {
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: 'power2.out',
      });

      // Stagger fade-in for paragraphs
      gsap.to('.about-paragraph', {
        opacity: 1,
        duration: 0.8,
        delay: 0.6,
        stagger: 0.2,
        ease: 'power2.out',
      });

    }, pageRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={pageRef}>
      <section className="about-section container">
        <div className="about-header">
          <h1 className="about-heading">About Us</h1>
        </div>

        <div className="about-body">
          <p className="about-paragraph">
            We are a team of experienced interior designers with over five years of expertise, specializing in the design and execution of diverse interior spaces. Our approach blends creativity with practical implementation, ensuring high-quality results through the use of premium materials and skilled craftsmanship.
          </p>
          <p className="about-paragraph">
            We provide comprehensive turnkey solutions, managing every project from concept to completion with precision and attention to detail.
          </p>
          <p className="about-paragraph">
            Our goal is to create comfortable, functional spaces tailored to each client's needs, while fully understanding their vision and expectations. We are committed to delivering exceptional value and achieving the highest level of client satisfaction in every project we undertake.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
