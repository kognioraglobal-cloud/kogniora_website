import Link from 'next/link';
import { getCourses, getMinPrices } from '../../lib/supabase';

export const revalidate = 3600;

export const metadata = {
  title: 'Corporate Training',
  description: 'Tailored corporate training programmes for organisations of all sizes. Delivered on-site or at our venues across 520+ global cities.',
};

const CATEGORY_ICONS = {
  'Project Management': '📊',
  'Agile & Scrum':      '🔄',
  'Leadership':         '👑',
  'HR & People':        '👥',
  'Finance':            '💰',
  'Data & Analytics':   '📈',
  'Digital & Tech':     '💻',
  'Health & Safety':    '🦺',
};

export default async function CorporatePage() {
  const [courses, minPrices] = await Promise.all([getCourses(), getMinPrices()]);

  // Group by category
  const byCategory = courses.reduce((acc, c) => {
    const cat = c.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(c);
    return acc;
  }, {});

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <div className="corp-hero">
        <div className="corp-hero-bg" />
        <div className="corp-hero-grid" />
        <div className="corp-hero-inner">
          <h1>Training That <em>Transforms</em><br />Your Organisation</h1>
          <p className="corp-hero-sub">
            Accredited corporate training programmes delivered on-site or at premium venues
            across 520+ global cities. Custom content, flexible scheduling, group discounts.
          </p>
          <div className="corp-hero-ctas">
            <Link href="/contact" className="btn-primary">Request a Proposal →</Link>
            <button className="btn-outline-w">Download Brochure</button>
          </div>
        </div>
      </div>

      <div className="corp-body">

        {/* ── VALUE PROPS ──────────────────────────────────────── */}
        <div className="value-band" style={{marginBottom:44}}>
          <div className="value-band-title">Why Organisations Choose Kogniora</div>
          <div className="value-grid">
            {[
              { icon:'🎯', title:'Tailored Content', desc:'Every programme is customised to your industry, culture and learning objectives. We don\'t deliver off-the-shelf training.' },
              { icon:'🌍', title:'Global Delivery', desc:'Our certified trainer network spans 80+ countries. We deliver wherever your teams are — at your offices or our venues.' },
              { icon:'📜', title:'Accredited Programmes', desc:'All courses are aligned with international standards — PMI, HRCI, SHRM, CIPD and more. Real credentials, real value.' },
              { icon:'📊', title:'ROI Reporting', desc:'We provide pre/post assessments and impact reports so you can demonstrate training ROI to your leadership team.' },
              { icon:'💰', title:'Group Discounts', desc:'Significant discounts for groups of 5 or more. Dedicated account management for repeat engagements.' },
              { icon:'🤝', title:'Dedicated Support', desc:'Your dedicated training coordinator handles scheduling, logistics, materials and trainer briefing end-to-end.' },
            ].map(v => (
              <div key={v.title} className="value-card">
                <div className="value-icon">{v.icon}</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── COURSE CATEGORIES ────────────────────────────────── */}
        {Object.entries(byCategory).map(([cat, cats]) => (
          <div key={cat} className="cat-section">
            <div className="cat-header">
              <div className="cat-icon">{CATEGORY_ICONS[cat] || '📚'}</div>
              <div>
                <div className="cat-title">{cat}</div>
                <div className="cat-count">{cats.length} programme{cats.length !== 1 ? 's' : ''} available</div>
              </div>
            </div>
            <div className="cat-grid">
              {cats.map(c => (
                <Link key={c.id} href={`/courses/${c.slug}`} className="cat-course-card">
                  <div className="cat-course-name">{c.name}</div>
                  <div className="cat-course-meta">
                    <span className="cat-course-days">{c.duration_days || 2} days</span>
                    <span className="cat-course-price">
                      {minPrices[c.id] ? `from $${Number(minPrices[c.id]).toLocaleString()}` : 'POA'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* ── HOW IT WORKS ─────────────────────────────────────── */}
        <div className="process-section">
          <h2 style={{fontFamily:'var(--fh)',fontSize:22,fontWeight:800,marginBottom:6}}>How Corporate Bookings Work</h2>
          <p style={{fontSize:13,color:'var(--muted)',marginBottom:24}}>From first conversation to certificate in hand — five simple steps.</p>
          <div className="process-steps">
            {[
              { n:1, label:'Enquiry',       desc:'Submit your request with team size and preferred dates' },
              { n:2, label:'Consultation',  desc:'We\'ll call to understand your objectives and customise' },
              { n:3, label:'Proposal',      desc:'Receive a detailed proposal with content, cost and schedule' },
              { n:4, label:'Delivery',      desc:'Expert trainer delivers at your venue or ours worldwide' },
              { n:5, label:'Certification', desc:'Participants receive accredited certificates of completion' },
            ].map(s => (
              <div key={s.n} className="ps-step">
                <div className="ps-num">{s.n}</div>
                <div className="ps-label">{s.label}</div>
                <div className="ps-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA BAND ─────────────────────────────────────────── */}
        <div className="cta-band">
          <div>
            <h2>Ready to Upskill Your Team?</h2>
            <p>Talk to a training advisor today. We&apos;ll design a programme that fits your budget, timeline and learning objectives.</p>
          </div>
          <div style={{display:'flex',gap:12,flexShrink:0}}>
            <Link href="/contact" className="btn-primary">Request a Proposal →</Link>
          </div>
        </div>

      </div>
    </>
  );
}
