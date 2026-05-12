'use client';
import { useState, useMemo, useEffect } from 'react';
import CourseCard from './CourseCard';

const CATEGORIES = [
  'All', 'Leadership & Management', 'Human Resources',
  'Communication & Writing', 'Personal Development', 'Workplace Safety & Wellness',
  'Customer Service', 'Project & Operations Management', 'Training & Facilitation',
  'Diversity & Inclusion', 'Technology & Digital','Sales & Marketing'
];

const INITIAL_SHOW = 10; // cards shown before "Show More"

export default function CourseFilters({ courses, minPrices, nextDates, initialCat }) {
  const [search,   setSearch]   = useState('');
  const [cat,      setCat]      = useState(initialCat || 'All');
    // Sync with URL param changes (e.g. footer links)
        useEffect(() => {
          if (initialCat) setCat(initialCat);
                        }, [initialCat]);
  const [level,    setLevel]    = useState('');
  const [showAll,  setShowAll]  = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return courses.filter(c => {
      const matchSearch = !q ||
        c.name.toLowerCase().includes(q) ||
        (c.category || '').toLowerCase().includes(q) ||
        (c.tags || '').toLowerCase().includes(q) ||
        (c.short_description || '').toLowerCase().includes(q);
      const matchCat   = cat === 'All' || c.category === cat;
      const matchLevel = !level || c.level === level;
      return matchSearch && matchCat && matchLevel;
    });
  }, [courses, search, cat, level]);

  // Reset showAll when filters change so user always starts from top
  const handleSearch = (v) => { setSearch(v); setShowAll(false); };
  const handleCat    = (v) => { setCat(v);    setShowAll(false); };
  const handleLevel  = (v) => { setLevel(v);  setShowAll(false); };

  const visible     = showAll ? filtered : filtered.slice(0, INITIAL_SHOW);
  const hiddenCount = filtered.length - INITIAL_SHOW;
  const hasMore     = !showAll && filtered.length > INITIAL_SHOW;
  const canCollapse = showAll && filtered.length > INITIAL_SHOW;

  return (
    <>
      {/* ── Filters ─────────────────────────────────────────── */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search courses, topics, keywords…"
          value={search}
          onChange={e => handleSearch(e.target.value)}
        />
        <select value={cat} onChange={e => handleCat(e.target.value)}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={level} onChange={e => handleLevel(e.target.value)}>
          <option value="">All Levels</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>

      {/* ── Count ───────────────────────────────────────────── */}
      <div className="results-count">
        {filtered.length} course{filtered.length !== 1 ? 's' : ''} found
        {search && <> for &ldquo;<b>{search}</b>&rdquo;</>}
        {cat !== 'All' && <> in <b>{cat}</b></>}
        {!showAll && filtered.length > INITIAL_SHOW && (
          <span style={{color:'var(--muted)'}}> — showing {INITIAL_SHOW} of {filtered.length}</span>
        )}
      </div>

      {/* ── Grid ────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="empty">
          No courses found.{' '}
          <button
            onClick={() => { setSearch(''); setCat('All'); setLevel(''); setShowAll(false); }}
            style={{color:'var(--navy)',fontWeight:600,background:'none',border:'none',cursor:'pointer'}}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="cgrid">
            {visible.map(c => (
              <CourseCard
                key={c.id}
                course={c}
                minPrice={minPrices[c.id]}
                nextDate={nextDates[c.id]}
              />
            ))}
          </div>

          {/* ── Show More / Show Less ──────────────────────── */}
          {(hasMore || canCollapse) && (
            <div style={{
              display:'flex', flexDirection:'column',
              alignItems:'center', gap:10, marginTop:28, marginBottom:8,
            }}>
              <button
                type="button"
                onClick={() => {
                  setShowAll(v => !v);
                  // Scroll back to top of grid when collapsing
                  if (showAll) {
                    setTimeout(() => {
                      document.querySelector('.cgrid')?.scrollIntoView({behavior:'smooth', block:'start'});
                    }, 50);
                  }
                }}
                style={{
                  display:'inline-flex', alignItems:'center', gap:10,
                  padding:'12px 28px',
                  background: hasMore ? 'var(--navy)' : '#fff',
                  color: hasMore ? '#fff' : 'var(--navy)',
                  border: hasMore ? 'none' : '1.5px solid var(--navy)',
                  borderRadius:40, fontSize:14, fontWeight:600,
                  fontFamily:'var(--f)', cursor:'pointer',
                  boxShadow: hasMore ? '0 4px 16px rgba(26,24,103,0.2)' : 'none',
                  transition:'all 0.2s',
                }}
              >
                {hasMore ? (
                  <>
                    <span>Show {hiddenCount} More Course{hiddenCount !== 1 ? 's' : ''}</span>
                    <span style={{fontSize:12}}>▼</span>
                  </>
                ) : (
                  <>
                    <span>Show Less</span>
                    <span style={{fontSize:12}}>▲</span>
                  </>
                )}
              </button>
              {hasMore && (
                <div style={{fontSize:12, color:'var(--muted)'}}>
                  {INITIAL_SHOW} of {filtered.length} courses shown
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
