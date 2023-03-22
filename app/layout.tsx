import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '~/app/globals.css';
import appleTouchIcon from '~/assets/favicon/apple-touch-icon.png';
import faviconIco from '~/assets/favicon/favicon.ico';
import faviconPng from '~/assets/favicon/favicon.png';
import { Footer } from '~/components/footer/Footer';
import { Navbar } from '~/components/navigation/Navbar';
import { Body } from '~/components/ui/layout/Body';
import { Html } from '~/components/ui/layout/Html';
import { Main } from '~/components/ui/layout/Main';
import { description } from '~/lib/constants';
import { composeTitle } from '~/lib/metadata';

export const metadata: Metadata = {
  description,
  icons: {
    apple: appleTouchIcon.src,
    icon: [faviconIco.src, faviconPng.src],
  },
  manifest: '/manifest.webmanifest',
  title: composeTitle(),
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <Html>
      <head />
      <Body>
        <Navbar>
          <Navbar.Link href="/about">About</Navbar.Link>
          <Navbar.Link href="/posts">Posts</Navbar.Link>
          <Navbar.Link href="/appearances">Appearances</Navbar.Link>
        </Navbar>
        <Main>{children}</Main>
        <Footer />
      </Body>
    </Html>
  );
}
