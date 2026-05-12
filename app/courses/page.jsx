import { getCourses, getMinPrices, getNextDates } from '../../lib/supabase';
import CourseFilters    from '../../components/CourseFilters';
import TrainerPromise   from '../../components/TrainerPromise';
import Testimonials     from '../../components/Testimonials';
import FAQ              from '../../components/FAQ';

export const revalidate = 3600;

export const metadata = {
  title: 'All Courses',
  description: 'Browse professional development courses across project management, leadership, HR, finance and more. Available in 18+ countries worldwide.',
};

export default async function CoursesPage({ searchParams }) {
  const [courses, minPrices, nextDates] = await Promise.all([
    getCourses(),
    getMinPrices(),
    getNextDates(),
  ]);

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
          Empowering professionals across 18 countries through practical, interactive, and results-driven training delivered by certified industry experts.
{/*            Accredited training programmes delivered by certified experts
            across 18 countries. In-person, practical, and results-driven.
*/}
            
          </p>
          {/* Updated stats with real Kogniora numbers */}
          <div className="hero-stats">
            <div className="hs">
              <div className="hs-v">25 K+</div>
              <div className="hs-l">Active Learners</div>
            </div>
            <div className="hs">
              <div className="hs-v">18</div>
              <div className="hs-l">Countries</div>
            </div>
            <div className="hs">
              <div className="hs-v">12 K+</div>
              <div className="hs-l">Sessions Delivered</div>
            </div>
            <div className="hs">
              {/*<div className="hs-v">{courses.length}+</div>*/}
              <div className="hs-v">98 %</div>
              <div className="hs-l">Sucess Rate</div>
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

      {/* ── TRAINER EXCELLENCE PROMISE ───────────────────────── */}
      <div id="trainer-promise">
          <TrainerPromise />
      </div>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <Testimonials />

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <div id="faq">
          <FAQ />
      </div>
    </>
  );
}
