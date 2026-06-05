import fs from 'fs';
import path from 'path';

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
    console.log(`[Asset Setup] Copied static file to: ${dest}`);
  }
}

try {
  const srcDir = path.resolve('./src/assets/images');
  const destDir = path.resolve('./public/images');
  
  console.log(`[Asset Setup] Transferring static assets from "${srcDir}" to "${destDir}"...`);
  copyRecursiveSync(srcDir, destDir);
  console.log('[Asset Setup] Static asset transfer complete successfully.');
} catch (error) {
  console.error('[Asset Setup] Exception during asset setup:', error);
  process.exit(1);
}
