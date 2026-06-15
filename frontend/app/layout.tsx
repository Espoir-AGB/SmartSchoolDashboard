import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SmartSchool Dashboard',
  description: 'Gestion scolaire intelligente',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Sidebar />
          <div style={{ flex: 1, marginLeft: 240, display: 'flex', flexDirection: 'column' }}>
            <Topbar />
            <main style={{ flex: 1, padding: '28px' }}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}