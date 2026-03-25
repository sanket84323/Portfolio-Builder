import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PortfolioBuilder – Create Your Professional Portfolio',
  description: 'Build stunning, customizable portfolio websites in minutes. Perfect for students, developers, and designers.',
  keywords: 'portfolio builder, professional portfolio, resume website, developer portfolio',
  openGraph: {
    title: 'PortfolioBuilder',
    description: 'Create your professional portfolio in minutes',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500;700&family=Nunito:wght@300;400;600;700;800;900&family=Raleway:wght@300;400;500;600;700;800&family=Fira+Code:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&family=Merriweather:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1e1e2e',
                color: '#f8fafc',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
