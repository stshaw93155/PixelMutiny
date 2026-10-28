export const metadata = {
  title: 'Initiate Project Sprint — Request Proposal | PixelMutiny DigiMedia',
  description:
    'Book a discovery sprint, schedule a meeting, or request a custom proposal with PixelMutiny DigiMedia. Direct founder communication and 24-hour brief turnaround.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Initiate Project Sprint — Request Proposal | PixelMutiny DigiMedia',
    description:
      'Book a discovery sprint, schedule a meeting, or request a custom proposal with PixelMutiny DigiMedia. Direct founder communication and 24-hour brief turnaround.',
    url: '/contact',
    siteName: 'PixelMutiny DigiMedia',
    images: [
      {
        url: '/website-design/01-home-landing.png',
        width: 1200,
        height: 630,
        alt: 'Contact PixelMutiny DigiMedia',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Initiate Project Sprint — Request Proposal | PixelMutiny DigiMedia',
    description:
      'Book a discovery sprint, schedule a meeting, or request a custom proposal with PixelMutiny DigiMedia.',
    images: ['/website-design/01-home-landing.png'],
  },
};

export default function ContactLayout({ children }) {
  return children;
}
