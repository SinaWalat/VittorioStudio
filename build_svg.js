const fs = require('fs');
const svg = fs.readFileSync('Images/Assets/SVG/FooterPattern.svg', 'utf8');

const pathMatch = svg.match(/d="([^"]+)"/);
const dString = pathMatch[1];
const ringPaths = dString.split('Z').filter(p => p.trim() !== '').map(p => p + 'Z');

const jsxContent = `import React from 'react';

const ringPaths = ${JSON.stringify(ringPaths, null, 2)};

const FooterPatternSVG = () => {
  return (
    <svg viewBox="0 0 1000.37 245.67" className="inline-svg-pattern" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="linear-gradient" x1="500.19" y1="-0.31" x2="500.19" y2="266.47" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity="0"/>
          <stop offset="1" stopColor="#231f20"/>
        </linearGradient>
      </defs>
      {ringPaths.map((path, i) => (
        <path 
          key={i} 
          className="anim-ring" 
          d={path} 
          fill="url(#linear-gradient)" 
        />
      ))}
    </svg>
  );
};

export default FooterPatternSVG;
`;

fs.writeFileSync('src/components/FooterPatternSVG.jsx', jsxContent);
console.log('Successfully wrote src/components/FooterPatternSVG.jsx!');
