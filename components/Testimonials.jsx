'use client';
import { useEffect, useRef } from 'react';

const TESTIMONIALS = [
  {
    quote: "I walked into the Presentation Skills course dreading public speaking. Two days later I delivered a board-level pitch with confidence. The techniques are immediately practical.",
    name: "Emily Carter",
    role: "Marketing Manager",
    company: "Procter & Gamble",
    location: "Cincinnati, OH",
    flag: "🇺🇸",
    course: "Presentation Skills",
    rating: 5,
  },
  {
    quote: "The Workplace Diversity & Inclusion programme challenged my assumptions in the best way. Our team now has a shared language and a real action plan.",
    name: "James Whitfield",
    role: "HR Business Partner",
    company: "Barclays",
    location: "London, UK",
    flag: "🇬🇧",
    course: "Workplace Diversity & Inclusion",
    rating: 5,
  },
  {
    quote: "Public Speaking Mastery gave me frameworks I use every week. The coaching on vocal presence and structure alone was worth the entire course fee.",
    name: "Sarah O'Brien",
    role: "Senior Consultant",
    company: "Accenture",
    location: "Dublin, Ireland",
    flag: "🇮🇪",
    course: "Public Speaking Mastery",
    rating: 5,
  },
  {
    quote: "I went from constantly firefighting to actually finishing my day with time to spare. The Time Management course fundamentally changed how I structure my week.",
    name: "Michael Torres",
    role: "Operations Director",
    company: "Amazon",
    location: "Seattle, WA",
    flag: "🇺🇸",
    course: "Time Management",
    rating: 5,
  },
  {
    quote: "Leadership and Influence is the most practical leadership course I have attended. No theory for the sake of theory, just tools that work in real teams.",
    name: "Charlotte Davies",
    role: "Head of Engineering",
    company: "Rolls-Royce",
    location: "Derby, UK",
    flag: "🇬🇧",
    course: "Leadership and Influence",
    rating: 5,
  },
  {
    quote: "Our procurement team attended the Negotiation Skills course together. Within a month we renegotiated three supplier contracts.",
    name: "Robert Klein",
    role: "VP Procurement",
    company: "Siemens",
    location: "Munich, Germany",
    flag: "🇩🇪",
    course: "Negotiation Skills",
    rating: 5,
  },
  {
    quote: "The Human Resource Management course gave me the strategic grounding I was missing. I finally feel equipped to sit at the leadership table, not just execute decisions.",
    name: "Olivia Thompson",
    role: "HR Manager",
    company: "Johnson & Johnson",
    location: "New York, NY",
    flag: "🇺🇸",
    course: "Human Resource Management",
    rating: 5,
  },
  {
    quote: "Mastering Conflict Resolution transformed how our team handles disagreements. We now resolve issues faster and with far less damage to relationships.",
    name: "Luca Rossi",
    role: "Team Lead",
    company: "Ferrari",
    location: "Maranello, Italy",
    flag: "🇮🇹",
    course: "Mastering Conflict Resolution",
    rating: 5,
  },
  {
    quote: "Communication Strategies completely changed how I write emails, run meetings, and present data. My manager noticed the difference within a week.",
    name: "Hannah Müller",
    role: "Business Analyst",
    company: "Deutsche Bank",
    location: "Frankfurt, Germany",
    flag: "🇩🇪",
    course: "Communication Strategies",
    rating: 5,
  },
  {
    quote: "The Unconscious Bias workshop was honest, evidence-based, and free of the preachy tone you sometimes get with this topic. Our whole leadership team attended.",
    name: "David Lawson",
    role: "Chief People Officer",
    company: "Lloyds Banking Group",
    location: "London, UK",
    flag: "🇬🇧",
    course: "Unconscious Bias",
    rating: 5,
  },
  {
    quote: "Customer Service Excellence gave our front-line team a consistent framework and language. Customer satisfaction scores went up 18 points the following quarter.",
    name: "Jessica Allen",
    role: "Customer Experience Lead",
    company: "Delta Airlines",
    location: "Atlanta, GA",
    flag: "🇺🇸",
    course: "Customer Service Excellence",
    rating: 5,
  },
  {
    quote: "Ten Essential Soft Skills is exactly what it says, ten things every professional should know but rarely gets taught. Dense, practical, and worth far more than the price.",
    name: "Sophie Dubois",
    role: "Graduate Program Manager",
    company: "L'Oréal",
    location: "Paris, France",
    flag: "🇫🇷",
    course: "Ten Essential Soft Skills",
    rating: 5,
  },
];

