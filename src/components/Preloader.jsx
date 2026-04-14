import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const svgRef = useRef(null);

  useLayoutEffect(() => {
    const paths = svgRef.current.querySelectorAll('path');

    // Set initial state: all paths invisible and blurred
    // translateZ(0) forces each path onto its own GPU layer for smooth blur
    gsap.set(paths, { opacity: 0, filter: 'blur(8px)', willChange: 'filter, opacity' });

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    // Phase 1: Each letter path fades in from blur with stagger
    tl.to(paths, {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.06,
    })

    // Phase 2: Hold to let user absorb the brand
    .to({}, { duration: 1 })

    // Phase 3: Each letter blurs back out with stagger
    .to(paths, {
      opacity: 0,
      filter: 'blur(12px)',
      duration: 0.6,
      ease: 'power2.in',
      stagger: 0.04,
    })

    // Phase 4: Preloader slides up to reveal the site
    .to(preloaderRef.current, {
      y: '-100%',
      duration: 1,
      ease: 'power3.inOut',
    }, '-=0.3');

  }, [onComplete]);

  return (
    <div className="preloader" ref={preloaderRef}>
      {/* Inline SVG so GSAP can target individual letter paths */}
      <svg
        ref={svgRef}
        className="preloader-logo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-5 -5 124.46 48.23"
        style={{ overflow: 'visible' }}
      >
        {/* V */}
        <path fill="#fff" d="M24.38,0l-10.45,27.64h-3.49L0,0h3.48l9.34,26.16L22.19,0h2.19Z"/>
        {/* i */}
        <path fill="#fff" d="M29.46,7.68v19.96h-2.5v-2.88h0V7.68h2.5ZM26.96,4.96v-2.5h2.5v2.5h-2.5Z"/>
        {/* t */}
        <path fill="#fff" d="M37.31,21.36c0,1.97,1.6,3.57,3.57,3.57h2.64v2.71c-4.81,0-8.72-4.46-8.72-9.96v-7.14h-2.12v-2.78h2.12v-2.72h2.5v2.72h6.22v2.78h-6.22v10.82Z"/>
        {/* t */}
        <path fill="#fff" d="M50.04,21.36c0,1.97,1.6,3.57,3.57,3.57h2.64v2.71c-4.81,0-8.72-4.46-8.72-9.96v-7.14h-2.12v-2.78h2.12v-2.72h2.5v2.72h6.22v2.78h-6.22v10.82Z"/>
        {/* o */}
        <path fill="#fff" d="M66.83,7.73c-4.81,0-8.72,4.46-8.72,9.95,0,3.71,1.78,6.95,4.42,8.66.21-1.18.7-2.26,1.41-3.17-.5-.35-.97-.76-1.43-1.21-3.25-3.25-3.95-7.81-1.57-10.19,2.38-2.38,6.94-1.67,10.19,1.58,2.52,2.52,3.51,5.83,2.72,8.3h0c.25.18.5.37.73.58.62-1.36.97-2.91.97-4.55,0-5.5-3.9-9.95-8.72-9.95Z"/>
        {/* r */}
        <path fill="#fff" d="M87.94,7.73v2.71h-2.64c-1.97,0-3.57,1.6-3.57,3.57v13.63h-2.5v-9.95h0V7.73h2.5v2.98c1.58-1.84,3.78-2.98,6.22-2.98Z"/>
        {/* i */}
        <path fill="#fff" d="M93.3,7.68v19.96h-2.5v-2.88h0V7.68h2.5ZM90.8,4.96v-2.5h2.5v2.5h-2.5Z"/>
        {/* o */}
        <path fill="#fff" d="M105.74,7.73c-4.81,0-8.72,4.46-8.72,9.95,0,3.71,1.78,6.95,4.42,8.66.21-1.18.7-2.26,1.41-3.17-.5-.35-.97-.76-1.43-1.21-3.25-3.25-3.95-7.81-1.57-10.19,2.38-2.38,6.94-1.67,10.19,1.58,2.52,2.52,3.51,5.83,2.72,8.3h0c.25.18.5.37.73.58.62-1.36.97-2.91.97-4.55,0-5.5-3.9-9.95-8.72-9.95Z"/>
        {/* "studio" subtitle group */}
        <g>
          <path fill="#fff" d="M89.77,36.59c.03,1.18-1.09,1.62-2.06,1.65-.04,0-.08,0-.11,0-1.63,0-2.46-.89-2.69-1.74l-.02-.06h.97v.03c.39.91.86,1.35,1.73,1.33.83-.02,1.36-.29,1.34-.84-.01-.57-.41-.9-1.62-1.37-.03,0-.06-.02-.09-.03-.04-.01-.08-.03-.12-.04-.88-.32-1.98-.71-2-1.64,0-.15.02-.67.42-1.08.35-.36.88-.54,1.57-.54,1.12,0,2.52.49,2.75,1.86v.06s-.89,0-.89,0v-.04c-.14-.43-.56-1.4-1.92-1.4-.61,0-1.13.35-1.13.77,0,.53.39.89,1.38,1.28h.02c.1.05.2.08.31.12,1.05.37,2.14.74,2.16,1.69Z"/>
          <path fill="#fff" d="M91.95,36.34c0,.59.48,1.08,1.07,1.08h.8v.82c-1.45,0-2.62-1.34-2.62-3v-2.15h-.64v-.84h.64v-.82h.75v.82h1.87v.84h-1.87v3.26Z"/>
          <path fill="#fff" d="M94.73,36.06v-3.82h.75v3.31c0,1.18,1.2,1.77,2.12,1.77.4,0,.77-.14,1.03-.4.08-.08.13-.15.17-.23v-4.45h.75v5.99h-.75v-.91c-.48.55-1.14.9-1.87.9h0c-.09,0-.19,0-.28-.02-.75-.1-1.35-.58-1.68-1.22,0,0,0,0,0,0-.17-.27-.25-.59-.25-.91Z"/>
          <path fill="#fff" d="M105.93,29.9v8.34h-.75v-.9c-.48.55-1.14.9-1.87.9-1.45,0-2.62-1.34-2.62-3s1.17-3,2.62-3c.73,0,1.39.34,1.87.9v-3.24h.75ZM104.6,33.94c-.98-.98-2.35-1.19-3.07-.47s-.5,2.09.47,3.07,2.35,1.19,3.07.47.5-2.09-.47-3.07Z"/>
          <path fill="#fff" d="M107.34,31.41v-.75h.75v.75h-.75ZM108.09,32.23v6.01h-.75v-.87h0v-5.14h.75Z"/>
          <path fill="#fff" d="M114.46,35.24c0,1.65-1.17,3-2.62,3s-2.62-1.34-2.62-3,1.17-3,2.62-3,2.62,1.34,2.62,3ZM113.6,37c.72-.72.5-2.09-.47-3.07-.98-.98-2.35-1.19-3.07-.47-.72.72-.5,2.09.47,3.07s2.35,1.19,3.07.47Z"/>
        </g>
      </svg>
    </div>
  );
};

export default Preloader;
