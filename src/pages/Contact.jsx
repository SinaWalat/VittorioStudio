import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const targets = [
        '.contact-heading',
        '.contact-subtitle',
        '.form-group',
        '.form-submit',
        '.info-item'
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div ref={pageRef}>
      <section className="contact-section container">
        <div className="contact-header">
          <h1 className="contact-heading">Get in Touch</h1>
          <p className="contact-subtitle">
            We'd love to hear about your vision. Share your project details and we'll craft something extraordinary together.
          </p>
        </div>

        <div className="contact-body">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="firstName">First Name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  className="form-input" 
                  placeholder="John"
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="lastName">Last Name</label>
                <input 
                  type="text" 
                  id="lastName" 
                  className="form-input" 
                  placeholder="Doe"
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                className="form-input" 
                placeholder="john@example.com"
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone</label>
              <input 
                type="tel" 
                id="phone" 
                className="form-input" 
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Message</label>
              <textarea 
                id="message" 
                className="form-input form-textarea" 
                placeholder="Tell us about your project..."
                rows="6"
                required 
              />
            </div>

            <button type="submit" className="form-submit">
              Send Message
            </button>
          </form>

          <div className="contact-info">
            <div className="info-item">
              <span className="info-label">Email</span>
              <a href="mailto:info@vittoriostudio.com" className="info-value">info@vittoriostudio.com</a>
            </div>
            <div className="info-item">
              <span className="info-label">Phone</span>
              <a href="tel:+1234567890" className="info-value">+1 (234) 567-890</a>
            </div>
            <div className="info-item">
              <span className="info-label">Location</span>
              <span className="info-value">Erbil, Kurdistan Region, Iraq</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
