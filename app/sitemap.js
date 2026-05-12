import { getAllSlugs } from '../lib/supabase';

// Replace with your actual domain once live
const BASE_URL = 'https://www.kogniora.com';

export default async function sitemap() {
  // Fetch all active course slugs from Supabase
  const slugs = await getAllSlugs();

  const coursePages = slugs.map(slug => ({
    url:              `${BASE_URL}/courses/${slug}`,
    lastModified:     new Date(),
    changeFrequency:  'weekly',
    priority:         0.8,
  }));

  return [
    {
      url:             `${BASE_URL}/courses`,
      lastModified:    new Date(),
      changeFrequency: 'daily',
      priority:        1.0,
    },
    {
      url:             `${BASE_URL}/corporate`,
      lastModified:    new Date(),
      changeFrequency: 'monthly',
      priority:        0.7,
    },
    {
      url:             `${BASE_URL}/contact`,
      lastModified:    new Date(),
      changeFrequency: 'monthly',
      priority:        0.6,
    },
    ...coursePages,
  ];
}
