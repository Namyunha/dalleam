export default function MyPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center pt-6 md:pt-8 w-screen max-w-1200pxr min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
