// resources/js/Pages/Laporan/Index.tsx

import { PageProps } from '@/types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Head } from '@inertiajs/react';
import DonutChart from '../../components/DonutChart'; // Import komponen chart
import AuthenticatedLayout from '../../layouts/AuthenticatedLayout';

// Tipe data spesifik untuk halaman ini
interface Report {
    id: string;
    nama_aset: string;
    harga_maintenance: number;
    next_maintenance: string;
    keterangan: string;
    pic: string;
    status: 'Pending' | 'Terlambat' | 'Selesai' | 'Aman';
}

interface ChartData {
    labels: string[];
    datasets: { data: number[]; backgroundColor: string[] }[];
}

interface LaporanPageProps extends PageProps {
    stats: { totalMaintenance: number; menungguLaporan: number };
    chartData: ChartData;
    reports: Report[];
    filters: { search: string };
}

// Komponen Kartu Statistik
const StatCard = ({ title, value, children }: { title: string; value?: string | number; children?: React.ReactNode }) => (
    <div className="flex flex-col justify-between rounded-lg bg-white p-6 shadow-md">
        <div>
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            {value && <p className="mt-2 text-4xl font-bold">{value}</p>}
        </div>
        {children && <div className="mt-4">{children}</div>}
    </div>
);

// Helper untuk style badge status
const getStatusBadge = (status: Report['status']) => {
    const styles = {
        Pending: 'bg-yellow-100 text-yellow-800',
        Terlambat: 'bg-red-100 text-red-800',
        Selesai: 'bg-blue-100 text-blue-800',
        Aman: 'bg-green-100 text-green-800',
    };
    return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>{status}</span>;
};

export default function Index({ auth, stats, chartData, reports }: LaporanPageProps) {
    return (
        <AuthenticatedLayout user={auth.user} activeNav="Laporan">
            <Head title="Laporan" />

            {/* Bagian Kartu Statistik dan Chart */}
            <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <StatCard title="Total Maintenance" value={stats.totalMaintenance} />
                <StatCard title="Menunggu Laporan" value={stats.menungguLaporan} />
                <StatCard title="">
                    <DonutChart data={chartData} total={stats.totalMaintenance} />
                </StatCard>
            </div>

            {/* Bagian Tabel Laporan */}
            <div className="rounded-lg bg-white p-6 shadow-md">
                <header className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Laporan</h2>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Cari..."
                            className="w-full rounded-lg border-2 border-transparent bg-purple-100 py-2 pr-4 pl-10 text-purple-800 focus:ring-2 focus:ring-purple-500 focus:outline-none sm:w-64"
                        />
                        <MagnifyingGlassIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-purple-500" />
                    </div>
                </header>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
                            <tr>
                                {['ID', 'Nama Aset', 'Harga Maintenance', 'Next Maintenance', 'Keterangan', 'PIC', 'Status'].map((h) => (
                                    <th key={h} className="px-6 py-3 text-left">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report.id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium">{report.id}</td>
                                    <td className="px-6 py-4">{report.nama_aset}</td>
                                    <td className="px-6 py-4">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(report.harga_maintenance)}
                                    </td>
                                    <td className="px-6 py-4">{report.next_maintenance}</td>
                                    <td className="px-6 py-4">{report.keterangan}</td>
                                    <td className="px-6 py-4">{report.pic}</td>
                                    <td className="px-6 py-4">{getStatusBadge(report.status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer Tabel: Tombol Ekspor dan Paginasi */}
                <footer className="mt-4 flex flex-col items-center justify-between pt-4 sm:flex-row">
                    <div className="mb-4 flex gap-2 sm:mb-0">
                        <a href="#" className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-200">
                            Cetak PDF
                        </a>
                        <a href="#" className="rounded-lg bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-200">
                            Cetak Xls
                        </a>
                    </div>
                    {/* <Pagination links={...} /> */}
                </footer>
            </div>
        </AuthenticatedLayout>
    );
}
