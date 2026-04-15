import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

    }, pageRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={pageRef}>
      <section className="contact-section container">
        <div className="contact-header">
          <h1 className="contact-heading">Contact Us</h1>
          <p className="contact-subtitle">
            Let's start a conversation about your next project. We're here to help you bring your vision to life with precision and expertise.
          </p>
        </div>

        <div className="contact-body">
          <div className="contact-form-side">
            <form className="contact-form">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" placeholder="Your Name" />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" placeholder="Your Email" />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-textarea" placeholder="Your Message"></textarea>
              </div>
              <button type="button" className="form-submit">
                <span>Send Message</span>
              </button>
            </form>
          </div>

          <div className="contact-info-side">
            <div className="info-group">
              <h3 className="info-label">Email</h3>
              <p className="info-item">info@vittoriostudio.com</p>
            </div>
            <div className="info-group">
              <h3 className="info-label">Phone</h3>
              <p className="info-item">+1 (234) 567-890</p>
            </div>
            <div className="info-group">
              <h3 className="info-label">Social</h3>
              <p className="info-item">Instagram</p>
              <p className="info-item">LinkedIn</p>
              <p className="info-item">Behance</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
