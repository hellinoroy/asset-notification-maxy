import { useMemo, useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import LaporanTable from '../components/LaporanTable';
import axios from 'axios';

import AdminLayout from '@/layouts/AdminLayout';

export default function LaporanPage() {
    const [scheduleData, setScheduleData] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        async function fetchJadwal() {
            try {
                // const response = await axios.get('/api/jadwal', { withCredentials: true });
                const res = await axios.get('/api/jadwal-done', { withCredentials: true });
                console.log(res);
                // console.log(response.data.data);
                setScheduleData(res.data.data);
            } catch (err) {
                console.error('Error fetching jadwal selesai:', err);
            }
        }

        

        fetchJadwal();
    }, []);

    const filteredData = useMemo(() => {
        return scheduleData.filter((item) =>
            Object.values(item).some((val) => typeof val === 'string' && val.toLowerCase().includes(searchTerm.toLowerCase())),
        );
    }, [scheduleData, searchTerm]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6 p-6">
                <h1 className="text-3xl font-bold text-gray-800">Laporan Pemeliharaan Aset</h1>

                <input
                    type="text"
                    placeholder="Cari aset..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // Reset ke halaman pertama saat cari
                    }}
                    className="w-full rounded-md border p-2 shadow-sm"
                />

                <LaporanTable currentItems={currentItems} />

                {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
            </div>
        </AdminLayout>
    );
}
