import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const files = ['start-screen.png', 'main-menu.png', 'map.png', 'gameplay.png'];
const srcDir = join(root, 'dodger/img/source');
const thumbDir = join(root, 'dodger/img/thumbs');

mkdirSync(thumbDir, { recursive: true });

for (const file of files) {
  const src = join(srcDir, file);
  const dest = join(thumbDir, file.replace('.png', '.webp'));
  const fullDest = join(root, 'dodger/img', file.replace('.png', '.webp'));

  await sharp(src).resize({ width: 400 }).webp({ quality: 80 }).toFile(dest);
  console.log(`thumb: ${dest}`);

  await sharp(src).webp({ quality: 85 }).toFile(fullDest);
  console.log(`full:  ${fullDest}`);
}
