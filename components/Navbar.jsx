'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const path = usePathname();

  return (
    <nav className="nav">
      <Link href="/courses" className="nav-brand">
        <div className="nav-logo-wrap">
          {/* Replace /logo.png with your actual logo in /public */}
          <img src="/logo.png" alt="Kogniora" onError={e => { e.target.style.display='none'; }} />
        </div>
        <div className="brand-text">
          <span className="brand-line1">Kogniora Global</span>
          <span className="brand-line2">EdTech Private Limited</span>
        </div>
      </Link>

      <div className="nav-links">
        <Link href="/courses"   className={`nl ${path.startsWith('/courses') ? 'on' : ''}`}>Courses</Link>
        <Link href="/corporate" className={`nl ${path === '/corporate' ? 'on' : ''}`}>Corporate Training</Link>
        <Link href="/contact"   className={`nl ${path === '/contact' ? 'on' : ''}`}>Contact Us</Link>
      </div>

      <Link href="/contact" className="nav-cta">Get in Touch</Link>
    </nav>
  );
}
