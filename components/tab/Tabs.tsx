export default function Tabs({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="inline-flex flex-col w-full gap-3 items-start md:mb-2">{children}</div>;
}
