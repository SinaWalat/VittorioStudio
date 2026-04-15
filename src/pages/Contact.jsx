import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Sequential top-to-bottom stagger using a timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to('.contact-heading', {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      })
      .to('.contact-subtitle', {
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
      }, '-=0.5')
      .to('.form-group', {
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
      }, '-=0.4')
      .to('.form-submit', {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3')
      .to('.info-item', {
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      }, '-=0.8');

    }, pageRef);

    return () => {
      ctx.revert();
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
              <a href="mailto:Alikamaran955@gmail.com" className="info-value">Alikamaran955@gmail.com</a>
            </div>
            <div className="info-item">
              <span className="info-label">Phone</span>
              <a href="tel:+9647507888762" className="info-value">+964 750 788 8762</a>
              <a href="tel:+9647502356826" className="info-value">+964 750 235 6826</a>
            </div>
            <div className="info-item">
              <span className="info-label">Location</span>
              <span className="info-value">Erbil, Kurdistan Region, Iraq</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
