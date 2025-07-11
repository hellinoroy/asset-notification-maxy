import React from 'react';
import { usePage } from '@inertiajs/react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children } : any)  {
  const { url } = usePage(); 
  console.log(url)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar currentPath={url} />
       
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-10 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
