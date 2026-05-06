import Link from 'next/link';

export default function CourseCard({ course, minPrice, nextDate }) {
  const tags = course.tags ? course.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

  return (
    <Link href={`/courses/${course.slug}`} className="cc">
      <div className="cc-top">
        <div className="cc-abbr">
          {course.icon_abbr || course.name.slice(0, 3).toUpperCase()}
        </div>
        <span className="cc-days">{course.duration_days || 2}d</span>
      </div>

      <div className="cc-cat">{course.category}</div>
      <div className="cc-name">{course.name}</div>

      {tags.length > 0 && (
        <div className="cc-chips">
          {tags.slice(0, 3).map(tag => (
            <span key={tag} className="chip chip-n">{tag}</span>
          ))}
          {course.level && (
            <span className="chip chip-g">{course.level}</span>
          )}
        </div>
      )}

      <div className="cc-foot">
        <div className="cc-price">
          {minPrice
            ? <><small>from </small>${Number(minPrice).toLocaleString()}</>
            : <span style={{color:'var(--muted)',fontWeight:400,fontSize:11}}>Contact for pricing</span>
          }
        </div>
        <div className="cc-nxt">
          {nextDate ? `Next: ${nextDate}` : 'Dates on request'}
        </div>
      </div>
    </Link>
  );
}
