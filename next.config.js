/** @type {import('next').NextConfig} */
const nextConfig = {
  // Revalidate all pages every 3600 seconds (1 hour)
  // After you add a course in the admin portal, the site rebuilds automatically
  // via the Supabase webhook → Vercel deploy hook (see DEPLOYMENT.md)
};

module.exports = nextConfig;
