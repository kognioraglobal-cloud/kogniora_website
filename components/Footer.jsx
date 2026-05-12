'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo-wrap">
            <Image src="/logo.png" alt="Kogniora" width={120} height={36} style={{height:36,width:'auto'}}/>
            <div className="footer-brand-text">
              <span className="footer-brand-name">Kogniora Global</span>
              <span className="footer-brand-sub">EdTech Pvt. Ltd.</span>
            </div>
          </div>
          <p className="footer-desc">Professional development training across cities in 18+ countries, delivered by certified expert trainers with real-world experience.</p>

          <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
          <div className="footer-email">
            <span>✉</span>
            <a href="mailto:info@kogniora.com">info@kogniora.com</a>
          </div>
          <div className="footer-email">
            <span>📞</span>
            <a href="tel:+1 (332) 242-4424">+1 (332) 242-4424</a>
          </div>
          </div>

          <div className="footer-email" style={{marginTop:6}}>
            <span>📍</span>
            <span style={{fontSize:12, color:'rgba(255,255,255,0.7)'}}>5 Penn Plaza, New York, NY 10001, USA</span>
          </div>

        </div>

        <div className="footer-col">
          <h4>Courses</h4>
          <ul>
            <li><Link href="/courses?cat=Leadership+%26+Management">Leadership &amp; Management</Link></li>
            <li><Link href="/courses?cat=Human+Resources">Human Resources</Link></li>
            <li><Link href="/courses?cat=Communication+%26+Writing">Communication &amp; Writing</Link></li>
            <li><Link href="/courses?cat=Personal+Development">Personal Development</Link></li>
            <li><Link href="/courses?cat=Customer+Service">Customer Service</Link></li>
            <li><Link href="/courses">View All Courses</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link href="/corporate">Corporate Training</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/contact">About Kogniora</Link></li>
            <li><a href="/courses#trainer-promise">Our Trainers</a></li>
            <li><Link href="/contact">Accreditations</Link></li>

          </ul>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li><a href="/courses#faq">FAQs</a></li>
            <li><a href="/courses#faq">Cancellation Policy</a></li>
            <li><Link href="/contact">Privacy Policy</Link></li>
          <li><Link href="/contact">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} Kogniora Global EdTech Private Limited. All rights reserved.</span>
        <div style={{display:'flex',gap:16}}>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
