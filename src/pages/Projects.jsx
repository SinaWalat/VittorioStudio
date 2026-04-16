import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const projectNames = ['Salvatore', 'Lumina', 'Oasis', 'Serenity', 'Prestige', 'Sanctuary', 'Nexus', 'Apex', 'Azure', 'Savor', 'Galleria', 'Zenith', 'Elysian', 'Vanguard'];

const Projects = () => {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Hide everything initially
      gsap.set('.projects-heading', { opacity: 0 });
      gsap.set('.project-item', { opacity: 0 });
      gsap.set('.footer-pattern', { opacity: 0, filter: 'blur(20px)' });
      gsap.set('.footer-logo', { opacity: 0 });

      // Smooth timed fade-in for heading
      gsap.to('.projects-heading', {
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: 'power2.out',
      });

      // Stagger fade-in for project items
      gsap.to('.project-item', {
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
      <section className="projects-section container">
        <div className="projects-header">
          <h1 className="projects-heading">Projects</h1>
        </div>

        <div className="projects-list">
          {projectNames.map((name, idx) => (
            <Link to={`/project/${name.toLowerCase()}`} className="project-item" key={idx}>
              <span className="project-name">{name}</span>
              <img
                src="/images/Assets/ViewArrow.svg"
                alt=""
                className="project-arrow"
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
