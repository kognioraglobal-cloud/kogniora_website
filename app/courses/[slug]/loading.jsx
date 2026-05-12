export default function Loading() {
  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'center',
      minHeight:'60vh', flexDirection:'column', gap:16,
    }}>
      <div style={{
        width:40, height:40, borderRadius:'50%',
        border:'3px solid #e2e8f0',
        borderTopColor:'var(--navy)',
        animation:'spin 0.7s linear infinite',
      }}/>
      <div style={{fontSize:13, color:'var(--muted)'}}>Loading course…</div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}