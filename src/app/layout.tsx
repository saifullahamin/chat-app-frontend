import type { Metadata } from 'next';
import './globals.scss';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Pulse',
  description: 'Communicate, Anywhere, Anytime',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
