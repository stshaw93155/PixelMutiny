import './gilroy.css';
import './globals.css';
import './onlines-theme.css';
import GlobalShell from './components/GlobalShell';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pixelmutiny.com';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'PixelMutiny DigiMedia — Break the Template. Built Different.',
  description:
    'PixelMutiny DigiMedia Private Limited is a strategy-led digital agency that builds websites, brand identities, creative production, and business automation workflows.',
  alternates: {
    canonical: '/',
  },
  keywords: [
    'PixelMutiny',
    'PixelMutiny DigiMedia',
    'PixelMutiny DigiMedia Private Limited',
    'Website Design & Development',
    'Landing Page Design',
    'UI/UX Design',
    'Dashboard Design & Development',
    'Brand Identity & Design',
    'CRM Implementation',
    'Business Automation',
    'Video Editing',
    'Meta Ads',
  ],
  authors: [{ name: 'PixelMutiny DigiMedia Private Limited' }],
  openGraph: {
    title: 'PixelMutiny DigiMedia — Break the Template. Built Different.',
    description:
      'PixelMutiny DigiMedia Private Limited is a strategy-led digital agency that builds websites, brand identities, creative production, and business automation workflows.',
    url: '/',
    siteName: 'PixelMutiny DigiMedia',
    images: [
      {
        url: '/website-design/01-home-landing.png',
        width: 1200,
        height: 630,
        alt: 'PixelMutiny DigiMedia Creative & Digital Studio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PixelMutiny DigiMedia — Break the Template. Built Different.',
    description:
      'We design, build, and grow brands. Websites, landing pages, UI/UX, dashboards, logos, graphics, reels, and Meta Ads, all under one roof.',
    images: ['/website-design/01-home-landing.png'],
  },
  icons: {
    icon: '/img/logo-main.png',
    shortcut: '/img/logo-main.png',
    apple: '/img/logo-main.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FFFFFF',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <GlobalShell>{children}</GlobalShell>
      </body>
    </html>
  );
}
