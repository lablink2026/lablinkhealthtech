import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '../shared/components/Navbar';
import { Footer } from '../shared/components/Footer';

export const metadata: Metadata = {
  title: 'Lablinks — Find a licensed lab. Book your test. Get a report you can verify.',
  description: 'Connect with MLSCN licensed diagnostic laboratories in Nigeria, compare transparent test pricing, book walk-ins or home sample collections, and verify authentic diagnostic reports online.'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="light" data-theme="light">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('lablink-theme');
                  if (!t) t = 'light';
                  document.documentElement.setAttribute('data-theme', t);
                  if (t === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'light');
                  document.documentElement.classList.remove('dark');
                }
              })();
            `
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text)] antialiased flex flex-col transition-colors duration-200 bg-dot-grid relative">
        {/* Soft radial green glows */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] ambient-glow pointer-events-none -z-10" />
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] ambient-glow-bottom pointer-events-none -z-10" />

        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
