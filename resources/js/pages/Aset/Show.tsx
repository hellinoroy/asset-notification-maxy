// resources/js/Pages/Aset/Show.tsx

import { Asset, MaintenanceRecord, PageProps } from '@/types';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '../../layouts/AuthenticatedLayout';

// Tipe spesifik untuk props halaman ini
interface AssetShowProps extends PageProps {
    asset: Asset & {
        last_maintenance: string;
        harga_maintenance: number;
        status: string;
    };
    maintenanceHistory: MaintenanceRecord[];
    filters: {
        sort?: string;
    };
}

// Komponen untuk baris detail utama
const DetailRow = ({ label, value }: { label: string; value: string | number }) => (
    <tr className="border-b">
        <td className="w-1/3 bg-gray-50 px-4 py-2.5 font-medium text-gray-600">{label}</td>
        <td className="px-4 py-2.5 text-gray-800">{value}</td>
    </tr>
);

export default function Show({ auth, asset, maintenanceHistory, filters }: AssetShowProps) {
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const sort = e.target.value;
        router.get(
            route('assets.show', asset.id),
            { sort },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <AuthenticatedLayout user={auth.user} activeNav="Aset">
            <Head title={`Detail: ${asset.nama_aset}`} />

            <div className="mx-auto max-w-4xl space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('dashboard')} className="text-gray-600 hover:text-gray-900">
                            <ArrowLeftIcon className="h-6 w-6" />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800">Detail Aset</h1>
                    </div>
                    {/* Search bar jika diperlukan */}
                </div>

                {/* Kartu Detail Utama */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-semibold text-gray-900">{asset.nama_aset}</h2>
                    <div className="overflow-hidden rounded-lg border">
                        <table className="w-full text-sm">
                            <tbody>
                                <DetailRow label="ID" value={asset.id} />
                                <DetailRow label="Nama Aset" value={asset.nama_aset} />
                                <DetailRow label="Last Maintenance" value={asset.last_maintenance} />
                                <DetailRow label="Next Maintenance" value={asset.next_maintenance} />
                                <DetailRow
                                    label="Harga Maintenance"
                                    value={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(asset.harga_maintenance)}
                                />
                                <DetailRow label="Keterangan" value={asset.keterangan} />
                                <DetailRow label="PIC" value={asset.pic} />
                                <DetailRow label="Status" value={asset.status} />
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Kartu Riwayat Maintenance */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">{asset.nama_aset}</h2>
                        <select
                            onChange={handleFilterChange}
                            defaultValue={filters.sort || 'terbaru'}
                            className="rounded-md border-gray-300 text-sm shadow-sm"
                        >
                            <option value="terbaru">Terbaru</option>
                            <option value="terlama">Terlama</option>
                        </select>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-200 text-xs text-gray-700 uppercase">
                                <tr>
                                    {['Tanggal', 'ID', 'Harga Maintenance', 'Next Maintenance', 'Keterangan', 'PIC'].map((h) => (
                                        <th key={h} className="px-4 py-3 text-left">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {maintenanceHistory.map((record, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-3">{record.tanggal}</td>
                                        <td className="px-4 py-3">{record.id}</td>
                                        <td className="px-4 py-3">
                                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(record.harga_maintenance)}
                                        </td>
                                        <td className="px-4 py-3">{record.next_maintenance}</td>
                                        <td className="px-4 py-3">{record.keterangan}</td>
                                        <td className="px-4 py-3">{record.pic}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tombol Ekspor */}
                <div className="flex justify-end gap-3">
                    <a href="#" className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-200">
                        Cetak PDF
                    </a>
                    <a href="#" className="rounded-lg bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-200">
                        Cetak Xls
                    </a>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
