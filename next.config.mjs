/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  compress: true,
  async redirects() {
    return [
      {
        source: '/work',
        destination: '/works',
        permanent: true,
      },
      {
        source: '/work/:slug',
        destination: '/works/:slug',
        permanent: true,
      },
      {
        source: '/agency',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/pricing',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/pricing/:path*',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/portfolio',
        destination: '/works',
        permanent: true,
      },
      {
        source: '/portfolio/:path*',
        destination: '/works',
        permanent: true,
      },
      {
        source: '/projects',
        destination: '/works',
        permanent: true,
      },
      {
        source: '/project/:slug',
        destination: '/works/:slug',
        permanent: true,
      },
      {
        source: '/case-studies',
        destination: '/works',
        permanent: true,
      },
      {
        source: '/case-study/:slug',
        destination: '/works/:slug',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
