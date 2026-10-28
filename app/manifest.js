export default function manifest() {
  return {
    name: 'PixelMutiny DigiMedia — Break the Template. Built Different.',
    short_name: 'PixelMutiny',
    description:
      'PixelMutiny DigiMedia LLP is a creative and digital studio that builds websites, dashboards, brand identities, content, and ad campaigns for brands that refuse to blend in.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0F1F',
    theme_color: '#1F3FFF',
    icons: [
      {
        src: '/img/logo-main.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/img/logo-main.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
