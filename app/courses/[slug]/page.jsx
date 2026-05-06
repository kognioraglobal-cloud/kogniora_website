import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAllSlugs,
  getCourseBySlug,
  getPricing,
  getCourseEvents,
} from '../../../lib/supabase';
import CourseDetailTabs from '../../../components/CourseDetailTabs';

// Pre-build all course pages at build time
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map(slug => ({ slug }));
}

// Revalidate every hour for new cities / dates
export const revalidate = 3600;

// Dynamic SEO metadata per course
export async function generateMetadata({ params }) {
  const course = await getCourseBySlug(params.slug);
  if (!course) return { title: 'Course Not Found' };
  return {
    title: course.name,
    description: course.short_description ||
      `Professional ${course.name} training available in 520+ cities worldwide. Book online via Eventbrite.`,
    keywords: course.tags ? course.tags.split(',').map(t => t.trim()) : [],
    openGraph: {
      title: `${course.name} | Kogniora Global EdTech`,
      description: course.short_description || '',
      type: 'website',
    },
  };
}

export default async function CourseDetailPage({ params }) {
  // Fetch all data in parallel
  const [course, events] = await Promise.all([
    getCourseBySlug(params.slug),
    getCourseEvents(params.slug),
  ]);

  if (!course) notFound();

  const pricing = await getPricing(course.id);

  // Build breadcrumb category label
  const abbr = course.icon_abbr || course.name.slice(0, 3).toUpperCase();

  return (
    <>
      {/* ── BREADCRUMB ──────────────────────────────────────── */}
      <div className="breadcrumb">
        <Link href="/courses" className="bc-link">Courses</Link>
        <span>›</span>
        <span style={{color:'var(--muted)'}}>{course.category}</span>
        <span>›</span>
        <span style={{color:'var(--text)',fontWeight:500}}>{course.name}</span>
      </div>

      {/* ── COURSE HERO ─────────────────────────────────────── */}
      <div className="c-hero">
        <div className="c-hero-bg" />
        <div className="c-hero-inner">
          <div className="c-hero-icon">{abbr}</div>
          <div style={{flex:1}}>
            <div className="c-hero-cat">{course.category}</div>
            <h1 className="c-hero-name">{course.name}</h1>
            {course.short_description && (
              <p className="c-hero-desc">{course.short_description}</p>
            )}
            <div className="c-hero-badges">
              <span className="cbadge">⏱ {course.duration_days || 2} Days</span>
              <span className="cbadge">📊 {course.level || 'Intermediate'}</span>
              <span className="cbadge">🌍 {events.length}+ Cities</span>
              {course.tags && course.tags.split(',').slice(0, 2).map(t => (
                <span key={t} className="cbadge">🏷 {t.trim()}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Tab strip — rendered client-side for interactivity */}
        <CourseDetailTabs
          course={course}
          events={events}
          pricing={pricing}
        />
      </div>
    </>
  );
}
