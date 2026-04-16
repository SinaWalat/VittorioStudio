import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const pageRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    let timer;
    if (submitStatus === 'success') {
      timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 6000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [submitStatus]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setHasSubmitted(true);
    
    const formData = new FormData(e.target);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    // Send the contact form submission to the specified email
    const targetEmail = "sinawalat021@gmail.com"; 
    
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: json
      });
      
      const result = await response.json();
      
      if (result.success === "true") {
        setSubmitStatus('success');
        e.target.reset();
      } else {
        setSubmitStatus('error');
        console.error("Submission failed");
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
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
          <div className="contact-form-wrapper">

            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="firstName">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="First Name"
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
                    name="Last Name"
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
                  name="Email"
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
                  name="Phone"
                  className="form-input" 
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="Message"
                  className="form-input form-textarea" 
                  placeholder="Tell us about your project..."
                  rows="6"
                  required 
                />
              </div>

              {submitStatus === 'success' ? (
                <div className="inline-success-message">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Submitted Successfully</span>
                </div>
              ) : (
                <button type="submit" className={`form-submit ${hasSubmitted ? 'restored' : ''}`} disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              )}
            </form>
          </div>

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
