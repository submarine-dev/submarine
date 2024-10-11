import './globals.css';
import { AuthProvider } from '@/components/functions/context/auth';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
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
