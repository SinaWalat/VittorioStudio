const fs = require('fs');
const svg = fs.readFileSync('/Users/sina/Desktop/VittorioStudio/Images/Assets/SVG/FooterPattern.svg', 'utf8');
const match = svg.match(/d="([^"]+)"/i);
if(match) {
   const d = match[1];
   const byZ = d.split('Z').filter(p=>p.trim());
   const byz = d.split('z').filter(p=>p.trim());
   console.log('by Z:', byZ.length, 'by z:', byz.length);
} else {
   console.log('No d attribute found');
}
