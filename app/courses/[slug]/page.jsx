import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAllSlugs,
  getCourseBySlug,
  getPricing,
  getCourseEvents,
} from '../../../lib/supabase';
import CourseDetailTabs from '../../../components/CourseDetailTabs';

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map(slug => ({ slug }));
}

export const revalidate = 3600;

const BASE_URL = 'https://www.kogniora.com';

export async function generateMetadata({ params }) {
  const course = await getCourseBySlug(params.slug);
  if (!course) return { title: 'Course Not Found' };

  const title       = `${course.name} | Kogniora Global EdTech`;
  const description = course.short_description ||
    `Professional ${course.name} training available in 18+ countries. ` +
    `In-person, expert-led, results-driven. Book online — instant confirmation.`;
  const url         = `${BASE_URL}/courses/${params.slug}`;
  const keywords    = [
    course.name,
    course.category,
    ...(course.tags ? course.tags.split(',').map(t => t.trim()) : []),
    'professional training',
    'in-person course',
    'corporate training',
  ].filter(Boolean);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Kogniora Global EdTech',
      type:     'website',
      locale:   'en_US',
    },
    twitter: {
      card:        'summary_large_image',
      title,
      description,
      site:        '@KognioraGlobal',
    },
  };
}

export default async function CourseDetailPage({ params }) {
  const [course, events] = await Promise.all([
    getCourseBySlug(params.slug),
    getCourseEvents(params.slug),
  ]);

  if (!course) notFound();

  const pricing = await getPricing(course.id);
  const abbr = course.icon_abbr || course.name.slice(0, 3).toUpperCase();

  return (
    <>
      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <Link href="/courses" className="bc-link">Courses</Link>
        <span>›</span>
        <span style={{color:'var(--muted)'}}>{course.category}</span>
        <span>›</span>
        <span style={{color:'var(--text)',fontWeight:500}}>{course.name}</span>
      </div>

      {/*
        CourseDetailTabs renders:
          1. The dark hero section (course info + tab buttons)
          2. The tab panels (overview + booking) OUTSIDE the hero
        This avoids overflow:hidden on c-hero blocking interactions.
      */}
      <CourseDetailTabs
        course={course}
        events={events}
        pricing={pricing}
        abbr={abbr}
      />
    </>
  );
}
