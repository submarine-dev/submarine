import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/functions/context/auth';

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'submarine',
  description: 'submarine',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
        <AuthProvider>
          {/* PC */}
          <div className="hidden sm:block">{children}</div>
          {/* モバイル */}
          <div className="block sm:hidden">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
