import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen pt-[86px] bg-gray-50 relative overflow-auto">
        <Sidebar />
        <main className="mt-5 md:mt-0 lg:ml-64 min-h-screen">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </>
  );
};

export default Layout;