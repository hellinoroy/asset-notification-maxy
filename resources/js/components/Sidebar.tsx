// resources/js/components/Sidebar.tsx
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { Link, router } from '@inertiajs/react';
import { LogOut, LucideIcon, ClipboardList, Home, FileText } from 'lucide-react';

interface SidebarProps {
    currentPath: string;
}

interface NavItem {
    name: string;
    icon: LucideIcon;
    path: string;
}

export default function Sidebar({ currentPath }: any) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    // const navItems: NavItem[] = [
    //     { name: 'Aset', icon: Home, path: route('home') },
    //     { name: 'Jadwal', icon: ClipboardList, path: route('home') },
    
    // ];

    const navItems: NavItem[] = [
        { name: 'Aset', icon: Home, path: route('aset_view') },
        { name: 'Jadwal', icon: ClipboardList, path: route('jadwal_view') },
        { name: 'Laporan', icon: FileText, path: route('laporan') },
    ];

    return (
        <div className="flex w-64 flex-col justify-between bg-white px-4 py-6 shadow-lg">
            {/* Logo */}
            <div className="mb-10 flex items-center pl-2">
                <span className="text-2xl font-bold text-[#0600d4]">Logo.......</span>
            </div>

            {/* Navigasi */}
            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.path}
                        className={`flex items-center rounded-lg p-3 text-lg font-medium transition-colors duration-200 ${
                            currentPath.startsWith(item.path) ? 'bg-[#0600d4] text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-[#0600d4]'
                        }`}
                    >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                        {currentPath.startsWith(item.path) && <span className="ml-auto text-white"> &gt; </span>}
                    </Link>
                ))}
            </nav>

            {/* Tombol Keluar */}
            <div className="mt-auto border-t border-gray-200 pt-6">
                <Link
                    method="post"
                    href={route('logout')}
                    as="button"
                    onClick={handleLogout}
                    className="flex w-full cursor-pointer items-center rounded-lg p-3 text-lg font-medium text-red-600 transition-colors duration-200 hover:bg-red-50"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Keluar
                </Link>
            </div>
        </div>
    );
}
