'use client';
import { useState, useMemo, useEffect } from 'react';

const REGIONS = ['All Regions', 'North America', 'Europe', 'Middle East', 'Africa', 'Asia Pacific', 'South America'];
const CITIES_PER_PAGE = 8;

export default function BookingPanel({ events, pricing, courseName, durationDays }) {
  const [search,       setSearch]       = useState('');
  const [region,       setRegion]       = useState('All Regions');
  const [selectedCity, setSelectedCity] = useState(null); // full event row
  const [cityPage,     setCityPage]     = useState(0);
  const [moreOpen,     setMoreOpen]     = useState(false);
  const [ebLoaded,     setEbLoaded]     = useState(false);

  // Min price for display
  const minPrice = pricing.length
    ? Math.min(...pricing.map(p => Number(p.price_usd)))
    : null;

  // Filtered city list
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return events.filter(e =>
      (!q || e.city.toLowerCase().includes(q) || (e.country || '').toLowerCase().includes(q)) &&
      (region === 'All Regions' || e.region === region)
    );
  }, [events, search, region]);

  // Reset page on filter change
  useEffect(() => { setCityPage(0); setMoreOpen(false); }, [search, region]);

  const totalPages = Math.ceil(filtered.length / CITIES_PER_PAGE);
  const paginated  = filtered.slice(cityPage * CITIES_PER_PAGE, (cityPage + 1) * CITIES_PER_PAGE);

  // Load Eventbrite widget script once
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.EBWidgets) { setEbLoaded(true); return; }
    const script = document.createElement('script');
    script.src = 'https://www.eventbrite.com/static/widgets/eb_widgets.js';
    script.async = true;
    script.onload = () => setEbLoaded(true);
    document.head.appendChild(script);
  }, []);

  // Render Eventbrite widget when city is selected and has an event ID
  useEffect(() => {
    if (!selectedCity?.eventbrite_event_id || !ebLoaded) return;
    if (typeof window === 'undefined' || !window.EBWidgets) return;
    const containerId = 'eb-widget-container';
    // Clear previous widget
    const container = document.getElementById(containerId);
    if (container) container.innerHTML = '';
    try {
      window.EBWidgets.createWidget({
        widgetType:  'checkout',
        eventId:     selectedCity.eventbrite_event_id,
        iframeContainerId: containerId,
        iframeContainerHeight: 425,
        onOrderComplete: () => {
          console.log('Order complete for', selectedCity.eventbrite_event_id);
        },
      });
    } catch (e) {
      console.warn('EBWidgets error:', e);
    }
  }, [selectedCity, ebLoaded]);

  const handleCitySelect = (event) => {
    setSelectedCity(event);
    // Scroll to dates panel smoothly
    setTimeout(() => {
      document.getElementById('dates-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr + 'T00:00:00');
    return {
      day:   d.getDate(),
      month: d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
      full:  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    };
  };

  const nextDate    = selectedCity?.next_date     ? formatDate(selectedCity.next_date)    : null;
  const nextEndDate = selectedCity?.next_end_date  ? formatDate(selectedCity.next_end_date) : null;

  return (
    <div className="booking-layout">
      {/* ── LEFT: City + Dates ─────────────────────────────── */}
      <div>
        {/* Step 1 — Select City */}
        <div style={{marginBottom: 24}}>
          <div className="bsec-step">Step 1</div>
          <div className="bsec-title">Select Your City</div>
          <div className="bsec-sub">Choose the city where you&apos;d like to attend the training.</div>

          <div className="city-search-row">
            <input
              type="text"
              placeholder="Search cities…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select value={region} onChange={e => setRegion(e.target.value)}>
              {REGIONS.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="empty">No cities found for this region. <button onClick={() => { setSearch(''); setRegion('All Regions'); }} style={{color:'var(--navy)',fontWeight:600,background:'none',border:'none',cursor:'pointer'}}>Clear filters</button></div>
          ) : (
            <>
              <div className="city-featured">
                {paginated.map(event => (
                  <div
                    key={event.city_id}
                    className={`city-card ${selectedCity?.city_id === event.city_id ? 'sel' : ''}`}
                    onClick={() => handleCitySelect(event)}
                  >
                    <div className="city-sel-dot">✓</div>
                    <div className="city-flag">{event.flag_emoji || '🌍'}</div>
                    <div className="city-name">{event.city}</div>
                    <div className="city-meta">{event.country_code}</div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="city-page">
                  <span className="pg-info">{cityPage + 1} / {totalPages} · {filtered.length} cities</span>
                  <button className="pg-btn" disabled={cityPage === 0} onClick={() => setCityPage(p => p - 1)}>← Prev</button>
                  <button className="pg-btn" disabled={cityPage >= totalPages - 1} onClick={() => setCityPage(p => p + 1)}>Next →</button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Step 2 — Dates (shown after city selected) */}
        {selectedCity && (
          <div id="dates-panel" className="dates-panel">
            <div className="dp-header">
              <div className="dp-city-info">
                <span className="dp-flag">{selectedCity.flag_emoji || '🌍'}</span>
                <div>
                  <div className="dp-name">{selectedCity.city}, {selectedCity.country}</div>
                  <div className="dp-sub">{courseName} · {durationDays} days</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedCity(null)}
                style={{background:'none',border:'1px solid var(--bord)',borderRadius:20,padding:'4px 12px',fontSize:11,cursor:'pointer',color:'var(--muted)'}}
              >
                ✕ Change city
              </button>
            </div>

            {nextDate ? (
              <>
                <div className="bsec-step">Step 2</div>
                <div className="bsec-title" style={{marginBottom:14}}>Available Dates</div>
                <div className="date-cards">
                  <div className="date-card sel">
                    <div className="dc-top">
                      <div className="dc-cal">
                        <div className="dc-day">{nextDate.day}</div>
                        <div className="dc-mon">{nextDate.month}</div>
                      </div>
                      <span className="seat-ok">Available</span>
                    </div>
                    <div className="dc-venue">
                      {nextDate.full}
                      {nextEndDate && ` – ${nextEndDate.full}`}
                      <br />{selectedCity.city}, {selectedCity.country}
                    </div>
                    {minPrice && (
                      <div className="dc-price">
                        ${Number(minPrice).toLocaleString()}
                        <span className="dc-price-note"> / person</span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div style={{background:'var(--amberl)',border:'1px solid #fcd34d',borderRadius:'var(--rm)',padding:'13px 15px',fontSize:13,color:'var(--amber)',marginBottom:18}}>
                📅 <b>Dates coming soon</b> for {selectedCity.city}. <a href="/contact" style={{color:'var(--navy)',fontWeight:600}}>Contact us</a> to confirm your preferred date.
              </div>
            )}

            {/* Step 3 — Booking */}
            <div className="bsec-step" style={{marginTop: nextDate ? 0 : 8}}>Step 3</div>
            <div className="bsec-title" style={{marginBottom:14}}>Complete Your Booking</div>

            {selectedCity.eventbrite_event_id ? (
              <>
                {/* Eventbrite booking panel */}
                <div className="eb-wrap" style={{marginBottom:16}}>
                  <div className="eb-inner">
                    <div>
                      <div className="eb-title">Secure Your Place</div>
                      <div className="eb-sub">
                        Book directly through Eventbrite — instant confirmation,
                        secure payment, easy cancellation.
                      </div>
                      <div className="eb-chips">
                        <span className="eb-chip">✓ Instant Confirmation</span>
                        <span className="eb-chip">✓ Secure Payment</span>
                        <span className="eb-chip">✓ Free Cancellation</span>
                      </div>
                    </div>
                    <div className="eb-right">
                      {minPrice && (
                        <>
                          <div className="eb-price-from">from</div>
                          <div className="eb-price-val">${Number(minPrice).toLocaleString()}</div>
                          <div className="eb-price-note">per person</div>
                        </>
                      )}
                      <a
                        href={selectedCity.eventbrite_event_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="eb-btn"
                      >
                        Book Now <span className="eb-arrow">→</span>
                      </a>
                    </div>
                  </div>
                  <div className="eb-trust">
                    <span className="eb-trust-item">🔒 SSL Secured</span>
                    <span className="eb-trust-item">✉ Instant email confirmation</span>
                    <span className="eb-trust-item">📋 PMI-accredited</span>
                  </div>

                  {/* Eventbrite inline widget */}
                  <div
                    id="eb-widget-container"
                    style={{marginTop:18, borderRadius:'var(--rm)', overflow:'hidden', background:'rgba(255,255,255,0.06)'}}
                  />
                </div>
              </>
            ) : (
              <div className="eb-wrap">
                <div className="eb-no-event">
                  <span style={{fontSize:22}}>📩</span>
                  <div className="eb-no-event-text">
                    Online booking coming soon for {selectedCity.city}.{' '}
                    <a href={`/contact?course=${encodeURIComponent(courseName)}&city=${encodeURIComponent(selectedCity.city)}`}>
                      Contact us to reserve your place
                    </a>{' '}
                    and we&apos;ll confirm availability within 24 hours.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── RIGHT: Booking Summary Sidebar ─────────────────── */}
      <div>
        {/* Pricing tiers */}
        {pricing.length > 0 && (
          <div className="bs-card">
            <div className="bs-title">💰 Pricing Tiers</div>
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

        {/* Booking summary */}
        <div className="bs-card">
          <div className="bs-title">📋 Booking Summary</div>
          <div className="bs-row">
            <span className="bs-key">Course</span>
            <span className="bs-val">{courseName}</span>
          </div>
          <div className="bs-row">
            <span className="bs-key">Duration</span>
            <span className="bs-val">{durationDays} days</span>
          </div>
          <div className="bs-row">
            <span className="bs-key">City</span>
            <span className={`bs-val ${!selectedCity ? 'na' : ''}`}>
              {selectedCity ? `${selectedCity.flag_emoji || ''} ${selectedCity.city}` : '— select city above'}
            </span>
          </div>
          <div className="bs-row">
            <span className="bs-key">Next Date</span>
            <span className={`bs-val ${!selectedCity?.next_date ? 'na' : ''}`}>
              {selectedCity?.next_month_label || (selectedCity ? 'Contact for dates' : '—')}
            </span>
          </div>
          <div className="bs-row">
            <span className="bs-key">Price from</span>
            <span className="bs-val">
              {minPrice ? `$${Number(minPrice).toLocaleString()}` : 'Contact us'}
            </span>
          </div>
        </div>

        {/* Need help */}
        <div className="bs-card" style={{background:'linear-gradient(135deg,var(--navy),var(--navy2))', border:'none'}}>
          <div style={{fontSize:13,fontWeight:700,color:'#fff',marginBottom:6}}>Need help choosing?</div>
          <div style={{fontSize:12,color:'rgba(255,255,255,0.65)',marginBottom:14,lineHeight:1.6}}>
            Our training advisors are available Mon–Fri 9am–6pm GMT to help you select the right course and date.
          </div>
          <a href="/contact" className="eb-btn" style={{fontSize:12,padding:'9px 18px'}}>Talk to an Advisor →</a>
        </div>
      </div>
    </div>
  );
}
