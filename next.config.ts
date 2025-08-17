/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators:false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      { protocol: 'https',
       hostname: 'qiublqgywyleulcpxmyq.supabase.co' }
    ],
  },
};

export default nextConfig;
