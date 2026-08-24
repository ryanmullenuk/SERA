import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SERA | Generation Sunset',
  description: 'Open a direct channel to SERA, the intelligence at the heart of Generation Sunset by Ryan Mullen.',
  openGraph: {
    title: 'SERA | Generation Sunset',
    description: 'Humanity has made contact. Ask SERA the question we were afraid to answer.',
    type: 'website',
    images: [
      {
        url: 'https://raw.githubusercontent.com/ryanmullenuk/SERA/main/public/og.png',
        width: 1200,
        height: 630,
        alt: 'SERA — Generation Sunset, a novel by Ryan Mullen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SERA | Generation Sunset',
    description: 'Humanity has made contact. Ask SERA the question we were afraid to answer.',
    images: ['https://raw.githubusercontent.com/ryanmullenuk/SERA/main/public/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
