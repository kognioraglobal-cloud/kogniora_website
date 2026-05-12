/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for next/image with local /public images
  images: {
    unoptimized: true,
    // If you later use external image URLs (e.g. from Supabase Storage),
    // add the hostname here:
    // remotePatterns: [{ hostname: 'your-project.supabase.co' }],
  },
  // Revalidate all pages every 3600 seconds (1 hour)
  // After you add a course in the admin portal, the site picks it up automatically
    optimizeFonts: true,
};

module.exports = nextConfig;
