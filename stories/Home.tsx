import React from 'react';
import NavBar from './NavBar';

function Home({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col w-screen h-screen relative">
        <NavBar />
        <div className="bg-gray-100 flex items-center flex-col">{children}</div>
        <div id="global-modal"></div>
      </div>
    </>
  );
}

export default Home;
