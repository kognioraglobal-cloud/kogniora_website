export default function TrainerPromise() {
  const stats = [
    { val: '150+', label: 'Expert Trainers' },
    { val: '12+',  label: 'Years Avg. Experience' },
    { val: '4.9/5', label: 'Average Trainer Rating' },
  ];

  return (
    <section style={{
      background: 'linear-gradient(135deg, var(--navy) 0%, #1e2a5e 60%, #0f172a 100%)',
      padding: '48px 32px',
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 40,
        flexWrap: 'wrap',
      }}>

        {/* Left — icon + sentence */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, flex: '1 1 420px' }}>
          <div style={{
            width: 48, height: 48, borderRadius: 13, flexShrink: 0,
            background: 'rgba(212,175,55,0.15)',
            border: '1px solid rgba(212,175,55,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22,
          }}>
            ⭐
          </div>
          <div>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.09em',
              textTransform: 'uppercase', color: '#D4AF37', marginBottom: 8,
            }}>
              Trainer Excellence Promise
            </div>
            <p style={{
              fontSize: 15, color: 'rgba(255,255,255,0.82)', lineHeight: 1.75,
              margin: 0, maxWidth: 560,
            }}>
              We rigorously select trainers who have built and led real teams, managed real projects,
              and delivered measurable results — ensuring you receive world-class expertise and
              international perspectives that drive genuine career transformation.
            </p>
          </div>
        </div>

        {/* Right — three stats */}
        <div style={{
          display: 'flex',
          gap: 0,
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 14,
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: '18px 28px',
              borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.12)' : 'none',
              background: 'rgba(255,255,255,0.05)',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--fh)', fontSize: 26, fontWeight: 800,
                color: '#fff', lineHeight: 1,
              }}>{s.val}</div>
              <div style={{
                fontSize: 11, color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase', letterSpacing: '0.06em',
                marginTop: 5,
              }}>{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
