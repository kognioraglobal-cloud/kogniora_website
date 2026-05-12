import Link from 'next/link';

export default function CourseNotFound() {
  return (
    <div style={{textAlign:'center',padding:'80px 32px'}}>
      <div style={{fontSize:48,marginBottom:16}}>🔍</div>
      <h1 style={{fontFamily:'var(--fh)',fontSize:28,fontWeight:800,color:'var(--navy)',marginBottom:8}}>
        Course Not Found
      </h1>
      <p style={{fontSize:14,color:'var(--muted)',marginBottom:24}}>
        This course may have been moved or is no longer available.
      </p>
      <Link href="/courses" className="btn-primary">← Browse All Courses</Link>
    </div>
  );
}
