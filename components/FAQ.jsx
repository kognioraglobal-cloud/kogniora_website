'use client';
import { useState } from 'react';

const FAQS = [
  {
    q: 'What countries do you offer training programs in?',
    a: 'We offer training programs across USA, Canada, Australia and all European countries. Our trainers are exclusively based in these regions to ensure world-class expertise and cultural understanding.',
  },
  {
    q: 'What is included in the course fee?',
    a: 'The course fee includes all training materials, a certificate of completion, access to your trainer for 15 days post-training for follow-up questions, and lunch / refreshments for in-person sessions. Accommodation and travel are not included.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Cancellations made 7 or more days before the course start date receive a full refund. Cancellations within 7 days can be transferred to a future cohort at no charge, or a credit note can be issued. We do not offer refunds for no-shows.',
  },
  {
    q: 'Can I attend online instead of in-person?',
    a: 'Our public courses are delivered in-person to maximise interaction and practical application. However, we offer virtual delivery too. Contact us for virtual options.',
  },
  {
    q: 'Do you offer group or corporate pricing?',
    a: 'Yes — we offer significant discounts for groups of 5 or more delegates from the same organisation. For groups of 10 or more, we can deliver the course at your offices globally. Contact our corporate team for a tailored proposal.',
  },
  {
    q: 'How do I book and pay?',
    a: 'Select your course, choose a city, and click "Book Now" to complete your booking through Eventbrite. We accept all major credit and debit cards. For corporate bookings requiring a purchase order or invoice, contact us directly and we will arrange a manual booking.',
  },
  {
    q: 'What if I need to attend in a city not listed?',
    a: 'We regularly add new cities based on demand. If your city is not listed, contact us, we may have an upcoming cohort not yet published, or we can arrange a dedicated session for your team.',
  },
  {
    q: 'Will I receive a certificate?',
    a: 'Yes. Every delegate who completes the course receives a certificate of completion.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section style={{background:'#fff', padding:'46px 32px'}}>
      <div style={{maxWidth:800, margin:'0 auto'}}>

        {/* Header */}
        <div style={{textAlign:'center', marginBottom:40}}>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:8,
            background:'var(--navydim)', border:'1px solid rgba(26,24,103,0.15)',
            borderRadius:30, padding:'5px 16px', marginBottom:14,
            fontSize:11, fontWeight:700, letterSpacing:'0.08em',
            textTransform:'uppercase', color:'var(--navy)',
          }}>
            ❓ Frequently Asked Questions
          </div>
          <h2 style={{
            fontFamily:'var(--fh)', fontSize:28, fontWeight:800,
            color:'var(--text)', marginBottom:10,
          }}>
            Everything You Need to Know
          </h2>
          <p style={{fontSize:14, color:'var(--muted)', lineHeight:1.7}}>
            Can&apos;t find your answer?{' '}
            <a href="/contact" style={{color:'var(--navy)', fontWeight:600, textDecoration:'none'}}>
              Contact our team →
            </a>
          </p>
        </div>

        {/* Accordion */}
        <div style={{display:'flex', flexDirection:'column', gap:8}}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              style={{
                border:'1px solid var(--bord)',
                borderRadius:12,
                overflow:'hidden',
                boxShadow: open===i ? '0 4px 16px rgba(26,24,103,0.08)' : 'none',
                transition:'box-shadow 0.2s',
              }}
            >
              {/* Question row — full row clickable */}
              <div
                onClick={() => setOpen(open===i ? null : i)}
                style={{
                  display:'flex', alignItems:'center',
                  justifyContent:'space-between', gap:16,
                  padding:'16px 20px',
                  background: open===i ? 'var(--navydim)' : '#fff',
                  cursor:'pointer',
                  userSelect:'none',
                  transition:'background 0.15s',
                }}
              >
                <div style={{display:'flex', alignItems:'center', gap:12}}>
                  <div style={{
                    width:26, height:26, borderRadius:'50%', flexShrink:0,
                    background: open===i ? 'var(--navy)' : 'var(--light)',
                    border:'1px solid var(--bord)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:11, fontWeight:700,
                    color: open===i ? '#fff' : 'var(--muted)',
                    transition:'all 0.2s',
                  }}>
                    {i+1}
                  </div>
                  <span style={{fontSize:14, fontWeight:600, color:'var(--text)', lineHeight:1.4}}>
                    {faq.q}
                  </span>
                </div>
                <div style={{
                  fontSize:12, color:'var(--muted)', flexShrink:0,
                  transform: open===i ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition:'transform 0.25s',
                }}>▼</div>
              </div>

              {/* Answer */}
              <div style={{
                display: open===i ? 'block' : 'none',
                padding:'0 20px 18px 58px',
                fontSize:13.5,
                color:'#374151',
                lineHeight:1.8,
                borderTop:'1px solid var(--bord)',
                background:'#fafbfc',
              }}>
                <div style={{paddingTop:14}}>{faq.a}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          marginTop:32, textAlign:'center',
          background:'linear-gradient(135deg,var(--navy),var(--navy2))',
          borderRadius:14, padding:'14px 24px',
        }}>
          <div style={{fontSize:18, fontWeight:700, color:'#fff', fontFamily:'var(--fh)', marginBottom:6}}>
            Still have questions ?
          </div>
          <div style={{fontSize:14, color:'rgba(255,255,205,0.65)', marginBottom:16}}>
            Our team responds within 24 hours on business days.
          </div>
          <a href="/contact" style={{
            display:'inline-flex', alignItems:'center', gap:8,
            background:'var(--red)', color:'#fff', textDecoration:'none',
            borderRadius:40, padding:'11px 24px',
            fontSize:14, fontWeight:700, fontFamily:'var(--f)',
            boxShadow:'0 4px 14px rgba(192,57,43,0.35)',
          }}>
            Contact Us →
          </a>
        </div>
      </div>
    </section>
  );
}
