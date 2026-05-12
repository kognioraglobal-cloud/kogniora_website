'use client';
import { useState, useMemo, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const REGIONS = ['All Regions','North America','Europe','Middle East','Africa','Asia Pacific','South America'];
const PER_PAGE = 8;

export default function BookingPanel({ events, pricing, courseName, durationDays, onStepChange, courseId }) {
  const [search,       setSearch]       = useState('');
  const [region,       setRegion]       = useState('All Regions');
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityPage,     setCityPage]     = useState(0);
  const [ebLoaded,     setEbLoaded]     = useState(false);
  const [cityDates,    setCityDates]    = useState([]);
  const [datesLoading, setDatesLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // ── Filtering ─────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return events.filter(e => {
      const ms = !q || (e.city||'').toLowerCase().includes(q) || (e.country||'').toLowerCase().includes(q) || (e.state_province||'').toLowerCase().includes(q);
      const mr = region === 'All Regions' || (e.region||'') === region;
      return ms && mr;
    });
  }, [events, search, region]);

  useEffect(() => { setCityPage(0); }, [search, region]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice(cityPage * PER_PAGE, (cityPage + 1) * PER_PAGE);

  // ── Step notifications ────────────────────────────────────────────────────
  useEffect(() => { if (selectedCity) setTimeout(() => onStepChange?.(2), 0); }, [selectedCity]);
  useEffect(() => { if (cityDates.length > 0) setTimeout(() => onStepChange?.(3), 0); }, [cityDates]);

  // ── Fetch dates for selected city ─────────────────────────────────────────
  useEffect(() => {
    if (!selectedCity || !courseId) { setCityDates([]); return; }
    const today = new Date().toISOString().slice(0,10);
    setDatesLoading(true);
    setSelectedDate(null);
    supabase
      .from('date_groups')
      .select('id,group_name,start_date,end_date,month_label,date_group_cities!inner(city_id)')
      .eq('course_id', courseId)
      .eq('is_active', true)
      .eq('date_group_cities.city_id', selectedCity.city_id)
      .gte('start_date', today)
      .order('start_date', { ascending: true })
      .then(({ data, error }) => {
        if (error) { console.error('cityDates:', error.message); setCityDates([]); }
        else { setCityDates(data ?? []); if (data?.length) setSelectedDate(data[0]); }
        setDatesLoading(false);
      });
  }, [selectedCity, courseId]);

  // ── Load Eventbrite script ────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.EBWidgets) { setEbLoaded(true); return; }
    const s = document.createElement('script');
    s.src = 'https://www.eventbrite.com/static/widgets/eb_widgets.js';
    s.async = true;
    s.onload = () => setEbLoaded(true);
    document.head.appendChild(s);
  }, []);

  // ── Eventbrite widget ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!selectedCity?.eventbrite_event_id || !ebLoaded) return;
    if (typeof window === 'undefined' || !window.EBWidgets) return;
    if (window.location.protocol !== 'https:') return;
    const container = document.getElementById('eb-widget-container');
    if (container) container.innerHTML = '';
    try {
      window.EBWidgets.createWidget({
        widgetType: 'checkout',
        eventId: selectedCity.eventbrite_event_id,
        iframeContainerId: 'eb-widget-container',
        iframeContainerHeight: 425,
        onOrderComplete: () => setTimeout(() => onStepChange?.(4), 0),
      });
    } catch(e) { console.warn('EBWidgets error:', e); }
  }, [selectedCity, ebLoaded]);

  const minPrice = pricing.length ? Math.min(...pricing.map(p=>Number(p.price_usd))) : null;

  const formatDate = (d) => {
    if (!d) return null;
    const dt = new Date(d + 'T00:00:00');
    return {
      day:   dt.getDate(),
      month: dt.toLocaleDateString('en-GB', {month:'short'}).toUpperCase(),
      full:  dt.toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'}),
    };
  };

  const handleCitySelect = (ev) => {
    setSelectedCity(ev);
    setTimeout(() => document.getElementById('dates-panel')?.scrollIntoView({behavior:'smooth',block:'start'}), 100);
  };

  // ── Input styles (inline — no CSS class dependency) ───────────────────────
  const inputStyle = {
    flex:1, padding:'10px 14px',
    border:'1.5px solid #e2e8f0', borderRadius:8,
    fontSize:13, fontFamily:'DM Sans, sans-serif',
    color:'#0f172a', background:'#fff',
    outline:'none', boxSizing:'border-box',
    WebkitAppearance:'none',
  };
  const selectStyle = {
    padding:'10px 14px',
    border:'1.5px solid #e2e8f0', borderRadius:8,
    fontSize:13, fontFamily:'DM Sans, sans-serif',
    color:'#0f172a', background:'#fff',
    cursor:'pointer', outline:'none',
    WebkitAppearance:'auto',
  };

  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:22,alignItems:'start'}}>

      {/* ── LEFT: City + Dates ──────────────────────────────────────────── */}
      <div style={{minWidth:0}}>

        {/* Step 1 — City */}
        <div style={{marginBottom:24}}>
          <div className="bsec-step">Step 1</div>
          <div className="bsec-title">Select Your City</div>
          <div className="bsec-sub">Choose the city where you&apos;d like to attend.</div>

          {/* Search + Region — inline styles, no CSS class */}
          <div style={{display:'flex',gap:10,marginBottom:12}}>
            <input
              type="text"
              placeholder="Search cities, countries…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={inputStyle}
            />
            <select
              value={region}
              onChange={e => setRegion(e.target.value)}
              style={selectStyle}
            >
              {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div style={{fontSize:11,color:'var(--muted)',marginBottom:8}}>
            {filtered.length} of {events.length} cities
          </div>

          {filtered.length === 0 ? (
            <div className="empty">
              No cities found.{' '}
              <button onClick={() => { setSearch(''); setRegion('All Regions'); }}
                style={{color:'var(--navy)',fontWeight:600,background:'none',border:'none',cursor:'pointer'}}>
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className="city-featured">
                {paginated.map(ev => (
                  <div
                    key={ev.city_id}
                    className={`city-card${selectedCity?.city_id===ev.city_id?' sel':''}`}
                    onClick={() => handleCitySelect(ev)}
                    style={{cursor:'pointer',position:'relative',zIndex:2}}
                  >
                    <div className="city-sel-dot">✓</div>
                    <div className="city-flag">{ev.flag_emoji||'🌍'}</div>
                    <div className="city-name">{ev.city}</div>
                    <div className="city-meta">{ev.country_code}</div>
                  </div>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="city-page">
                  <span className="pg-info">{cityPage+1} / {totalPages} · {filtered.length} cities</span>
                  <button className="pg-btn" disabled={cityPage===0} onClick={()=>setCityPage(p=>p-1)}>← Prev</button>
                  <button className="pg-btn" disabled={cityPage>=totalPages-1} onClick={()=>setCityPage(p=>p+1)}>Next →</button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Step 2 + 3 — Dates + Booking */}
        {selectedCity && (
          <div id="dates-panel" className="dates-panel">
            <div className="dp-header">
              <div className="dp-city-info">
                <span className="dp-flag">{selectedCity.flag_emoji||'🌍'}</span>
                <div>
                  <div className="dp-name">{selectedCity.city}, {selectedCity.country}</div>
                  <div className="dp-sub">{courseName} · {durationDays} days</div>
                </div>
              </div>
              <button onClick={()=>setSelectedCity(null)}
                style={{background:'none',border:'1px solid var(--bord)',borderRadius:20,padding:'4px 12px',fontSize:11,cursor:'pointer',color:'var(--muted)'}}>
                ✕ Change city
              </button>
            </div>

            {datesLoading ? (
              <div style={{padding:'18px 0',color:'var(--muted)',fontSize:13}}>Loading dates…</div>
            ) : cityDates.length > 0 ? (
              <>
                <div className="bsec-step">Step 2</div>
                <div className="bsec-title" style={{marginBottom:14}}>
                  Available Dates
                  <span style={{fontSize:11,fontWeight:400,color:'var(--muted)',marginLeft:8}}>
                    {cityDates.length} date{cityDates.length!==1?'s':''} available
                  </span>
                </div>
                <div className="date-cards" style={{position:'relative',zIndex:10}}>
                  {cityDates.map(date => {
                    const start = formatDate(date.start_date);
                    const end   = date.end_date ? formatDate(date.end_date) : null;
                    const isSel = selectedDate?.id === date.id;
                    return (
                      <div
                        key={date.id}
                        className={`date-card${isSel?' sel':''}`}
                        style={{cursor:'pointer',userSelect:'none',position:'relative',zIndex:10}}
                        onClick={() => setSelectedDate(date)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => e.key==='Enter' && setSelectedDate(date)}
                      >
                        <div className="dc-top">
                          <div className="dc-cal">
                            <div className="dc-day">{start?.day}</div>
                            <div className="dc-mon">{start?.month}</div>
                          </div>
                          <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:4}}>
                            <span className="seat-ok">Available</span>
                            {isSel&&<span style={{fontSize:10,fontWeight:700,color:'var(--red)'}}>✓ Selected</span>}
                          </div>
                        </div>
                        <div className="dc-venue">
                          {start?.full}{end&&` – ${end.full}`}<br/>
                          {selectedCity.city}, {selectedCity.country}
                        </div>
                        {minPrice&&<div className="dc-price">${Number(minPrice).toLocaleString()}<span className="dc-price-note"> / person</span></div>}
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div style={{background:'var(--amberl)',border:'1px solid #fcd34d',borderRadius:'var(--rm)',padding:'13px 15px',fontSize:13,color:'var(--amber)',marginBottom:18}}>
                📅 <b>Dates coming soon</b> for {selectedCity.city}. <a href="/contact" style={{color:'var(--navy)',fontWeight:600}}>Contact us</a> to confirm your preferred date.
              </div>
            )}

            {/* Step 3 — Book */}
            <div className="bsec-step" style={{marginTop:8}}>Step 3</div>
            <div className="bsec-title" style={{marginBottom:14}}>Complete Your Booking</div>

            {selectedCity.eventbrite_event_id ? (
              <div className="eb-wrap" style={{marginBottom:16}}>
                <div className="eb-inner">
                  <div>
                    <div className="eb-title">Secure Your Place</div>
                    <div className="eb-sub">Book via Eventbrite — instant confirmation, secure payment.</div>
                    <div className="eb-chips">
                      <span className="eb-chip">✓ Instant Confirmation</span>
                      <span className="eb-chip">✓ Secure Payment</span>
                      <span className="eb-chip">✓ Free Cancellation</span>
                    </div>
                  </div>
                  <div className="eb-right">
                    {minPrice&&<><div className="eb-price-from">from</div><div className="eb-price-val">${Number(minPrice).toLocaleString()}</div><div className="eb-price-note">per person</div></>}
                    <a href={selectedCity.eventbrite_event_url} target="_blank" rel="noopener noreferrer"
                      className="eb-btn" onClick={()=>setTimeout(()=>onStepChange?.(4),0)}>
                      Book Now →
                    </a>
                  </div>
                </div>
                <div className="eb-trust">
                  <span className="eb-trust-item">🔒 SSL Secured</span>
                  <span className="eb-trust-item">✉ Instant email confirmation</span>
                </div>
                <div id="eb-widget-container" style={{marginTop:18,borderRadius:'var(--rm)',overflow:'hidden'}}/>
              </div>
            ) : (
              <div className="eb-wrap">
                <div className="eb-no-event">
                  <span style={{fontSize:22}}>📩</span>
                  <div className="eb-no-event-text">
                    Online booking coming soon for {selectedCity.city}.{' '}
                    <a href={`/contact?course=${encodeURIComponent(courseName)}&city=${encodeURIComponent(selectedCity.city)}`}>
                      Contact us to reserve your place
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── RIGHT: Sidebar ──────────────────────────────────────────────── */}
      <div style={{position:'relative',zIndex:1}}>

        {pricing.length>0&&(
          <div className="bs-card">
            <div className="bs-title">💰 Pricing Tiers</div>
            <div className="pricing-tiers">
              {pricing.map((tier,i)=>(
                <div key={tier.tier_name} className={`tier-row${i===0?' min-tier':''}`}>
                  <div>
                    <div className="tier-name">{tier.tier_name}{i===0&&<span className="tier-badge">BEST</span>}</div>
                    {tier.conditions&&<div className="tier-desc">{tier.conditions}</div>}
                  </div>
                  <div className="tier-price">${Number(tier.price_usd).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bs-card">
          <div className="bs-title">📋 Booking Summary</div>
          <div className="bs-row"><span className="bs-key">Course</span><span className="bs-val">{courseName}</span></div>
          <div className="bs-row"><span className="bs-key">Duration</span><span className="bs-val">{durationDays} days</span></div>
          <div className="bs-row">
            <span className="bs-key">City</span>
            <span className={`bs-val${!selectedCity?' na':''}`}>
              {selectedCity?`${selectedCity.flag_emoji||''} ${selectedCity.city}`:'— select city above'}
            </span>
          </div>
          <div className="bs-row">
            <span className="bs-key">Selected Date</span>
            <span className={`bs-val${!selectedDate?' na':''}`}>
              {selectedDate
                ? (selectedDate.month_label || new Date(selectedDate.start_date+'T00:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}))
                : (selectedCity?'Select a date above':'—')
              }
            </span>
          </div>
          <div className="bs-row">
            <span className="bs-key">Price from</span>
            <span className="bs-val">{minPrice?`$${Number(minPrice).toLocaleString()}`:'Contact us'}</span>
          </div>
        </div>

        <div className="bs-card" style={{background:'linear-gradient(135deg,var(--navy),var(--navy2))',border:'none'}}>
          <div style={{fontSize:13,fontWeight:700,color:'#fff',marginBottom:6}}>Need help choosing?</div>
          <div style={{fontSize:12,color:'rgba(255,255,255,0.65)',marginBottom:14,lineHeight:1.6}}>
            Our training advisors are available Mon–Fri 9am–6pm GMT.
          </div>
          <a href="/contact" className="eb-btn" style={{fontSize:12,padding:'9px 18px'}}>Talk to an Advisor →</a>
        </div>

      </div>
    </div>
  );
}
