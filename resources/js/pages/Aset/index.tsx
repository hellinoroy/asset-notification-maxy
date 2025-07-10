// resources/js/Pages/Aset/Index.tsx

import { Asset, PageProps } from '@/types';
import { MagnifyingGlassIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce'; // npm install use-debounce

interface IndexProps extends PageProps {
    assets: Asset[]; // Untuk contoh ini, kita tidak pakai paginasi dari Laravel
    filters: {
        search: string;
    };
}

export default function Index({ auth, assets, filters }: IndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [debouncedSearch] = useDebounce(search, 300); // Debounce 300ms

    // Efek untuk memicu pencarian saat nilai debounce berubah
    useEffect(() => {
        // Hanya kirim request jika nilai pencarian berubah
        if (debouncedSearch !== filters.search) {
            router.get(
                route('assets.index'),
                { search: debouncedSearch },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }
    }, [debouncedSearch]);

    const deleteAsset = (asset: Asset) => {
        if (window.confirm(`Apakah Anda yakin ingin menghapus "${asset.nama_aset}"?`)) {
            router.delete(route('assets.destroy', asset.id), {
                preserveScroll: true, // Jaga posisi scroll setelah hapus
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <Head title="Semua Aset" />

            <div className="rounded-lg bg-white p-6 shadow-xl">
                {/* Header */}
                <header className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <h1 className="text-2xl font-bold text-gray-800">Semua Aset</h1>
                    <div className="flex w-full items-center gap-2 sm:w-auto">
                        <div className="relative flex-grow sm:flex-grow-0">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari..."
                                className="w-full rounded-lg border-2 border-transparent bg-purple-100 py-2 pr-4 pl-10 text-purple-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none sm:w-64"
                            />
                            <MagnifyingGlassIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-purple-500" />
                        </div>
                        <button className="rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-800 hover:bg-gray-300">Simpan</button>
                        <Link href={route('dashboard')} className="rounded-lg bg-red-500 p-2.5 text-white hover:bg-red-600">
                            <XMarkIcon className="h-5 w-5" />
                        </Link>
                    </div>
                </header>

                {/* Tabel Aset */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
                            <tr>
                                {['ID', 'Nama Aset', 'Tanggal Beli', 'Keterangan', 'Last Maintenance', 'Next Maintenance', 'Next PIC', 'H'].map(
                                    (h) => (
                                        <th key={h} className="px-6 py-3">
                                            {h}
                                        </th>
                                    ),
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {assets.map((asset, index) => (
                                <tr key={asset.id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{asset.id}</td>
                                    <td className="px-6 py-4">{asset.nama_aset}</td>
                                    <td className="px-6 py-4">{asset.tanggal_beli}</td>
                                    <td className="px-6 py-4">{asset.keterangan}</td>
                                    <td className="px-6 py-4">{asset.last_maintenance}</td>
                                    <td className="px-6 py-4">{asset.next_maintenance}</td>
                                    <td className="px-6 py-4">{asset.pic}</td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => deleteAsset(asset)} className="text-red-500 hover:text-red-700">
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {assets.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-6 py-10 text-center text-gray-500">
                                        Tidak ada aset yang ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Paginasi (jika Anda menggunakan paginasi dari Laravel) */}
                {/* <Pagination links={assets.links} /> */}
            </div>
        </div>
    );
}
