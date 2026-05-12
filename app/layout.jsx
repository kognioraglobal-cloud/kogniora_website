import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BASE_URL = 'https://www.kogniora.com';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default:  'Kogniora Global EdTech — Professional Training Worldwide',
    template: '%s | Kogniora Global EdTech',
  },
  description:
    'Professional development training across 18 countries. ' +
    'In-person, expert-led programmes in leadership, HR, communication, ' +
    'project management, soft skills and more. Book online — instant confirmation.',
  keywords: [
    'professional training', 'leadership courses', 'HR training',
    'soft skills', 'communication skills', 'project management',
    'corporate training', 'in-person training', 'management courses','diversity & inclusion',
  ],
  authors:   [{ name: 'Kogniora Global EdTech' }],
  creator:   'Kogniora Global EdTech',
  publisher: 'Kogniora Global EdTech',
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         BASE_URL,
    siteName:    'Kogniora Global EdTech',
    title:       'Kogniora Global EdTech — Professional Training Worldwide',
    description: 'Professional development training across 18 countries. Expert-led, in-person, results-driven.',
  },
  twitter: {
    card:    'summary_large_image',
    site:    '@KognioraGlobal',
    creator: '@KognioraGlobal',
  },
  alternates: {
    canonical: BASE_URL,
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
