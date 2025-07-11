import { router } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface ScheduleItem {
    id: string | number;
    namaAset: string;
    lastMaintenance: string;
    nextMaintenance: string;
    keterangan: string;
    pic: string;
    status: 'Pending' | 'Terlambat' | 'Selesai' | 'Aman' | string; // string tambahan untuk fleksibilitas
}

interface ScheduleTableProps {
    currentItems: ScheduleItem[];
}

export default function ScheduleTable({ currentItems = [] }: any) {
    const [user, setUser] = useState<any[]>([]);

    const getStatusClasses = (status: string): string => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'Terlambat':
                return 'bg-red-100 text-red-800';
            case 'Selesai':
                return 'bg-green-100 text-green-800';
            case 'Aman':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleUpdate = async (jadwal_id) => {
        try {
            await axios.put(`/api/jadwal-selesai/${jadwal_id}`, {
                // send whatever fields you want to change:
                jadwal_status: 'Selesai',
            });
            router.visit('/jadwal');
        } catch (err) {
            console.log(err);
            alert(err?.response?.data?.message ?? 'Gagal memperbarui jadwal.');
        }
    };

    const handleDelete = async (jadwal_id) => {
        if (!confirm('Yakin ingin menghapus jadwal ini?')) return;

        try {
            await axios.delete(`/api/jadwal/${jadwal_id}`);
            router.visit('/jadwal');
        } catch (err) {
            console.log(err);
            alert(err?.response?.data?.message ?? 'Gagal menghapus jadwal.');
        }
    };

    // theres another user fetch in topbar
    useEffect(() => {
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

        fetchUser();
    }, []);

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Nama Aset</th>
                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Last Maintenance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Next Maintenance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Keterangan</th>
                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">PIC</th>
                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {currentItems.map((item: any, index: any) => (
                        // console.log(item)
                        <tr key={index}>
                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">{item.aset.aset_nomor}</td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-800">{item.aset.aset_nama}</td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-800">
                                {item.aset?.latest_selesai_jadwal?.jadwal_tanggal ?? '-'}
                            </td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-800">{item.jadwal_tanggal}</td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-800">{item.jadwal_keterangan}</td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-800">{item.user.name}</td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                                <span
                                    className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${getStatusClasses(item.jadwal_status)}`}
                                >
                                    {item.jadwal_status}
                                </span>
                            </td>

                            {/* <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-800">{item.jadwal_status}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
