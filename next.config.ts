/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: false,
  },
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
      // Add your Supabase project URL hostname here
      // Example: { protocol: 'https', hostname: 'your-project-id.supabase.co' }
    ],
  },
};

export default nextConfig;
