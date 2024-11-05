import React from 'react';

export default function ListHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="inline-flex gap-4 items:center mb-4 md:mb-46pxr">{children}</div>;
}
