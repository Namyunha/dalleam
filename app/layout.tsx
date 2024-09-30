import QueryProvider from '@/components/QueryProvider';
import './globals.css';
import localFont from 'next/font/local';
import NavBar from '@/components/nav/NavBar';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <div className="flex flex-col w-full h-dvh relative">
          <NavBar />
          <QueryProvider>
            <div className="bg-gray-100 flex flex-col items-center">{children}</div>
          </QueryProvider>
        </div>
        <div id="global-modal"></div>
      </body>
    </html>
  );
}
