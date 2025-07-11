import { Link, router } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface AssetItem {
    id: string;
    namaAset: string;
    tanggalBeli: string;
    keterangan: string;
    lastMaintenance: string;
    nextMaintenance: string;
    pic: string;
    user?: { id: number }; // include if needed for matching
}

interface User {
    id: number;
    name: string;
    role: string;
}

interface AssetTableProps {
    data: AssetItem[];
}

const AssetTable: React.FC<AssetTableProps> = ({ data }) => {
    const [user, setUser] = useState<User | null>(null);

    // const handleUpdate = async (jadwal_id) => {
    //     try {
    //         await axios.put(`/api/jadwal-selesai/${jadwal_id}`, {
    //             // send whatever fields you want to change:
    //             jadwal_status: 'Selesai',
    //         });
    //         router.visit('/jadwal');
    //     } catch (err) {
    //         console.log(err);
    //         alert(err?.response?.data?.message ?? 'Gagal memperbarui jadwal.');
    //     }
    // };

    const handleDelete = async (aset_id: any) => {
        if (!confirm('Yakin ingin menghapus jadwal ini?')) return;

        try {
            await axios.delete(`/api/aset/${aset_id}`);
            router.visit('/aset');
        } catch (err) {
            console.log(err);
            alert(err?.response?.data?.message ?? 'Gagal menghapus jadwal.');
        }
    };

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get('/api/user', { withCredentials: true });
                setUser(response.data);
            } catch (err) {
                console.error('Error fetching user:', err);
            }
        }

        fetchUser();
    }, []);

    return (
        <div className="overflow-x-auto rounded-xl bg-white shadow-lg">
            <table className="min-w-full border border-gray-300 text-left text-lg sm:text-xl">
                <thead>
                    <tr className="bg-indigo-100 text-gray-800">
                        <th className="border px-6 py-4">ID</th>
                        <th className="border px-6 py-4">Nama Aset</th>
                        <th className="border px-6 py-4">Tanggal Beli</th>
                        <th className="border px-6 py-4">Keterangan</th>
                        <th className="border px-6 py-4">Last Maintenance</th>
                        <th className="border px-6 py-4">Next Maintenance</th>
                        <th className="border px-6 py-4">Next PIC</th>
                        {user?.role === 'Admin' && <th className="border px-6 py-4 text-center">Opsi</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                            <td className="border px-6 py-4">{item.id}</td>
                            <td className="border px-6 py-4">{item.namaAset}</td>
                            <td className="border px-6 py-4">{item.tanggalBeli}</td>
                            <td className="border px-6 py-4">{item.keterangan}</td>
                            <td className="border px-6 py-4">{item.lastMaintenance}</td>
                            <td className="border px-6 py-4">{item.nextMaintenance}</td>
                            <td className="border px-6 py-4">{item.pic}</td>
                            {user?.role === 'Admin' && (
                                <td className="text-md border px-6 py-4 text-center whitespace-nowrap">
                                    <div className="inline-flex items-center gap-2">
                                        <Link href={route('aset-edit', { id: item.aset_id })}  className="text-md rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600">
                                            Edit
                                        </Link>
                                
                                        <button
                                            onClick={() => handleDelete(item.aset_id)}
                                            className="text-md rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AssetTable;
