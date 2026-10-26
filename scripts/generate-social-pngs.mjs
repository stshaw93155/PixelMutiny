import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = path.join(process.cwd(), 'public', 'img', 'social');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const svgs = {
  'instagram.png': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
    <defs>
      <radialGradient id="ig-grad-1" cx="30%" cy="107%" r="130%">
        <stop offset="0%" stop-color="#fdf497"/>
        <stop offset="5%" stop-color="#fdf497"/>
        <stop offset="45%" stop-color="#fd5949"/>
        <stop offset="60%" stop-color="#d6249f"/>
        <stop offset="90%" stop-color="#285AEB"/>
      </radialGradient>
    </defs>
    <rect width="256" height="256" rx="60" fill="url(#ig-grad-1)"/>
    <rect x="44" y="44" width="168" height="168" rx="44" fill="none" stroke="#ffffff" stroke-width="18"/>
    <circle cx="128" cy="128" r="42" fill="none" stroke="#ffffff" stroke-width="18"/>
    <circle cx="178" cy="78" r="12" fill="#ffffff"/>
  </svg>`,

  'whatsapp.png': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
    <circle cx="128" cy="128" r="120" fill="#25D366"/>
    <path fill="#ffffff" d="M128 48C83.8 48 48 83.8 48 128c0 15.3 4.3 29.6 11.8 41.8L48 208l39.5-11.4c11.7 7.1 25.4 11.4 40.5 11.4 44.2 0 80-35.8 80-80s-35.8-80-80-80zm46.5 114.4c-2 5.6-11.6 10.7-16.1 11.4-4.2.6-9.5.9-15.3-1-3.6-1.1-8.1-2.7-14.1-5.2-24.9-10.7-41-35.7-42.3-37.4-1.2-1.7-10.1-13.4-10.1-25.7 0-12.2 6.4-18.2 8.7-20.6 2.3-2.5 5-3.1 6.8-3.1 1.7 0 3.3 0 4.7.1 1.5.1 3.5-.6 5.5 4.3 2.1 4.9 7 17.2 7.6 18.4.6 1.3.9 2.8.1 4.4-.8 1.6-1.2 2.6-2.4 4-1.2 1.4-2.6 3.1-3.7 4.2-1.2 1.2-2.5 2.5-1.1 4.9 1.4 2.4 6.3 10.4 13.5 16.9 9.3 8.3 17.1 10.9 19.5 12.1 2.4 1.2 3.8 1 5.3-.6 1.4-1.6 6.1-7.1 7.7-9.5 1.6-2.4 3.3-2 5.5-1.2 2.2.8 14.1 6.7 16.5 7.9 2.4 1.2 4.1 1.8 4.7 2.8.6 1.1.6 6.3-1.4 11.9z"/>
  </svg>`,

  'linkedin.png': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
    <rect width="256" height="256" rx="54" fill="#0A66C2"/>
    <path fill="#ffffff" d="M60 96h36v108H60V96zm18-54c11.6 0 21 9.4 21 21s-9.4 21-21 21-21-9.4-21-21 9.4-21 21-21zm40 54h34.5v15.6h.5c4.8-9.1 16.5-18.6 34-18.6 36.3 0 43 23.9 43 55V204h-36v-50.6c0-12.1-.2-27.6-16.8-27.6-16.8 0-19.4 13.1-19.4 26.7V204h-36.8V96z"/>
  </svg>`,

  'x.png': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
    <rect width="256" height="256" rx="54" fill="#000000" stroke="#ffffff" stroke-opacity="0.2" stroke-width="6"/>
    <path fill="#ffffff" d="M178.6 48h28.1l-61.4 70.2L217.5 208h-56.5l-44.2-57.8L66 208H37.8l65.7-75.1L34.5 48h57.9l39.9 52.8L178.6 48zm-9.9 143.2h15.6L88.4 64H71.7l97 127.2z"/>
  </svg>`
};

for (const [filename, svg] of Object.entries(svgs)) {
  const outPath = path.join(dir, filename);
  await sharp(Buffer.from(svg))
    .resize(128, 128)
    .png()
    .toFile(outPath);
  console.log('Created official logo PNG:', outPath);
}
