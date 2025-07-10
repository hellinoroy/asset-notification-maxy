import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ClipboardList, FileText, LogOut, LucideIcon } from 'lucide-react'; // ✅ LucideIcon for icon typing

interface SidebarProps {
  currentPath: string;
}

interface NavItem {
  name: string;
  icon: LucideIcon; // ✅ Tipe dari ikon yang diimpor dari lucide-react
  path: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPath }) => {
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    { name: 'Aset', icon: Home, path: '/admin/assets' },
    { name: 'Jadwal', icon: ClipboardList, path: '/admin/schedule' },
    { name: 'Laporan', icon: FileText, path: '/admin/reports' },
  ];

  const handleLogout = () => {
    console.log('Logout clicked');
    navigate('/login');
  };

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col justify-between py-6 px-4">
      {/* Logo Section */}
      <div className="flex items-center mb-10 pl-2">
        <span className="text-2xl font-bold text-[#0600d4]">Logo.......</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center p-3 rounded-lg text-lg font-medium transition-colors duration-200
              ${currentPath.startsWith(item.path) 
                ? 'bg-[#0600d4] text-white' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-[#0600d4]'}
            `}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
            {currentPath.startsWith(item.path) && (
              <span className="ml-auto text-white"> &gt; </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto pt-6 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center p-3 w-full rounded-lg text-lg font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Keluar
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
