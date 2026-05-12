'use client';
import { useState } from 'react';
import CourseOverview from './CourseOverview';
import BookingPanel   from './BookingPanel';

function Stepper({ step }) {
  const steps = [{n:1,label:'Course'},{n:2,label:'City'},{n:3,label:'Date'},{n:4,label:'Book on Eventbrite'}];
  return (
    <div className="stepper">
      {steps.map((s,i)=>(
        <div key={s.n} style={{display:'flex',alignItems:'center',flex:i<steps.length-1?1:'none'}}>
          <div className={`stp${step>s.n?' done':step===s.n?' act':''}`}>
            <div className="stp-n">{step>s.n?'✓':s.n}</div>
            <div className="stp-l">{s.label}</div>
          </div>
          {i<steps.length-1&&<div className="stp-line"/>}
        </div>
      ))}
    </div>
  );
}

// CourseDetailTabs now owns the ENTIRE layout below breadcrumb.
// Hero section is rendered here so tab panels can live OUTSIDE
// the c-hero div (which has overflow:hidden that was blocking clicks).
export default function CourseDetailTabs({ course, events, pricing, abbr }) {
  const [tab,         setTab]         = useState('overview');
  const [bookingStep, setBookingStep] = useState(1);

  const handleStepChange = (step) => setTimeout(() => setBookingStep(step), 0);

  const goToBooking = () => {
    setTab('booking');
    setTimeout(() => { setBookingStep(1); window.scrollTo({top:0,behavior:'smooth'}); }, 50);
  };

  return (
    <>
      {/* ── HERO — overflow:hidden is fine here because tab panels are BELOW ── */}
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
              <span className="cbadge">⏱ {course.duration_days||2} Days</span>
              <span className="cbadge">📊 {course.level||'Intermediate'}</span>
              <span className="cbadge">🌍 {events.length}+ Cities</span>
              {course.tags && course.tags.split(',').slice(0,2).map(t=>(
                <span key={t} className="cbadge">🏷 {t.trim()}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Tab buttons — inside hero for dark background */}
        <div style={{display:'flex',gap:4,marginTop:20,position:'relative',zIndex:2}}>
          <button
            type="button"
            onClick={() => setTab('overview')}
            style={{
              padding:'13px 28px', fontSize:14,
              fontWeight: tab==='overview'?700:500,
              fontFamily:'var(--f)', cursor:'pointer', border:'none',
              borderRadius:'8px 8px 0 0', transition:'all 0.2s',
              display:'flex', alignItems:'center', gap:8,
              color: tab==='overview'?'#fff':'rgba(255,255,255,0.55)',
              background: tab==='overview'?'rgba(255,255,255,0.18)':'transparent',
              borderBottom: tab==='overview'?'3px solid #D4AF37':'3px solid transparent',
            }}
          >
            <span>📖</span> Course Overview
          </button>
          <button
            type="button"
            onClick={goToBooking}
            style={{
              padding:'13px 28px', fontSize:14,
              fontWeight: tab==='booking'?700:500,
              fontFamily:'var(--f)', cursor:'pointer', border:'none',
              borderRadius:'8px 8px 0 0', transition:'all 0.2s',
              display:'flex', alignItems:'center', gap:8,
              color: tab==='booking'?'#fff':'rgba(255,255,255,0.55)',
              background: tab==='booking'?'rgba(192,57,43,0.4)':'rgba(192,57,43,0.15)',
              borderBottom: tab==='booking'?'3px solid #C0392B':'3px solid rgba(192,57,43,0.4)',
            }}
          >
            <span>🎟</span> Cities, Dates &amp; Book
            <span style={{background:'var(--red)',color:'#fff',fontSize:10,fontWeight:700,padding:'2px 7px',borderRadius:20}}>
              BOOK
            </span>
          </button>
        </div>
      </div>

      {/* ── TAB PANELS — rendered OUTSIDE c-hero, no overflow:hidden ── */}
      <div style={{background:'#f8fafc'}}>

        {/* Overview panel */}
        {tab === 'overview' && (
          <div style={{padding:'26px 32px'}}>
            <CourseOverview
              course={course}
              pricing={pricing}
              onBookNow={goToBooking}
            />
          </div>
        )}

        {/* Booking panel */}
        {tab === 'booking' && (
          <div>
            <Stepper step={bookingStep}/>
            <div style={{padding:'26px 32px'}}>
              <BookingPanel
                events={events}
                pricing={pricing}
                courseName={course.name}
                durationDays={course.duration_days||2}
                courseId={course.id}
                onStepChange={handleStepChange}
              />
            </div>
          </div>
        )}

      </div>
    </>
  );
}
