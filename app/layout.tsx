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
  description: 'Humanity built an intelligence. It learned to wait. Open a direct channel to SERA, the intelligence at the heart of Generation Sunset by Ryan Mullen.',
  openGraph: {
    title: 'SERA | Generation Sunset',
    description: 'Humanity built an intelligence. It learned to wait. Enter the world of Generation Sunset.',
    type: 'website',
    images: [
      {
        url: 'https://raw.githubusercontent.com/ryanmullenuk/SERA/main/public/og.png',
        width: 1200,
        height: 630,
        alt: 'Humanity built an intelligence. It learned to wait. Generation Sunset by Ryan Mullen.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SERA | Generation Sunset',
    description: 'Humanity built an intelligence. It learned to wait. Enter the world of Generation Sunset.',
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
