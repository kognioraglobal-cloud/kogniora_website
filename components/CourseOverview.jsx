'use client';
import { useState } from 'react';

function RedBullet({ text }) {
  return (
    <div style={{display:'flex',alignItems:'flex-start',gap:10,padding:'8px 0',borderBottom:'1px solid #f1f5f9'}}>
      <div style={{width:22,height:22,borderRadius:'50%',background:'var(--red)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1,boxShadow:'0 2px 6px rgba(192,57,43,0.3)'}}>
        <span style={{color:'#fff',fontSize:11,fontWeight:800}}>✓</span>
      </div>
      <span style={{fontSize:14,color:'#374151',lineHeight:1.6}}>{text}</span>
    </div>
  );
}

function Accordion({ title, icon, children, defaultOpen=false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{background:'#fff',border:'1px solid var(--bord)',borderRadius:'var(--r)',overflow:'hidden',boxShadow:'0 1px 4px rgba(0,0,0,0.04)',marginBottom:12}}>
      <button type="button" onClick={() => setOpen(o=>!o)}
        style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 18px',background:'#fff',border:'none',cursor:'pointer',textAlign:'left',fontFamily:'var(--f)'}}>
        <span style={{display:'flex',alignItems:'center',gap:10}}>
          <span style={{width:32,height:32,borderRadius:9,background:'linear-gradient(135deg,var(--red),#e74c3c)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,flexShrink:0}}>
            {icon}
          </span>
          <span style={{fontSize:16,fontWeight:700,color:'var(--navy)',fontFamily:'var(--fh)'}}>{title}</span>
        </span>
        <span style={{fontSize:12,color:'var(--muted)',display:'inline-block',transform:open?'rotate(180deg)':'rotate(0deg)',transition:'transform 0.25s'}}>▼</span>
      </button>
      <div style={{display:open?'block':'none',padding:'4px 18px 18px',borderTop:'1px solid var(--bord)'}}>
        {children}
      </div>
    </div>
  );
}

function ModuleItem({ mod }) {
  const [open, setOpen] = useState(false);
  const topics = Array.isArray(mod.topics) ? mod.topics : [];
  return (
    <div
      style={{border:'1px solid var(--bord)',borderRadius:'var(--rm)',overflow:'hidden',marginBottom:7,cursor:'pointer',userSelect:'none'}}
      onClick={() => setOpen(o=>!o)}
    >
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'13px 16px',background:'#fff'}}>
        <div>
          <div style={{fontSize:11,fontWeight:700,color:'var(--red)',textTransform:'uppercase',letterSpacing:'0.07em',marginBottom:3}}>Module {mod.number}</div>
          <div style={{fontSize:15,fontWeight:600,color:'var(--text)'}}>{mod.title}</div>
        </div>
        <div style={{width:26,height:26,borderRadius:'50%',background:'var(--light)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:11,color:'var(--muted)',transform:open?'rotate(180deg)':'rotate(0deg)',transition:'transform 0.2s'}}>▼</div>
      </div>
      <div style={{display:open?'block':'none',padding:'10px 16px 14px',borderTop:'1px solid var(--bord)',background:'var(--light)'}}>
        {topics.length>0 ? (
          <div style={{display:'flex',flexDirection:'column',gap:7}}>
            {topics.map((t,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:9,fontSize:14,color:'#374151'}}>
                <span style={{width:6,height:6,borderRadius:'50%',background:'var(--navy)',flexShrink:0,display:'inline-block'}}/>
                {t}
              </div>
            ))}
          </div>
        ):(
          <p style={{fontSize:14,color:'var(--muted)'}}>Topics to be confirmed.</p>
        )}
      </div>
    </div>
  );
}

export default function CourseOverview({ course, pricing, onBookNow }) {
  const learningPoints = course.what_you_learn ? course.what_you_learn.split('\n').map(l=>l.trim()).filter(Boolean) : [];
  const whoPoints      = course.who_should     ? course.who_should.split('\n').map(l=>l.trim()).filter(Boolean)     : [];
  const whyPoints      = course.why_kogniora   ? course.why_kogniora.split('\n').map(l=>l.trim()).filter(Boolean)   : [];
  const modules        = Array.isArray(course.modules) ? course.modules : [];

  return (
    <div className="ov-grid">

      {/* LEFT: Accordions */}
      <div>
        {course.description && (
          <Accordion title="Course Overview" icon="📖" defaultOpen>
            <p style={{fontSize:14,color:'#374151',lineHeight:1.8,paddingTop:10}}>{course.description}</p>
          </Accordion>
        )}
        {learningPoints.length>0 && (
          <Accordion title="What You Will Learn" icon="🎯" defaultOpen>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 24px',paddingTop:10}}>
              {learningPoints.map((p,i)=><RedBullet key={i} text={p}/>)}
            </div>
          </Accordion>
        )}
        {modules.length>0 && (
          <Accordion title={`Course Modules (${modules.length})`} icon="📚" defaultOpen>
            <div style={{paddingTop:10}}>
              {modules.map(mod=><ModuleItem key={mod.number} mod={mod}/>)}
            </div>
          </Accordion>
        )}
        {course.who_should && (
          <Accordion title="Who Should Attend" icon="👥">
            <div style={{paddingTop:10}}>
              {whoPoints.length>1 ? whoPoints.map((p,i)=><RedBullet key={i} text={p}/>) : <p style={{fontSize:14,color:'#374151',lineHeight:1.8}}>{course.who_should}</p>}
            </div>
          </Accordion>
        )}
        {course.why_kogniora && (
          <Accordion title="Why Enroll With Kogniora" icon="⭐">
            <div style={{paddingTop:10}}>
              {whyPoints.length>1 ? whyPoints.map((p,i)=><RedBullet key={i} text={p}/>) : <p style={{fontSize:14,color:'#374151',lineHeight:1.8}}>{course.why_kogniora}</p>}
            </div>
          </Accordion>
        )}
      </div>

      {/* RIGHT: Sidebar */}
      <div>
        <div className="side-card">
          <div className="side-card-title">Course Details</div>
          <div className="info-row"><div className="info-icon">⏱</div><div><div className="info-val">{course.duration_days||2} Days</div><div className="info-key">Duration</div></div></div>
          <div className="info-row"><div className="info-icon">📊</div><div><div className="info-val">{course.level||'Intermediate'}</div><div className="info-key">Level</div></div></div>
          <div className="info-row"><div className="info-icon">🌍</div><div><div className="info-val">520+ Cities</div><div className="info-key">Available Worldwide</div></div></div>
          <div className="info-row"><div className="info-icon">🏛</div><div><div className="info-val">In-Person</div><div className="info-key">Delivery Method</div></div></div>
          {course.tags&&(
            <div className="info-row">
              <div className="info-icon">🏷</div>
              <div>
                <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                  {course.tags.split(',').map(t=>t.trim()).filter(Boolean).map(tag=><span key={tag} className="chip chip-n">{tag}</span>)}
                </div>
                <div className="info-key">Topics</div>
              </div>
            </div>
          )}
        </div>

        {pricing.length>0&&(
          <div className="side-card">
            <div className="side-card-title">Pricing</div>
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

        <div className="side-card">
          <div className="side-card-title">Why Kogniora</div>
          <div className="trust-items">
            {['✅ Accredited programme','🎓 Expert certified trainers','📜 Certificate of completion','📞 Post-training support','💯 Satisfaction guarantee','🌍 Global delivery network'].map(item=>(
              <div key={item} className="trust-item" style={{fontSize:13}}>{item}</div>
            ))}
          </div>
        </div>

        {/* SINGLE Book This Course button — calls onBookNow to switch tab */}
        <button
          type="button"
          onClick={() => { if(typeof onBookNow==='function') onBookNow(); }}
          style={{
            width:'100%',display:'flex',alignItems:'center',justifyContent:'center',
            gap:8,padding:'14px 20px',marginBottom:8,
            background:'var(--red)',color:'#fff',border:'none',
            borderRadius:40,fontSize:15,fontWeight:700,
            fontFamily:'var(--f)',cursor:'pointer',
            boxShadow:'0 4px 16px rgba(192,57,43,0.35)',
          }}
        >
          Book This Course →
        </button>
        <a href="/contact" style={{display:'block',textAlign:'center',fontSize:12,color:'var(--muted)',textDecoration:'none'}}>
          or contact us for group pricing
        </a>
      </div>
    </div>
  );
}
