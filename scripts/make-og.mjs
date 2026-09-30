// Generates public/og.png (1200x630 link preview image).
// Run `npm run og` after changing your name, role or photo, then commit the PNG.
import sharp from 'sharp';
import { site } from '../src/data/site.ts';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const size = 300;
const mask = Buffer.from(`<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}"/></svg>`);
const photo = await sharp(new URL('../src/assets/shane.jpg', import.meta.url).pathname)
  .resize(size, size, { fit: 'cover' })
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer();

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#0c0c0e"/>
  <rect x="0" y="600" width="1200" height="30" fill="#b31b1b"/>
  <text x="80" y="250" fill="#f87171" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="3">${esc(site.role.toUpperCase())}</text>
  <text x="80" y="345" fill="#ffffff" font-family="Helvetica, Arial, sans-serif" font-size="92" font-weight="700">${esc(site.name)}</text>
  <text x="80" y="415" fill="#a1a1aa" font-family="Helvetica, Arial, sans-serif" font-size="38">${esc(new URL(site.url).host)}</text>
</svg>`;

await sharp(Buffer.from(svg))
  .composite([{ input: photo, left: 820, top: 150 }])
  .png()
  .toFile(new URL('../public/og.png', import.meta.url).pathname);
console.log('Wrote public/og.png');
