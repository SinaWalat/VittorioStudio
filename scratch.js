const fs = require('fs');
const svg = fs.readFileSync('Images/Assets/SVG/FooterPattern.svg', 'utf8');
const match = svg.match(/d="([^"]+)"/);
if (match) {
  const d = match[1];
  const paths = d.split('Z').filter(p => p.trim()).map(p => p + 'Z');
  console.log('Number of rings:', paths.length);
  // print first two
  console.log(paths[0]);
  console.log(paths[1]);
}
