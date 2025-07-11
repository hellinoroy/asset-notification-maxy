import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import AssetTable from '../components/AssetTable';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import StatCard from '../components/StatCard';
import AdminLayout from '../layouts/AdminLayout';

interface AssetItem {
    id: string;
    namaAset: string;
    tanggalBeli: string;
    keterangan: string;
    lastMaintenance: string;
    nextMaintenance: string;
    pic: string;
}

const AssetPage: React.FC = () => {
    const [overdue, setOverdue] = useState(0);
    const [pending, setPending] = useState(0);
    const [selesai, setSelesai] = useState(0);

    const [assets, setAssets] = useState<AssetItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const [statRes, asetRes] = await Promise.all([
                    axios.get('/api/stat-card', { withCredentials: true }),
                    axios.get('/api/aset', { withCredentials: true }),
                ]);

                const sc = statRes.data.stat_card;
                setOverdue(sc.totalTerlambat ?? 0);
                setPending(sc.totalTerdekat ?? 0);
                setSelesai(sc.totalSelesai ?? 0);

                const rows = asetRes.data.data ?? asetRes.data;
                console.log(asetRes);
                setAssets(
                    rows.map(
                        (r: any): AssetItem => ({
                            id: r.aset_nomor ?? `AST${String(r.aset_id).padStart(3, '0')}`,
                            namaAset: r.aset_nama,
                            tanggalBeli: r.aset_tahun_beli ?? '-',
                            keterangan: r.aset_keterangan ?? '-',
                            lastMaintenance: r.latest_selesai_jadwal?.jadwal_tanggal,
                            nextMaintenance: r.next_jadwal?.jadwal_tanggal,
                            pic: r.next_jadwal?.user?.name ?? '-',
                        }),
                    ),
                );
            } catch (err) {
                console.error('Error loading dashboard data:', err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredAssets = useMemo(() => {
        return assets.filter((item) => Object.values(item).some((val) => val.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [assets, searchTerm]);

    const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);

    const currentItems = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredAssets.slice(start, start + itemsPerPage);
    }, [filteredAssets, currentPage]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    return (
        <AdminLayout>
            <div className="space-y-10">
                <h1 className="mb-6 text-3xl font-bold text-gray-800">Dashboard Aset</h1>

                {/* stat cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <StatCard title="Total Maintenance" value={selesai} />
                    <StatCard title="Jadwal Terdekat" value={pending} />
                    <StatCard title="Overdue" value={overdue} />
                </div>

                {/* table + search + pagination */}
                <div className="space-y-6 rounded-2xl bg-white p-6 shadow-md sm:p-8">
                    {loading ? (
                        <p>Memuat data aset…</p>
                    ) : (
                        <>
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <h2 className="text-4xl font-bold text-gray-800">Semua Aset</h2>
                                <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
                            </div>

                            <AssetTable data={currentItems} />

                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                        </>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AssetPage;
