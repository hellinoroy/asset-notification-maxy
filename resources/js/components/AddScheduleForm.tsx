import { router } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InputField from './InputField';
import PrimaryButton from './PrimaryButton';
// Tipe data untuk satu item jadwal

export interface ScheduleItem {
    id: string;
    namaAset: string;
    lastMaintenance: string;
    nextMaintenance: string;
    keterangan: string;
    pic: string;
    status: string;
}

// Props untuk komponen ini

export default function AddScheduleForm() {
    const [asset, setAsset] = useState<string>('');
    const [nextMaintenanceDate, setNextMaintenanceDate] = useState<string>('');
    const [keterangan, setKeterangan] = useState<string>('');
    const [pic, setPic] = useState<any>('');
    const [assetId, setAssetId] = useState<any[]>([]);
    const [picList, setPicList] = useState<any[]>([]);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get('/api/all-user', { withCredentials: true });
                // console.log(response.data.users);
                setPicList(response.data.users);
                setPic(response.data.users[0].id);
            } catch (err) {
                console.error('Error fetching notifications:', err);
            }
        }

        async function fetchAsetId() {
            try {
                const response = await axios.get('/api/all-aset', { withCredentials: true });
                // console.log(response.data.asets);
                setAssetId(response.data.asets);
                setAsset(response.data.asets[0].aset_id);
            } catch (err) {
                console.error('Error fetching ids:', err);
            }
        }

        fetchAsetId();
        fetchUser();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            aset_id: asset,
            jadwal_tanggal: nextMaintenanceDate,
            jadwal_keterangan: keterangan,
            id: pic,
        };

        if (!payload.aset_id || !payload.jadwal_tanggal || !payload.jadwal_keterangan || !payload.id) {
            alert('Semua kolom harus diisi!');
            return; // prevent submission
        }

        // console.log(payload);

        try {
            const res = await axios.post('/api/jadwal', payload);
            // console.log(res);
            router.visit('/jadwal');
        } catch (err) {
            console.log(err);
            let message = 'Terjadi kesalahan saat menyimpan jadwal.';

            // Check if response exists and has a message
            if (err.response && err.response.data && err.response.data.message) {
                message = err.response.data.message;
            }
            alert(message)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="overflow-hidden rounded-lg border border-gray-300">
                <div className="flex bg-purple-100 px-4 py-3 text-sm font-semibold text-gray-700">
                    <div className="flex-1 text-left">Nama Aset</div>
                    <div className="flex-1 text-left">Next Maintenance</div>
                    <div className="flex-1 text-left">Keterangan</div>
                    <div className="flex-1 text-left">PIC</div>
                    
                </div>

                <div className="flex items-center space-x-2 bg-purple-50 px-4 py-3">
                    <div className="flex-1">
                        <select
                            id="asset"
                            value={asset}
                            onChange={(e) => {
                                // console.log(e.target.value)
                                setAsset(e.target.value);
                            }}
                            className="w-full border-none bg-transparent px-0 py-0 text-base text-gray-700 focus:ring-0"
                        >
                            {assetId.map((option) => (
                                <option key={option.aset_id} value={option.aset_id}>
                                    {option.aset_nomor} || {option.aset_nama}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <InputField
                            id="next-maintenance-date"
                            type="date"
                            value={nextMaintenanceDate}
                            onChange={(e: any) => setNextMaintenanceDate(e.target.value)}
                            className="border-none bg-transparent px-0 py-0 focus:ring-0"
                        />
                    </div>

                    <div className="flex-1">
                        <InputField
                            id="keterangan"
                            type="text"
                            placeholder="Keterangan..."
                            value={keterangan}
                            onChange={(e: any) => setKeterangan(e.target.value)}
                            className="border-none bg-transparent px-0 py-0 focus:ring-0"
                        />
                    </div>

                    <div className="flex-1">
                        <select
                            id="pic"
                            value={pic}
                            onChange={(e) => setPic(e.target.value)}
                            className="w-full border-none bg-transparent px-0 py-0 text-base text-gray-700 focus:ring-0"
                        >
                            {picList.map((option) => (
                                
                                <option key={option.id} value={option.id}>
                                    {option.name} || {option.email}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <PrimaryButton type="submit" className="px-8 py-3">
                    Kirim
                </PrimaryButton>
            </div>
        </form>
    );
}
