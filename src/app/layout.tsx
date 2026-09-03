import type { Metadata } from 'next';
import { ThemeProvider } from '@ui5/webcomponents-react';
import './globals.css';

export const metadata: Metadata = { title: 'Native Authoring' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="ui5-content-density-compact">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
