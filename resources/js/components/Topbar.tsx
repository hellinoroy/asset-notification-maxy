import { Bell, History, User } from 'lucide-react';
import React, { useState } from 'react';

interface Notification {
    id: number;
    type: string;
    title: string;
    message: string;
    date: string;
    read: boolean;
}

const Topbar: React.FC = () => {
    const [showNotifications, setShowNotifications] = useState(false);

    const notifications: Notification[] = [
        {
            id: 1,
            type: 'status_update',
            title: 'Pembaruan Status',
            message: 'Budi menandai aset MBL01 – Mobil HRV sebagai Selesai pada 26 November 2025',
            date: '26 November 2025',
            read: false,
        },
        {
            id: 2,
            type: 'upcoming_maintenance',
            title: 'Besok Maintenance!',
            message: 'Sari mengubah status aset GEN03 – Genset Gudang menjadi Pending. Jadwal berikutnya: 5 Desember 2025',
            date: '5 Desember 2025',
            read: false,
        },
        {
            id: 3,
            type: 'overdue_maintenance',
            title: 'Maintenance Terlambat!',
            message: 'Aset MBL01 – Mobil Honda HRV belum menjalani maintenance sejak 25 November 2025.',
            date: '25 November 2025',
            read: false,
        },
    ];

    const unreadNotificationsCount = notifications.filter((notif) => !notif.read).length;

    const toggleNotifications = () => {
        setShowNotifications((prev) => !prev);
    };

    return (
        <header className="flex items-center justify-end border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
            <div className="flex items-center space-x-6">
                {/* History Button */}
                <button className="text-gray-500 transition-colors duration-200 hover:text-gray-700" onClick={() => console.log('History clicked')}>
                    <History className="h-6 w-6" />
                </button>

                {/* Notification Dropdown */}
                <div className="relative">
                    <button className="text-gray-500 transition-colors duration-200 hover:text-gray-700" onClick={toggleNotifications}>
                        <Bell className="h-6 w-6" />
                        {unreadNotificationsCount > 0 && (
                            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                        )}
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 z-50 mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-xl">
                            <div className="border-b border-gray-200 px-4 py-2">
                                <h3 className="font-semibold text-gray-800">Notifikasi ({unreadNotificationsCount} Baru)</h3>
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                                {notifications.length > 0 ? (
                                    notifications.map((notif) => (
                                        <div
                                            key={notif.id}
                                            className={`cursor-pointer border-b border-gray-100 p-4 last:border-b-0 ${
                                                notif.read ? 'bg-gray-50 text-gray-600' : 'bg-white text-gray-800 hover:bg-gray-100'
                                            }`}
                                            onClick={() => console.log(`Notifikasi ${notif.id} diklik`)}
                                        >
                                            <p className="mb-1 text-sm font-semibold">{notif.title}</p>
                                            <p className="text-xs text-gray-700">{notif.message}</p>
                                            <p className="mt-1 text-xs text-gray-500">{notif.date}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-4 text-center text-sm text-gray-500">Tidak ada notifikasi baru.</div>
                                )}
                            </div>
                            {notifications.length > 0 && (
                                <div className="border-t border-gray-200 px-4 py-2 text-center">
                                    <button className="text-sm text-blue-600 hover:underline" onClick={() => console.log('Lihat semua notifikasi')}>
                                        Lihat Semua Notifikasi
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* User Profile */}
                <div className="flex items-center space-x-3">
                    <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gray-300">
                        <User className="h-5 w-5 text-gray-500" />
                        {/* Atau gunakan <img src="..." alt="Profile" /> untuk gambar user */}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">Nama</p>
                        <p className="text-sm text-gray-500">Staff</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
