'use client';
import { useState } from 'react';
import CourseOverview from './CourseOverview';
import BookingPanel   from './BookingPanel';

export default function CourseDetailTabs({ course, events, pricing }) {
  const [tab, setTab] = useState('overview');

  return (
    <>
      {/* Tab strip (inside the hero) */}
      <div className="c-hero-tabs">
        <button
          className={`tab-btn ${tab === 'overview' ? 'on' : ''}`}
          onClick={() => setTab('overview')}
        >
          📖 Course Overview
        </button>
        <button
          className={`tab-btn ${tab === 'booking' ? 'on' : ''}`}
          onClick={() => setTab('booking')}
          id="booking"
        >
          🎟 Cities, Dates &amp; Book
        </button>
      </div>

      {/* Tab panels */}
      <div className="det-body">
        <div className={`tab-panel ${tab === 'overview' ? 'on' : ''}`}>
          <CourseOverview course={course} pricing={pricing} />
        </div>
        <div className={`tab-panel ${tab === 'booking' ? 'on' : ''}`}>
          <BookingPanel
            events={events}
            pricing={pricing}
            courseName={course.name}
            durationDays={course.duration_days || 2}
          />
        </div>
      </div>
    </>
  );
}
