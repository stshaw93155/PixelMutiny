export const metadata = {
  title: 'Selected Works (08) — PixelMutiny DigiMedia Portfolio',
  description:
    'Curated benchmark portfolio of high-converting landing pages, custom WebGL websites, 3D brand graphics, and scalable UI/UX systems engineered for high-growth tech brands.',
  openGraph: {
    title: 'Selected Works (08) — PixelMutiny DigiMedia Portfolio',
    description:
      'Curated benchmark portfolio of high-converting landing pages, custom WebGL websites, 3D brand graphics, and scalable UI/UX systems.',
    url: 'https://pixelmutiny.com/works',
    siteName: 'PixelMutiny DigiMedia',
    images: [
      {
        url: '/projects/veloce-ai.jpg',
        width: 1200,
        height: 675,
        alt: 'PixelMutiny DigiMedia Selected Works Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Selected Works (08) — PixelMutiny DigiMedia Portfolio',
    description:
      'Curated benchmark portfolio of high-converting landing pages, custom WebGL websites, and UI/UX systems.',
    images: ['/projects/veloce-ai.jpg'],
  },
};

export default function WorksLayout({ children }) {
  return children;
}
