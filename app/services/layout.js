export const metadata = {
  title: 'Services & Pricing — Four Pillars & Monthly Retainers | PixelMutiny',
  description:
    'Explore PixelMutiny’s four growth pillars: Digital Experiences, Brand Identity, Content Production, and Performance Marketing. Fixed project packages and recurring retainers.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Services & Pricing — Four Pillars & Monthly Retainers | PixelMutiny',
    description:
      'Explore PixelMutiny’s four growth pillars: Digital Experiences, Brand Identity, Content Production, and Performance Marketing. Fixed project packages and recurring retainers.',
    url: '/services',
    siteName: 'PixelMutiny DigiMedia',
    images: [
      {
        url: '/website-design/01-home-landing.png',
        width: 1200,
        height: 630,
        alt: 'PixelMutiny Services and Pricing',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services & Pricing — Four Pillars & Monthly Retainers | PixelMutiny',
    description:
      'Fixed project packages and recurring monthly retainers for ambitious tech and consumer brands.',
    images: ['/website-design/01-home-landing.png'],
  },
};

export default function ServicesLayout({ children }) {
  return children;
}
