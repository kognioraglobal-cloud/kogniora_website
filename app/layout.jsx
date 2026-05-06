import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: {
    default: 'Kogniora Global EdTech – Professional Training Worldwide',
    template: '%s | Kogniora Global EdTech',
  },
  description:
    'Professional development training across 520+ cities on 6 continents. Accredited courses in leadership, project management, HR, sales and more.',
  keywords: ['professional training', 'leadership courses', 'project management', 'PMP', 'corporate training'],
  openGraph: {
    siteName: 'Kogniora Global EdTech',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
