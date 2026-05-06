'use client';
import { useState } from 'react';

function Accordion({ title, icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="section-card">
      <button className="sc-head" onClick={() => setOpen(o => !o)}>
        <span className="sc-title">
          <span className="sc-icon">{icon}</span>
          {title}
        </span>
        <span className={`sc-chev ${open ? 'open' : ''}`}>▼</span>
      </button>
      <div className={`sc-body ${open ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
}

function ModuleItem({ mod }) {
  const [open, setOpen] = useState(false);
  const topics = Array.isArray(mod.topics) ? mod.topics : [];
  return (
    <div className="module-item">
      <button className="module-head" onClick={() => setOpen(o => !o)}>
        <div>
          <div className="module-num">Module {mod.number}</div>
          <div className="module-name">{mod.title}</div>
        </div>
        <span className={`mod-chev ${open ? 'open' : ''}`}>▼</span>
      </button>
      <div className={`module-body ${open ? 'open' : ''}`}>
        {topics.length > 0 ? (
          <ul className="module-topics">
            {topics.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        ) : (
          <p style={{fontSize:12,color:'var(--muted)'}}>Topics to be confirmed.</p>
        )}
      </div>
    </div>
  );
}

export default function CourseOverview({ course, pricing }) {
  const learningPoints = course.what_you_learn
    ? course.what_you_learn.split('\n').map(l => l.trim()).filter(Boolean)
    : [];
  const modules = Array.isArray(course.modules) ? course.modules : [];

  return (
    <div className="ov-grid">
      {/* ── Left column ──────────────────────────────────────── */}
      <div>
        {/* Description */}
        {course.description && (
          <Accordion title="Course Overview" icon="📖" defaultOpen>
            <p style={{fontSize:13,color:'#374151',lineHeight:1.75,paddingTop:12}}>
              {course.description}
            </p>
          </Accordion>
        )}

        {/* What You Will Learn */}
        {learningPoints.length > 0 && (
          <Accordion title="What You Will Learn" icon="🎯" defaultOpen>
            <div className="learn-grid">
              {learningPoints.map((point, i) => (
                <div key={i} className="learn-item">
                  <div className="learn-bullet">
                    <svg viewBox="0 0 10 10"><polyline points="1.5,5.5 4,8 8.5,2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span className="learn-text">{point}</span>
                </div>
              ))}
            </div>
          </Accordion>
        )}

        {/* Course Modules */}
        {modules.length > 0 && (
          <Accordion title={`Course Modules (${modules.length})`} icon="📚" defaultOpen>
            <div className="module-list">
              {modules.map(mod => (
                <ModuleItem key={mod.number} mod={mod} />
              ))}
            </div>
          </Accordion>
        )}

        {/* Who Should Attend */}
        {course.who_should && (
          <Accordion title="Who Should Attend" icon="👥">
            <p style={{fontSize:13,color:'#374151',lineHeight:1.75,paddingTop:12}}>
              {course.who_should}
            </p>
          </Accordion>
        )}

        {/* Why Kogniora */}
        {course.why_kogniora && (
          <Accordion title="Why Enroll With Kogniora" icon="⭐">
            <p style={{fontSize:13,color:'#374151',lineHeight:1.75,paddingTop:12}}>
              {course.why_kogniora}
            </p>
          </Accordion>
        )}
      </div>

      {/* ── Right sidebar ─────────────────────────────────────── */}
      <div>
        {/* Quick info */}
        <div className="side-card">
          <div className="side-card-title">Course Details</div>
          <div className="info-row">
            <div className="info-icon">⏱</div>
            <div>
              <div className="info-val">{course.duration_days || 2} Days</div>
              <div className="info-key">Duration</div>
            </div>
          </div>
          <div className="info-row">
            <div className="info-icon">📊</div>
            <div>
              <div className="info-val">{course.level || 'Intermediate'}</div>
              <div className="info-key">Level</div>
            </div>
          </div>
          <div className="info-row">
            <div className="info-icon">🌍</div>
            <div>
              <div className="info-val">520+ Cities</div>
              <div className="info-key">Available Worldwide</div>
            </div>
          </div>
          <div className="info-row">
            <div className="info-icon">🏛</div>
            <div>
              <div className="info-val">In-Person</div>
              <div className="info-key">Delivery Method</div>
            </div>
          </div>
          {course.tags && (
            <div className="info-row">
              <div className="info-icon">🏷</div>
              <div>
                <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                  {course.tags.split(',').map(t => t.trim()).filter(Boolean).map(tag => (
                    <span key={tag} className="chip chip-n">{tag}</span>
                  ))}
                </div>
                <div className="info-key">Topics</div>
              </div>
            </div>
          )}
        </div>

        {/* Pricing */}
        {pricing.length > 0 && (
          <div className="side-card">
            <div className="side-card-title">Pricing</div>
            <div className="pricing-tiers">
              {pricing.map((tier, i) => (
                <div key={tier.tier_name} className={`tier-row ${i === 0 ? 'min-tier' : ''}`}>
                  <div>
                    <div className="tier-name">
                      {tier.tier_name}
                      {i === 0 && <span className="tier-badge">BEST</span>}
                    </div>
                    {tier.conditions && <div className="tier-desc">{tier.conditions}</div>}
                  </div>
                  <div className="tier-price">${Number(tier.price_usd).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trust signals */}
        <div className="side-card">
          <div className="side-card-title">Why Kogniora</div>
          <div className="trust-items">
            {[
              '✅ PMI & accredited programme',
              '🎓 Expert certified trainers',
              '📜 Certificate of completion',
              '📞 Post-training support',
              '💯 Satisfaction guarantee',
              '🌍 Global delivery network',
            ].map(item => (
              <div key={item} className="trust-item">{item}</div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <a href="#booking" className="btn-primary" style={{width:'100%',justifyContent:'center',marginBottom:8,display:'flex',textDecoration:'none'}}>
          Book This Course →
        </a>
        <a href="/contact" style={{display:'block',textAlign:'center',fontSize:12,color:'var(--muted)',textDecoration:'none'}}>
          or contact us for group pricing
        </a>
      </div>
    </div>
  );
}
