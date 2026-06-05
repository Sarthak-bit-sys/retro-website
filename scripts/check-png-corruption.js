import fs from 'fs';
import path from 'path';

const files = [
  'src/assets/images/about-me/portrait.png',
  'src/assets/images/case-studies/revise-smarter.png',
  'src/assets/images/case-studies/textile-traceability.png',
  'src/assets/images/case-studies/travelmatic-platform.png',
  'src/assets/images/case-studies/yolearn-landing.png',
  'src/assets/images/hobbies/hobby-01.png',
  'src/assets/images/hobbies/hobby-02.png',
  'src/assets/images/hobbies/hobby-03.png',
  'src/assets/images/hobbies/hobby-04.png',
  'src/assets/images/hobbies/hobby-05.png'
];

files.forEach(f => {
  const fullPath = path.resolve(f);
  if (!fs.existsSync(fullPath)) {
    console.log(`File missing: ${f}`);
    return;
  }
  const buffer = fs.readFileSync(fullPath);
  console.log(`File: ${f} | Size: ${buffer.length} bytes`);
  console.log(`First 8 bytes (hex):`, buffer.subarray(0, 8).toString('hex'));
});
