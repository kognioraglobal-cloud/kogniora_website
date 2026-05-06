import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo-wrap">
            <img src="/logo.png" alt="Kogniora" style={{height:36,width:'auto'}} onError={e=>{e.target.style.display='none'}}/>
            <div className="footer-brand-text">
              <span className="footer-brand-name">Kogniora Global</span>
              <span className="footer-brand-sub">EdTech Pvt. Ltd.</span>
            </div>
          </div>
          <p className="footer-desc">Professional development training across 520+ cities on 6 continents. Accredited programmes delivered by certified expert trainers.</p>
          <div className="footer-email">
            <span>✉</span>
            <a href="mailto:info@kogniora.com">info@kogniora.com</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Courses</h4>
          <ul>
            <li><Link href="/courses?cat=Project+Management">Project Management</Link></li>
            <li><Link href="/courses?cat=Agile+%26+Scrum">Agile &amp; Scrum</Link></li>
            <li><Link href="/courses?cat=Leadership">Leadership</Link></li>
            <li><Link href="/courses?cat=HR+%26+People">HR &amp; People</Link></li>
            <li><Link href="/courses?cat=Finance">Finance</Link></li>
            <li><Link href="/courses">View All Courses</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link href="/corporate">Corporate Training</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><a href="#">About Kogniora</a></li>
            <li><a href="#">Our Trainers</a></li>
            <li><a href="#">Accreditations</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Cancellation Policy</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms &amp; Conditions</a></li>
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
