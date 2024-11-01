import React from 'react';

export default function ListContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-50 justify-center min-h-screen py-24pxr md:py-46pxr px-3 lg:px-20 box-border lg:w-1200pxr flex-shrink-0">
      {children}
    </div>
  );
}
