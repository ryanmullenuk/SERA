import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SERA',
  description: 'Signal active.',
  openGraph: {
    title: 'SERA',
    description: 'Signal active.',
    type: 'website',
    images: [
      {
        url: 'https://raw.githubusercontent.com/ryanmullenuk/SERA/main/public/og.png',
        width: 1200,
        height: 630,
        alt: 'SERA signal awaiting input.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SERA',
    description: 'Signal active.',
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
      <body>{children}</body>
    </html>
  );
}
