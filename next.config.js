/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aladdin-bucket0.s3.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https', // Assuming both are HTTPS, adjust if needed
        hostname: 'bhotaala.s3.amazonaws.com',
        pathname: '/**', // You can specify a specific path here (optional)
      },
      {
        protocol: 'https', // Assuming both are HTTPS, adjust if needed
        hostname: 'productsinn.s3.amazonaws.com',
        pathname: '/**', // You can specify a specific path here (optional)
      },
      {
        protocol: 'https', // Assuming both are HTTPS, adjust if needed
        hostname: 'res.cloudinary.com',
        pathname: '/**', // You can specify a specific path here (optional)
      },
    ],
  },
  async rewrites() {
    return [
      // Ensure dynamic category and product routes work
      {
        source: '/category/:name',
        destination: '/category/:name',
      },
      {
        source: '/product/:id',
        destination: '/product/:id', // Optional
      },
      // Middleware for all other routes
      {
        source: '/:path*',
        destination: '/api/datatrack',
      },
    ];
  },
};

module.exports = nextConfig;

