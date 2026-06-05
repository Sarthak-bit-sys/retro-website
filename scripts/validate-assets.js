import fs from 'fs';
import path from 'path';

// List of all statically expected image assets in the application
const REQUIRED_ASSESTS = [
  'images/about-me/portrait.png',
  'images/case-studies/revise-smarter.png',
  'images/case-studies/textile-traceability.png',
  'images/case-studies/travelmatic-platform.png',
  'images/case-studies/yolearn-landing.png',
  'images/hobbies/hobby-01.png',
  'images/hobbies/hobby-02.png',
  'images/hobbies/hobby-03.png',
  'images/hobbies/hobby-04.png',
  'images/hobbies/hobby-05.png',
  'images/profile_sarthak_crt_1780142857794.png'
];

console.log('\n=============================================');
console.log('[ASSET VALIDATION] Initiating Asset Verification Flow...');
console.log('Target Directory: "public/"');
console.log('=============================================\n');

let failed = false;

REQUIRED_ASSESTS.forEach((assetPath) => {
  const fullPath = path.resolve('public', assetPath);
  
  // 1. Verify existence
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ [FAILURE] Missing referenced asset file of path: "public/${assetPath}"`);
    failed = true;
    return;
  }
  
  // 2. Double-check for casing mismatches on case-insensitive systems (like Mac/Windows) to guarantee it builds on Case-Sensitive Linux (like Cloud Run/Vercel/GitHub actions)
  const dirName = path.dirname(fullPath);
  const baseName = path.basename(fullPath);
  try {
    const filesInDir = fs.readdirSync(dirName);
    if (!filesInDir.includes(baseName)) {
      console.error(`❌ [FAILURE] Case-sensitivity mismatch! Referenced "${baseName}" but filesystem has variations of:`, filesInDir.filter(f => f.toLowerCase() === baseName.toLowerCase()));
      failed = true;
    } else {
      console.log(`✅ [OK] Validated asset: "public/${assetPath}" (File exists & matches casing)`);
    }
  } catch (err) {
    console.error(`❌ [FAILURE] Error reading directory for asset "${assetPath}":`, err.message || err);
    failed = true;
  }
});

console.log('\n=============================================');
if (failed) {
  console.error('[ASSET VALIDATION] ❌ FAILED! One or more asset validation constraints failed. Halting build process.');
  console.log('=============================================\n');
  process.exit(1);
} else {
  console.log('[ASSET VALIDATION] 🎉 SUCCESS! All static assets validated perfectly.');
  console.log('=============================================\n');
  process.exit(0);
}
