/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.ytimg.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'another-domain.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
  };
  export default nextConfig;
