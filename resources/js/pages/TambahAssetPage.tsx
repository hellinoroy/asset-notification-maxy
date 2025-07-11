import AdminLayout from '@/layouts/AdminLayout';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import React, { useState } from 'react';
import InputField from '../components/InputField';

const TambahAssetPage: React.FC = () => {
    const [nomor, setNomor] = useState('');
    const [nama, setNama] = useState('');
    const [tahunBeli, setTahunBeli] = useState<number | ''>('');
    const [keterangan, setKeterangan] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!nomor || !nama || !tahunBeli) {
            alert('Nomor, nama, dan tahun beli wajib diisi.');
            return;
        }

        const payload = {
            aset_nomor: nomor,
            aset_nama: nama,
            aset_tahun_beli: tahunBeli, // integer year
            aset_keterangan: keterangan,
        };
        console.log(payload);
        try {
            await axios.post('/api/aset', payload);
            router.visit('/aset');
        } catch (err: any) {
            console.error(err);
            const serverError = err?.response?.data?.error;
            const serverMsg = err?.response?.data?.message;

            alert(serverError ?? serverMsg ?? 'Gagal menyimpan aset.');
            console.error(err);
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 sm:p-8">
                <div className="mx-auto max-w-3xl space-y-6 rounded-2xl bg-white p-6 shadow-md sm:p-10">
                    {/* header + back */}
                    <div className="flex items-center gap-3">
                        <button onClick={() => window.history.back()}>
                            <ArrowLeft className="h-6 w-6 text-gray-700" />
                        </button>
                        <h2 className="text-2xl font-semibold text-gray-800 sm:text-3xl">Tambahkan Aset Baru</h2>
                    </div>

                    {/* form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="nomor" className="mb-1 block text-sm font-medium text-gray-700">
                                Nomor Aset
                            </label>
                            <InputField id="nomor" type="text" placeholder="AST001" value={nomor} onChange={(e: any) => setNomor(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="nama" className="mb-1 block text-sm font-medium text-gray-700">
                                Nama Aset
                            </label>
                            <InputField id="nama" type="text" placeholder="Laptop Asus" value={nama} onChange={(e: any) => setNama(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="tahunBeli" className="mb-1 block text-sm font-medium text-gray-700">
                                Tahun Beli
                            </label>
                            <InputField
                                id="tahunBeli"
                                type="number"
                                placeholder="2024"
                                value={tahunBeli}
                                onChange={(e: any) => setTahunBeli(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="keterangan" className="mb-1 block text-sm font-medium text-gray-700">
                                Keterangan
                            </label>
                            <InputField
                                id="keterangan"
                                type="text"
                                placeholder="Catatan…"
                                value={keterangan}
                                onChange={(e: any) => setKeterangan(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="mt-4 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
                            Kirim
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default TambahAssetPage;
