// Replace with your actual domain once live
const BASE_URL = 'https://www.kogniora.com';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Block any internal/admin paths if you add them later
        disallow: ['/api/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host:    BASE_URL,
  };
}
