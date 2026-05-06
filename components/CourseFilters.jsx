'use client';
import { useState, useMemo } from 'react';
import CourseCard from './CourseCard';

const CATEGORIES = [
  'All', 'Project Management', 'Agile & Scrum', 'Leadership',
  'Data & Analytics', 'HR & People', 'Finance', 'Digital & Tech', 'Health & Safety',
];

export default function CourseFilters({ courses, minPrices, nextDates, initialCat }) {
  const [search, setSearch]   = useState('');
  const [cat,    setCat]      = useState(initialCat || 'All');
  const [level,  setLevel]    = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
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

  return (
    <>
      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search courses, topics, keywords…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={cat} onChange={e => setCat(e.target.value)}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={level} onChange={e => setLevel(e.target.value)}>
          <option value="">All Levels</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>

      {/* Count */}
      <div className="results-count">
        {filtered.length} course{filtered.length !== 1 ? 's' : ''} found
        {search && <> for &ldquo;<b>{search}</b>&rdquo;</>}
        {cat !== 'All' && <> in <b>{cat}</b></>}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="empty">
          No courses found. <button onClick={() => { setSearch(''); setCat('All'); setLevel(''); }}
            style={{color:'var(--navy)',fontWeight:600,background:'none',border:'none',cursor:'pointer'}}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="cgrid">
          {filtered.map(c => (
            <CourseCard
              key={c.id}
              course={c}
              minPrice={minPrices[c.id]}
              nextDate={nextDates[c.id]}
            />
          ))}
        </div>
      )}
    </>
  );
}