export default function Testimonials() {
  const trackRef = useRef(null);
  const animRef  = useRef(null);
  const posRef   = useRef(0);
  const pausedRef = useRef(false);

  // Duplicate cards for seamless infinite scroll
  const cards = [...TESTIMONIALS, ...TESTIMONIALS];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const speed = 0.5; // px per frame — lower = slower

    const animate = () => {
      if (!pausedRef.current) {
        posRef.current -= speed;
        // Reset when we've scrolled one full set of original cards
        const halfWidth = track.scrollWidth / 2;
        if (Math.abs(posRef.current) >= halfWidth) {
          posRef.current = 0;
        }
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const stars = (n) => Array.from({length:5},(_,i) => (
    <span key={i} style={{color: i<n ? '#F59E0B' : '#e2e8f0', fontSize:12}}>★</span>
  ));

  const cardW = 280; // card width in px

  return (
    <section style={{background:'#f8fafc', padding:'52px 0', overflow:'hidden'}}>

      {/* Header */}
      <div style={{textAlign:'center', marginBottom:36, padding:'0 32px'}}>
        <div style={{
          display:'inline-flex', alignItems:'center', gap:8,
          background:'var(--navydim)', border:'1px solid rgba(26,24,103,0.15)',
          borderRadius:30, padding:'5px 16px', marginBottom:14,
          fontSize:11, fontWeight:700, letterSpacing:'0.08em',
          textTransform:'uppercase', color:'var(--navy)',
        }}>
          💬 What Our Delegates Say
        </div>
        <h2 style={{
          fontFamily:'var(--fh)', fontSize:26, fontWeight:800,
          color:'var(--text)', marginBottom:8, lineHeight:1.2,
        }}>
          Trusted by Professionals Worldwide
        </h2>
        <p style={{fontSize:13, color:'var(--muted)', lineHeight:1.7}}>
          Feedback from delegates across the USA and Europe.
        </p>
      </div>

      {/* Scrolling track — no scrollbar, no padding clipping */}
      <div
        style={{overflow:'hidden', cursor:'grab', userSelect:'none'}}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        <div
          ref={trackRef}
          style={{
            display:'flex',
            gap:14,
            width:'max-content',
            padding:'8px 0 16px',
            willChange:'transform',
          }}
        >
          {cards.map((t, i) => (
            <div
              key={i}
              style={{
                width: cardW,
                flexShrink: 0,
                background:'#fff',
                border:'1px solid var(--bord)',
                borderRadius:14,
                padding:'16px 16px 14px',
                boxShadow:'0 2px 10px rgba(26,24,103,0.06)',
                display:'flex',
                flexDirection:'column',
                gap:10,
              }}
            >
              {/* Stars + course badge */}
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:6}}>
                <div style={{display:'flex', gap:1}}>{stars(t.rating)}</div>
                <span style={{
                  fontSize:9, fontWeight:700, background:'var(--navydim)',
                  color:'var(--navy)', padding:'2px 7px', borderRadius:20,
                  whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',
                  maxWidth:130,
                }}>{t.course}</span>
              </div>

              {/* Quote */}
              <p style={{
                fontSize:12, color:'#374151', lineHeight:1.7,
                fontStyle:'italic', flex:1, margin:0,
                display:'-webkit-box', WebkitLineClamp:5,
                WebkitBoxOrient:'vertical', overflow:'hidden',
              }}>
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Person */}
              <div style={{
                display:'flex', alignItems:'center', gap:9,
                paddingTop:10, borderTop:'1px solid #f1f5f9',
              }}>
                <div style={{
                  width:32, height:32, borderRadius:'50%', flexShrink:0,
                  background:'linear-gradient(135deg,var(--navy),var(--navy2))',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:11, color:'#fff', fontWeight:700, fontFamily:'var(--fh)',
                }}>
                  {t.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <div style={{minWidth:0}}>
                  <div style={{fontSize:12, fontWeight:700, color:'var(--text)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
                    {t.flag} {t.name}
                  </div>
                  <div style={{fontSize:10, color:'var(--muted)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
                    {t.role} {/*· {t.company} */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust bar */}
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'center',
        gap:36, flexWrap:'wrap', padding:'24px 32px 0',
        borderTop:'1px solid var(--bord)', marginTop:8,
      }}>
        {[
          {val:'4.9/5', label:'Average Rating'},
          {val:'25K+',  label:'Delegates Trained'},
          {val:'96%',   label:'Would Recommend'},
          {val:'18',    label:'Countries'},
        ].map(s=>(
          <div key={s.val} style={{textAlign:'center'}}>
            <div style={{fontFamily:'var(--fh)', fontSize:20, fontWeight:800, color:'var(--navy)'}}>{s.val}</div>
            <div style={{fontSize:10, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.06em'}}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
