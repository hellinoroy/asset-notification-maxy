import React, { useEffect, useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';

import axios from 'axios';
import AddScheduleForm from '../components/AddScheduleForm';
import Pagination from '../components/Pagination';
import ScheduleTable from '../components/ScheduleTable';
import SearchBar from '../components/SearchBar';

interface ScheduleItem {
    id: string;
    namaAset: string;
    lastMaintenance: string;
    nextMaintenance: string;
    keterangan: string;
    pic: string;
    status: string;
    yn: boolean;
}

const Welcome: React.FC = () => {
    const [scheduleData, setScheduleData] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function fetchJadwal() {
            try {
                const response = await axios.get('/api/jadwal', { withCredentials: true });
                console.log(response.data.data);
                setScheduleData(response.data.data);
            } catch (err) {
                console.error('Error fetching notifications:', err);
            }
        }

        fetchJadwal();
    }, []);

    const itemsPerPage = 5;

    const filteredData = scheduleData.filter((item) => item.aset.aset_nama?.toLowerCase().includes(searchTerm.toLowerCase()));
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };


    return (
        <AdminLayout>
            <div className="space-y-8">

                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-semibold text-gray-700">Daftar Jadwal Maintenance</h2>

                    <div className="mb-4 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"></div>
                    <div className="mb-4 flex justify-end space-x-4">
                        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

                    </div>

                    <ScheduleTable currentItems={currentItems} />

                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>

                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-semibold text-gray-700">Tambahkan Jadwal Aset</h2>
                    <AddScheduleForm  />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Welcome;
