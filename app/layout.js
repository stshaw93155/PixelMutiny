import './gilroy.css';
import './globals.css';
import './onlines-theme.css';
import GlobalShell from './components/GlobalShell';

export const metadata = {
  title: 'PixelMutiny DigiMedia — Break the Template. Built Different.',
  description:
    'PixelMutiny DigiMedia LLP is a creative and digital studio that builds websites, dashboards, brand identities, content, and ad campaigns for brands and individuals who want to stand out instead of blend in.',
  keywords: [
    'PixelMutiny',
    'PixelMutiny DigiMedia',
    'PixelMutiny DigiMedia LLP',
    'Website Design & Development',
    'Landing Page Design',
    'UI/UX Design',
    'Dashboard Design & Development',
    'Graphics Design',
    'Reel & Video Editing',
    'Logo & Brand Identity',
    'Meta Ads',
  ],
  authors: [{ name: 'PixelMutiny DigiMedia LLP' }],
  metadataBase: new URL('https://pixelmutiny.com'),
  openGraph: {
    title: 'PixelMutiny DigiMedia — Break the Template. Built Different.',
    description:
      'PixelMutiny DigiMedia LLP is a creative and digital studio that builds websites, dashboards, brand identities, content, and ad campaigns for brands and individuals who want to stand out instead of blend in.',
    url: 'https://pixelmutiny.com',
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
