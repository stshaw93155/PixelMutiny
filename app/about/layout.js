export const metadata = {
  title: 'About PixelMutiny — Ethos, Manifesto & Design Lab',
  description:
    'PixelMutiny DigiMedia is a four-pillar creative & digital growth agency. Discover our ethos, design lab in DLF Cyber Hub, awards, and multidisciplinary engineering team.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About PixelMutiny — Ethos, Manifesto & Design Lab',
    description:
      'PixelMutiny DigiMedia is a four-pillar creative & digital growth agency. Discover our ethos, design lab in DLF Cyber Hub, awards, and multidisciplinary engineering team.',
    url: '/about',
    siteName: 'PixelMutiny DigiMedia',
    images: [
      {
        url: '/website-design/01-home-landing.png',
        width: 1200,
        height: 630,
        alt: 'About PixelMutiny DigiMedia',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About PixelMutiny — Ethos, Manifesto & Design Lab',
    description:
      'Discover PixelMutiny DigiMedia: four core pillars, transparent engineering, and distinct design.',
    images: ['/website-design/01-home-landing.png'],
  },
};

export default function AboutLayout({ children }) {
  return children;
}
