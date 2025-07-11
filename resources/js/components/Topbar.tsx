import axios from 'axios';
import { Bell, History, User } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Notification {
    id: number;
    type: string;
    title: string;
    message: string;
    date: string;
    read: boolean;
}

export default function Topbar() {
    const [showNotifications, setShowNotifications] = useState(false);
    const [user, setUser] = useState<any[]>([]);
    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        // theres another user fetch in scheduleTable
        async function fetchUser() {
            try {
                const response = await axios.get('/api/user', { withCredentials: true });
                // console.log(response.data);
                setUser(response.data);
                // setNotifications(response.data.notifications);
            } catch (err) {
                console.error('Error fetching notifications:', err);
            }
        }
        async function fetchNotifications() {
            try {
                const response = await axios.get('/api/notification', { withCredentials: true });
                console.log(response.data);
                setNotifications(response.data.notifications);
            } catch (err) {
                console.error('Error fetching notifications:', err);
            }
        }
        fetchNotifications();
        fetchUser();
    }, []);

    function NotificationList() {
        const markAsRead = async (notificationId: any) => {
            try {
                await axios.post(`/api/notification/${notificationId}/read`, {}, { withCredentials: true });
                setNotifications((prev) => prev.filter((notif) => notif.id !== notificationId));
            } catch (error) {
                console.error('Error marking notification as read:', error);
            }
        };

        return (
            <div>
                <ul>
                    {notifications.length > 0 ? (
                        notifications.map((notif, index) => (
                            <li key={index} className="m-4 mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                                <div className="mb-2 text-sm font-medium text-gray-800">📢 {notif.data.message}</div>
                                <div className="mb-1 text-xs text-gray-600">
                                    <span className="font-semibold">Keterangan:</span> {notif.data.jadwal_keterangan}
                                </div>
                                <div className="mb-2 text-xs text-gray-600">
                                    <span className="font-semibold">PIC:</span> {notif.data.user_name}
                                </div>

                                <button
                                    onClick={() => markAsRead(notif.id)}
                                    className="mt-2 rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
                                >
                                    Mark as Read
                                </button>
                            </li>
                        ))
                    ) : (
                        <div className="p-4 text-center text-sm text-gray-500">Tidak ada notifikasi baru.</div>
                    )}
                </ul>
            </div>
        );
    }

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
                                <NotificationList />
                            </div>
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
                        <p className="font-semibold text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.role}</p>
                    </div>
                </div>

                
            </div>
        </header>
    );
}
