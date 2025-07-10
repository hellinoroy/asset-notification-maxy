import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // Outlet untuk nested routing

import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const AdminLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar currentPath={location.pathname} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-10 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
