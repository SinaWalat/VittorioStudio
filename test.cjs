const fs = require('fs');
const rawSvg = fs.readFileSync('Images/Assets/SVG/FooterPattern.svg', 'utf8');
const matches = [...rawSvg.matchAll(/d="([^"]+)"/g)];
console.log('Matches count:', matches.length);
matches.forEach((m, i) => console.log(`Match ${i}:`, m[1].substring(0, 50)));
