import { getCourses, getMinPrices, getNextDates } from '../../lib/supabase';
import CourseFilters from '../../components/CourseFilters';

// Revalidate every hour — picks up new courses without a full redeploy
export const revalidate = 3600;

export const metadata = {
  title: 'All Courses',
  description: 'Browse 100+ professional development courses across project management, leadership, HR, finance and more. Available in 520+ cities worldwide.',
};

export default async function CoursesPage({ searchParams }) {
  const [courses, minPrices, nextDates] = await Promise.all([
    getCourses(),
    getMinPrices(),
    getNextDates(),
  ]);

  // Count unique categories for the hero stats
  const categories = new Set(courses.map(c => c.category).filter(Boolean)).size;
  const initialCat = searchParams?.cat || 'All';

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <div className="hero">
        <div className="hero-mesh" />
        <div className="hero-grid" />
        <div className="hero-inner">
          <div className="hero-pill">
            <span className="pill-dot" />
            Professional Development Training
          </div>
          <h1>
            Expand Your Skills,<br />
            <em>Advance Your Career</em>
          </h1>
          <p className="hero-sub">
            Accredited training programmes delivered by certified experts
            across 520+ cities on 6 continents. In-person, practical,
            and results-driven.
          </p>
          <div className="hero-stats">
            <div className="hs">
              <div className="hs-v">{courses.length}+</div>
              <div className="hs-l">Courses</div>
            </div>
            <div className="hs">
              <div className="hs-v">520+</div>
              <div className="hs-l">Cities</div>
            </div>
            <div className="hs">
              <div className="hs-v">{categories}</div>
              <div className="hs-l">Categories</div>
            </div>
            <div className="hs">
              <div className="hs-v">6</div>
              <div className="hs-l">Continents</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── COURSE GRID ──────────────────────────────────────── */}
      <div className="page-body">
        <CourseFilters
          courses={courses}
          minPrices={minPrices}
          nextDates={nextDates}
          initialCat={initialCat}
        />
      </div>
    </>
  );
}
