export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* PC */}
      <div className="hidden sm:block">{children}</div>
      {/* モバイル */}
      <div className="block sm:hidden">{children}</div>
    </div>
  );
}
