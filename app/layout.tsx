import type { Metadata } from 'next';
import appleTouchIcon from '../assets/favicon/apple-touch-icon.png';
import faviconIco from '../assets/favicon/favicon.ico';
import faviconPng from '../assets/favicon/favicon.png';
import { Footer } from '../components/footer/Footer';
import { Navbar } from '../components/navigation/Navbar';
import { Body } from '../components/ui/layout/Body';
import { Html } from '../components/ui/layout/Html';
import { Main } from '../components/ui/layout/Main';
import { description, name, tagline } from '../utils/constants';
import './globals.css';

export const metadata: Metadata = {
  description,
  icons: {
    apple: appleTouchIcon.src,
    icon: [faviconIco.src, faviconPng.src],
  },
  manifest: '/manifest.webmanifest',
  title: `${name} - ${tagline}`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <head />
      <Body>
        <Navbar />
        <Main>{children}</Main>
        <Footer />
      </Body>
    </Html>
  );
}
