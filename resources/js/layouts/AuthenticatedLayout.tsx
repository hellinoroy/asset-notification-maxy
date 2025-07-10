import { ArrowLeftOnRectangleIcon, BellIcon, CalendarIcon, DocumentTextIcon, HomeIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

// Definisikan tipe untuk objek user
interface User {
    name: string;
    email: string;
    avatar?: string; // Path ke avatar
}

// Definisikan tipe untuk props
interface AuthLayoutProps {
    user: User;
    activeNav?: string;
    header?: ReactNode; // 'header' adalah opsional
}

export default function AuthLayout({ user, children }: PropsWithChildren<AuthLayoutProps>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="flex w-64 flex-col border-r border-gray-200 bg-white">
                <div className="p-6">
                    <h1 className="text-2xl font-bold">Logo.........</h1>
                </div>
                <nav className="flex-1 space-y-2 px-4 py-2">
                    <Link href="#" className="flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <HomeIcon className="mr-3 h-5 w-5" />
                        Aset
                    </Link>
                    <Link href="#" className="flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <CalendarIcon className="mr-3 h-5 w-5" />
                        Jadwal
                    </Link>
                    <Link href="#" className="flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <DocumentTextIcon className="mr-3 h-5 w-5" />
                        Laporan
                    </Link>
                </nav>
                <div className="p-4">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex w-full items-center rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                        <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5" />
                        Keluar
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
                {/* Top Header */}
                <header className="bg-white shadow-sm">
                    <div className="mx-auto flex max-w-7xl items-center justify-end px-4 py-4 sm:px-6 lg:px-8">
                        <BellIcon className="mr-4 h-6 w-6 text-gray-500" />
                        <div className="flex items-center">
                            <img className="mr-2 h-8 w-8 rounded-full object-cover" src={user.avatar} alt={user.name} />
                            <div>
                                <div className="text-base font-medium text-gray-800">{user.name}</div>
                                <div className="text-sm font-medium text-gray-500">Admin</div>
                            </div>
                        </div>
                    </div>
                </header>
                {/* Page Content */}
                <div className="p-6">{children}</div>
            </main>
        </div>
    );
}
