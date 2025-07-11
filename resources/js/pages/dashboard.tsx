import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

function NotificationList() {
    const [notifications, setNotifications] = useState<any[]>([]);

    async function fetchNotifications() {
        try {
            const response = await axios.get('/api/notification', { withCredentials: true });
            console.log(response.data);
            setNotifications(response.data.notifications);
        } catch (err) {
            console.error('Error fetching notifications:', err);
        }
    }

    useEffect(() => {
        fetchNotifications();
    }, []);

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
            <h2>Your Notifications</h2>
            <ul>
                {notifications.map((notif, index) => (
                    <li key={index}>
                        <p>{notif.message}</p>
                        <p>{notif.id}</p>
                        <button onClick={() => markAsRead(notif.id)}>Mark as Read</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <NotificationList />
                    <Link href={route('jadwal_view')} className="font-semibold text-blue-600 hover:underline">
                        Jadwal
                    </Link>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
