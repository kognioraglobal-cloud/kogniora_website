'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [sent, setSent]   = useState(false);
  const [busy, setBusy]   = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    // Replace this with your real form handler (Formspree, Resend, etc.)
    // For now, simulate a 1-second submit
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    setBusy(false);
  }

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <div className="contact-hero">
        <div className="contact-hero-bg" />
        <div className="contact-hero-inner">
          <h1>Get in <em>Touch</em></h1>
          <p>Whether you&apos;re looking to book a course, explore corporate training, or simply have a question, our team is here to help.</p>
        </div>
      </div>

      <div className="contact-body">
        <div className="contact-grid">

          {/* ── FORM ───────────────────────────────────────────── */}
          <div className="contact-form-card">
            <div className="cf-title">Send Us an Enquiry</div>
            <div className="cf-sub">We respond within 24 hours on business days.</div>

            {sent ? (
              <div className="form-success show">
                <div className="fs-icon">✅</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. A member of our team will be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name <span>*</span></label>
                    <input className="form-control" type="text" required placeholder="Jane"/>
                  </div>
                  <div className="form-group">
                    <label>Last Name <span>*</span></label>
                    <input className="form-control" type="text" required placeholder="Smith"/>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Work Email <span>*</span></label>
                    <input className="form-control" type="email" required placeholder="jane@company.com"/>
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input className="form-control" type="tel" placeholder="+1 555 000 0000"/>
                  </div>
                </div>
                <div className="form-group full">
                  <label>Organisation</label>
                  <input className="form-control" type="text" placeholder="Company name"/>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Enquiry Type <span>*</span></label>
                    <select className="form-control" required>
                      <option value="">— select —</option>
                      <option>Individual Booking</option>
                      <option>Corporate / Group Training</option>
                      <option>Course Information</option>
                      <option>Pricing &amp; Availability</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Team Size</label>
                    <select className="form-control">
                      <option value="">— select —</option>
                      <option>1 (Individual)</option>
                      <option>2–5</option>
                      <option>6–10</option>
                      <option>11–25</option>
                      <option>26–50</option>
                      <option>50+</option>
                    </select>
                  </div>
                </div>
                <div className="form-group full">
                  <label>Message <span>*</span></label>
                  <textarea className="form-control" required rows={4}
                    placeholder="Tell us which course you're interested in, your preferred city and dates…"/>
                </div>
                <button type="submit" className="form-submit-btn" disabled={busy}>
                  {busy ? 'Sending…' : 'Send Enquiry →'}
                </button>
              </form>
            )}
          </div>

          {/* ── SIDEBAR ────────────────────────────────────────── */}
          <div className="contact-info-col">
            <div className="contact-info-card">
              <h3>Contact Details</h3>
              <div className="contact-method">
                <div className="cm-icon">✉</div>
                <div>
                  <div className="cm-label">Email</div>
                  <div className="cm-value"><a href="mailto:info@kogniora.com">info@kogniora.com</a></div>
                  <div className="cm-sub">General &amp; course enquiries</div>
                </div>
              </div>
              <div className="contact-method">
                <div className="cm-icon">🏢</div>
                <div>
                  <div className="cm-label">Corporate Training</div>
                  <div className="cm-value"><a href="mailto:corporate.training@kogniora.com">corporate.training@kogniora.com</a></div>
                  <div className="cm-sub">Groups, on-site &amp; bespoke programmes</div>
                </div>
              </div>
            </div>

            <div className="contact-info-card">
              <h3>Global Offices</h3>
              <div className="office-list">
                {[
                  { flag:'🇦🇪', city:'Dubai, UAE',         type:'Regional HQ — Middle East' },
                  { flag:'🇬🇧', city:'London, UK',          type:'Regional HQ — Europe' },
                  { flag:'🇺🇸', city:'New York, USA',        type:'Regional HQ — Americas' },
                  { flag:'🇮🇳', city:'Bengaluru, India',        type:'Regional HQ — Asia Pacific' },
             //     { flag:'🇸🇬', city:'Singapore',            type:'Regional HQ — Asia Pacific' },
             //     { flag:'🇿🇦', city:'Johannesburg, SA',     type:'Regional HQ — Africa' },
                  ].map(o => (
                  <div key={o.city} className="office-item">
                    <span className="office-flag">{o.flag}</span>
                    <div>
                      <div className="office-city">{o.city}</div>
                      <div className="office-type">{o.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="response-card">
              <h3>Response Times</h3>
              {[
                'General enquiries — within 24 hours',
                'Corporate proposals — within 48 hours',
                'Urgent bookings — same day',
                'Monday – Friday, 9am – 6pm',
              ].map(item => (
                <div key={item} className="resp-item">
                  <span className="resp-dot"/>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
